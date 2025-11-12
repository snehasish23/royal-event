import supabase from '../config/database.js'

// Get all success stories
export const getAllSuccessStories = async (req, res) => {
  try {
    const { limit = 50, offset = 0, featured } = req.query

    let query = supabase
      .from('success_stories')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    // Filter by featured if specified
    if (featured !== undefined) {
      query = query.eq('featured', featured === 'true')
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1)

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
      message: 'Failed to fetch success stories',
      error: error.message
    })
  }
}

// Get single success story by ID
export const getSuccessStoryById = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Success story not found'
      })
    }

    res.json({
      success: true,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch success story',
      error: error.message
    })
  }
}

// Create new success story
export const createSuccessStory = async (req, res) => {
  try {
    console.log('=== CREATE SUCCESS STORY REQUEST ===')
    console.log('Request body:', JSON.stringify(req.body, null, 2))
    console.log('User:', req.user)
    console.log('====================================')

    const { event_name, client_name, client_quote, outcome, images, event_date, category, featured } = req.body

    // Validate required user
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
    }

    const insertData = {
      event_name,
      client_name,
      client_quote,
      images: images || [],
      category: category || 'wedding',
      featured: featured === true,
      created_by: req.user.id
    }

    // Only add optional fields if they exist
    if (outcome) insertData.outcome = outcome
    if (event_date) insertData.event_date = event_date

    console.log('Insert data:', JSON.stringify(insertData, null, 2))

    const { data, error } = await supabase
      .from('success_stories')
      .insert([insertData])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    console.log('Success! Created story:', data)

    res.status(201).json({
      success: true,
      message: 'Success story created successfully',
      data
    })
  } catch (error) {
    console.error('=== CREATE STORY ERROR ===')
    console.error('Error:', error)
    console.error('==========================')
    res.status(500).json({
      success: false,
      message: 'Failed to create success story',
      error: error.message
    })
  }
}

// Update success story
export const updateSuccessStory = async (req, res) => {
  try {
    const { id } = req.params
    const { event_name, client_name, client_quote, outcome, images, event_date, category, featured } = req.body

    const updateData = {}
    if (event_name !== undefined) updateData.event_name = event_name
    if (client_name !== undefined) updateData.client_name = client_name
    if (client_quote !== undefined) updateData.client_quote = client_quote
    if (outcome !== undefined) updateData.outcome = outcome
    if (images !== undefined) updateData.images = images
    if (event_date !== undefined) updateData.event_date = event_date
    if (category !== undefined) updateData.category = category
    if (featured !== undefined) updateData.featured = featured
    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('success_stories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Success story not found'
      })
    }

    res.json({
      success: true,
      message: 'Success story updated successfully',
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update success story',
      error: error.message
    })
  }
}

// Delete success story
export const deleteSuccessStory = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('success_stories')
      .delete()
      .eq('id', id)

    if (error) throw error

    res.json({
      success: true,
      message: 'Success story deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete success story',
      error: error.message
    })
  }
}
