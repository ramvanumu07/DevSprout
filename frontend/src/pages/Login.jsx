import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { Sprout, ArrowRight, AlertCircle, User, Lock, Mail, UserPlus } from 'lucide-react'

export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    let result
    if (isRegister) {
      if (!name.trim()) {
        setError('Name is required')
        setIsLoading(false)
        return
      }
      result = await register(studentId.trim(), password, name.trim(), email.trim())
      if (result.success) {
        setSuccess(result.message || 'Registration successful! Contact admin for access after payment.')
      }
    } else {
      result = await login(studentId.trim(), password)
    }
    
    if (!result.success) {
      setError(result.error)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25"
          >
            <Sprout className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="mt-4 text-2xl font-bold text-white">DevSprout</h1>
          <p className="text-slate-400 text-sm mt-1">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        {/* Login/Register Form */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input (Register only) */}
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block text-sm text-slate-400 mb-1.5">Full Name</label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {/* Student ID Input */}
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Student ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g., john123"
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email Input (Register only, optional) */}
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block text-sm text-slate-400 mb-1.5">Email (optional)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-2 text-emerald-400 text-sm py-3 px-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
              >
                <Sprout className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{success}</span>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-red-400 text-sm py-2 px-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Register/Login */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister)
                setError('')
                setSuccess('')
              }}
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              {isRegister ? (
                <>Already have an account? <span className="text-emerald-400">Sign in</span></>
              ) : (
                <>Don't have an account? <span className="text-emerald-400">Register</span></>
              )}
            </button>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-6 text-center text-slate-500 text-xs">
          <p>After registration, complete payment (₹200) and</p>
          <p>contact admin to activate your access.</p>
        </div>
      </motion.div>
    </div>
  )
}
