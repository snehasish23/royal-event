import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { successStoryService } from '../services'
import { FaQuoteLeft } from 'react-icons/fa'

const SuccessStories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        // Fetch only featured stories for homepage
        const res = await successStoryService.getAllSuccessStories({ featured: 'true', limit: 6 })
        if (res.success) setStories(res.data || [])
      } catch (err) {
        console.error('Failed to fetch success stories:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  if (stories.length === 0 && !loading) return null

  return (
    <section id="success-stories" className="py-20 bg-gradient-to-b from-white to-ivory" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl text-maroon mb-4">
            Recent Success Stories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-royal-gold to-orange mx-auto mb-6"></div>
          <p className="text-sapphire text-lg font-nunito max-w-2xl mx-auto">
            Featured client experiences and outcomes from our memorable events
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading stories...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story, idx) => (
                <Link
                  key={story.id}
                  to={`/success-story/${story.id}`}
                >
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full"
                  >
                    {story.images?.[0] && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={story.images[0]} 
                          alt={story.event_name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-emerald text-white px-4 py-2 rounded-full text-sm font-montserrat font-bold">
                            {story.category || 'Event'}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-cinzel font-bold text-xl text-maroon mb-3 group-hover:text-royal-gold transition-colors">
                        {story.event_name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong className="text-maroon">Client:</strong> {story.client_name}
                      </p>
                      {story.client_quote && (
                        <div className="bg-ivory/60 p-4 rounded-lg relative mb-3">
                          <FaQuoteLeft className="text-royal-gold opacity-30 absolute top-2 left-2" />
                          <p className="italic text-gray-700 text-sm pl-6 line-clamp-3">
                            "{story.client_quote}"
                          </p>
                        </div>
                      )}
                      <div className="text-emerald font-semibold text-sm group-hover:translate-x-2 transition-transform inline-block">
                        Read Full Story →
                      </div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-emerald via-sapphire to-royal-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </motion.article>
                </Link>
              ))}
            </div>
            
            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-12"
            >
              <Link 
                to="/success-stories"
                className="inline-block bg-gradient-to-r from-emerald to-sapphire text-white px-10 py-4 rounded-full font-montserrat font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                View All Success Stories
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

export default SuccessStories
