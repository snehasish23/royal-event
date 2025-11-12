const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // GET request
  get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options })
  }

  // POST request
  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    })
  }

  // PUT request
  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    })
  }

  // DELETE request
  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options })
  }
}

export default new ApiService()
