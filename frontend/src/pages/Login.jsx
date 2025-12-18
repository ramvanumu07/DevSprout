import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { GraduationCap, ArrowRight, AlertCircle } from 'lucide-react'

// Set this to your logo path, e.g., '/logo.png' or import it
const LOGO_URL = null // Change to '/logo.png' when you add your logo

export default function Login() {
  const [studentId, setStudentId] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(studentId, secretKey)
    
    if (!result.success) {
      setError(result.error)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0d0d0d] overflow-hidden"
          >
            {LOGO_URL ? (
              <img 
                src={LOGO_URL} 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            ) : (
              <GraduationCap className="w-10 h-10 text-white" />
            )}
          </motion.div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student ID Input */}
            <div>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
              placeholder="Student ID"
              className="w-full bg-white border border-[#c5c5c5] rounded-lg py-3 px-4 text-[#0d0d0d] placeholder:text-[#8e8e8e] focus:outline-none focus:border-[#0d0d0d] focus:ring-1 focus:ring-[#0d0d0d] transition-colors"
                  required
                />
            </div>

            {/* Secret Key Input */}
            <div>
                <input
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Secret Key"
              className="w-full bg-white border border-[#c5c5c5] rounded-lg py-3 px-4 text-[#0d0d0d] placeholder:text-[#8e8e8e] focus:outline-none focus:border-[#0d0d0d] focus:ring-1 focus:ring-[#0d0d0d] transition-colors"
                  required
                />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-red-600 text-sm py-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
          <button
              type="submit"
              disabled={isLoading}
            className="w-full bg-[#0d0d0d] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#2d2d2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
                </>
              )}
          </button>
          </form>
      </motion.div>
    </div>
  )
}
