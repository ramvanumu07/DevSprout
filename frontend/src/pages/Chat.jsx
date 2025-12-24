import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { getTopicById, getSubtopicById } from '../data/curriculum'
import api from '../config/api'
import { 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  Circle,
  RotateCcw,
  Menu,
  X,
  HelpCircle,
  BookOpen,
  Code,
  AlertCircle,
  Clock
} from 'lucide-react'

export default function Chat() {
  const { topicId, subtopicId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [lessonStarted, setLessonStarted] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [phase, setPhase] = useState('learning') // 'learning' or 'assignment'
  const [assignmentsCompleted, setAssignmentsCompleted] = useState(0)
  const [error, setError] = useState(null)
  const [rateLimitInfo, setRateLimitInfo] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const topic = getTopicById(topicId)
  const subtopic = getSubtopicById(topicId, subtopicId)

  const currentSubtopicIndex = topic?.subtopics?.findIndex(s => s.id === subtopicId) || 0
  const nextSubtopic = topic?.subtopics?.[currentSubtopicIndex + 1]
  const prevSubtopic = topic?.subtopics?.[currentSubtopicIndex - 1]

  // Load existing chat history when subtopic changes
  useEffect(() => {
    if (subtopic && user) {
      loadChatHistory()
    }
  }, [subtopicId, user?.id])

  const loadChatHistory = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await api.get(`/api/chat/history/${topicId}/${subtopicId}`)
      
      if (response.data.history && response.data.history.length > 0) {
        setMessages(response.data.history)
        setPhase(response.data.phase || 'learning')
        setAssignmentsCompleted(response.data.assignmentsCompleted || 0)
        setLessonStarted(true)
      } else {
        startLesson()
      }
    } catch (err) {
      console.error('Failed to load chat history:', err)
      if (err.response?.status === 403 && err.response?.data?.code === 'SUBSCRIPTION_REQUIRED') {
        navigate('/subscribe')
        return
      }
      startLesson()
    }
    setIsLoading(false)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const startLesson = async (isRestart = false) => {
    setLessonStarted(true)
    setMessages([])
    setPhase('learning')
    setAssignmentsCompleted(0)
    setError(null)
    if (!isRestart) setIsLoading(true)

    try {
      const response = await api.post('/api/chat', {
        topicId,
        subtopicId,
        action: 'start_lesson',
        subtopicData: {
          title: subtopic?.title,
          concepts: subtopic?.concepts,
          prerequisites: subtopic?.prerequisites,
          teachingGoal: subtopic?.teachingGoal,
          tasks: subtopic?.tasks
        }
      })

      setMessages([{
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date().toISOString()
      }])
      
      setPhase(response.data.phase || 'learning')
      setRateLimitInfo(response.data.rateLimit)

    } catch (err) {
      handleApiError(err)
    }

    setIsLoading(false)
  }
  
  const restartLesson = () => {
    startLesson(true)
  }

  const handleApiError = (err) => {
    console.error('API Error:', err)
    
    if (err.response?.status === 429) {
      setError({
        type: 'rate_limit',
        message: err.response?.data?.message || 'Too many requests. Please wait a moment.',
        retryAfter: err.response?.data?.retryAfter
      })
      return
    }
    
    if (err.response?.status === 503) {
      setError({
        type: 'queue_full',
        message: 'Server is very busy. Please try again in a moment.'
      })
      return
    }
    
    if (err.response?.status === 403 && err.response?.data?.code === 'SUBSCRIPTION_REQUIRED') {
      navigate('/subscribe')
      return
    }
    
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: "I'm having trouble connecting. Please try again.",
      timestamp: new Date().toISOString()
    }])
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setError(null)
    
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    }])

    setIsLoading(true)

    try {
      const response = await api.post('/api/chat', {
        topicId,
        subtopicId,
        message: userMessage,
        subtopicData: {
          title: subtopic?.title,
          concepts: subtopic?.concepts,
          prerequisites: subtopic?.prerequisites,
          teachingGoal: subtopic?.teachingGoal,
          tasks: subtopic?.tasks
        }
      })

      // Handle phase transition
      if (response.data.phase && response.data.phase !== phase) {
        const newPhase = response.data.phase
        setPhase(newPhase)
        
        // Show phase transition message
        if (newPhase === 'assignment') {
          setMessages(prev => [...prev, {
            role: 'system',
            content: '📚 **Learning Phase Complete!** Now let\'s practice with some assignments.',
            timestamp: new Date().toISOString()
          }])
        }
      }

      // Handle assignment completion
      if (response.data.assignmentsCompleted > assignmentsCompleted) {
        setAssignmentsCompleted(response.data.assignmentsCompleted)
        setMessages(prev => [...prev, {
          role: 'system',
          content: `✅ **Assignment ${response.data.assignmentsCompleted} Complete!**`,
          timestamp: new Date().toISOString()
        }])
      }

      // Add AI response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date().toISOString()
      }])

      // Handle subtopic completion
      if (response.data.subtopicComplete) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'system',
            content: '🎉 **Lesson Complete!** You\'ve mastered this topic!',
            timestamp: new Date().toISOString()
          }])
        }, 500)
      }

      // Update rate limit info
      setRateLimitInfo(response.data.rateLimit)

    } catch (err) {
      handleApiError(err)
    }

    setIsLoading(false)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const navigateToSubtopic = (newSubtopicId) => {
    setLessonStarted(false)
    navigate(`/learn/${topicId}/${newSubtopicId}`)
  }

  if (!topic || !subtopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400">Topic not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800/80 backdrop-blur border-r border-slate-700/50 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
            <button 
              onClick={() => setShowSidebar(false)}
              className="lg:hidden p-1 hover:bg-slate-700 rounded"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Topic Title */}
          <div className="p-4 border-b border-slate-700/50">
            <span className="text-white font-medium">{topic.title}</span>
          </div>

          {/* Subtopics */}
          <div className="flex-1 overflow-y-auto p-2">
            {topic.subtopics.map((sub) => {
              const isCurrent = sub.id === subtopicId
              
              return (
                <button
                  key={sub.id}
                  onClick={() => navigateToSubtopic(sub.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                    isCurrent 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Circle className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{sub.title}</span>
                </button>
              )
            })}
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-slate-700/50">
            <button
              onClick={restartLesson}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 text-sm rounded-lg hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Restart Lesson
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-slate-700/50 px-4 flex items-center gap-4 bg-slate-800/30 backdrop-blur">
          <button 
            onClick={() => setShowSidebar(true)}
            className="lg:hidden p-2 hover:bg-slate-700/50 rounded-lg"
          >
            <Menu className="w-5 h-5 text-slate-300" />
          </button>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-medium truncate">{subtopic.title}</h1>
          </div>

          {/* Phase Indicator */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
            phase === 'learning' 
              ? 'bg-blue-500/20 text-blue-400' 
              : 'bg-purple-500/20 text-purple-400'
          }`}>
            {phase === 'learning' ? (
              <>
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Learning</span>
              </>
            ) : (
              <>
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">Practice</span>
              </>
            )}
          </div>

          {/* Help Button */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowHelp(true)}
              onMouseLeave={() => setShowHelp(false)}
              onClick={() => setShowHelp(!showHelp)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">How to run JS?</span>
            </button>
            
            {/* Help Tooltip */}
            <AnimatePresence>
              {showHelp && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 top-full mt-2 w-72 bg-slate-800 border border-slate-700 text-white rounded-xl p-4 shadow-xl z-50"
                  onMouseEnter={() => setShowHelp(true)}
                  onMouseLeave={() => setShowHelp(false)}
                >
                  <p className="font-medium mb-3">How to run JavaScript</p>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div>
                      <p className="text-white font-medium mb-1">1. Create a file</p>
                      <code className="block bg-slate-700 rounded px-2 py-1 text-xs">hello.js</code>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">2. Write your code</p>
                      <code className="block bg-slate-700 rounded px-2 py-1 text-xs">console.log("Hello!");</code>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">3. Run in terminal</p>
                      <code className="block bg-slate-700 rounded px-2 py-1 text-xs">node hello.js</code>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Error Banner */}
        {error && (
          <div className={`px-4 py-3 flex items-center gap-3 ${
            error.type === 'rate_limit' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {error.type === 'rate_limit' ? (
              <Clock className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm">{error.message}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto p-1 hover:bg-white/10 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 ${message.role === 'user' ? 'flex justify-end' : ''} ${message.role === 'system' ? 'flex justify-center' : ''}`}
                >
                  {message.role === 'system' ? (
                    <motion.div 
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className={`px-4 py-3 rounded-xl text-center text-sm font-medium ${
                        message.content.includes('Complete') 
                          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                          : 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                      }`}
                    >
                      <MessageContent content={message.content} />
                    </motion.div>
                  ) : (
                    <div className={`${message.role === 'user' ? 'max-w-[80%]' : 'w-full'}`}>
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            phase === 'learning' ? 'bg-blue-500' : 'bg-purple-500'
                          }`}>
                            {phase === 'learning' ? (
                              <BookOpen className="w-3 h-3 text-white" />
                            ) : (
                              <Code className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-sm text-slate-400">
                            {phase === 'learning' ? 'Mentor' : 'Reviewer'}
                          </span>
                        </div>
                      )}
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user' 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-slate-800/80 border border-slate-700/50 text-slate-200'
                      }`}>
                        {message.role === 'user' ? (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        ) : (
                          <MessageContent content={message.content} />
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  phase === 'learning' ? 'bg-blue-500' : 'bg-purple-500'
                }`}>
                  {phase === 'learning' ? (
                    <BookOpen className="w-3 h-3 text-white" />
                  ) : (
                    <Code className="w-3 h-3 text-white" />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-700/50 p-4 bg-slate-800/30 backdrop-blur">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your code or answer..."
                  rows={1}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                  style={{ minHeight: '48px', maxHeight: '200px' }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation & Rate Limit Info */}
            <div className="flex items-center justify-between mt-3 text-sm">
              <button
                onClick={() => prevSubtopic && navigateToSubtopic(prevSubtopic.id)}
                disabled={!prevSubtopic}
                className="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              
              {rateLimitInfo && (
                <span className="text-slate-500 text-xs">
                  {rateLimitInfo.remaining} requests remaining
                </span>
              )}
              
              <button
                onClick={() => nextSubtopic && navigateToSubtopic(nextSubtopic.id)}
                disabled={!nextSubtopic}
                className="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Message content renderer (dark theme)
function MessageContent({ content }) {
  const parseContent = (text) => {
    const lines = text.split('\n')
    const elements = []
    let inCodeBlock = false
    let codeContent = []
    let codeLanguage = ''

    lines.forEach((line, i) => {
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLanguage = line.slice(3).trim()
          codeContent = []
        } else {
          inCodeBlock = false
          elements.push(
            <div key={i} className="my-3 bg-slate-900/80 rounded-lg overflow-hidden border border-slate-700/50">
              {codeLanguage && (
                <div className="px-3 py-1 bg-slate-800 text-xs text-slate-400 border-b border-slate-700/50">
                  {codeLanguage}
                </div>
              )}
              <pre className="p-3 overflow-x-auto">
                <code className="text-sm text-emerald-400">
                  {codeContent.join('\n')}
                </code>
              </pre>
            </div>
          )
        }
        return
      }

      if (inCodeBlock) {
        codeContent.push(line)
        return
      }

      if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-xl font-semibold text-white mt-4 mb-2">{formatInline(line.slice(2))}</h1>)
        return
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-lg font-semibold text-white mt-3 mb-2">{formatInline(line.slice(3))}</h2>)
        return
      }
      if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-base font-semibold text-white mt-2 mb-1">{formatInline(line.slice(4))}</h3>)
        return
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <div key={i} className="flex items-start gap-2 my-1">
            <span className="text-slate-500 mt-1">•</span>
            <span className="text-slate-200">{formatInline(line.slice(2))}</span>
          </div>
        )
        return
      }
      const numberedMatch = line.match(/^(\d+)\.\s(.+)/)
      if (numberedMatch) {
        elements.push(
          <div key={i} className="flex items-start gap-2 my-1">
            <span className="text-slate-500 min-w-[1.5rem]">{numberedMatch[1]}.</span>
            <span className="text-slate-200">{formatInline(numberedMatch[2])}</span>
          </div>
        )
        return
      }
      if (line.trim() === '') {
        elements.push(<div key={i} className="h-2" />)
        return
      }
      elements.push(<p key={i} className="text-slate-200 my-1">{formatInline(line)}</p>)
    })

    return elements
  }

  const formatInline = (text) => {
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    text = text.replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-slate-700 border border-slate-600 rounded text-emerald-400 text-sm font-mono">$1</code>')
    return <span dangerouslySetInnerHTML={{ __html: text }} />
  }

  return <div className="prose prose-invert">{parseContent(content)}</div>
}
