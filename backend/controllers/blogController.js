import supabase from '../config/database.js'

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const { status, limit = 50, offset = 0, search } = req.query

    let query = supabase
      .from('blogs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,body.ilike.%${search}%`)
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
      message: 'Failed to fetch blogs',
      error: error.message
    })
  }
}

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    res.json({
      success: true,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
      error: error.message
    })
  }
}

// Create new blog
export const createBlog = async (req, res) => {
  try {
    const { title, body, image, meta_title, meta_description, meta_keywords, slug, status } = req.body

    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          title,
          body,
          image,
          meta_title: meta_title || title,
          meta_description: meta_description || body.substring(0, 160),
          meta_keywords: meta_keywords || [],
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          status: status || 'draft',
          created_by: req.user.id
        }
      ])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create blog',
      error: error.message
    })
  }
}

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params
    const { title, body, image, meta_title, meta_description, meta_keywords, slug, status } = req.body

    const updateData = {}
    if (title !== undefined) updateData.title = title
    if (body !== undefined) updateData.body = body
    if (image !== undefined) updateData.image = image
    if (meta_title !== undefined) updateData.meta_title = meta_title
    if (meta_description !== undefined) updateData.meta_description = meta_description
    if (meta_keywords !== undefined) updateData.meta_keywords = meta_keywords
    if (slug !== undefined) updateData.slug = slug
    if (status !== undefined) updateData.status = status
    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('blogs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update blog',
      error: error.message
    })
  }
}

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    if (error) throw error

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog',
      error: error.message
    })
  }
}
