import supabase from '../config/database.js'

// Get all enquiries
export const getAllEnquiries = async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query

    let query = supabase
      .from('enquiries')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error, count } = await query
      .range(offset, offset + limit - 1)

    if (error) throw error

    res.json({
      success: true,
      data,
      pagination: {
        total: count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries',
      error: error.message
    })
  }
}

// Get single enquiry by ID
export const getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      })
    }

    res.json({
      success: true,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry',
      error: error.message
    })
  }
}

// Create new enquiry (public endpoint)
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, event_type, event_date, guest_count, budget, message } = req.body

    const { data, error } = await supabase
      .from('enquiries')
      .insert([
        {
          name,
          email,
          phone,
          event_type,
          event_date,
          guest_count,
          budget,
          message,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. We will contact you soon!',
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry',
      error: error.message
    })
  }
}

// Update enquiry status (admin only)
export const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params
    const { status, notes } = req.body

    const updateData = {}
    if (status !== undefined) updateData.status = status
    if (notes !== undefined) updateData.notes = notes
    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('enquiries')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      })
    }

    res.json({
      success: true,
      message: 'Enquiry updated successfully',
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update enquiry',
      error: error.message
    })
  }
}

// Delete enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id)

    if (error) throw error

    res.json({
      success: true,
      message: 'Enquiry deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry',
      error: error.message
    })
  }
}
