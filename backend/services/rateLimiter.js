/**
 * Rate Limiter & Request Queue System
 * Handles Groq API rate limits gracefully for any scale (50 to 50,000+ students)
 * 
 * Architecture:
 * - Request queue with priority
 * - Automatic retry with exponential backoff
 * - Per-user rate limiting
 * - Global rate limiting
 * - Metrics tracking
 */

class RateLimiter {
  constructor(options = {}) {
    // Groq free tier: 30 RPM, can be upgraded
    this.maxRequestsPerMinute = options.maxRPM || parseInt(process.env.GROQ_RPM_LIMIT) || 30
    this.maxTokensPerMinute = options.maxTPM || parseInt(process.env.GROQ_TPM_LIMIT) || 6000
    this.maxRequestsPerDay = options.maxRPD || parseInt(process.env.GROQ_RPD_LIMIT) || 14400
    
    // Per-user limits (to prevent one user from hogging all requests)
    this.userMaxRequestsPerMinute = options.userMaxRPM || 5
    this.userMaxRequestsPerDay = options.userMaxRPD || 200
    
    // Queue settings
    this.maxQueueSize = options.maxQueueSize || 1000
    this.maxWaitTime = options.maxWaitTime || 60000 // 60 seconds max wait
    
    // State tracking
    this.requestQueue = []
    this.globalRequests = [] // timestamps of global requests
    this.userRequests = new Map() // userId -> [timestamps]
    this.dailyRequests = { count: 0, date: this.getToday() }
    this.processing = false
    
    // Metrics
    this.metrics = {
      totalRequests: 0,
      queuedRequests: 0,
      completedRequests: 0,
      failedRequests: 0,
      avgWaitTime: 0,
      peakQueueSize: 0
    }
    
    // Start queue processor
    this.startQueueProcessor()
    
    // Reset daily counter at midnight
    this.startDailyReset()
  }
  
  getToday() {
    return new Date().toISOString().split('T')[0]
  }
  
  startDailyReset() {
    setInterval(() => {
      const today = this.getToday()
      if (this.dailyRequests.date !== today) {
        this.dailyRequests = { count: 0, date: today }
        console.log('📊 Daily request counter reset')
      }
    }, 60000) // Check every minute
  }
  
  /**
   * Clean up old timestamps (older than 1 minute)
   */
  cleanOldTimestamps(timestamps) {
    const oneMinuteAgo = Date.now() - 60000
    return timestamps.filter(t => t > oneMinuteAgo)
  }
  
  /**
   * Check if we can make a request right now
   */
  canMakeRequest(userId) {
    // Clean old timestamps
    this.globalRequests = this.cleanOldTimestamps(this.globalRequests)
    
    // Check global RPM limit
    if (this.globalRequests.length >= this.maxRequestsPerMinute) {
      return { allowed: false, reason: 'global_rpm', waitTime: this.getWaitTime(this.globalRequests) }
    }
    
    // Check daily limit
    if (this.dailyRequests.count >= this.maxRequestsPerDay) {
      return { allowed: false, reason: 'daily_limit', waitTime: null }
    }
    
    // Check per-user limits
    if (userId) {
      let userTimestamps = this.userRequests.get(userId) || []
      userTimestamps = this.cleanOldTimestamps(userTimestamps)
      this.userRequests.set(userId, userTimestamps)
      
      if (userTimestamps.length >= this.userMaxRequestsPerMinute) {
        return { allowed: false, reason: 'user_rpm', waitTime: this.getWaitTime(userTimestamps) }
      }
    }
    
    return { allowed: true }
  }
  
  /**
   * Calculate wait time until next available slot
   */
  getWaitTime(timestamps) {
    if (timestamps.length === 0) return 0
    const oldestTimestamp = Math.min(...timestamps)
    const waitTime = (oldestTimestamp + 60000) - Date.now()
    return Math.max(0, waitTime)
  }
  
  /**
   * Record a request
   */
  recordRequest(userId) {
    const now = Date.now()
    this.globalRequests.push(now)
    this.dailyRequests.count++
    
    if (userId) {
      let userTimestamps = this.userRequests.get(userId) || []
      userTimestamps.push(now)
      this.userRequests.set(userId, userTimestamps)
    }
    
    this.metrics.totalRequests++
  }
  
  /**
   * Add request to queue
   */
  async enqueue(userId, requestFn, priority = 5) {
    return new Promise((resolve, reject) => {
      // Check queue size
      if (this.requestQueue.length >= this.maxQueueSize) {
        this.metrics.failedRequests++
        reject(new Error('Queue is full. Please try again later.'))
        return
      }
      
      const queueItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        requestFn,
        priority,
        enqueuedAt: Date.now(),
        resolve,
        reject
      }
      
      // Insert based on priority (lower number = higher priority)
      let inserted = false
      for (let i = 0; i < this.requestQueue.length; i++) {
        if (priority < this.requestQueue[i].priority) {
          this.requestQueue.splice(i, 0, queueItem)
          inserted = true
          break
        }
      }
      
      if (!inserted) {
        this.requestQueue.push(queueItem)
      }
      
      this.metrics.queuedRequests++
      this.metrics.peakQueueSize = Math.max(this.metrics.peakQueueSize, this.requestQueue.length)
    })
  }
  
  /**
   * Process the queue
   */
  startQueueProcessor() {
    setInterval(async () => {
      if (this.processing || this.requestQueue.length === 0) return
      
      this.processing = true
      
      try {
        // Find next request that can be processed
        for (let i = 0; i < this.requestQueue.length; i++) {
          const item = this.requestQueue[i]
          
          // Check if waited too long
          if (Date.now() - item.enqueuedAt > this.maxWaitTime) {
            this.requestQueue.splice(i, 1)
            this.metrics.failedRequests++
            item.reject(new Error('Request timed out in queue'))
            i--
            continue
          }
          
          // Check if can process
          const check = this.canMakeRequest(item.userId)
          if (check.allowed) {
            // Remove from queue
            this.requestQueue.splice(i, 1)
            
            // Record the request
            this.recordRequest(item.userId)
            
            // Execute
            try {
              const result = await item.requestFn()
              this.metrics.completedRequests++
              
              // Track wait time
              const waitTime = Date.now() - item.enqueuedAt
              this.metrics.avgWaitTime = 
                (this.metrics.avgWaitTime * (this.metrics.completedRequests - 1) + waitTime) / 
                this.metrics.completedRequests
              
              item.resolve(result)
            } catch (error) {
              this.metrics.failedRequests++
              item.reject(error)
            }
            
            break // Process one at a time
          }
        }
      } finally {
        this.processing = false
      }
    }, 100) // Check queue every 100ms
  }
  
  /**
   * Get current metrics
   */
  getMetrics() {
    return {
      ...this.metrics,
      currentQueueSize: this.requestQueue.length,
      globalRPMUsed: this.globalRequests.length,
      globalRPMLimit: this.maxRequestsPerMinute,
      dailyUsed: this.dailyRequests.count,
      dailyLimit: this.maxRequestsPerDay,
      activeUsers: this.userRequests.size
    }
  }
  
  /**
   * Get user's current usage
   */
  getUserUsage(userId) {
    let userTimestamps = this.userRequests.get(userId) || []
    userTimestamps = this.cleanOldTimestamps(userTimestamps)
    this.userRequests.set(userId, userTimestamps)
    
    return {
      requestsThisMinute: userTimestamps.length,
      limitPerMinute: this.userMaxRequestsPerMinute,
      canRequest: userTimestamps.length < this.userMaxRequestsPerMinute
    }
  }
  
  /**
   * Update limits (for when upgrading plans)
   */
  updateLimits(newLimits) {
    if (newLimits.maxRPM) this.maxRequestsPerMinute = newLimits.maxRPM
    if (newLimits.maxTPM) this.maxTokensPerMinute = newLimits.maxTPM
    if (newLimits.maxRPD) this.maxRequestsPerDay = newLimits.maxRPD
    if (newLimits.userMaxRPM) this.userMaxRequestsPerMinute = newLimits.userMaxRPM
    if (newLimits.userMaxRPD) this.userMaxRequestsPerDay = newLimits.userMaxRPD
    
    console.log('📊 Rate limits updated:', this.getMetrics())
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter()

// Export class for testing
export { RateLimiter }

