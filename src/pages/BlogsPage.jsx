import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendar, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { blogService } from '../services'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([])
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
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAllBlogs({ status: 'published', limit: 100 })
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
    <div className="min-h-screen bg-ivory">
      <Navbar scrolled={scrolled} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-sapphire via-maroon to-emerald">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="font-cinzel font-bold text-5xl md:text-6xl mb-6">
              Our Blog
            </h1>
            <p className="text-ivory text-xl font-nunito max-w-2xl mx-auto">
              Expert tips, trends, and inspiration for your perfect event
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blogs Grid */}
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
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-montserrat font-semibold text-maroon flex items-center gap-2">
                      <FaCalendar className="text-royal-gold" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-cinzel font-bold text-xl text-maroon mb-3 group-hover:text-royal-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 font-nunito text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.body}
                    </p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-maroon font-montserrat font-semibold hover:text-royal-gold transition-colors group"
                    >
                      Read More
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform text-sm" />
                    </Link>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-royal-gold via-orange to-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BlogsPage
