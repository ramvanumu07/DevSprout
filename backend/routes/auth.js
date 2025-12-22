import express from 'express'
import { getStudent, addStudent, isSheetsEnabled, getStudentProgress, getStudentStats } from '../services/googleSheets.js'

const router = express.Router()

// Demo student (ONLY used when Google Sheets is not configured at all)
const DEMO_STUDENT = {
  studentId: 'demo',
  secretKey: 'demo',
  name: 'Demo User',
  email: 'demo@example.com'
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { studentId, secretKey } = req.body

    if (!studentId || !secretKey) {
      return res.status(400).json({
        success: false,
        message: 'Student ID and secret key are required'
      })
    }

    let student = null
    let progress = {}
    let stats = { streak: 0, totalHours: 0 }

    // Use Google Sheets if enabled
    if (isSheetsEnabled()) {
      try {
        student = await getStudent(studentId)
        if (student && student.secretKey === secretKey) {
          progress = await getStudentProgress(studentId) || {}
          stats = await getStudentStats(studentId)
        }
      } catch (sheetsError) {
        console.error('Google Sheets error:', sheetsError.message)
        return res.status(500).json({
          success: false,
          message: 'Database connection error. Please try again.'
        })
      }
    } else {
      // Only allow demo login when Sheets is NOT configured
      if (studentId === 'demo' && secretKey === 'demo') {
        student = DEMO_STUDENT
        stats = { streak: 0, totalHours: 0 }
      }
    }

    // Validate credentials
    if (!student || student.secretKey !== secretKey) {
      return res.status(401).json({
        success: false,
        message: 'Invalid student ID or secret key'
      })
    }

    res.json({
      success: true,
      user: {
        studentId,
        name: student.name,
        email: student.email,
        progress,
        streak: stats.streak,
        totalHours: stats.totalHours
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    })
  }
})

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { studentId, secretKey, name, email } = req.body

    if (!studentId || !secretKey) {
      return res.status(400).json({
        success: false,
        message: 'Student ID and secret key are required'
      })
    }

    // Require Google Sheets for registration
    if (!isSheetsEnabled()) {
      return res.status(400).json({
        success: false,
        message: 'Registration requires database connection. Please contact admin.'
      })
    }

    // Check if student exists
    const existing = await getStudent(studentId)
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Student ID already exists'
      })
    }

    // Add to Google Sheets
    const added = await addStudent(studentId, secretKey, name || studentId, email || '')
    if (!added) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create account'
      })
    }

    res.json({
      success: true,
      message: 'Registration successful',
      user: {
        studentId,
        name: name || studentId,
        progress: {},
        streak: 0,
        totalHours: 0
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    })
  }
})

// POST /api/auth/verify
router.post('/verify', async (req, res) => {
  try {
    const { studentId } = req.body
    
    let valid = false
    
    if (isSheetsEnabled()) {
      const student = await getStudent(studentId)
      valid = !!student
    } else {
      // Only demo user valid when Sheets not configured
      valid = studentId === 'demo'
    }

    res.json({ valid })
  } catch (error) {
    res.status(500).json({ valid: false })
  }
})

export default router
