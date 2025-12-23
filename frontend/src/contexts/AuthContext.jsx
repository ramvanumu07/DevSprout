import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../config/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('edubridge_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        // Sync progress from server
        syncProgressFromServer(userData.studentId)
      } catch (e) {
        localStorage.removeItem('edubridge_user')
      }
    }
    setLoading(false)
  }, [])

  // Sync progress from server
  const syncProgressFromServer = async (studentId) => {
    if (!studentId) return
    
    try {
      setSyncing(true)
      const response = await api.post('/api/progress/sync', { studentId })
      
      if (response.data.success && response.data.progress) {
        setUser(prev => {
          if (!prev) return prev
          const updated = {
            ...prev,
            progress: response.data.progress,
            streak: response.data.streak || prev.streak,
            totalHours: response.data.totalHours || prev.totalHours
          }
          localStorage.setItem('edubridge_user', JSON.stringify(updated))
          return updated
        })
      }
    } catch (error) {
      console.log('Progress sync skipped:', error.message)
    } finally {
      setSyncing(false)
    }
  }

  const login = async (studentId, secretKey) => {
    try {
      const response = await api.post('/api/auth/login', {
        studentId,
        secretKey
      })
      
      if (response.data.success) {
        const userData = response.data.user
        setUser(userData)
        localStorage.setItem('edubridge_user', JSON.stringify(userData))
        return { success: true }
      } else {
        return { success: false, error: response.data.message }
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Connection error. Please try again.' 
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('edubridge_user')
  }

  // Update progress locally and sync to server
  const updateProgress = useCallback(async (topicId, subtopicId, completed, hoursSpent = 0) => {
    if (!user) return
    
    // Optimistic update
    const updatedProgress = { ...user.progress }
    if (!updatedProgress[topicId]) {
      updatedProgress[topicId] = { subtopics: {} }
    }
    updatedProgress[topicId].subtopics[subtopicId] = completed
    
    const updatedUser = { 
      ...user, 
      progress: updatedProgress,
      totalHours: (user.totalHours || 0) + hoursSpent
    }
    setUser(updatedUser)
    localStorage.setItem('edubridge_user', JSON.stringify(updatedUser))

    // Sync to server
    try {
      await api.post('/api/progress/update', {
        studentId: user.studentId,
        topicId,
        subtopicId,
        completed,
        hoursSpent
      })
    } catch (error) {
      console.log('Progress sync failed:', error.message)
    }
  }, [user])

  // Force sync with server
  const forceSync = useCallback(async () => {
    if (user?.studentId) {
      await syncProgressFromServer(user.studentId)
    }
  }, [user?.studentId])

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      syncing,
      updateProgress,
      forceSync
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
