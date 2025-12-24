import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../config/api'

const AuthContext = createContext(null)

const TOKEN_KEY = 'devsprout_token'
const USER_KEY = 'devsprout_user'

function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function setStoredToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

function clearStoredAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Set up axios interceptor for auth token
  useEffect(() => {
    const token = getStoredToken()
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    const interceptor = api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401 || 
            (error.response?.status === 403 && error.response?.data?.code !== 'ACCESS_REQUIRED' && error.response?.data?.code !== 'ACCESS_EXPIRED')) {
          clearStoredAuth()
          setUser(null)
          delete api.defaults.headers.common['Authorization']
        }
        return Promise.reject(error)
      }
    )

    return () => api.interceptors.response.eject(interceptor)
  }, [])

  // Load user from localStorage and verify token on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getStoredToken()
      const savedUser = localStorage.getItem(USER_KEY)

      if (token && savedUser) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const response = await api.get('/api/auth/me')
          
          if (response.data.success) {
            const userData = response.data.user
            setUser(userData)
            localStorage.setItem(USER_KEY, JSON.stringify(userData))
          } else {
            clearStoredAuth()
          }
        } catch (e) {
          console.log('Token verification failed:', e.message)
          clearStoredAuth()
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  // Register new user
  const register = async (studentId, password, name, email) => {
    try {
      setError(null)
      const response = await api.post('/api/auth/register', { 
        studentId, 
        password, 
        name,
        email 
      })
      
      if (response.data.success) {
        const { user: userData, token } = response.data
        
        setStoredToken(token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        setUser(userData)
        localStorage.setItem(USER_KEY, JSON.stringify(userData))
        
        return { success: true, message: response.data.message }
      } else {
        return { success: false, error: response.data.message }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      setError(message)
      return { success: false, error: message }
    }
  }

  // Login with studentId and password
  const login = async (studentId, password) => {
    try {
      setError(null)
      const response = await api.post('/api/auth/login', { studentId, password })
      
      if (response.data.success) {
        const { user: userData, token } = response.data
        
        setStoredToken(token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        setUser(userData)
        localStorage.setItem(USER_KEY, JSON.stringify(userData))
        
        return { success: true }
      } else {
        return { success: false, error: response.data.message }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      setError(message)
      return { success: false, error: message }
    }
  }

  // Logout
  const logout = useCallback(() => {
    clearStoredAuth()
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    setError(null)
  }, [])

  // Refresh user data from server
  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get('/api/auth/me')
      if (response.data.success) {
        const userData = response.data.user
        setUser(userData)
        localStorage.setItem(USER_KEY, JSON.stringify(userData))
        return userData
      }
    } catch (error) {
      console.log('User refresh failed:', error.message)
    }
    return null
  }, [])

  // Check if user has access (paid)
  const hasAccess = useCallback(() => {
    return user?.hasAccess === true
  }, [user])

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      error,
      register,
      login, 
      logout,
      refreshUser,
      hasAccess,
      isAuthenticated: !!user,
      isAdmin: user?.isAdmin || false
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
