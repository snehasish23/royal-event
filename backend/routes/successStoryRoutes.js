import express from 'express'
import { body } from 'express-validator'
import {
  getAllSuccessStories,
  getSuccessStoryById,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory
} from '../controllers/successStoryController.js'
import { adminAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validator.js'

const router = express.Router()

// Validation rules
const successStoryValidation = [
  body('event_name').trim().isLength({ min: 3, max: 200 }).withMessage('Event name must be between 3 and 200 characters'),
  body('client_name').trim().isLength({ min: 2, max: 100 }).withMessage('Client name must be between 2 and 100 characters'),
  body('client_quote').trim().isLength({ min: 10 }).withMessage('Client quote must be at least 10 characters'),
  body('outcome').optional({ checkFalsy: true }).trim().isLength({ min: 10 }).withMessage('Outcome must be at least 10 characters if provided'),
  body('images').optional({ checkFalsy: true }).isArray().withMessage('Images must be an array'),
  body('event_date').optional({ checkFalsy: true }).isISO8601().withMessage('Event date must be a valid date'),
  body('category').optional({ checkFalsy: true }).isIn(['wedding', 'corporate', 'cultural', 'birthday', 'other']).withMessage('Invalid category'),
  body('featured').optional({ checkFalsy: true }).isBoolean().withMessage('Featured must be a boolean')
]

// Public routes
router.get('/', getAllSuccessStories)
router.get('/:id', getSuccessStoryById)

// Admin routes
router.post('/', adminAuth, successStoryValidation, validate, createSuccessStory)
router.put('/:id', adminAuth, updateSuccessStory)
router.delete('/:id', adminAuth, deleteSuccessStory)

export default router
