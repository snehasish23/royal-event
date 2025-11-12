import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      })
    }

    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}
