import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import { testConnection } from './config/database.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

// Import routes
import authRoutes from './routes/authRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import enquiryRoutes from './routes/enquiryRoutes.js'
import successStoryRoutes from './routes/successStoryRoutes.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173']
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// Body parser middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Royal STAR Event Management API is running',
    timestamp: new Date().toISOString()
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/success-stories', successStoryRoutes)

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Royal STAR Event Management API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      events: '/api/events',
      blogs: '/api/blogs',
      enquiries: '/api/enquiries',
      successStories: '/api/success-stories',
      health: '/health'
    }
  })
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection()
    
    app.listen(PORT, () => {
      console.log(`\n🚀 Server is running on port ${PORT}`)
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`🔗 API URL: http://localhost:${PORT}`)
      console.log(`📖 API Documentation: http://localhost:${PORT}/`)
      console.log(`\n✨ Royal STAR Event Management Backend Ready!\n`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app
