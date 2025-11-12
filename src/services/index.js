import api from './api'

export const eventService = {
  // Get all events
  getAllEvents: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/events${queryString ? `?${queryString}` : ''}`)
  },

  // Get single event
  getEventById: async (id) => {
    return api.get(`/events/${id}`)
  },

  // Create event (admin)
  createEvent: async (eventData) => {
    return api.post('/events', eventData)
  },

  // Update event (admin)
  updateEvent: async (id, eventData) => {
    return api.put(`/events/${id}`, eventData)
  },

  // Delete event (admin)
  deleteEvent: async (id) => {
    return api.delete(`/events/${id}`)
  },
}

export const blogService = {
  // Get all blogs
  getAllBlogs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/blogs${queryString ? `?${queryString}` : ''}`)
  },

  // Get single blog
  getBlogById: async (id) => {
    return api.get(`/blogs/${id}`)
  },

  // Create blog (admin)
  createBlog: async (blogData) => {
    return api.post('/blogs', blogData)
  },

  // Update blog (admin)
  updateBlog: async (id, blogData) => {
    return api.put(`/blogs/${id}`, blogData)
  },

  // Delete blog (admin)
  deleteBlog: async (id) => {
    return api.delete(`/blogs/${id}`)
  },
}

export const enquiryService = {
  // Submit enquiry (public)
  submitEnquiry: async (enquiryData) => {
    return api.post('/enquiries', enquiryData)
  },

  // Get all enquiries (admin)
  getAllEnquiries: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/enquiries${queryString ? `?${queryString}` : ''}`)
  },

  // Update enquiry (admin)
  updateEnquiry: async (id, enquiryData) => {
    return api.put(`/enquiries/${id}`, enquiryData)
  },

  // Delete enquiry (admin)
  deleteEnquiry: async (id) => {
    return api.delete(`/enquiries/${id}`)
  },
}

export const successStoryService = {
  // Get all success stories
  getAllSuccessStories: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/success-stories${queryString ? `?${queryString}` : ''}`)
  },

  // Get single success story
  getSuccessStoryById: async (id) => {
    return api.get(`/success-stories/${id}`)
  },

  // Create success story (admin)
  createSuccessStory: async (storyData) => {
    return api.post('/success-stories', storyData)
  },

  // Update success story (admin)
  updateSuccessStory: async (id, storyData) => {
    return api.put(`/success-stories/${id}`, storyData)
  },

  // Delete success story (admin)
  deleteSuccessStory: async (id) => {
    return api.delete(`/success-stories/${id}`)
  },
}

export const authService = {
  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response
  },

  // Register
  register: async (email, password, name) => {
    const response = await api.post('/auth/register', { email, password, name })
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  // Get profile
  getProfile: async () => {
    return api.get('/auth/profile')
  },
}
