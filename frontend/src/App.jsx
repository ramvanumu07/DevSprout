import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import { API_URL } from './config/api'

// Loading spinner component
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-slate-400 text-sm">Loading...</p>
      </div>
    </div>
  )
}

// No Access Screen
function NoAccessScreen() {
  const { user, logout } = useAuth()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m9.364-3.364A9 9 0 1112 3a9 9 0 017.364 11.636z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Access Required</h2>
        <p className="text-slate-400 mb-6">
          Hi {user?.name}! Your account is registered but not yet activated.
        </p>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-white mb-3">To get access:</h3>
          <ol className="text-left text-slate-400 space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-emerald-400">1.</span>
              Complete payment of ₹200
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-400">2.</span>
              Send payment screenshot to admin
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-400">3.</span>
              Admin will activate your access
            </li>
          </ol>
        </div>
        <p className="text-slate-500 text-sm mb-4">
          Your Student ID: <span className="text-emerald-400 font-mono">{user?.studentId}</span>
        </p>
        <button
          onClick={logout}
          className="text-slate-400 hover:text-white text-sm transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

// Protected route - requires authentication
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <LoadingScreen />
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Access required route - requires authentication + access
function AccessRoute({ children }) {
  const { user, loading, hasAccess } = useAuth()
  
  if (loading) {
    return <LoadingScreen />
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (!hasAccess()) {
    return <NoAccessScreen />
  }
  
  return children
}

function AppRoutes() {
  const { user } = useAuth()
  
  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      
      {/* Dashboard - shows no access prompt if not activated */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Chat/Learning - requires access */}
      <Route 
        path="/learn/:topicId/:subtopicId" 
        element={
          <AccessRoute>
            <Chat />
          </AccessRoute>
        } 
      />
      
      {/* Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

function App() {
  // Pre-warm the backend on app load
  useEffect(() => {
    fetch(`${API_URL}/health`).catch(() => {})
  }, [])

  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App
