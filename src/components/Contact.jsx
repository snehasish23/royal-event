import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaPaperPlane } from 'react-icons/fa'
import { enquiryService } from '../services'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event_type: '',
    event_date: '',
    guest_count: '',
    budget: '',
    message: '',
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await enquiryService.submitEnquiry(formData)
      
      if (response.success) {
        setSubmitSuccess(true)
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          event_type: '',
          event_date: '',
          guest_count: '',
          budget: '',
          message: '',
        })
        setCurrentStep(1)
        
        // Show success message
        alert('🎉 Thank you! Your enquiry has been submitted successfully. We will contact you soon!')
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error)
      alert('❌ Sorry, there was an error submitting your enquiry. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['+91 98765 43210', '+91 87654 32109'],
      color: 'from-pink to-maroon',
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['info@royalstar.in', 'events@royalstar.in'],
      color: 'from-sapphire to-emerald',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: ['Royal STAR Event Management', '123 Park Street, Kolkata - 700016'],
      color: 'from-royal-gold to-orange',
    },
    {
      icon: FaClock,
      title: 'Working Hours',
      details: ['Mon - Sat: 10:00 AM - 8:00 PM', 'Sunday: By Appointment'],
      color: 'from-emerald to-sapphire',
    },
  ]

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Event Details' },
    { number: 3, title: 'Additional Info' },
  ]

  return (
    <section id="contact" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl text-maroon mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-royal-gold to-orange mx-auto mb-6"></div>
          <p className="text-sapphire text-lg font-nunito max-w-2xl mx-auto">
            Let's start planning your dream event together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-ivory to-white rounded-3xl shadow-2xl p-8"
          >
            {/* Step Indicator */}
            <div className="flex justify-between mb-8">
              {steps.map((step) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-montserrat font-bold transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-r from-maroon to-pink text-white scale-110'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="ml-2 hidden md:block">
                    <div className={`text-sm font-montserrat font-semibold ${
                      currentStep >= step.number ? 'text-maroon' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {step.number < 3 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      currentStep > step.number ? 'bg-maroon' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-maroon font-montserrat font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none font-nunito transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-maroon font-montserrat font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none font-nunito transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-maroon font-montserrat font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none font-nunito transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Event Details */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-maroon font-montserrat font-semibold mb-2">
                      Event Type *
                    </label>
                    <select
                      name="event_type"
                      value={formData.event_type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none font-nunito transition-colors"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="cultural">Cultural Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-maroon font-montserrat font-semibold mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="event_date"
                      value={formData.event_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none font-nunito transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-maroon font-montserrat font-semibold mb-2">
                      Expected Guest Count
                    </label>
                    <input
                      type="number"
                      name="guest_count"
                      value={formData.guest_count}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none font-nunito transition-colors"
                      placeholder="Number of guests"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Additional Info */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-maroon font-montserrat font-semibold mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none font-nunito transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-1lakh">Under ₹1 Lakh</option>
                      <option value="1-3lakh">₹1 - 3 Lakhs</option>
                      <option value="3-5lakh">₹3 - 5 Lakhs</option>
                      <option value="above-5lakh">Above ₹5 Lakhs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-maroon font-montserrat font-semibold mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none font-nunito transition-colors resize-none"
                      placeholder="Tell us more about your event..."
                    ></textarea>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-montserrat font-bold hover:bg-gray-300 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex-1 bg-gradient-to-r from-maroon to-pink text-white py-3 rounded-full font-montserrat font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-emerald to-sapphire text-white py-3 rounded-full font-montserrat font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaPaperPlane />
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <info.icon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-xl text-maroon mb-2">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 font-nunito">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="block bg-gradient-to-r from-emerald to-green-500 text-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300"
            >
              <FaWhatsapp className="text-5xl mx-auto mb-3" />
              <h3 className="font-cinzel font-bold text-2xl mb-2">
                Quick Chat on WhatsApp
              </h3>
              <p className="font-nunito">Get instant response to your queries</p>
            </motion.a>
          </div>
        </div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-2xl h-96"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1976634576896!2d88.35161431495743!3d22.562473985183653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277b027a4209d%3A0x9a8c5e5f5f5a5a5a!2sPark%20Street%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Royal STAR Event Management Location"
          ></iframe>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
