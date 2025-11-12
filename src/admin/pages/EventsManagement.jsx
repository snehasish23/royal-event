import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaImage, FaTimes, FaSave, FaUpload, FaEye } from 'react-icons/fa'
import { eventService } from '../../services'

const EventsManagement = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: '',
    event_date: '',
    category: 'wedding',
    tags: '',
    status: 'published'
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await eventService.getAllEvents({ limit: 100 })
      setEvents(response.data || [])
    } catch (error) {
      showMessage('error', 'Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Combine uploaded files (base64) with URLs
      let allImages = formData.images ? formData.images.split(',').map(url => url.trim()).filter(Boolean) : []
      
      // Add uploaded files as base64
      if (uploadedFiles.length > 0) {
        const base64Images = await Promise.all(
          uploadedFiles.map(file => {
            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result)
              reader.readAsDataURL(file)
            })
          })
        )
        allImages = [...allImages, ...base64Images]
      }

      const eventData = {
        title: formData.title,
        description: formData.description,
        images: allImages,
        event_date: formData.event_date || null,
        category: formData.category,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        status: formData.status
      }

      console.log('Submitting event data:', eventData)

      if (editingEvent) {
        await eventService.updateEvent(editingEvent.id, eventData)
        showMessage('success', 'Event updated successfully!')
      } else {
        await eventService.createEvent(eventData)
        showMessage('success', 'Event created successfully!')
      }

      setShowModal(false)
      setShowPreview(false)
      resetForm()
      fetchEvents()
    } catch (error) {
      console.error('Event save error:', error)
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors
          .map(err => `${err.field}: ${err.message}`)
          .join(', ')
        showMessage('error', `Validation failed: ${validationErrors}`)
      } else {
        const errorMsg = error.response?.data?.message || error.message || 'Failed to save event'
        showMessage('error', errorMsg)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      images: event.images?.join(', ') || '',
      event_date: event.event_date || '',
      category: event.category,
      tags: event.tags?.join(', ') || '',
      status: event.status
    })
    setUploadedFiles([])
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      setLoading(true)
      await eventService.deleteEvent(id)
      showMessage('success', 'Event deleted successfully!')
      fetchEvents()
    } catch (error) {
      showMessage('error', 'Failed to delete event')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      images: '',
      event_date: '',
      category: 'wedding',
      tags: '',
      status: 'published'
    })
    setEditingEvent(null)
    setUploadedFiles([])
    setShowPreview(false)
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || [])
    const imageFiles = files.filter(f => f.type.startsWith('image/'))
    
    if (imageFiles.length !== files.length) {
      showMessage('error', 'Only image files are allowed')
    }
    
    setUploadedFiles(prev => [...prev, ...imageFiles])
  }

  const removeUploadedFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-cinzel font-bold text-3xl text-maroon">Events Management</h1>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-maroon to-pink text-white px-6 py-3 rounded-full font-montserrat font-semibold hover:shadow-xl transition-all"
        >
          <FaPlus /> Create Event
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

      {/* Events List */}
      {loading && events.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              {event.images?.[0] && (
                <img
                  src={event.images[0]}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-cinzel font-bold text-xl text-maroon">{event.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-sapphire/10 text-sapphire px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  {event.event_date && (
                    <span className="text-xs bg-royal-gold/10 text-orange px-3 py-1 rounded-full">
                      {new Date(event.event_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="flex-1 flex items-center justify-center gap-2 bg-sapphire text-white px-4 py-2 rounded-lg hover:bg-sapphire/90 transition-all"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
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
                {editingEvent ? 'Edit Event' : 'Create Event'}
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

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  Images (comma-separated URLs)
                </label>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  Or Upload Images
                </label>
                <label className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-sapphire to-emerald text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
                    <FaUpload />
                    <span className="font-montserrat font-semibold">Upload Images</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeUploadedFile(idx)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Note: Images will be stored as base64. For production, use cloud storage (Supabase Storage, Cloudinary).
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-maroon font-montserrat font-semibold mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate</option>
                    <option value="cultural">Cultural</option>
                    <option value="birthday">Birthday</option>
                    <option value="other">Other</option>
                  </select>
                </div>

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
              </div>

              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="luxury, traditional, outdoor"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                />
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

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center justify-center gap-2 bg-sapphire text-white px-6 py-3 rounded-full font-montserrat font-bold hover:shadow-lg transition-all"
                >
                  <FaEye /> {showPreview ? 'Hide Preview' : 'Preview'}
                </button>
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
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-maroon to-pink text-white py-3 rounded-full font-montserrat font-bold hover:shadow-xl transition-all disabled:opacity-50"
                >
                  <FaSave /> {loading ? 'Saving...' : 'Save Event'}
                </button>
              </div>

              {/* Preview Section */}
              {showPreview && (
                <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-cinzel font-bold text-xl text-maroon mb-4">Preview</h3>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {(formData.images || uploadedFiles.length > 0) && (
                      <div className="h-48 bg-gray-200 relative">
                        {formData.images.split(',')[0]?.trim() && (
                          <img
                            src={formData.images.split(',')[0].trim()}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-cinzel font-bold text-xl text-maroon">{formData.title || 'Event Title'}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          formData.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {formData.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{formData.description || 'Event description will appear here...'}</p>
                      <div className="flex gap-2 mb-4">
                        <span className="text-xs bg-sapphire/10 text-sapphire px-3 py-1 rounded-full">
                          {formData.category}
                        </span>
                        {formData.event_date && (
                          <span className="text-xs bg-royal-gold/10 text-orange px-3 py-1 rounded-full">
                            {new Date(formData.event_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      {formData.tags && (
                        <div className="flex gap-2 flex-wrap">
                          {formData.tags.split(',').map((tag, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default EventsManagement
