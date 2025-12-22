import dotenv from 'dotenv'
dotenv.config() // Load env vars FIRST

import express from 'express'
import cors from 'cors'
import { initGoogleSheets } from './services/googleSheets.js'
import { initTaskDb } from './services/taskDb.js'
import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chat.js'
import progressRoutes from './routes/progress.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/progress', progressRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    aiEnabled: !!process.env.GROQ_API_KEY,
    sheetsEnabled: !!process.env.GOOGLE_SHEET_ID
  })
})

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  })
})

// Start server
async function startServer() {
  // Initialize databases
  await initGoogleSheets()
  await initTaskDb()

  app.listen(PORT, () => {
    console.log(`\n🚀 EduBridge API server running on http://localhost:${PORT}\n`)
    
    if (process.env.GROQ_API_KEY) {
      console.log('✅ Groq AI - Enabled')
    } else {
      console.log('⚠️  Groq AI - Not configured (add GROQ_API_KEY)')
    }
    
    if (process.env.GOOGLE_SHEET_ID) {
      console.log('✅ Google Sheets - Connected')
    } else {
      console.log('⚠️  Google Sheets - Not configured')
    }
    
    if (!process.env.GOOGLE_SHEET_ID) {
      console.log('\n📝 Demo login: demo / demo\n')
    } else {
      console.log('\n📝 Login with your registered credentials\n')
    }
  })
}

startServer()
