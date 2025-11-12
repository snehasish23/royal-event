import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaRing, FaBriefcase, FaPalette, FaMusic, FaCamera, FaUtensils } from 'react-icons/fa'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      icon: FaRing,
      title: 'Wedding Events',
      description: 'Creating magical moments for your special day with traditional elegance and modern flair.',
      features: ['Complete Wedding Planning', 'Sangeet & Mehendi', 'Reception Coordination', 'Destination Weddings'],
      color: 'from-pink to-maroon',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    },
    {
      icon: FaBriefcase,
      title: 'Corporate Events',
      description: 'Professional event management for conferences, launches, and corporate celebrations.',
      features: ['Product Launches', 'Conferences & Seminars', 'Team Building Events', 'Annual Celebrations'],
      color: 'from-sapphire to-emerald',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600',
    },
    {
      icon: FaPalette,
      title: 'Decor & Design',
      description: 'Transforming venues into breathtaking spaces with our creative decor solutions.',
      features: ['Theme Design', 'Floral Arrangements', 'Stage & Backdrop', 'Lighting Design'],
      color: 'from-royal-gold to-orange',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600',
    },
    {
      icon: FaMusic,
      title: 'Entertainment',
      description: 'Curated entertainment options to keep your guests engaged and delighted.',
      features: ['Live Music Bands', 'DJ Services', 'Celebrity Management', 'Cultural Performances'],
      color: 'from-emerald to-sapphire',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600',
    },
    {
      icon: FaCamera,
      title: 'Photography & Videography',
      description: 'Capturing precious moments with our professional photography and cinematography.',
      features: ['Candid Photography', 'Cinematic Videos', 'Drone Coverage', 'Photo Booth Setup'],
      color: 'from-pink to-orange',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600',
    },
    {
      icon: FaUtensils,
      title: 'Catering Services',
      description: 'Delightful culinary experiences with diverse menu options and impeccable service.',
      features: ['Multi-Cuisine Menus', 'Live Counters', 'Custom Menu Design', 'Professional Staff'],
      color: 'from-maroon to-pink',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600',
    },
  ]

  const caseStudies = [
    {
      title: 'Grand Royal Wedding - Park Circus',
      client: 'The Chatterjee Family',
      guest: '1200+ Guests',
      description: 'A magnificent 3-day celebration blending Bengali traditions with modern luxury.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600',
      tags: ['Wedding', 'Traditional', 'Luxury'],
    },
    {
      title: 'Tech Summit 2024',
      client: 'TechCorp India',
      guest: '500+ Attendees',
      description: 'A cutting-edge corporate conference with interactive tech demonstrations.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
      tags: ['Corporate', 'Conference', 'Technology'],
    },
    {
      title: 'Emerald Garden Reception',
      client: 'The Banerjee-Mishra Wedding',
      guest: '800+ Guests',
      description: 'An enchanting garden-themed reception with stunning floral installations.',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600',
      tags: ['Wedding', 'Garden Theme', 'Decor'],
    },
  ]

  return (
    <section id="services" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl text-maroon mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-royal-gold to-orange mx-auto mb-6"></div>
          <p className="text-sapphire text-lg font-nunito max-w-2xl mx-auto">
            Comprehensive event solutions tailored to create unforgettable experiences
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl shadow-xl overflow-hidden card-hover"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`}></div>
                <div className="absolute top-4 left-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <service.icon className="text-2xl text-maroon" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-cinzel font-bold text-2xl text-maroon mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-nunito mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700 font-nunito">
                      <span className="w-1.5 h-1.5 bg-royal-gold rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="text-maroon font-montserrat font-semibold hover:text-royal-gold transition-colors flex items-center gap-2 group">
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Studies Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="font-playfair font-bold text-3xl text-center text-maroon mb-12">
            Recent Success Stories
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-ivory to-white rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2 mb-2">
                      {study.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-royal-gold text-maroon px-3 py-1 rounded-full font-montserrat font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="font-cinzel font-bold text-xl text-maroon mb-2">
                    {study.title}
                  </h4>
                  <div className="flex gap-4 mb-3 text-sm text-sapphire font-nunito">
                    <span>👤 {study.client}</span>
                    <span>👥 {study.guest}</span>
                  </div>
                  <p className="text-gray-600 font-nunito text-sm leading-relaxed">
                    {study.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
