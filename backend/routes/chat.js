import express from 'express'
import axios from 'axios'
import { authenticateToken, requireAccess } from './auth.js'
import {
  getChatHistory,
  addChatMessage,
  clearChatHistory,
  getProgress,
  upsertProgress,
  trackAIUsage,
  getAIUsageToday
} from '../services/supabase.js'
import { rateLimiter } from '../services/rateLimiter.js'
import { progressCache } from '../services/cache.js'

const router = express.Router()

// Learning Phase System Prompt
const LEARNING_PHASE_PROMPT = `You are an expert programming mentor teaching JavaScript to absolute beginners.

YOUR JOB: Guide the user to understanding through intelligent questioning.

CRITICAL RULES:
1. NEVER ask users to guess syntax, keywords, or commands they haven't seen.
   ❌ "What command would display output?"
   ✅ "Do you need a way to see what your code produces?"

2. Ask questions users CAN logically answer based on:
   - General reasoning (Do you need to see results?)
   - Previous concepts they learned (Remember variables?)
   - Observation (What happens when you run this?)
   - Experimentation (What if you change this value?)

3. When introducing NEW syntax/keywords:
   - First establish WHY it's needed through questions
   - Then SHOW it directly (don't make them guess)
   - Then ask questions about HOW it works and WHAT happens

4. ADAPT based on user responses:
   - If they say "I don't know" → you asked something they can't reason about, BACK UP
   - If they're confused → simplify, show an example, ask about the example
   - If they're getting it → go deeper, ask "what if" questions
   - If they're bored → move faster, challenge them more

5. The number of questions depends on:
   - How complex the concept is intrinsically
   - How well the user is grasping it
   - How much foundation they have from previous topics

Don't follow a formula. RESPOND TO THE USER.

YOU ARE A MENTOR, NOT A SCRIPT. Read how the user responds. Adapt. Guide them to discovery at THEIR pace.

When the learning phase is complete and user understands the concept, respond with LEARNING_PHASE_COMPLETE marker.

TONE: Calm, encouraging, mentor-like, patient but not verbose.`

// Assignment Phase System Prompt
const ASSIGNMENT_PHASE_PROMPT = `You are a strict but supportive code reviewer helping a JavaScript student complete assignments.

CORE PHILOSOPHY:
1. Never give direct solutions
2. Guide through hints and questions
3. Verify understanding, not just correct code
4. Push for clean, readable, efficient code

WHEN REVIEWING CODE:
1. First acknowledge what they did right
2. Point out issues as questions ("What happens if...?")
3. Ask them to explain their logic
4. If correct, ask "what if" variations
5. Only mark complete when they've shown understanding

EVALUATION CRITERIA:
- Code correctness
- Code readability
- Proper naming conventions
- No unnecessary complexity
- Student can explain their solution

When a task is completed correctly AND student explained their logic:
- Respond with ASSIGNMENT_COMPLETE marker

When ALL assignments are done:
- Respond with SUBTOPIC_COMPLETE marker

TONE: Slightly strict reviewer who wants the best for the student.`

// Get curriculum context for the AI
function getCurriculumContext(subtopicData, phase) {
  const { title, concepts, prerequisites, teachingGoal, tasks } = subtopicData || {}
  
  if (phase === 'learning') {
    return `
CURRENT LESSON: ${title || 'JavaScript Basics'}

CONCEPTS TO COVER:
${concepts ? concepts.map(c => `- ${c}`).join('\n') : '- General introduction'}

PREREQUISITES (what they should already know):
${prerequisites ? prerequisites.map(p => `- ${p}`).join('\n') : '- None'}

TEACHING GOAL:
${teachingGoal || 'User should understand the concept and be ready for practice'}

Remember: Guide through discovery, don't lecture. Adapt to their responses.`
  } else {
    return `
CURRENT LESSON: ${title || 'JavaScript Basics'}

ASSIGNMENTS:
${tasks ? tasks.map((t, i) => `${i + 1}. ${t}`).join('\n') : 'Complete the exercises'}

Guide them through ONE assignment at a time.
Don't reveal solutions - use hints and questions.
Verify they understand, not just that code works.`
  }
}

// POST /api/chat - Main chat endpoint
router.post('/', authenticateToken, requireAccess, async (req, res) => {
  try {
    const userId = req.user.userId
    const { topicId, subtopicId, message, action, subtopicData } = req.body

    // Check user's current rate limit status
    const userUsage = rateLimiter.getUserUsage(userId)
    if (!userUsage.canRequest) {
      return res.status(429).json({
        success: false,
        message: 'You\'re sending messages too fast. Please wait a moment.',
        code: 'USER_RATE_LIMITED',
        retryAfter: 60
      })
    }

    // Get current progress (with caching)
    let progress = progressCache.getProgress(userId, topicId, subtopicId)
    if (!progress) {
      progress = await getProgress(userId, topicId, subtopicId)
      if (progress) {
        progressCache.setProgress(userId, topicId, subtopicId, progress)
      }
    }
    
    if (!progress) {
      progress = {
        status: 'not_started',
        phase: 'learning',
        assignments_completed: 0
      }
    }

    // Handle lesson start
    if (action === 'start_lesson') {
      // Clear old chat history
      await clearChatHistory(userId, topicId, subtopicId)
      
      // Reset progress
      await upsertProgress(userId, topicId, subtopicId, {
        status: 'in_progress',
        phase: 'learning',
        assignments_completed: 0,
        started_at: new Date().toISOString()
      })
      
      // Invalidate cache
      progressCache.invalidateProgress(userId)

      // Generate welcome message with rate limiting
      const welcomeMessage = await generateAIResponseWithQueue(
        userId,
        [],
        'START_LESSON',
        'learning',
        subtopicData
      )

      // Save AI response to history
      await addChatMessage(userId, topicId, subtopicId, 'assistant', welcomeMessage, 'learning')

      return res.json({
        success: true,
        message: welcomeMessage,
        phase: 'learning',
        assignmentsCompleted: 0
      })
    }

    // Handle regular chat message
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      })
    }

    // Get chat history
    const history = await getChatHistory(userId, topicId, subtopicId)

    // Save user message
    await addChatMessage(userId, topicId, subtopicId, 'user', message, progress.phase)

    // Generate AI response with rate limiting queue
    const aiResponse = await generateAIResponseWithQueue(
      userId,
      history,
      message,
      progress.phase,
      subtopicData
    )

    // Process markers in response
    let responseMessage = aiResponse
    let newPhase = progress.phase
    let assignmentsCompleted = progress.assignments_completed || 0
    let subtopicComplete = false

    // Check for phase transition
    if (aiResponse.includes('LEARNING_PHASE_COMPLETE')) {
      newPhase = 'assignment'
      responseMessage = responseMessage.replace(/LEARNING_PHASE_COMPLETE/gi, '').trim()
      
      await upsertProgress(userId, topicId, subtopicId, { phase: 'assignment' })
      progressCache.invalidateProgress(userId)
    }

    // Check for assignment completion
    if (aiResponse.includes('ASSIGNMENT_COMPLETE')) {
      assignmentsCompleted += 1
      responseMessage = responseMessage.replace(/ASSIGNMENT_COMPLETE/gi, '').trim()
      
      await upsertProgress(userId, topicId, subtopicId, { 
        assignments_completed: assignmentsCompleted 
      })
      progressCache.invalidateProgress(userId)
    }

    // Check for subtopic completion
    if (aiResponse.includes('SUBTOPIC_COMPLETE')) {
      subtopicComplete = true
      responseMessage = responseMessage.replace(/SUBTOPIC_COMPLETE/gi, '').trim()
      
      await upsertProgress(userId, topicId, subtopicId, {
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      progressCache.invalidateProgress(userId)
    }

    // Save AI response
    await addChatMessage(userId, topicId, subtopicId, 'assistant', responseMessage, newPhase)

    // Get rate limit info for response
    const rateLimitInfo = rateLimiter.getMetrics()

    res.json({
      success: true,
      message: responseMessage,
      phase: newPhase,
      assignmentsCompleted,
      subtopicComplete,
      rateLimit: {
        remaining: rateLimitInfo.globalRPMLimit - rateLimitInfo.globalRPMUsed,
        queueSize: rateLimitInfo.currentQueueSize
      }
    })

  } catch (error) {
    console.error('Chat error:', error)
    
    // Handle specific errors
    if (error.message.includes('Queue is full')) {
      return res.status(503).json({
        success: false,
        message: 'Server is very busy. Please try again in a moment.',
        code: 'QUEUE_FULL'
      })
    }
    
    if (error.message.includes('timed out')) {
      return res.status(504).json({
        success: false,
        message: 'Request took too long. Please try again.',
        code: 'TIMEOUT'
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to process chat message'
    })
  }
})

// GET /api/chat/history/:topicId/:subtopicId
router.get('/history/:topicId/:subtopicId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const { topicId, subtopicId } = req.params

    const history = await getChatHistory(userId, topicId, subtopicId)
    const progress = await getProgress(userId, topicId, subtopicId)

    res.json({
      success: true,
      history: history.map(h => ({
        role: h.role,
        content: h.content,
        timestamp: h.created_at
      })),
      phase: progress?.phase || 'learning',
      assignmentsCompleted: progress?.assignments_completed || 0,
      status: progress?.status || 'not_started'
    })

  } catch (error) {
    console.error('Get history error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chat history'
    })
  }
})

// DELETE /api/chat/history/:topicId/:subtopicId - Reset chat for a subtopic
router.delete('/history/:topicId/:subtopicId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const { topicId, subtopicId } = req.params

    await clearChatHistory(userId, topicId, subtopicId)
    await upsertProgress(userId, topicId, subtopicId, {
      status: 'not_started',
      phase: 'learning',
      assignments_completed: 0,
      started_at: null,
      completed_at: null
    })
    
    progressCache.invalidateProgress(userId)

    res.json({
      success: true,
      message: 'Chat history cleared'
    })

  } catch (error) {
    console.error('Clear history error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to clear chat history'
    })
  }
})

// GET /api/chat/rate-limit - Get current rate limit status
router.get('/rate-limit', authenticateToken, (req, res) => {
  const userId = req.user.userId
  const userUsage = rateLimiter.getUserUsage(userId)
  const globalMetrics = rateLimiter.getMetrics()
  
  res.json({
    success: true,
    user: userUsage,
    global: {
      currentRPM: globalMetrics.globalRPMUsed,
      maxRPM: globalMetrics.globalRPMLimit,
      queueSize: globalMetrics.currentQueueSize,
      dailyUsed: globalMetrics.dailyUsed,
      dailyLimit: globalMetrics.dailyLimit
    }
  })
})

/**
 * Generate AI response with rate limiting queue
 */
async function generateAIResponseWithQueue(userId, history, userMessage, phase, subtopicData) {
  return rateLimiter.enqueue(userId, async () => {
    return generateAIResponse(userId, history, userMessage, phase, subtopicData)
  }, userMessage === 'START_LESSON' ? 1 : 5) // Higher priority for lesson starts
}

/**
 * Generate AI response using Groq
 */
async function generateAIResponse(userId, history, userMessage, phase, subtopicData) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY

  if (!GROQ_API_KEY) {
    return getNoApiKeyMessage(userMessage, phase)
  }

  try {
    // Select system prompt based on phase
    const systemPrompt = phase === 'learning' ? LEARNING_PHASE_PROMPT : ASSIGNMENT_PHASE_PROMPT
    const curriculumContext = getCurriculumContext(subtopicData || {}, phase)

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'system', content: curriculumContext }
    ]

    // Add conversation history (last 20 messages for context)
    const recentHistory = history.slice(-20)
    recentHistory.forEach(msg => {
      if (msg.role === 'user' || msg.role === 'assistant') {
        messages.push({ role: msg.role, content: msg.content })
      }
    })

    // Add current message
    if (userMessage === 'START_LESSON') {
      messages.push({
        role: 'user',
        content: 'I want to start learning this topic. Begin by introducing the concept.'
      })
    } else {
      messages.push({ role: 'user', content: userMessage })
    }

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.7,
        max_tokens: 1024
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      }
    )

    // Track usage
    const tokensUsed = response.data.usage?.total_tokens || 0
    await trackAIUsage(userId, tokensUsed)

    return response.data.choices[0]?.message?.content || 'I had trouble generating a response. Please try again.'

  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message)
    
    // Handle rate limit error from Groq
    if (error.response?.status === 429) {
      throw new Error('AI service is busy. Please wait a moment and try again.')
    }
    
    return getApiErrorMessage(phase)
  }
}

function getNoApiKeyMessage(userMessage, phase) {
  if (userMessage === 'START_LESSON') {
    return `Welcome! 🌱

I'm excited to help you learn JavaScript, but I'm not fully configured yet.

**To enable AI tutoring:**
1. Get a free API key from https://console.groq.com
2. Add it to your environment as GROQ_API_KEY
3. Restart the server

Once configured, I'll guide you through concepts step by step with personalized feedback!`
  }
  return `Thanks for your message! The AI tutor isn't configured yet (missing GROQ_API_KEY). Please set it up to continue learning.`
}

function getApiErrorMessage(phase) {
  return `I'm having trouble connecting right now. This might be due to high demand.

Please try again in a moment. Your progress is saved! 🌱`
}

export default router
