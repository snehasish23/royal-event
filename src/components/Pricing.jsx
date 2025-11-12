import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCheck, FaStar, FaCrown, FaGem } from 'react-icons/fa'

const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const packages = [
    {
      icon: FaStar,
      name: 'Silver Star',
      price: '₹99,999',
      popular: false,
      description: 'Perfect for intimate gatherings and small celebrations',
      features: [
        'Up to 100 Guests',
        'Basic Venue Decoration',
        'Photography (4 hours)',
        'Standard Catering',
        'Music System',
        'Basic Lighting',
        'Event Coordination',
      ],
      color: 'from-gray-400 to-gray-600',
      buttonColor: 'from-gray-500 to-gray-700',
    },
    {
      icon: FaCrown,
      name: 'Gold Crown',
      price: '₹2,49,999',
      popular: true,
      description: 'Our most popular package for memorable celebrations',
      features: [
        'Up to 300 Guests',
        'Premium Venue Decoration',
        'Photography & Videography',
        'Multi-Cuisine Catering',
        'Live Music Band',
        'Designer Lighting',
        'Professional Coordination',
        'Invitation Cards',
        'Welcome Drinks',
      ],
      color: 'from-royal-gold to-orange',
      buttonColor: 'from-maroon to-pink',
    },
    {
      icon: FaGem,
      name: 'Diamond Elite',
      price: '₹4,99,999',
      popular: false,
      description: 'The ultimate luxury experience for grand celebrations',
      features: [
        'Unlimited Guests',
        'Luxury Theme Decoration',
        'Cinematic Coverage',
        'Premium Multi-Cuisine',
        'Celebrity DJ/Band',
        'Advanced Lighting & Effects',
        'Dedicated Event Manager',
        'Designer Invitations',
        'Premium Bar Services',
        'Valet Parking',
        'Photo Booth',
        'Drone Coverage',
      ],
      color: 'from-emerald to-sapphire',
      buttonColor: 'from-sapphire to-emerald',
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl text-maroon mb-4">
            Pricing Packages
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-royal-gold to-orange mx-auto mb-6"></div>
          <p className="text-sapphire text-lg font-nunito max-w-2xl mx-auto">
            Choose the perfect package for your event. All packages are customizable to your needs.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden ${
                pkg.popular ? 'ring-4 ring-royal-gold scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-royal-gold to-orange text-maroon px-6 py-2 rounded-bl-2xl font-montserrat font-bold text-sm">
                  🌟 MOST POPULAR
                </div>
              )}

              {/* Header */}
              <div className={`bg-gradient-to-br ${pkg.color} p-8 text-center text-white`}>
                <pkg.icon className="text-5xl mx-auto mb-4" />
                <h3 className="font-cinzel font-bold text-3xl mb-2">{pkg.name}</h3>
                <p className="text-white/90 font-nunito text-sm mb-4">{pkg.description}</p>
                <div className="font-playfair font-bold text-5xl mb-2">{pkg.price}</div>
                <div className="text-white/80 text-sm font-nunito">Starting from</div>
              </div>

              {/* Features */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.8 + idx * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-emerald rounded-full flex items-center justify-center mt-0.5">
                        <FaCheck className="text-white text-xs" />
                      </div>
                      <span className="text-gray-700 font-nunito">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`block w-full text-center bg-gradient-to-r ${pkg.buttonColor} text-white py-4 rounded-full font-montserrat font-bold shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Choose Package
                </motion.a>
              </div>

              {/* Decorative Elements */}
              <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${pkg.color} rounded-full opacity-5`}></div>
            </motion.div>
          ))}
        </div>

        {/* Custom Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-maroon via-sapphire to-emerald rounded-3xl p-12 text-center"
        >
          <h3 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-4">
            Need a Custom Package?
          </h3>
          <p className="text-ivory font-nunito text-lg mb-8 max-w-2xl mx-auto">
            Every event is unique. Let us create a personalized package that perfectly fits your vision and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-white text-maroon px-10 py-4 rounded-full font-montserrat font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Request Custom Quote
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald text-white px-10 py-4 rounded-full font-montserrat font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
