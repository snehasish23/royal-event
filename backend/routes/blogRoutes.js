import express from 'express'
import { body } from 'express-validator'
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js'
import { adminAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validator.js'

const router = express.Router()

// Validation rules
const blogValidation = [
  body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('body').trim().isLength({ min: 50 }).withMessage('Body must be at least 50 characters'),
  body('image').optional({ checkFalsy: true }).custom((value) => {
    // Allow empty, valid URLs, or base64 images
    if (!value) return true
    if (value.startsWith('data:image/')) return true
    if (value.startsWith('http://') || value.startsWith('https://')) return true
    throw new Error('Image must be a valid URL or base64 image')
  }),
  body('meta_title').optional({ checkFalsy: true }).trim().isLength({ max: 70 }).withMessage('Meta title must be max 70 characters'),
  body('meta_description').optional({ checkFalsy: true }).trim().isLength({ max: 160 }).withMessage('Meta description must be max 160 characters'),
  body('meta_keywords').optional({ checkFalsy: true }).isArray().withMessage('Meta keywords must be an array')
]

// Public routes
router.get('/', getAllBlogs)
router.get('/:id', getBlogById)

// Admin routes
router.post('/', adminAuth, blogValidation, validate, createBlog)
router.put('/:id', adminAuth, updateBlog)
router.delete('/:id', adminAuth, deleteBlog)

export default router
