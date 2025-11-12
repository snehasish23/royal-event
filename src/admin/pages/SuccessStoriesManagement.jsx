import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaEye, FaUpload, FaQuoteLeft, FaStar } from 'react-icons/fa'
import { successStoryService } from '../../services'

const SuccessStoriesManagement = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [editingStory, setEditingStory] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [uploadingImage, setUploadingImage] = useState(false)
  const [formData, setFormData] = useState({
    event_name: '',
    client_name: '',
    client_quote: '',
    outcome: '',
    images: '',
    event_date: '',
    category: 'wedding',
    featured: false
  })

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      setLoading(true)
      const response = await successStoryService.getAllSuccessStories({ limit: 100 })
      setStories(response.data || [])
    } catch (error) {
      showMessage('error', 'Failed to fetch success stories')
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
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, images: reader.result })
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
      // Build story data with only required fields
      const storyData = {
        event_name: formData.event_name.trim(),
        client_name: formData.client_name.trim(),
        client_quote: formData.client_quote.trim(),
        category: formData.category || 'wedding',
        featured: formData.featured === true
      }

      // Add optional fields only if they have valid values
      if (formData.images && formData.images.trim()) {
        storyData.images = [formData.images.trim()]
      }
      
      if (formData.outcome && formData.outcome.trim().length >= 10) {
        storyData.outcome = formData.outcome.trim()
      }
      
      if (formData.event_date && formData.event_date.trim()) {
        storyData.event_date = formData.event_date.trim()
      }

      let response
      if (editingStory) {
        response = await successStoryService.updateSuccessStory(editingStory.id, storyData)
        showMessage('success', 'Success story updated successfully!')
      } else {
        response = await successStoryService.createSuccessStory(storyData)
        showMessage('success', 'Success story created successfully!')
      }

      setShowModal(false)
      setShowPreview(false)
      resetForm()
      fetchStories()
    } catch (error) {
      console.error('Story save error:', error)
      showMessage('error', error.message || 'Failed to save success story. Please check all required fields.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (story) => {
    setEditingStory(story)
    setFormData({
      event_name: story.event_name,
      client_name: story.client_name,
      client_quote: story.client_quote,
      outcome: story.outcome || '',
      images: story.images?.[0] || '',
      event_date: story.event_date || '',
      category: story.category || 'wedding',
      featured: story.featured || false
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this success story?')) return

    try {
      setLoading(true)
      await successStoryService.deleteSuccessStory(id)
      showMessage('success', 'Success story deleted successfully!')
      fetchStories()
    } catch (error) {
      showMessage('error', 'Failed to delete success story')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      event_name: '',
      client_name: '',
      client_quote: '',
      outcome: '',
      images: '',
      event_date: '',
      category: 'wedding',
      featured: false
    })
    setEditingStory(null)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-cinzel font-bold text-3xl text-maroon">Success Stories</h1>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald to-sapphire text-white px-6 py-3 rounded-full font-montserrat font-semibold hover:shadow-xl transition-all"
        >
          <FaPlus /> Add Success Story
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

      {/* Stories List */}
      {loading && stories.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading success stories...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              {story.images?.[0] && (
                <div className="relative">
                  <img
                    src={story.images[0]}
                    alt={story.event_name}
                    className="w-full h-48 object-cover"
                  />
                  {story.featured && (
                    <div className="absolute top-2 right-2 bg-royal-gold text-maroon px-3 py-1 rounded-full flex items-center gap-1 font-montserrat font-bold text-xs">
                      <FaStar /> Featured
                    </div>
                  )}
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-cinzel font-bold text-xl text-maroon flex-1">{story.event_name}</h3>
                </div>
                
                <div className="mb-3">
                  <span className="text-xs bg-emerald/10 text-emerald px-3 py-1 rounded-full">
                    {story.category}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  <strong>Client:</strong> {story.client_name}
                </p>

                {story.client_quote && (
                  <div className="bg-ivory/50 p-3 rounded-lg mb-3 relative">
                    <FaQuoteLeft className="text-royal-gold opacity-30 absolute top-2 left-2" />
                    <p className="text-sm text-gray-700 italic pl-6 line-clamp-3">
                      {story.client_quote}
                    </p>
                  </div>
                )}

                {story.outcome && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    <strong>Outcome:</strong> {story.outcome}
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(story)}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald text-white px-4 py-2 rounded-lg hover:bg-emerald/90 transition-all"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(story.id)}
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-cinzel font-bold text-2xl text-maroon">
                {editingStory ? 'Edit Success Story' : 'Add Success Story'}
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
                  Event Name *
                </label>
                <input
                  type="text"
                  value={formData.event_name}
                  onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  Client Quote *
                </label>
                <textarea
                  value={formData.client_quote}
                  onChange={(e) => setFormData({ ...formData, client_quote: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  Outcome Description
                </label>
                <textarea
                  value={formData.outcome}
                  onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                  rows="4"
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
                      value={formData.images}
                      onChange={(e) => setFormData({ ...formData, images: e.target.value })}
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
                  {formData.images && (
                    <div className="relative">
                      <img
                        src={formData.images}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, images: '' })}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-maroon font-montserrat font-semibold mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-maroon font-montserrat font-semibold mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate</option>
                    <option value="cultural">Cultural</option>
                    <option value="birthday">Birthday</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer bg-royal-gold/10 p-4 rounded-xl">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 text-emerald focus:ring-emerald rounded"
                  />
                  <div>
                    <span className="text-maroon font-montserrat font-semibold">
                      Feature on Homepage
                    </span>
                    <p className="text-sm text-gray-600">
                      Display this story in the homepage success stories section
                    </p>
                  </div>
                </label>
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
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald to-sapphire text-white py-3 rounded-full font-montserrat font-bold hover:shadow-xl transition-all disabled:opacity-50"
                >
                  <FaSave /> {loading ? 'Saving...' : 'Save Story'}
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
                Preview: {formData.event_name || 'Untitled Story'}
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-maroon"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="prose max-w-none">
              {formData.images && (
                <img
                  src={formData.images}
                  alt={formData.event_name}
                  className="w-full h-96 object-cover rounded-xl mb-6"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Invalid+Image'
                  }}
                />
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <h1 className="font-cinzel font-bold text-4xl text-maroon">
                  {formData.event_name || 'Untitled Story'}
                </h1>
                {formData.featured && (
                  <span className="bg-royal-gold text-maroon px-3 py-1 rounded-full flex items-center gap-1 font-montserrat font-bold text-sm">
                    <FaStar /> Featured
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span className="px-3 py-1 rounded-full bg-emerald/10 text-emerald font-semibold">
                  {formData.category}
                </span>
                {formData.event_date && <span>Event Date: {formData.event_date}</span>}
              </div>

              <div className="mb-6">
                <p className="text-gray-700"><strong>Client:</strong> {formData.client_name || 'N/A'}</p>
              </div>

              {formData.client_quote && (
                <div className="bg-ivory/50 p-6 rounded-xl mb-6 relative">
                  <FaQuoteLeft className="text-royal-gold opacity-30 absolute top-4 left-4 text-2xl" />
                  <p className="font-nunito text-gray-800 leading-relaxed italic pl-8">
                    {formData.client_quote}
                  </p>
                </div>
              )}

              {formData.outcome && (
                <div className="mt-6">
                  <h3 className="font-montserrat font-bold text-lg mb-2 text-maroon">Outcome:</h3>
                  <div className="font-nunito text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {formData.outcome}
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
                className="flex-1 bg-gradient-to-r from-emerald to-sapphire text-white py-3 rounded-full font-montserrat font-bold hover:shadow-xl transition-all"
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

export default SuccessStoriesManagement
