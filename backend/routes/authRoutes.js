import express from 'express'
import { body } from 'express-validator'
import { login, register, getProfile } from '../controllers/authController.js'
import { auth } from '../middleware/auth.js'
import { validate } from '../middleware/validator.js'

const router = express.Router()

// Validation rules
const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]

const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
]

// Routes
router.post('/login', loginValidation, validate, login)
// Registration disabled for security - only direct database access allowed for admin creation
// router.post('/register', registerValidation, validate, register)
router.post('/register', auth, registerValidation, validate, register) // Requires existing admin token
router.get('/profile', auth, getProfile)

export default router
