import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaCalendar, FaUsers, FaCheck, FaTimes } from 'react-icons/fa'
import { enquiryService } from '../../services'

const EnquiriesManagement = () => {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    try {
      setLoading(true)
      const response = await enquiryService.getAllEnquiries({ limit: 100 })
      setEnquiries(response.data || [])
    } catch (error) {
      showMessage('error', 'Failed to fetch enquiries')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      setLoading(true)
      await enquiryService.updateEnquiry(id, { status, notes })
      showMessage('success', 'Enquiry status updated!')
      fetchEnquiries()
      setSelectedEnquiry(null)
      setNotes('')
    } catch (error) {
      showMessage('error', 'Failed to update status')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return

    try {
      setLoading(true)
      await enquiryService.deleteEnquiry(id)
      showMessage('success', 'Enquiry deleted successfully!')
      fetchEnquiries()
    } catch (error) {
      showMessage('error', 'Failed to delete enquiry')
    } finally {
      setLoading(false)
    }
  }

  const filteredEnquiries = filter === 'all' 
    ? enquiries 
    : enquiries.filter(e => e.status === filter)

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      converted: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    }
    return colors[status] || colors.pending
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-cinzel font-bold text-3xl text-maroon">Enquiries Management</h1>
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

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'pending', 'contacted', 'in_progress', 'converted', 'closed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full font-montserrat font-semibold whitespace-nowrap transition-all ${
              filter === status
                ? 'bg-gradient-to-r from-maroon to-pink text-white'
                : 'bg-white text-maroon border-2 border-maroon'
            }`}
          >
            {status.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Enquiries List */}
      {loading && enquiries.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading enquiries...</p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl">
          <p className="text-gray-600">No enquiries found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enquiry) => (
            <motion.div
              key={enquiry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-[200px]">
                  <h3 className="font-cinzel font-bold text-xl text-maroon mb-2">
                    {enquiry.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-sapphire" />
                      <a href={`mailto:${enquiry.email}`} className="hover:text-maroon">
                        {enquiry.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-emerald" />
                      <a href={`tel:${enquiry.phone}`} className="hover:text-maroon">
                        {enquiry.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(enquiry.status)}`}>
                  {enquiry.status?.replace('_', ' ')}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-gray-700">Event Type:</span>
                  <span className="text-gray-600">{enquiry.event_type}</span>
                </div>
                {enquiry.event_date && (
                  <div className="flex items-center gap-2 text-sm">
                    <FaCalendar className="text-orange" />
                    <span className="text-gray-600">
                      {new Date(enquiry.event_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {enquiry.guest_count && (
                  <div className="flex items-center gap-2 text-sm">
                    <FaUsers className="text-pink" />
                    <span className="text-gray-600">{enquiry.guest_count} guests</span>
                  </div>
                )}
              </div>

              {enquiry.message && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{enquiry.message}</p>
                </div>
              )}

              {enquiry.notes && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-sapphire">
                  <p className="text-sm font-semibold text-sapphire mb-1">Admin Notes:</p>
                  <p className="text-sm text-gray-700">{enquiry.notes}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedEnquiry(enquiry)}
                  className="bg-sapphire text-white px-4 py-2 rounded-lg hover:bg-sapphire/90 transition-all text-sm font-semibold"
                >
                  Update Status
                </button>
                <button
                  onClick={() => handleDelete(enquiry.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all text-sm font-semibold"
                >
                  Delete
                </button>
                <span className="ml-auto text-xs text-gray-500">
                  Received: {new Date(enquiry.created_at).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Update Status Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <h2 className="font-cinzel font-bold text-2xl text-maroon mb-4">
              Update Enquiry Status
            </h2>
            <p className="text-gray-600 mb-4">
              <strong>{selectedEnquiry.name}</strong> - {selectedEnquiry.event_type}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  Status
                </label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, status: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-maroon font-montserrat font-semibold mb-2">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  placeholder="Add notes about this enquiry..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedEnquiry(null)
                    setNotes('')
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-montserrat font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedEnquiry.id, selectedEnquiry.status)}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-maroon to-pink text-white py-3 rounded-full font-montserrat font-bold disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default EnquiriesManagement
