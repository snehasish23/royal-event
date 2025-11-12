import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaQuoteLeft, FaArrowLeft, FaTrophy } from 'react-icons/fa'
import { successStoryService } from '../services'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SuccessStoriesPage = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await successStoryService.getAllSuccessStories({ limit: 100 })
        if (response.success) {
          setStories(response.data)
        }
      } catch (error) {
        console.error('Error fetching stories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar scrolled={scrolled} />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-emerald via-sapphire to-maroon">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <FaTrophy className="text-6xl text-royal-gold mx-auto mb-6" />
            <h1 className="font-cinzel font-bold text-5xl md:text-6xl mb-6">
              Success Stories
            </h1>
            <p className="text-ivory text-xl font-nunito max-w-2xl mx-auto">
              Real stories from our happy clients and unforgettable celebrations
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

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading success stories...</p>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No success stories available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story, index) => (
                <Link
                  key={story.id}
                  to={`/success-story/${story.id}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all h-full group"
                  >
                    {story.images && story.images[0] && (
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={story.images[0]}
                          alt={story.event_name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    )}

                    <div className="p-6">
                      {story.category && (
                        <span className="bg-emerald/10 text-emerald px-3 py-1 rounded-full text-xs font-semibold capitalize mb-3 inline-block">
                          {story.category}
                        </span>
                      )}

                      <h3 className="font-cinzel font-bold text-xl text-maroon mb-3 group-hover:text-royal-gold transition-colors">
                        {story.event_name}
                      </h3>

                      <div className="mb-4">
                        <p className="text-sm font-montserrat font-semibold text-sapphire mb-2">
                          {story.client_name}
                        </p>
                      </div>

                      {story.client_quote && (
                        <div className="bg-ivory/50 p-4 rounded-lg mb-4 relative">
                          <FaQuoteLeft className="text-royal-gold opacity-30 absolute top-2 left-2 text-2xl" />
                          <p className="text-gray-700 font-nunito text-sm italic pl-8 leading-relaxed line-clamp-3">
                            "{story.client_quote}"
                          </p>
                        </div>
                      )}

                      <div className="text-emerald font-semibold text-sm group-hover:translate-x-2 transition-transform">
                        Read Full Story →
                      </div>
                    </div>

                    <div className="h-1 bg-gradient-to-r from-emerald via-sapphire to-maroon"></div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default SuccessStoriesPage
