import axios from 'axios'

// API configuration for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL || ''

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL
})

export default api
export { API_BASE_URL }
