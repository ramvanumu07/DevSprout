/**
 * In-Memory Cache Service
 * Reduces database load by caching frequent queries
 * 
 * For 50,000+ students scale:
 * - Replace with Redis when needed
 * - Current implementation works for ~500 concurrent users
 * - Memory-efficient with automatic cleanup
 */

class CacheService {
  constructor(options = {}) {
    this.cache = new Map()
    this.defaultTTL = options.defaultTTL || 300000 // 5 minutes default
    this.maxSize = options.maxSize || 10000 // Max cached items
    this.cleanupInterval = options.cleanupInterval || 60000 // Cleanup every minute
    
    // Stats
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      evictions: 0
    }
    
    // Start cleanup interval
    this.startCleanup()
  }
  
  /**
   * Generate cache key from parts
   */
  key(...parts) {
    return parts.join(':')
  }
  
  /**
   * Get item from cache
   */
  get(key) {
    const item = this.cache.get(key)
    
    if (!item) {
      this.stats.misses++
      return null
    }
    
    // Check if expired
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key)
      this.stats.misses++
      return null
    }
    
    this.stats.hits++
    return item.value
  }
  
  /**
   * Set item in cache
   */
  set(key, value, ttl = this.defaultTTL) {
    // Evict if at max size
    if (this.cache.size >= this.maxSize) {
      this.evictOldest()
    }
    
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttl,
      createdAt: Date.now()
    })
    
    this.stats.sets++
    return true
  }
  
  /**
   * Delete item from cache
   */
  delete(key) {
    const deleted = this.cache.delete(key)
    if (deleted) this.stats.deletes++
    return deleted
  }
  
  /**
   * Delete items matching a pattern
   */
  deletePattern(pattern) {
    let count = 0
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key)
        count++
      }
    }
    this.stats.deletes += count
    return count
  }
  
  /**
   * Get or set (fetch if not cached)
   */
  async getOrSet(key, fetchFn, ttl = this.defaultTTL) {
    const cached = this.get(key)
    if (cached !== null) {
      return cached
    }
    
    const value = await fetchFn()
    this.set(key, value, ttl)
    return value
  }
  
  /**
   * Evict oldest items when at max capacity
   */
  evictOldest() {
    let oldest = { key: null, createdAt: Infinity }
    
    for (const [key, item] of this.cache.entries()) {
      if (item.createdAt < oldest.createdAt) {
        oldest = { key, createdAt: item.createdAt }
      }
    }
    
    if (oldest.key) {
      this.cache.delete(oldest.key)
      this.stats.evictions++
    }
  }
  
  /**
   * Clean up expired items
   */
  cleanup() {
    const now = Date.now()
    let cleaned = 0
    
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key)
        cleaned++
      }
    }
    
    return cleaned
  }
  
  /**
   * Start automatic cleanup
   */
  startCleanup() {
    setInterval(() => {
      const cleaned = this.cleanup()
      if (cleaned > 0) {
        console.log(`🧹 Cache cleanup: removed ${cleaned} expired items`)
      }
    }, this.cleanupInterval)
  }
  
  /**
   * Get cache statistics
   */
  getStats() {
    const hitRate = this.stats.hits + this.stats.misses > 0
      ? (this.stats.hits / (this.stats.hits + this.stats.misses) * 100).toFixed(2)
      : 0
    
    return {
      ...this.stats,
      hitRate: `${hitRate}%`,
      size: this.cache.size,
      maxSize: this.maxSize
    }
  }
  
  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear()
    console.log('🧹 Cache cleared')
  }
}

// Singleton instance with different namespaces
const cache = new CacheService()

// Helper functions for common cache operations
export const userCache = {
  getUser: (userId) => cache.get(cache.key('user', userId)),
  setUser: (userId, data) => cache.set(cache.key('user', userId), data, 300000), // 5 min
  invalidateUser: (userId) => cache.delete(cache.key('user', userId))
}

export const progressCache = {
  getProgress: (userId, topicId, subtopicId) => 
    cache.get(cache.key('progress', userId, topicId, subtopicId)),
  setProgress: (userId, topicId, subtopicId, data) => 
    cache.set(cache.key('progress', userId, topicId, subtopicId), data, 60000), // 1 min
  invalidateProgress: (userId) => 
    cache.deletePattern(cache.key('progress', userId))
}

export const subscriptionCache = {
  getSubscription: (userId) => cache.get(cache.key('subscription', userId)),
  setSubscription: (userId, data) => cache.set(cache.key('subscription', userId), data, 300000), // 5 min
  invalidateSubscription: (userId) => cache.delete(cache.key('subscription', userId))
}

export { cache, CacheService }

