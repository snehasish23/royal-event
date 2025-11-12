import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendar, FaUser, FaArrowLeft, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { blogService } from '../services'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const BlogDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
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
    const fetchBlog = async () => {
      try {
        // Fetch blog by slug
        const response = await blogService.getAllBlogs({ limit: 100 })
        if (response.success) {
          const foundBlog = response.data.find(b => b.slug === slug)
          if (foundBlog) {
            setBlog(foundBlog)
            // Get related blogs
            const related = response.data.filter(b => b.id !== foundBlog.id).slice(0, 3)
            setRelatedBlogs(related)
          } else {
            navigate('/blogs')
          }
        }
      } catch (error) {
        console.error('Error fetching blog:', error)
        navigate('/blogs')
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [slug, navigate])

  const shareUrl = window.location.href

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon"></div>
      </div>
    )
  }

  if (!blog) {
    return null
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar scrolled={scrolled} />
      
      {/* Hero Section with Featured Image */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-4">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-maroon font-montserrat font-semibold hover:text-royal-gold transition-colors mb-8"
          >
            <FaArrowLeft /> Back to Blogs
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {blog.image && (
              <div className="relative h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-royal-gold" />
                  {new Date(blog.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                {blog.meta_keywords && blog.meta_keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.meta_keywords.map((keyword, idx) => (
                      <span key={idx} className="bg-royal-gold/10 text-maroon px-3 py-1 rounded-full text-xs font-semibold">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="font-cinzel font-bold text-4xl md:text-5xl text-maroon mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Description */}
              {blog.meta_description && (
                <p className="text-xl text-gray-700 font-nunito mb-8 leading-relaxed border-l-4 border-royal-gold pl-6 italic">
                  {blog.meta_description}
                </p>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-800 font-nunito text-lg leading-relaxed whitespace-pre-wrap">
                  {blog.body}
                </p>
              </div>

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-montserrat font-bold text-lg text-maroon mb-4">Share this article:</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <FaFacebook /> Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${blog.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-full hover:bg-sky-600 transition-colors"
                  >
                    <FaTwitter /> Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-colors"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                  <a
                    href={`https://wa.me/?text=${blog.title} ${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-cinzel font-bold text-3xl text-maroon mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  to={`/blog/${relatedBlog.slug}`}
                  className="group bg-ivory rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  {relatedBlog.image && (
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-cinzel font-bold text-lg text-maroon group-hover:text-royal-gold transition-colors mb-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedBlog.body}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default BlogDetailPage
