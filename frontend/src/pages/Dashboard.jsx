import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { curriculum, calculateProgress } from '../data/curriculum'
import { 
  ChevronRight, 
  User, 
  LogOut, 
  CheckCircle2, 
  Circle,
  BookOpen
} from 'lucide-react'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [expandedTopics, setExpandedTopics] = useState([])
  
  const progress = calculateProgress(user?.progress || {})

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  const isSubtopicCompleted = (topicId, subtopicId) => {
    return user?.progress?.[topicId]?.subtopics?.[subtopicId] || false
  }

  const isTopicCompleted = (topicId) => {
    const topic = curriculum.find(t => t.id === topicId)
    if (!topic) return false
    return topic.subtopics.every(sub => isSubtopicCompleted(topicId, sub.id))
  }

  const handleStartSubtopic = (topicId, subtopicId) => {
    navigate(`/learn/${topicId}/${subtopicId}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b border-[#e5e5e5] px-4 flex items-center justify-between">
        <h1 className="text-lg font-medium text-[#0d0d0d]">JavaScript Course</h1>
          
          <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0d0d0d] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-[#0d0d0d] hidden sm:block">{user?.name || user?.studentId}</span>
                </div>
                <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
            title="Sign out"
                >
            <LogOut className="w-4 h-4 text-[#6e6e6e]" />
                </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-[#6e6e6e] mb-2">
            <span>Progress</span>
            <span>{progress.overall}%</span>
          </div>
          <div className="w-full h-2 bg-[#e5e5e5] rounded-full">
        <motion.div
              className="h-full bg-[#0d0d0d] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress.overall}%` }}
              transition={{ duration: 0.5 }}
            />
              </div>
        </div>

        {/* Topics List */}
        <div className="space-y-2">
          {curriculum.map((topic, index) => {
            const topicCompleted = isTopicCompleted(topic.id)
            const topicProgress = progress.byTopic[topic.id] || { completed: 0, total: topic.subtopics.length }
            const isExpanded = expandedTopics.includes(topic.id)

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border border-[#e5e5e5] rounded-xl overflow-hidden"
              >
                {/* Topic Header */}
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={`w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-[#f9f9f9] ${topicCompleted ? 'bg-[#f9f9f9]' : 'bg-white'}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-[#0d0d0d]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#0d0d0d]">{topic.title}</p>
                    </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#6e6e6e]">
                        {topicProgress.completed}/{topicProgress.total}
                    </span>
                    {topicCompleted && (
                      <CheckCircle2 className="w-5 h-5 text-[#0d0d0d]" />
                    )}
                    <ChevronRight className={`w-5 h-5 text-[#6e6e6e] transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </button>

                {/* Subtopics List */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#e5e5e5] bg-[#f9f9f9]">
                        {topic.subtopics.map((subtopic) => {
                            const completed = isSubtopicCompleted(topic.id, subtopic.id)
                            
                            return (
                            <button
                                key={subtopic.id}
                              onClick={() => handleStartSubtopic(topic.id, subtopic.id)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#f0f0f0] transition-colors border-b border-[#e5e5e5] last:border-b-0"
                              >
                                {completed ? (
                                <CheckCircle2 className="w-5 h-5 text-[#0d0d0d] flex-shrink-0" />
                                ) : (
                                <Circle className="w-5 h-5 text-[#c5c5c5] flex-shrink-0" />
                                )}
                              <p className={`text-sm ${completed ? 'text-[#0d0d0d]' : 'text-[#6e6e6e]'}`}>
                                    {subtopic.title}
                                  </p>
                                </button>
                            )
                          })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
