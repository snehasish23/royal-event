import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { eventService } from '../services'

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [filter, setFilter] = useState('All')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'wedding', 'corporate', 'cultural', 'birthday', 'other']

  // Fetch events from backend
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

  // Fallback static images for demo
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
      category: 'wedding',
      title: 'Royal Wedding Ceremony',
    },
    {
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
      category: 'wedding',
      title: 'Mehendi Celebration',
    },
    {
      url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
      category: 'corporate',
      title: 'Corporate Conference',
    },
    {
      url: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800',
      category: 'other',
      title: 'Floral Decor Setup',
    },
    {
      url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
      category: 'other',
      title: 'Stage Decoration',
    },
    {
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      category: 'corporate',
      title: 'Product Launch Event',
    },
    {
      url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800',
      category: 'wedding',
      title: 'Bridal Photography',
    },
    {
      url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
      category: 'corporate',
      title: 'Business Networking',
    },
    {
      url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
      category: 'wedding',
      title: 'Reception Celebration',
    },
    {
      url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
      category: 'cultural',
      title: 'Live Music Performance',
    },
    {
      url: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800',
      category: 'other',
      title: 'Ambient Lighting',
    },
    {
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      category: 'corporate',
      title: 'Team Celebration',
    },
  ]

  // Combine backend events with static images
  const displayItems = [
    ...events.map(event => ({
      url: event.images?.[0] || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      category: event.category,
      title: event.title,
    })),
    ...images
  ]

  const filteredImages = filter === 'All' 
    ? displayItems 
    : displayItems.filter(img => img.category === filter)

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-ivory" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl text-maroon mb-4">
            Event Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-royal-gold to-orange mx-auto mb-6"></div>
          <p className="text-sapphire text-lg font-nunito max-w-2xl mx-auto">
            Glimpses of our beautifully executed events and celebrations
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-montserrat font-semibold transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-maroon to-pink text-white shadow-lg scale-105'
                  : 'bg-white text-maroon border-2 border-maroon hover:bg-maroon hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              layout
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square"
            >
              {/* Image */}
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-royal-gold text-maroon text-xs font-montserrat font-bold rounded-full mb-2">
                    {image.category}
                  </span>
                  <h3 className="font-cinzel font-bold text-white text-lg">
                    {image.title}
                  </h3>
                </div>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-5 h-5 text-maroon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-royal-gold transition-colors duration-300 rounded-2xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link 
            to="/events"
            className="bg-gradient-to-r from-maroon to-pink text-white px-10 py-4 rounded-full font-montserrat font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block"
          >
            View All Events
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery
