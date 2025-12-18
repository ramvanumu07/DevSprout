import { google } from 'googleapis'

// Initialize Google Sheets API
let sheets = null
let spreadsheetId = null

export async function initGoogleSheets() {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.log('⚠️  Google Sheets not configured - using demo mode')
      return false
    }

    spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) {
      console.log('⚠️  GOOGLE_SHEET_ID not set')
      return false
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    sheets = google.sheets({ version: 'v4', auth })
    
    // Ensure headers are correct
    await ensureHeaders()
    
    console.log('✅ Google Sheets connected')
    return true

  } catch (error) {
    console.error('❌ Google Sheets init error:', error.message)
    return false
  }
}

// Ensure Sheet1 has the progress column header
async function ensureHeaders() {
  if (!sheets) return

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:E1'
    })

    const headers = response.data.values?.[0] || []
    
    // Check if progress column exists
    if (headers.length < 5 || headers[4] !== 'progress') {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!E1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['progress']]
        }
      })
      console.log('✅ Added progress column header')
    }
  } catch (error) {
    console.error('Error ensuring headers:', error.message)
  }
}

export function isSheetsEnabled() {
  return sheets !== null
}

// ============ STUDENT OPERATIONS ============

// Get all students with their progress
export async function getAllStudents() {
  if (!sheets) return null

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:E' // studentId, secretKey, name, email, progress
    })

    const rows = response.data.values
    if (!rows || rows.length <= 1) return {}

    const students = {}
    for (let i = 1; i < rows.length; i++) {
      const [studentId, secretKey, name, email, progress] = rows[i]
      if (studentId) {
        students[studentId] = { 
          secretKey, 
          name, 
          email,
          progress: parseProgress(progress),
          rowIndex: i + 1 // Store row index for updates
        }
      }
    }

    return students
  } catch (error) {
    console.error('Error fetching students:', error.message)
    return null
  }
}

// Get single student by ID
export async function getStudent(studentId) {
  const students = await getAllStudents()
  return students?.[studentId] || null
}

// Parse progress string to object
// Format: "arrays/arrays-intro,arrays/arrays-operations,linked-lists/ll-singly"
function parseProgress(progressString) {
  if (!progressString) return {}
  
  const progress = {}
  const items = progressString.split(',').filter(Boolean)
  
  for (const item of items) {
    const [topicId, subtopicId] = item.split('/')
    if (topicId && subtopicId) {
      if (!progress[topicId]) {
        progress[topicId] = { subtopics: {} }
      }
      progress[topicId].subtopics[subtopicId] = true
    }
  }
  
  return progress
}

// Convert progress object to string
function stringifyProgress(progressObj) {
  if (!progressObj) return ''
  
  const items = []
  for (const [topicId, topicData] of Object.entries(progressObj)) {
    if (topicData.subtopics) {
      for (const [subtopicId, completed] of Object.entries(topicData.subtopics)) {
        if (completed) {
          items.push(`${topicId}/${subtopicId}`)
        }
      }
    }
  }
  
  return items.join(',')
}

// Add new student
export async function addStudent(studentId, secretKey, name, email) {
  if (!sheets) return false

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[studentId, secretKey, name, email, '']]
      }
    })
    return true
  } catch (error) {
    console.error('Error adding student:', error.message)
    return false
  }
}

// ============ PROGRESS OPERATIONS ============

// Get student progress
export async function getStudentProgress(studentId) {
  const student = await getStudent(studentId)
  return student?.progress || {}
}

// Update student progress (updates the single row for this student)
export async function updateProgress(studentId, topicId, subtopicId, completed) {
  if (!sheets) return false

  try {
    // Get current student data
    const student = await getStudent(studentId)
    if (!student || !student.rowIndex) {
      console.error('Student not found:', studentId)
      return false
    }

    // Update progress object
    const currentProgress = student.progress || {}
    if (!currentProgress[topicId]) {
      currentProgress[topicId] = { subtopics: {} }
    }
    currentProgress[topicId].subtopics[subtopicId] = completed

    // Convert to string and save
    const progressString = stringifyProgress(currentProgress)
    
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!E${student.rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[progressString]]
      }
    })

    console.log(`✅ Progress updated for ${studentId}: ${topicId}/${subtopicId}`)
    return true
  } catch (error) {
    console.error('Error updating progress:', error.message)
    return false
  }
}

// Get student stats
export async function getStudentStats(studentId) {
  return { streak: 0, totalHours: 0 }
}
