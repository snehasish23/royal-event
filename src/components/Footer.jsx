import { motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const services = [
    'Wedding Planning',
    'Corporate Events',
    'Decor & Design',
    'Photography',
    'Catering Services',
    'Entertainment',
  ]

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { icon: FaFacebook, href: '#', color: 'hover:text-blue-600' },
    { icon: FaInstagram, href: '#', color: 'hover:text-pink-600' },
    { icon: FaTwitter, href: '#', color: 'hover:text-blue-400' },
    { icon: FaLinkedin, href: '#', color: 'hover:text-blue-700' },
    { icon: FaYoutube, href: '#', color: 'hover:text-red-600' },
  ]

  return (
    <footer className="bg-gradient-to-br from-maroon via-sapphire to-emerald text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-royal-gold to-orange rounded-full flex items-center justify-center">
                <span className="text-maroon font-cinzel font-bold text-2xl">RS</span>
              </div>
              <div>
                <h3 className="font-cinzel font-bold text-2xl text-royal-gold">Royal STAR</h3>
                <p className="text-xs text-ivory">Event Management</p>
              </div>
            </div>
            <p className="font-nunito text-ivory/90 leading-relaxed mb-6">
              Crafting unforgettable experiences and royal celebrations across Kolkata for over a decade.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center ${social.color} transition-colors duration-300`}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-cinzel font-bold text-xl text-royal-gold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="font-nunito text-ivory/90 hover:text-royal-gold transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-royal-gold rounded-full group-hover:scale-150 transition-transform"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-cinzel font-bold text-xl text-royal-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-nunito text-ivory/90 hover:text-royal-gold transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-royal-gold rounded-full group-hover:scale-150 transition-transform"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-cinzel font-bold text-xl text-royal-gold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-royal-gold mt-1 flex-shrink-0" />
                <span className="font-nunito text-ivory/90 text-sm">
                  123 Park Street, Kolkata - 700016, West Bengal, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-royal-gold flex-shrink-0" />
                <a href="tel:+919876543210" className="font-nunito text-ivory/90 hover:text-royal-gold transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-royal-gold flex-shrink-0" />
                <a href="mailto:info@royalstar.in" className="font-nunito text-ivory/90 hover:text-royal-gold transition-colors">
                  info@royalstar.in
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="font-nunito text-sm text-ivory/90 mb-3">Subscribe to our newsletter</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-royal-gold font-nunito text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-royal-gold to-orange text-maroon font-montserrat font-bold rounded-full hover:shadow-lg transition-all duration-300"
                >
                  →
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-nunito text-ivory/80 text-sm text-center md:text-left">
              © 2024 Royal STAR Event Management. All rights reserved.
            </p>
            <p className="font-nunito text-ivory/80 text-sm flex items-center gap-2">
              Made with <FaHeart className="text-pink animate-pulse" /> in Kolkata
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-nunito text-ivory/80 text-sm hover:text-royal-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-nunito text-ivory/80 text-sm hover:text-royal-gold transition-colors">
                Terms of Service
              </a>
              <a 
                href="/admin" 
                onClick={(e) => {
                  e.preventDefault()
                  window.history.pushState({}, '', '/admin')
                  window.dispatchEvent(new Event('navigate'))
                }}
                className="font-nunito text-ivory/80 text-sm hover:text-royal-gold transition-colors"
              >
                Admin Login
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.a
        href="#home"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-royal-gold to-orange rounded-full flex items-center justify-center shadow-2xl z-50 text-maroon font-bold text-xl"
      >
        ↑
      </motion.a>
    </footer>
  )
}

export default Footer
