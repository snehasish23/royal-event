import supabase from '../config/database.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists in admin table
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin.id, 
        email: admin.email, 
        role: 'admin' 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: 'admin'
        }
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    })
  }
}

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body

    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from('admins')
      .select('id')
      .eq('email', email)
      .single()

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create admin
    const { data, error } = await supabase
      .from('admins')
      .insert([
        { 
          email, 
          password_hash: passwordHash, 
          name 
        }
      ])
      .select()
      .single()

    if (error) {
      throw error
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: data.id, 
        email: data.email, 
        role: 'admin' 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        token,
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          role: 'admin'
        }
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    })
  }
}

export const getProfile = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('admins')
      .select('id, email, name, created_at')
      .eq('id', req.user.id)
      .single()

    if (error) {
      throw error
    }

    res.json({
      success: true,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    })
  }
}
