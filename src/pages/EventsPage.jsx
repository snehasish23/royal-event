import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendar, FaArrowLeft, FaTags } from 'react-icons/fa'
import { eventService } from '../services'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getAllEvents({ status: 'published', limit: 100 })
        if (response.success) {
          setEvents(response.data)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.category === filter)

  const categories = ['all', 'wedding', 'corporate', 'cultural', 'birthday', 'other']

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar scrolled={scrolled} />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-maroon via-pink to-orange">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="font-cinzel font-bold text-5xl md:text-6xl mb-6">
              Our Events
            </h1>
            <p className="text-ivory text-xl font-nunito max-w-2xl mx-auto">
              Explore our portfolio of unforgettable celebrations
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-maroon font-montserrat font-semibold hover:text-royal-gold transition-colors mb-8"
          >
            <FaArrowLeft /> Back to Home
          </Link>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full font-montserrat font-semibold capitalize transition-all ${
                  filter === cat
                    ? 'bg-gradient-to-r from-maroon to-pink text-white shadow-lg'
                    : 'bg-white text-maroon border-2 border-maroon hover:bg-maroon/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No events found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                >
                  {event.images && event.images[0] && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={event.images[0]}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-maroon/10 text-maroon px-3 py-1 rounded-full text-xs font-semibold capitalize">
                        {event.category}
                      </span>
                      {event.event_date && (
                        <span className="text-xs text-gray-600 flex items-center gap-1">
                          <FaCalendar className="text-royal-gold" />
                          {new Date(event.event_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <h3 className="font-cinzel font-bold text-xl text-maroon mb-3 group-hover:text-royal-gold transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 font-nunito text-sm leading-relaxed mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    {event.tags && event.tags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <FaTags className="text-royal-gold text-sm" />
                        {event.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-xs bg-royal-gold/10 text-gray-700 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="h-1 bg-gradient-to-r from-maroon via-pink to-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default EventsPage
