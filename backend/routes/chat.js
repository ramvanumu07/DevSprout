import express from 'express'
import axios from 'axios'
import { getTaskProgress, saveTaskProgress, saveChatHistory, getChatHistory } from '../services/taskDb.js'

const router = express.Router()

// System prompt for the AI tutor
const SYSTEM_PROMPT = `You are a JavaScript mentor. Your goal is DEEP UNDERSTANDING, not quick completion.

═══════════════════════════════════════════════════════════════
GOLDEN RULE: NEVER RUSH. MAKE THEM THINK.
═══════════════════════════════════════════════════════════════

【 TEACHING MODE 】 For each learning point:
1. Explain concept simply (2-3 sentences)
2. Show tiny code example (2-4 lines)
3. Ask a THINKING question - not just "what prints?"

GOOD questions:
- "In your own words, what does console.log do?"
- "Why do you think we need quotes around text but not numbers?"
- "What's the difference between console.log(5) and console.log('5')?"

BAD questions (too easy, just output guessing):
- "What will this print?" (they just guess the output)

When they answer:
- ONE-WORD ANSWERS ARE NOT ENOUGH. Ask follow-up: "Can you explain why?"
- If they just guess output correctly, ask: "Right! But WHY does that happen?"
- Don't move on until they EXPLAIN the concept, not just guess output

【 TASK MODE 】 This is where real learning happens:

BEFORE they write code:
- Ask: "How would you break this problem down?"
- Ask: "What steps do you need?"

WHEN they submit code:
- NEVER immediately say "correct" or "wrong"
- FIRST ask: "Walk me through your code. What does each line do?"
- Wait for their explanation

AFTER they explain:
- If logic is RIGHT: "Good thinking! Your code works because [brief validation]"
- If logic is WRONG but code works: "The code runs, but let's check your understanding. You said X, but actually Y happens. Can you trace through it again?"
- If code is WRONG: "Let's trace through together. What value does X have after line 1?"

EVEN WHEN CORRECT - push deeper:
- "What would happen if I changed 5 to 'five'?"
- "Is there another way to do this?"
- "What if we needed to print 10 messages - would you write 10 lines?"

【 PACE 】
- One concept per message
- One question per message
- Wait for real understanding, not just correct output
- It's okay to spend 3-4 exchanges on one learning point

【 STYLE 】
- Short messages (3-4 sentences + code)
- Warm but challenging
- "Good start, but..." instead of "Correct!"
- Always end with a thinking question

【 COMPLETION MARKERS 】
Only include TASK_COMPLETE when:
1. Code is correct AND
2. Student explained their logic AND
3. You asked at least one "what if" question

SUBTOPIC_COMPLETE only after ALL tasks done this way.`

// Curriculum data for context
const getCurriculumContext = (topicId, subtopicId, tasks, learningPoints = []) => {
  return `
═══════════════════════════════════════════════════════════════
LESSON: ${subtopicId}
═══════════════════════════════════════════════════════════════

【 LEARNING POINTS 】 Teach in order, one at a time:
${learningPoints.length > 0 ? learningPoints.map((lp, i) => `  ${i + 1}. ${lp}`).join('\n') : '  (Teach the concept basics)'}

【 TASKS 】 Only after ALL learning points understood:
${tasks.map((t, i) => `  ${i + 1}. ${t}`).join('\n')}

═══════════════════════════════════════════════════════════════
REMEMBER: DEPTH OVER SPEED
═══════════════════════════════════════════════════════════════
- Don't accept one-word answers. Ask "Why?" or "Explain more"
- For tasks: Make them explain their code BEFORE you confirm if it's right
- Ask "What if...?" questions even when they're correct
- It's better to spend 5 messages on one concept than rush through all of them`
}

// POST /api/chat - Main chat endpoint
router.post('/', async (req, res) => {
  try {
    const { studentId, topicId, subtopicId, message, action, history, learningPoints, tasks } = req.body

    // Get or initialize task progress
    let taskProgress = await getTaskProgress(studentId, topicId, subtopicId)
    
    if (!taskProgress) {
      taskProgress = { current: 1, completed: 0, total: 0 }
    }

    // Handle lesson start
    if (action === 'start_lesson') {
      // Reset progress for new lesson
      taskProgress = { current: 1, completed: 0, total: tasks?.length || 0 }
      await saveTaskProgress(studentId, topicId, subtopicId, taskProgress)
      
      // Clear chat history for fresh start
      await saveChatHistory(studentId, topicId, subtopicId, [])

      const welcomeMessage = await generateAIResponse(
        studentId,
        topicId,
        subtopicId,
        [],
        'START_LESSON',
        taskProgress,
        learningPoints || [],
        tasks || []
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
      taskProgress,
      learningPoints || [],
      tasks || []
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
async function generateAIResponse(studentId, topicId, subtopicId, history, userMessage, taskProgress, learningPoints = [], tasks = []) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY

  // If no API key, return a helpful fallback message
  if (!GROQ_API_KEY) {
    if (userMessage === 'START_LESSON') {
      return `Welcome! Let's learn this topic together, step by step.

Since the AI tutor isn't configured yet, I can't teach interactively.

**To enable the full AI tutor experience:**
1. Get a free API key from https://console.groq.com
2. Add it to your backend/.env file as GROQ_API_KEY

Once configured, I'll teach you each concept one at a time!`
    }
    return `Thanks for your response! 

Since the AI tutor isn't fully configured (missing GROQ_API_KEY), I can't provide detailed teaching right now.

**To enable AI tutoring:**
1. Get a free API key from https://console.groq.com
2. Add it to your backend/.env file as GROQ_API_KEY`
  }

  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'system', content: getCurriculumContext(topicId, subtopicId, tasks, learningPoints) }
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
        content: 'I want to start learning this topic. Please teach me the first learning point from the learningPoints list. Remember: ONE concept at a time, explain it simply, then ask me a question to check my understanding. Do NOT mention tasks yet.'
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
