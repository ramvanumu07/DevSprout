import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { checkConnection } from './services/supabase.js'
import { rateLimiter } from './services/rateLimiter.js'
import { cache } from './services/cache.js'
import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chat.js'
import progressRoutes from './routes/progress.js'

const app = express()
const PORT = process.env.PORT || 5000

// Trust proxy for rate limiting behind load balancers
app.set('trust proxy', 1)

// CORS configuration
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:5173', 'http://localhost:3000']

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))

// Request logging
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    if (process.env.NODE_ENV !== 'production' || res.statusCode >= 400) {
      console.log(`${new Date().toISOString()} | ${req.method} ${req.path} | ${res.statusCode} | ${duration}ms`)
    }
  })
  next()
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/progress', progressRoutes)

// Health check
app.get('/api/health', async (req, res) => {
  const dbConnected = await checkConnection()
  const rateLimitMetrics = rateLimiter.getMetrics()
  
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: dbConnected ? 'connected' : 'disconnected',
      ai: !!process.env.GROQ_API_KEY ? 'configured' : 'not configured'
    },
    rateLimits: {
      globalRPM: `${rateLimitMetrics.globalRPMUsed}/${rateLimitMetrics.globalRPMLimit}`,
      dailyRequests: `${rateLimitMetrics.dailyUsed}/${rateLimitMetrics.dailyLimit}`,
      queueSize: rateLimitMetrics.currentQueueSize
    }
  })
})

// Metrics endpoint
app.get('/api/metrics', async (req, res) => {
  const rateLimitMetrics = rateLimiter.getMetrics()
  const cacheStats = cache.getStats()
  
  res.json({
    rateLimit: rateLimitMetrics,
    cache: cacheStats,
    memory: {
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB'
    },
    uptime: Math.round(process.uptime()) + 's'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ success: false, message: 'Origin not allowed' })
  }
  
  res.status(err.status || 500).json({ 
    success: false, 
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  })
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...')
  process.exit(0)
})

// Start server
async function startServer() {
  const dbConnected = await checkConnection()
  
  app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════════╗
║                      🌱 DevSprout API                            ║
╠══════════════════════════════════════════════════════════════════╣
║  Server: http://localhost:${PORT}                                   ║
╠══════════════════════════════════════════════════════════════════╣
║  Services:                                                       ║
║  ${dbConnected ? '✅' : '❌'} Database (Supabase)         ${dbConnected ? 'Connected' : 'Not connected'}              ║
║  ${process.env.GROQ_API_KEY ? '✅' : '⚠️ '} AI (Groq)                 ${process.env.GROQ_API_KEY ? 'Configured' : 'Not configured'}             ║
╠══════════════════════════════════════════════════════════════════╣
║  Payment: Manual (Admin grants access after payment)             ║
╠══════════════════════════════════════════════════════════════════╣
║  Admin Endpoints:                                                ║
║  POST /api/auth/admin/grant-access  { studentId, durationDays }  ║
║  POST /api/auth/admin/revoke-access { studentId }                ║
║  POST /api/auth/admin/create-user   { studentId, password, ... } ║
║  GET  /api/auth/admin/users                                      ║
╚══════════════════════════════════════════════════════════════════╝
    `)
  })
}

startServer()
