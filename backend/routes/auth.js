import express from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { supabaseAdmin } from '../services/supabase.js'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'devsprout-secret-key-change-in-production'
const JWT_EXPIRES_IN = '7d'

/**
 * Hash password using SHA256 (simple, no bcrypt dependency)
 */
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

/**
 * Generate JWT token for user
 */
function generateToken(user) {
  return jwt.sign(
    { 
      userId: user.id, 
      studentId: user.student_id,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

/**
 * Verify JWT token middleware
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' })
  }
}

/**
 * Check if user has active access (paid manually)
 */
export async function requireAccess(req, res, next) {
  try {
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('has_access, access_expires_at')
      .eq('id', req.user.userId)
      .single()
    
    if (error || !user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    
    // Check has_access
    if (!user.has_access) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access required. Please contact admin after payment.',
        code: 'ACCESS_REQUIRED'
      })
    }
    
    // Check expiry if set
    if (user.access_expires_at && new Date(user.access_expires_at) < new Date()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Your access has expired. Please renew.',
        code: 'ACCESS_EXPIRED'
      })
    }
    
    next()
  } catch (error) {
    console.error('Access check error:', error)
    res.status(500).json({ success: false, message: 'Failed to verify access' })
  }
}

/**
 * Check if user is admin
 */
export async function requireAdmin(req, res, next) {
  try {
    const { data, error } = await supabaseAdmin
      .from('admins')
      .select()
      .eq('user_id', req.user.userId)
      .single()
    
    if (error || !data) {
      return res.status(403).json({ success: false, message: 'Admin access required' })
    }
    
    next()
  } catch (error) {
    console.error('Admin check error:', error)
    res.status(500).json({ success: false, message: 'Failed to verify admin status' })
  }
}

/**
 * POST /api/auth/register
 * Register a new user (they won't have access until admin activates)
 */
router.post('/register', async (req, res) => {
  try {
    const { studentId, password, name, email } = req.body

    if (!studentId || !password || !name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student ID, password, and name are required' 
      })
    }

    if (password.length < 4) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 4 characters' 
      })
    }

    // Check if student ID already exists
    const { data: existing } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('student_id', studentId.toLowerCase())
      .single()
    
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'This Student ID is already taken' 
      })
    }

    // Create new user (has_access = false by default)
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({
        student_id: studentId.toLowerCase(),
        password: hashPassword(password),
        name,
        email: email || null,
        has_access: false // Will be activated after manual payment
      })
      .select()
      .single()
    
    if (error) throw error

    const token = generateToken(user)

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please complete payment and contact admin for access.',
      user: {
        id: user.id,
        studentId: user.student_id,
        name: user.name,
        hasAccess: user.has_access
      },
      token
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ success: false, message: 'Registration failed' })
  }
})

/**
 * POST /api/auth/login
 * Login with Student ID and Password
 */
router.post('/login', async (req, res) => {
  try {
    const { studentId, password } = req.body

    if (!studentId || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student ID and password are required' 
      })
    }

    // Find user
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('student_id', studentId.toLowerCase())
      .single()
    
    if (error || !user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid Student ID or password' 
      })
    }

    // Verify password
    if (user.password !== hashPassword(password)) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid Student ID or password' 
      })
    }

    // Check if admin
    const { data: adminData } = await supabaseAdmin
      .from('admins')
      .select()
      .eq('user_id', user.id)
      .single()
    
    const isAdmin = !!adminData

    // Check access expiry
    let accessExpired = false
    if (user.has_access && user.access_expires_at) {
      accessExpired = new Date(user.access_expires_at) < new Date()
    }

    const token = generateToken(user)

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        studentId: user.student_id,
        name: user.name,
        hasAccess: user.has_access && !accessExpired,
        accessExpiresAt: user.access_expires_at,
        isAdmin
      },
      token
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, message: 'Login failed' })
  }
})

/**
 * GET /api/auth/me
 * Get current user info
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', req.user.userId)
      .single()
    
    if (error || !user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    // Check if admin
    const { data: adminData } = await supabaseAdmin
      .from('admins')
      .select()
      .eq('user_id', user.id)
      .single()

    // Check access expiry
    let accessExpired = false
    if (user.has_access && user.access_expires_at) {
      accessExpired = new Date(user.access_expires_at) < new Date()
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        studentId: user.student_id,
        name: user.name,
        email: user.email,
        hasAccess: user.has_access && !accessExpired,
        accessExpiresAt: user.access_expires_at,
        isAdmin: !!adminData
      }
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ success: false, message: 'Failed to get user info' })
  }
})

// =====================
// ADMIN ROUTES - For managing user access
// =====================

/**
 * GET /api/auth/admin/users
 * Get all users (admin only)
 */
router.get('/admin/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('id, student_id, name, email, has_access, access_expires_at, created_at')
      .order('created_at', { ascending: false })
    
    if (error) throw error

    res.json({
      success: true,
      users: users.map(u => ({
        id: u.id,
        studentId: u.student_id,
        name: u.name,
        email: u.email,
        hasAccess: u.has_access,
        accessExpiresAt: u.access_expires_at,
        createdAt: u.created_at
      }))
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ success: false, message: 'Failed to get users' })
  }
})

/**
 * POST /api/auth/admin/grant-access
 * Grant access to a user after manual payment (admin only)
 */
router.post('/admin/grant-access', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { studentId, durationDays } = req.body

    if (!studentId) {
      return res.status(400).json({ success: false, message: 'Student ID required' })
    }

    // Calculate expiry date if duration provided
    let accessExpiresAt = null
    if (durationDays) {
      accessExpiresAt = new Date()
      accessExpiresAt.setDate(accessExpiresAt.getDate() + parseInt(durationDays))
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .update({ 
        has_access: true,
        access_expires_at: accessExpiresAt
      })
      .eq('student_id', studentId.toLowerCase())
      .select()
      .single()
    
    if (error || !user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.json({
      success: true,
      message: `Access granted to ${user.name}`,
      user: {
        studentId: user.student_id,
        name: user.name,
        hasAccess: user.has_access,
        accessExpiresAt: user.access_expires_at
      }
    })
  } catch (error) {
    console.error('Grant access error:', error)
    res.status(500).json({ success: false, message: 'Failed to grant access' })
  }
})

/**
 * POST /api/auth/admin/revoke-access
 * Revoke access from a user (admin only)
 */
router.post('/admin/revoke-access', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { studentId } = req.body

    if (!studentId) {
      return res.status(400).json({ success: false, message: 'Student ID required' })
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .update({ has_access: false })
      .eq('student_id', studentId.toLowerCase())
      .select()
      .single()
    
    if (error || !user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.json({
      success: true,
      message: `Access revoked from ${user.name}`,
      user: {
        studentId: user.student_id,
        name: user.name,
        hasAccess: user.has_access
      }
    })
  } catch (error) {
    console.error('Revoke access error:', error)
    res.status(500).json({ success: false, message: 'Failed to revoke access' })
  }
})

/**
 * POST /api/auth/admin/create-user
 * Create a user with access already granted (for paid users)
 */
router.post('/admin/create-user', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { studentId, password, name, email, durationDays } = req.body

    if (!studentId || !password || !name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student ID, password, and name are required' 
      })
    }

    // Check if exists
    const { data: existing } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('student_id', studentId.toLowerCase())
      .single()
    
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student ID already exists' 
      })
    }

    // Calculate expiry
    let accessExpiresAt = null
    if (durationDays) {
      accessExpiresAt = new Date()
      accessExpiresAt.setDate(accessExpiresAt.getDate() + parseInt(durationDays))
    }

    // Create user with access
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({
        student_id: studentId.toLowerCase(),
        password: hashPassword(password),
        name,
        email: email || null,
        has_access: true,
        access_expires_at: accessExpiresAt
      })
      .select()
      .single()
    
    if (error) throw error

    res.status(201).json({
      success: true,
      message: 'User created with access',
      user: {
        studentId: user.student_id,
        name: user.name,
        hasAccess: user.has_access,
        accessExpiresAt: user.access_expires_at
      }
    })
  } catch (error) {
    console.error('Create user error:', error)
    res.status(500).json({ success: false, message: 'Failed to create user' })
  }
})

export default router
