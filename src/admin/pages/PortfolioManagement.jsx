import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaTrash, FaPlus, FaSave, FaUpload, FaEye } from 'react-icons/fa'
import { eventService } from '../../services'

const PortfolioManagement = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [newImageUrl, setNewImageUrl] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [])

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const res = await eventService.getAllEvents({ limit: 200 })
      setEvents(res.data || [])
    } catch (err) {
      showMessage('error', 'Failed to load portfolio images')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Please upload an image file')
      return
    }

    setUploadedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result)
      setNewImageUrl(reader.result) // Use base64 for now
    }
    reader.readAsDataURL(file)
  }

  // Flatten all event images for management
  const allImages = events.flatMap(evt =>
    (evt.images || []).map((url, idx) => ({
      eventId: evt.id,
      eventTitle: evt.title,
      url,
      index: idx,
      status: evt.status,
    }))
  )

  const removeImage = async (eventId, imageIndex) => {
    if (!confirm('Are you sure you want to remove this image?')) return
    
    try {
      setLoading(true)
      const evt = events.find(e => e.id === eventId)
      const updatedImages = (evt.images || []).filter((_, idx) => idx !== imageIndex)
      await eventService.updateEvent(eventId, { images: updatedImages })
      showMessage('success', 'Image removed from portfolio')
      fetchEvents()
    } catch (err) {
      showMessage('error', 'Failed to remove image')
    } finally {
      setLoading(false)
    }
  }

  const handlePreview = () => {
    if (!newImageUrl.trim() && !uploadedFile) {
      showMessage('error', 'Please provide an image URL or upload a file')
      return
    }
    setShowPreview(true)
  }

  const addImageAsPortfolioItem = async (e) => {
    e.preventDefault()
    if (!newImageUrl.trim()) {
      showMessage('error', 'Please provide an image URL or upload a file')
      return
    }
    try {
      setLoading(true)
      await eventService.createEvent({
        title: newTitle || 'Portfolio Image',
        description: 'Portfolio item',
        images: [newImageUrl.trim()],
        category: 'portfolio',
        tags: ['portfolio'],
        status: 'published'
      })
      setNewImageUrl('')
      setNewTitle('')
      setUploadedFile(null)
      setPreviewUrl('')
      setShowPreview(false)
      showMessage('success', 'Portfolio image added')
      fetchEvents()
    } catch (err) {
      showMessage('error', err.message || 'Failed to add image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-cinzel font-bold text-3xl text-maroon">Portfolio Images</h1>
      </div>

      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3 rounded-lg mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {message.text}
        </motion.div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <h2 className="font-cinzel font-bold text-xl text-maroon mb-4">Add New Portfolio Image</h2>
        <form onSubmit={addImageAsPortfolioItem} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-maroon font-montserrat font-semibold mb-2">
                Image URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={newImageUrl}
                onChange={e => setNewImageUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-maroon font-montserrat font-semibold mb-2">
                Title (optional)
              </label>
              <input
                type="text"
                placeholder="Portfolio Image Title"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-maroon font-montserrat font-semibold mb-2">
              Or Upload Image
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-sapphire to-emerald text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
                  <FaUpload />
                  <span className="font-montserrat font-semibold">
                    {uploadedFile ? uploadedFile.name : 'Choose Image File'}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Note: For production, images should be uploaded to a cloud storage service (e.g., Supabase Storage, Cloudinary). 
              Currently using base64 encoding for demo purposes.
            </p>
          </div>

          {(previewUrl || newImageUrl) && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-montserrat font-semibold text-maroon mb-2">Preview</h3>
              <img 
                src={previewUrl || newImageUrl} 
                alt="Preview" 
                className="w-full max-w-md h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none'
                  showMessage('error', 'Invalid image URL')
                }}
              />
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handlePreview}
              className="flex items-center justify-center gap-2 bg-sapphire text-white font-montserrat font-bold px-6 py-3 rounded-full hover:shadow-xl"
            >
              <FaEye /> Preview
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-royal-gold to-orange text-maroon font-montserrat font-bold px-6 py-3 rounded-full hover:shadow-xl disabled:opacity-50"
            >
              <FaSave /> {loading ? 'Saving...' : 'Add to Portfolio'}
            </button>
          </div>
        </form>
      </div>

      <h2 className="font-cinzel font-bold text-2xl text-maroon mb-4">Current Portfolio Images</h2>
      {loading && allImages.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      ) : allImages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl">
          <p className="text-gray-600">No portfolio images yet. Add some above.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allImages.map((img, idx) => (
            <motion.div
              key={`${img.eventId}-${img.index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
            >
              <img src={img.url} alt={img.eventTitle} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-cinzel font-semibold text-maroon text-sm">{img.eventTitle}</p>
                    <p className="text-xs text-gray-500">Status: {img.status}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeImage(img.eventId, img.index)}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all text-sm font-semibold"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PortfolioManagement
