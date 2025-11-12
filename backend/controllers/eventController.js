import supabase from '../config/database.js'

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const { category, status, limit = 50, offset = 0 } = req.query

    let query = supabase
      .from('events')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

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
      message: 'Failed to fetch events',
      error: error.message
    })
  }
}

// Get single event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      })
    }

    res.json({
      success: true,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event',
      error: error.message
    })
  }
}

// Create new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, images, event_date, category, tags, status } = req.body

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title,
          description,
          images: images || [],
          event_date,
          category,
          tags: tags || [],
          status: status || 'published',
          created_by: req.user.id
        }
      ])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message
    })
  }
}

// Update event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, images, event_date, category, tags, status } = req.body

    const updateData = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (images !== undefined) updateData.images = images
    if (event_date !== undefined) updateData.event_date = event_date
    if (category !== undefined) updateData.category = category
    if (tags !== undefined) updateData.tags = tags
    if (status !== undefined) updateData.status = status
    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      })
    }

    res.json({
      success: true,
      message: 'Event updated successfully',
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update event',
      error: error.message
    })
  }
}

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (error) throw error

    res.json({
      success: true,
      message: 'Event deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete event',
      error: error.message
    })
  }
}
