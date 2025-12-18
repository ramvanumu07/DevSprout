import express from 'express'
import axios from 'axios'
import { curriculum } from '../data/curriculum.js'

const router = express.Router()

// In-memory chat history store
const chatHistory = new Map()

// Get chat history key
const getHistoryKey = (studentId, topicId, subtopicId) => 
  `${studentId}:${topicId}:${subtopicId}`

// Get subtopic data from curriculum
const getSubtopicData = (topicId, subtopicId) => {
  const topic = curriculum.find(t => t.id === topicId)
  if (!topic) return null
  return topic.subtopics.find(s => s.id === subtopicId)
}

// GET /api/chat/history/:studentId/:topicId/:subtopicId
router.get('/history/:studentId/:topicId/:subtopicId', async (req, res) => {
  try {
    const { studentId, topicId, subtopicId } = req.params
    const key = getHistoryKey(studentId, topicId, subtopicId)
    const data = chatHistory.get(key)
    
    res.json({
      success: true,
      history: data?.messages || [],
      taskProgress: data?.taskProgress || { current: 1, completed: 0, total: 0 }
    })
  } catch (error) {
    console.error('Get history error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chat history'
    })
  }
})

// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const { studentId, topicId, subtopicId, message, action, history = [] } = req.body
    const subtopic = getSubtopicData(topicId, subtopicId)
    const key = getHistoryKey(studentId, topicId, subtopicId)
    
    // Starting a new lesson
    if (action === 'start_lesson') {
      const tasks = subtopic?.tasks || []
      const welcomeMessage = generateWelcomeMessage(subtopic)
      
      const taskProgress = { current: 1, completed: 0, total: tasks.length }
      
      // Store initial state
      chatHistory.set(key, {
        messages: [{ role: 'assistant', content: welcomeMessage, timestamp: new Date().toISOString() }],
        taskProgress
      })
      
      return res.json({
        success: true,
        message: welcomeMessage,
        taskProgress
      })
    }
    
    // Regular chat message
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      })
    }

    // Get or initialize session data
    let sessionData = chatHistory.get(key) || {
      messages: [],
      taskProgress: { current: 1, completed: 0, total: subtopic?.tasks?.length || 0 }
    }

    // Build context for AI
    const systemPrompt = buildSystemPrompt(subtopic, sessionData.taskProgress)
    
    // Call Groq API if configured
    let aiResponse = ''
    
    if (process.env.GROQ_API_KEY) {
      try {
        const groqResponse = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model: 'llama-3.1-8b-instant',
            messages: [
              { role: 'system', content: systemPrompt },
              ...history.slice(-10).map(m => ({ role: m.role, content: m.content })),
              { role: 'user', content: message }
            ],
            max_tokens: 1024,
            temperature: 0.7
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        )
        
        aiResponse = groqResponse.data.choices[0]?.message?.content || ''
      } catch (aiError) {
        console.error('Groq API error:', aiError.response?.data || aiError.message)
        aiResponse = getFallbackResponse(message, subtopic, sessionData.taskProgress)
      }
    } else {
      aiResponse = getFallbackResponse(message, subtopic, sessionData.taskProgress)
    }

    // Check for task completion
    const taskCompleted = checkTaskCompletion(message, aiResponse, subtopic, sessionData.taskProgress)
    
    if (taskCompleted) {
      sessionData.taskProgress.completed++
      sessionData.taskProgress.justCompleted = sessionData.taskProgress.current
      sessionData.taskProgress.current++
    } else {
      delete sessionData.taskProgress.justCompleted
    }

    const subtopicComplete = sessionData.taskProgress.completed >= sessionData.taskProgress.total && sessionData.taskProgress.total > 0

    // Update stored messages
    sessionData.messages.push(
      { role: 'user', content: message, timestamp: new Date().toISOString() },
      { role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() }
    )
    chatHistory.set(key, sessionData)

    res.json({
      success: true,
      message: aiResponse,
      taskProgress: sessionData.taskProgress,
      subtopicComplete
    })

  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to process message'
    })
  }
})

// Generate welcome message for a subtopic
function generateWelcomeMessage(subtopic) {
  if (!subtopic) {
    return "Welcome! Let's start learning. What would you like to know?"
  }
  
  const tasks = subtopic.tasks || []
  
  if (tasks.length > 0) {
    return `Hey! Let's learn **${subtopic.title}**.

**Tasks to complete:**
${tasks.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Let's start with **Task 1**. Write your code and explain your thinking!`
  }
  
  return `Hey! Let's learn **${subtopic.title}**.

Show me what you know or ask me anything!`
}

// Build system prompt for the AI
function buildSystemPrompt(subtopic, taskProgress) {
  const currentTask = subtopic?.tasks?.[taskProgress.current - 1] || null
  
  return `You are an expert JavaScript tutor for EduBridge, a learning platform. 
Be encouraging, patient, and give concise explanations.

Current lesson: ${subtopic?.title || 'General JavaScript'}
${currentTask ? `Current task: Task ${taskProgress.current} - ${currentTask}` : ''}
Progress: ${taskProgress.completed}/${taskProgress.total} tasks completed

Guidelines:
- Use simple language and examples
- When student shows code, evaluate if it completes the current task
- Give hints instead of full solutions when they struggle
- Use markdown for formatting (code blocks, bold, lists)
- Keep responses focused and under 200 words
- If the student completes a task correctly, acknowledge it and move to the next task
- Be encouraging and celebrate small wins`
}

// Fallback response when AI is not available
function getFallbackResponse(message, subtopic, taskProgress) {
  const currentTask = subtopic?.tasks?.[taskProgress.current - 1]
  
  // Simple keyword-based responses
  if (message.toLowerCase().includes('help')) {
    return `Here's a hint for **Task ${taskProgress.current}**: ${currentTask}

Think about what JavaScript concept you need to use. Try writing some code and I'll help you from there!`
  }
  
  if (message.includes('console.log') || message.includes('let ') || message.includes('const ')) {
    return `Nice work writing some code! 

I can see you're working on it. Keep going - you're on the right track! 

If you need a hint, just ask.`
  }
  
  return `Great question! I'm currently in demo mode without full AI capabilities.

For **Task ${taskProgress.current}**: ${currentTask || 'this exercise'}

Try writing some JavaScript code that accomplishes this task. Use \`console.log()\` to test your output!`
}

// Check if the user's response completes the current task
function checkTaskCompletion(userMessage, aiResponse, subtopic, taskProgress) {
  if (taskProgress.completed >= taskProgress.total) return false
  
  // Simple heuristic: if AI response contains positive completion indicators
  const completionIndicators = [
    'great job', 'well done', 'perfect', 'excellent', 'correct',
    'that\'s right', 'you got it', 'task complete', 'nicely done',
    '✅', '🎉', 'move on to task', 'next task'
  ]
  
  const lowerResponse = aiResponse.toLowerCase()
  return completionIndicators.some(indicator => lowerResponse.includes(indicator))
}

export default router
