import express from 'express'
import { body } from 'express-validator'
import {
  getAllEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry
} from '../controllers/enquiryController.js'
import { adminAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validator.js'

const router = express.Router()

// Validation rules
const enquiryValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().matches(/^[0-9+\-\s()]{10,15}$/).withMessage('Valid phone number is required'),
  body('event_type').trim().notEmpty().withMessage('Event type is required'),
  body('message').optional().trim().isLength({ max: 1000 }).withMessage('Message must be max 1000 characters')
]

// Public route - anyone can submit enquiry
router.post('/', enquiryValidation, validate, createEnquiry)

// Admin routes
router.get('/', adminAuth, getAllEnquiries)
router.get('/:id', adminAuth, getEnquiryById)
router.put('/:id', adminAuth, updateEnquiry)
router.delete('/:id', adminAuth, deleteEnquiry)

export default router
