import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaQuoteLeft, FaTrophy, FaCalendar, FaUser } from 'react-icons/fa'
import { successStoryService } from '../services'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SuccessStoryDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [relatedStories, setRelatedStories] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await successStoryService.getSuccessStoryById(id)
        if (response.success) {
          setStory(response.data)
          // Fetch related stories
          const relatedResponse = await successStoryService.getAllSuccessStories({ 
            limit: 3 
          })
          if (relatedResponse.success) {
            setRelatedStories(relatedResponse.data.filter(s => s.id !== parseInt(id)).slice(0, 3))
          }
        } else {
          navigate('/success-stories')
        }
      } catch (error) {
        console.error('Error fetching story:', error)
        navigate('/success-stories')
      } finally {
        setLoading(false)
      }
    }
    fetchStory()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald mx-auto mb-4"></div>
          <p className="text-gray-600">Loading success story...</p>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <FaTrophy className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-xl">Success story not found</p>
          <Link to="/success-stories" className="text-emerald hover:underline mt-4 inline-block">
            ← Back to Success Stories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar scrolled={scrolled} />
      
      {/* Hero Section with Featured Image */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-emerald via-sapphire to-maroon relative overflow-hidden">
        {story.images && story.images[0] && (
          <div className="absolute inset-0 opacity-20">
            <img 
              src={story.images[0]} 
              alt={story.event_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald via-sapphire to-maroon"></div>
          </div>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <Link
              to="/success-stories"
              className="inline-flex items-center gap-2 text-ivory hover:text-royal-gold transition-colors mb-6"
            >
              <FaArrowLeft /> Back to Success Stories
            </Link>
            
            <FaTrophy className="text-6xl text-royal-gold mx-auto mb-6" />
            
            {story.category && (
              <span className="inline-block bg-royal-gold text-maroon px-4 py-2 rounded-full text-sm font-montserrat font-bold mb-4">
                {story.category.toUpperCase()}
              </span>
            )}
            
            <h1 className="font-cinzel font-bold text-4xl md:text-6xl mb-6">
              {story.event_name}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-ivory/90 text-sm">
              <div className="flex items-center gap-2">
                <FaUser />
                <span>{story.client_name}</span>
              </div>
              {story.event_date && (
                <div className="flex items-center gap-2">
                  <FaCalendar />
                  <span>{new Date(story.event_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Images Gallery */}
            {story.images && story.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <div className={`grid ${story.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
                  {story.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`rounded-2xl overflow-hidden shadow-2xl ${story.images.length === 1 ? 'col-span-1' : ''}`}
                    >
                      <img 
                        src={image} 
                        alt={`${story.event_name} - ${index + 1}`}
                        className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Client Quote */}
            {story.client_quote && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-emerald/10 to-sapphire/10 rounded-2xl p-8 md:p-12 mb-12 relative"
              >
                <FaQuoteLeft className="text-6xl text-royal-gold opacity-20 absolute top-8 left-8" />
                <div className="relative z-10 pl-12">
                  <p className="text-gray-800 text-xl md:text-2xl font-nunito italic leading-relaxed mb-6">
                    "{story.client_quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald to-sapphire rounded-full flex items-center justify-center text-white font-bold">
                      {story.client_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-montserrat font-bold text-maroon">{story.client_name}</p>
                      <p className="text-sm text-gray-600">Happy Client</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Outcome */}
            {story.outcome && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg mb-12"
              >
                <h2 className="font-cinzel font-bold text-3xl text-maroon mb-6 flex items-center gap-3">
                  <FaTrophy className="text-royal-gold" />
                  Event Outcome
                </h2>
                <p className="text-gray-700 text-lg font-nunito leading-relaxed">
                  {story.outcome}
                </p>
              </motion.div>
            )}

            {/* Related Stories */}
            {relatedStories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16"
              >
                <h2 className="font-cinzel font-bold text-3xl text-maroon mb-8 text-center">
                  More Success Stories
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedStories.map((relatedStory) => (
                    <Link
                      key={relatedStory.id}
                      to={`/success-story/${relatedStory.id}`}
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                    >
                      {relatedStory.images && relatedStory.images[0] && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={relatedStory.images[0]}
                            alt={relatedStory.event_name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800'
                            }}
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="font-cinzel font-bold text-lg text-maroon mb-2 group-hover:text-emerald transition-colors">
                          {relatedStory.event_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {relatedStory.client_name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default SuccessStoryDetailPage
