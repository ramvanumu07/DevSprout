import express from 'express'
import { isSheetsEnabled, getStudentProgress, updateProgress as updateSheetProgress, getStudentStats } from '../services/googleSheets.js'

const router = express.Router()

// In-memory fallback store (when Google Sheets not configured)
const progressStore = new Map()

// Initialize demo data
progressStore.set('student001', {
  progress: {
    'arrays': {
      subtopics: {
        'arrays-intro': true,
        'arrays-operations': true
      }
    }
  },
  streak: 5,
  totalHours: 12
})

// GET /api/progress/:studentId
router.get('/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params
    
    // Try Google Sheets first
    if (isSheetsEnabled()) {
      const progress = await getStudentProgress(studentId)
      const stats = await getStudentStats(studentId)
      
      return res.json({
        success: true,
        progress: progress || {},
        streak: stats.streak,
        totalHours: stats.totalHours
      })
    }

    // Fallback to in-memory store
    const studentData = progressStore.get(studentId)
    
    res.json({
      success: true,
      progress: studentData?.progress || {},
      streak: studentData?.streak || 0,
      totalHours: studentData?.totalHours || 0
    })

  } catch (error) {
    console.error('Get progress error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress'
    })
  }
})

// POST /api/progress/update
router.post('/update', async (req, res) => {
  try {
    const { studentId, topicId, subtopicId, completed } = req.body

    if (!studentId || !topicId || !subtopicId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      })
    }

    // Try Google Sheets first
    if (isSheetsEnabled()) {
      const updated = await updateSheetProgress(studentId, topicId, subtopicId, completed)
      
      if (updated) {
        const progress = await getStudentProgress(studentId)
        return res.json({
          success: true,
          message: 'Progress saved to Google Sheets',
          progress
        })
      }
    }

    // Fallback to in-memory store
    let studentData = progressStore.get(studentId)
    
    if (!studentData) {
      studentData = {
        progress: {},
        streak: 0,
        totalHours: 0
      }
    }

    if (!studentData.progress[topicId]) {
      studentData.progress[topicId] = { subtopics: {} }
    }

    studentData.progress[topicId].subtopics[subtopicId] = completed
    progressStore.set(studentId, studentData)

    res.json({
      success: true,
      message: 'Progress updated locally',
      progress: studentData.progress
    })

  } catch (error) {
    console.error('Update progress error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update progress'
    })
  }
})

// POST /api/progress/sync
router.post('/sync', async (req, res) => {
  try {
    const { studentId } = req.body

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: 'Student ID required'
      })
    }

    // Try Google Sheets first
    if (isSheetsEnabled()) {
      const progress = await getStudentProgress(studentId)
      const stats = await getStudentStats(studentId)
      
      return res.json({
        success: true,
        progress: progress || {},
        streak: stats.streak,
        totalHours: stats.totalHours
      })
    }

    // Fallback to in-memory store
    const studentData = progressStore.get(studentId)

    res.json({
      success: true,
      progress: studentData?.progress || {},
      streak: studentData?.streak || 0,
      totalHours: studentData?.totalHours || 0
    })

  } catch (error) {
    console.error('Sync error:', error)
    res.status(500).json({
      success: false,
      message: 'Sync failed'
    })
  }
})

export default router
