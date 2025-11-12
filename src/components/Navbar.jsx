import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa'

const Navbar = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const navLinks = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'About', href: '#about', isRoute: false },
    { name: 'Services', href: '#services', isRoute: false },
    { name: 'Gallery', href: '#gallery', isRoute: false },
    { name: 'Pricing', href: '#pricing', isRoute: false },
    { name: 'Blogs', href: '/blogs', isRoute: true },
    { name: 'Events', href: '/events', isRoute: true },
    { name: 'Success Stories', href: '/success-stories', isRoute: true },
    { name: 'Contact', href: '#contact', isRoute: false },
  ]

  return (
    <>
      {/* Top contact bar - Always visible */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-maroon text-ivory py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-royal-gold transition-colors">
              <FaPhone className="text-xs" /> +91 98765 43210
            </a>
            <a href="mailto:info@royalstar.in" className="flex items-center gap-2 hover:text-royal-gold transition-colors">
              <FaEnvelope className="text-xs" /> info@royalstar.in
            </a>
          </div>
          <div className="text-xs hidden md:block">Kolkata's Premier Event Management</div>
        </div>
      </div>

      {/* Main navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'top-10 bg-white shadow-lg py-3'
            : 'top-10 bg-transparent py-5'
        }`}
      >

        <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-royal-gold to-orange rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-maroon font-cinzel font-bold text-xl">RS</span>
            </motion.div>
            <div>
              <h1 className={`font-cinzel font-bold text-xl ${scrolled ? 'text-maroon' : 'text-white'}`}>
                Royal STAR
              </h1>
              <p className={`text-xs ${scrolled ? 'text-sapphire' : 'text-royal-gold'}`}>
                Event Management
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.isRoute ? (
                  <Link
                    to={link.href}
                    className={`font-montserrat font-medium relative group ${scrolled ? 'text-gray-800' : 'text-white'}`}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-royal-gold to-orange group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ) : (
                  <a
                    href={isHomePage ? link.href : `/${link.href}`}
                    className={`font-montserrat font-medium relative group ${scrolled ? 'text-gray-800' : 'text-white'}`}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-royal-gold to-orange group-hover:w-full transition-all duration-300"></span>
                  </a>
                )}
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            className="hidden lg:block bg-gradient-to-r from-maroon to-pink text-white px-6 py-3 rounded-full font-montserrat font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Quote
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden text-2xl ${scrolled ? 'text-maroon' : 'text-white'}`}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <ul className="py-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-6 py-3 text-gray-800 font-montserrat hover:bg-royal-gold/20 hover:text-maroon transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={isHomePage ? link.href : `/${link.href}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-6 py-3 text-gray-800 font-montserrat hover:bg-royal-gold/20 hover:text-maroon transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
              <li className="px-6 py-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center bg-gradient-to-r from-maroon to-pink text-white px-6 py-3 rounded-full font-montserrat font-semibold"
                >
                  Get Quote
                </a>
              </li>
            </ul>
          </motion.div>
        )}
        </div>
      </motion.nav>
    </>
  )
}

export default Navbar
