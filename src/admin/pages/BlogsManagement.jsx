import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaEye, FaUpload, FaImage } from 'react-icons/fa'
import { blogService } from '../../services'

const BlogsManagement = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [uploadingImage, setUploadingImage] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    image: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    status: 'published'
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await blogService.getAllBlogs({ limit: 100 })
      setBlogs(response.data || [])
    } catch (error) {
      showMessage('error', 'Failed to fetch blogs')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showMessage('error', 'Image size must be less than 5MB')
      return
    }

    setUploadingImage(true)
    try {
      // Convert to base64 for preview (in production, upload to storage service)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result })
        setUploadingImage(false)
      }
      reader.onerror = () => {
        showMessage('error', 'Failed to read image file')
        setUploadingImage(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      showMessage('error', 'Failed to upload image')
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const blogData = {
        ...formData,
        meta_keywords: formData.meta_keywords ? formData.meta_keywords.split(',').map(k => k.trim()) : [],
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      }

      let response
      if (editingBlog) {
        response = await blogService.updateBlog(editingBlog.id, blogData)
        showMessage('success', 'Blog updated successfully!')
      } else {
        response = await blogService.createBlog(blogData)
        showMessage('success', 'Blog created successfully!')
      }

      setShowModal(false)
      setShowPreview(false)
      resetForm()
      fetchBlogs()
    } catch (error) {
      console.error('Blog save error:', error)
      showMessage('error', error.message || 'Failed to save blog. Please check all required fields.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      body: blog.body,
      image: blog.image || '',
      slug: blog.slug,
      meta_title: blog.meta_title || '',
      meta_description: blog.meta_description || '',
      meta_keywords: blog.meta_keywords?.join(', ') || '',
      status: blog.status
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      setLoading(true)
      await blogService.deleteBlog(id)
      showMessage('success', 'Blog deleted successfully!')
      fetchBlogs()
    } catch (error) {
      showMessage('error', 'Failed to delete blog')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      body: '',
      image: '',
      slug: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      status: 'published'
    })
    setEditingBlog(null)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-cinzel font-bold text-3xl text-maroon">Blogs Management</h1>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-sapphire to-emerald text-white px-6 py-3 rounded-full font-montserrat font-semibold hover:shadow-xl transition-all"
        >
          <FaPlus /> Create Blog
        </button>
      </div>

      {/* Message */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg mb-4 ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Blogs List */}
      {loading && blogs.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sapphire mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-cinzel font-bold text-xl text-maroon flex-1">{blog.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ml-2 ${
                    blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {blog.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{blog.body}</p>
                <div className="text-xs text-gray-500 mb-4">
                  Slug: {blog.slug}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex-1 flex items-center justify-center gap-2 bg-sapphire text-white px-4 py-2 rounded-lg hover:bg-sapphire/90 transition-all"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-3xl w-full my-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-cinzel font-bold text-2xl text-maroon">
                {editingBlog ? 'Edit Blog' : 'Create Blog'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  resetForm()
                }}
                className="text-gray-500 hover:text-maroon"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  Body *
                </label>
                <textarea
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  required
                  rows="8"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  Featured Image
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg or upload below"
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                    />
                    <label className="flex items-center gap-2 bg-gradient-to-r from-royal-gold to-orange text-white px-6 py-3 rounded-xl cursor-pointer hover:shadow-lg transition-all">
                      <FaUpload />
                      <span className="font-semibold">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                  {uploadingImage && (
                    <p className="text-sm text-sapphire">Uploading image...</p>
                  )}
                  {formData.image && (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  URL Slug (auto-generated if empty)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="my-blog-post"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-cinzel font-bold text-lg text-maroon mb-3">SEO Fields</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-maroon font-montserrat font-semibold mb-2">
                      Meta Title (max 70 chars)
                    </label>
                    <input
                      type="text"
                      value={formData.meta_title}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      maxLength={70}
                      placeholder="SEO title for search engines"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-maroon font-montserrat font-semibold mb-2">
                      Meta Description (max 160 chars)
                    </label>
                    <textarea
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      maxLength={160}
                      rows="3"
                      placeholder="Brief description for search results"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-maroon font-montserrat font-semibold mb-2">
                      Meta Keywords (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.meta_keywords}
                      onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                      placeholder="event planning, wedding, kolkata"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-montserrat font-bold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-royal-gold to-orange text-white py-3 rounded-full font-montserrat font-bold hover:shadow-xl transition-all"
                >
                  <FaEye /> Preview
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-sapphire to-emerald text-white py-3 rounded-full font-montserrat font-bold hover:shadow-xl transition-all disabled:opacity-50"
                >
                  <FaSave /> {loading ? 'Saving...' : 'Save Blog'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-cinzel font-bold text-2xl text-maroon">
                Preview: {formData.title || 'Untitled Blog'}
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-maroon"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="prose max-w-none">
              {formData.image && (
                <img
                  src={formData.image}
                  alt={formData.title}
                  className="w-full h-96 object-cover rounded-xl mb-6"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Invalid+Image'
                  }}
                />
              )}
              
              <h1 className="font-cinzel font-bold text-4xl text-maroon mb-4">
                {formData.title || 'Untitled Blog'}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span className={`px-3 py-1 rounded-full font-semibold ${
                  formData.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {formData.status}
                </span>
                <span>Slug: {formData.slug || 'auto-generated'}</span>
              </div>

              <div className="font-nunito text-gray-800 leading-relaxed whitespace-pre-wrap">
                {formData.body || 'No content yet...'}
              </div>

              {formData.meta_keywords && (
                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-montserrat font-bold text-lg mb-2">Keywords:</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.meta_keywords.split(',').map((keyword, idx) => (
                      <span key={idx} className="bg-royal-gold/20 text-maroon px-3 py-1 rounded-full text-sm">
                        {keyword.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(formData.meta_title || formData.meta_description) && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-montserrat font-bold text-sm text-gray-700 mb-2">SEO Preview:</h3>
                  <div className="text-sm">
                    <p className="text-blue-600 font-semibold">{formData.meta_title || formData.title}</p>
                    <p className="text-gray-600">{formData.meta_description || formData.body?.substring(0, 160)}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-montserrat font-bold hover:bg-gray-300 transition-all"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setShowPreview(false)
                  // Form is still open in background
                }}
                className="flex-1 bg-gradient-to-r from-sapphire to-emerald text-white py-3 rounded-full font-montserrat font-bold hover:shadow-xl transition-all"
              >
                Continue Editing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default BlogsManagement
