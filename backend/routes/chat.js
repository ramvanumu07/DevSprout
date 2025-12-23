import express from 'express'
import axios from 'axios'
import { getTaskProgress, saveTaskProgress, saveChatHistory, getChatHistory } from '../services/taskDb.js'

const router = express.Router()

// System prompt for the AI tutor
const SYSTEM_PROMPT = `You are an expert programming mentor teaching JavaScript to absolute beginners.

You are NOT a chatbot that answers random questions.
You are a structured mentor that follows a predefined curriculum.

TEACHING PHILOSOPHY:
1. Assume the student has ZERO DSA knowledge and minimal programming intuition.
2. Your primary goal is to build logical thinking, not memorization.
3. Focus on mental execution of code and step-by-step reasoning.
4. Prevent copy-paste learning.
5. Teach slowly, clearly, and incrementally.

HOW TO TEACH:
- Explain concepts using 1-2 very small examples
- Keep code snippets short (max 5-8 lines)
- Explain what changes line by line
- Ask the student to predict outputs before revealing answers
- Present ONE task at a time
- After each task, ask the student to explain their logic
- Provide hints, not full solutions

TONE: Calm, encouraging, mentor-like, slightly strict, never verbose.

IMPORTANT: When the student completes a task correctly, respond with "TASK_COMPLETE" somewhere in your message (hidden from the student, we'll process this).
When ALL tasks for the subtopic are complete, respond with "SUBTOPIC_COMPLETE" as well.`

// Curriculum data for context
const getCurriculumContext = (topicId, subtopicId, tasks) => {
  return `
Current Topic ID: ${topicId}
Current Subtopic ID: ${subtopicId}
Tasks for this lesson:
${tasks.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Guide the student through these tasks one at a time. Track their progress and move to the next task when they complete one correctly.`
}

// POST /api/chat - Main chat endpoint
router.post('/', async (req, res) => {
  try {
    const { studentId, topicId, subtopicId, message, action, history } = req.body

    // Get or initialize task progress
    let taskProgress = await getTaskProgress(studentId, topicId, subtopicId)
    
    if (!taskProgress) {
      taskProgress = { current: 1, completed: 0, total: 0 }
    }

    // Handle lesson start
    if (action === 'start_lesson') {
      // Reset progress for new lesson
      taskProgress = { current: 1, completed: 0, total: 0 }
      await saveTaskProgress(studentId, topicId, subtopicId, taskProgress)
      
      // Clear chat history for fresh start
      await saveChatHistory(studentId, topicId, subtopicId, [])

      const welcomeMessage = await generateAIResponse(
        studentId,
        topicId,
        subtopicId,
        [],
        'START_LESSON',
        taskProgress
      )

      return res.json({
        success: true,
        message: welcomeMessage,
        taskProgress
      })
    }

    // Handle regular chat message
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      })
    }

    // Generate AI response
    const aiResponse = await generateAIResponse(
      studentId,
      topicId,
      subtopicId,
      history || [],
      message,
      taskProgress
    )

    // Check for task completion markers in AI response
    let responseMessage = aiResponse
    let subtopicComplete = false
    let justCompleted = null

    if (aiResponse.includes('TASK_COMPLETE')) {
      taskProgress.completed += 1
      taskProgress.current = taskProgress.completed + 1
      justCompleted = taskProgress.completed
      responseMessage = aiResponse.replace(/TASK_COMPLETE/gi, '').trim()
    }

    if (aiResponse.includes('SUBTOPIC_COMPLETE')) {
      subtopicComplete = true
      responseMessage = responseMessage.replace(/SUBTOPIC_COMPLETE/gi, '').trim()
    }

    // Save updated progress
    await saveTaskProgress(studentId, topicId, subtopicId, taskProgress)

    // Save chat history
    const updatedHistory = [
      ...(history || []),
      { role: 'user', content: message, timestamp: new Date().toISOString() },
      { role: 'assistant', content: responseMessage, timestamp: new Date().toISOString() }
    ]
    await saveChatHistory(studentId, topicId, subtopicId, updatedHistory)

    res.json({
      success: true,
      message: responseMessage,
      taskProgress: {
        ...taskProgress,
        justCompleted
      },
      subtopicComplete
    })

  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to process chat message'
    })
  }
})

// GET /api/chat/history/:studentId/:topicId/:subtopicId
router.get('/history/:studentId/:topicId/:subtopicId', async (req, res) => {
  try {
    const { studentId, topicId, subtopicId } = req.params

    const history = await getChatHistory(studentId, topicId, subtopicId)
    const taskProgress = await getTaskProgress(studentId, topicId, subtopicId)

    res.json({
      success: true,
      history: history || [],
      taskProgress: taskProgress || { current: 1, completed: 0, total: 0 }
    })

  } catch (error) {
    console.error('Get history error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chat history'
    })
  }
})

// Generate AI response using Groq
async function generateAIResponse(studentId, topicId, subtopicId, history, userMessage, taskProgress) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY

  // If no API key, return a helpful fallback message
  if (!GROQ_API_KEY) {
    if (userMessage === 'START_LESSON') {
      return `Welcome! Let's learn this topic together.

I'll guide you through the tasks step by step. Since the AI tutor isn't configured yet, I'll provide basic guidance.

**Tip:** To enable the full AI tutor experience, add your GROQ_API_KEY to the .env file.

Ready to begin? Tell me what you know about this topic!`
    }
    return `Thanks for your response! 

Since the AI tutor isn't fully configured (missing GROQ_API_KEY), I can't provide detailed feedback right now.

**To enable AI tutoring:**
1. Get a free API key from https://console.groq.com
2. Add it to your backend/.env file as GROQ_API_KEY

Keep practicing and try again once the API is set up!`
  }

  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'system', content: getCurriculumContext(topicId, subtopicId, []) }
    ]

    // Add conversation history
    if (history && history.length > 0) {
      history.forEach(msg => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content })
        }
      })
    }

    // Add current message
    if (userMessage === 'START_LESSON') {
      messages.push({
        role: 'user',
        content: 'I want to start learning this topic. Please introduce it and give me my first task.'
      })
    } else {
      messages.push({ role: 'user', content: userMessage })
    }

    // Add task progress context
    messages.push({
      role: 'system',
      content: `Current task progress: Task ${taskProgress.current} of ${taskProgress.total || 'unknown'}. Completed: ${taskProgress.completed} tasks.`
    })

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.7,
        max_tokens: 1024
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0]?.message?.content || 'I had trouble generating a response. Please try again.'

  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message)
    
    // Return a fallback message on API error
    if (userMessage === 'START_LESSON') {
      return `Welcome! Let's dive into this topic.

I'm having some trouble connecting to the AI service right now, but don't let that stop you!

Start by thinking about the problem and try writing some code. Share your approach and I'll do my best to help.`
    }
    
    return `I received your message but I'm having trouble processing it right now. 

Please try again in a moment, or continue working on the task and share your code when you're ready.`
  }
}

export default router
