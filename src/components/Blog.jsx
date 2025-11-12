import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa'
import { blogService } from '../services'

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAllBlogs({ status: 'published', limit: 6 })
        if (response.success) {
          setBlogs(response.data)
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])


  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-ivory to-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl text-maroon mb-4">
            Latest Insights
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-royal-gold to-orange mx-auto mb-6"></div>
          <p className="text-sapphire text-lg font-nunito max-w-2xl mx-auto">
            Expert tips, trends, and inspiration for your perfect event
          </p>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No blogs available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-royal-gold text-maroon px-4 py-2 rounded-full text-sm font-montserrat font-bold">
                      {post.status}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-montserrat font-semibold text-maroon">
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="font-cinzel font-bold text-xl text-maroon mb-3 group-hover:text-royal-gold transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 font-nunito text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.body}
                  </p>

                  {/* Read More Link */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-maroon font-montserrat font-semibold hover:text-royal-gold transition-colors group"
                  >
                    Read More
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform text-sm" />
                  </Link>
                </div>

                {/* Hover Animation Border */}
                <div className="h-1 bg-gradient-to-r from-royal-gold via-orange to-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-sapphire to-emerald rounded-3xl p-8 md:p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-4">
              Stay Updated with Event Insights
            </h3>
            <p className="text-ivory font-nunito text-lg mb-8">
              Subscribe to our newsletter for exclusive tips, trends, and special offers
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full font-nunito text-gray-800 focus:outline-none focus:ring-4 focus:ring-royal-gold/50"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-royal-gold to-orange text-maroon px-8 py-4 rounded-full font-montserrat font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog
