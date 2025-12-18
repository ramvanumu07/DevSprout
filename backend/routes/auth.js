import express from 'express'
import { getStudent, addStudent, isSheetsEnabled, getStudentProgress, getStudentStats } from '../services/googleSheets.js'

const router = express.Router()

// Demo students (fallback when Google Sheets is not configured)
const DEMO_STUDENTS = {
  'student001': {
    secretKey: 'key123',
    name: 'Alex Chen',
    email: 'alex@example.com'
  },
  'student002': {
    secretKey: 'key456',
    name: 'Sarah Johnson',
    email: 'sarah@example.com'
  },
  'demo': {
    secretKey: 'demo',
    name: 'Demo User',
    email: 'demo@example.com'
  }
}

// Demo progress (fallback)
const DEMO_PROGRESS = {
  'student001': {
    'arrays': {
      subtopics: {
        'arrays-intro': true,
        'arrays-operations': true
      }
    }
  }
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

    // Try Google Sheets first
    if (isSheetsEnabled()) {
      student = await getStudent(studentId)
      if (student && student.secretKey === secretKey) {
        progress = await getStudentProgress(studentId) || {}
        stats = await getStudentStats(studentId)
      }
    }

    // Fallback to demo data
    if (!student) {
      student = DEMO_STUDENTS[studentId]
      progress = DEMO_PROGRESS[studentId] || {}
      stats = { streak: 5, totalHours: 12 }
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

    // Check if student exists
    if (isSheetsEnabled()) {
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
    } else {
      // Demo mode - check in-memory
      if (DEMO_STUDENTS[studentId]) {
        return res.status(400).json({
          success: false,
          message: 'Student ID already exists'
        })
      }
      // Add to demo (won't persist)
      DEMO_STUDENTS[studentId] = {
        secretKey,
        name: name || studentId,
        email: email || ''
      }
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
      valid = !!DEMO_STUDENTS[studentId]
    }

    res.json({ valid })
  } catch (error) {
    res.status(500).json({ valid: false })
  }
})

export default router
