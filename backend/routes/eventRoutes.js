import express from 'express'
import { body } from 'express-validator'
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js'
import { adminAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validator.js'

const router = express.Router()

// Validation rules
const eventValidation = [
  body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').isIn(['wedding', 'corporate', 'cultural', 'birthday', 'other', 'portfolio']).withMessage('Invalid category'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('event_date').optional({ checkFalsy: true }).isISO8601().withMessage('Invalid date format'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status')
]

// Public routes
router.get('/', getAllEvents)
router.get('/:id', getEventById)

// Admin routes
router.post('/', adminAuth, eventValidation, validate, createEvent)
router.put('/:id', adminAuth, updateEvent)
router.delete('/:id', adminAuth, deleteEvent)

export default router
