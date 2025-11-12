import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaStar, FaAward, FaUsers, FaCalendarCheck, FaArrowRight } from 'react-icons/fa'

const Hero = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate random particles/confetti
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  const trustBadges = [
    { icon: FaCalendarCheck, count: '500+', label: 'Events Completed' },
    { icon: FaUsers, count: '10K+', label: 'Happy Clients' },
    { icon: FaAward, count: '25+', label: 'Awards Won' },
    { icon: FaStar, count: '4.9/5', label: 'Client Rating' },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sapphire via-maroon to-emerald pt-32">
      {/* Animated Particles/Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-3 h-3 bg-royal-gold rounded-full opacity-60"
            style={{ left: `${particle.left}%`, top: '-10%' }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, 360],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Parallax Background Layers */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Intro Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-6"
          >
            <FaStar className="text-royal-gold" />
            <span className="text-ivory font-montserrat text-sm">Kolkata's Most Trusted Event Planners</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-playfair font-bold text-5xl md:text-7xl text-white mb-6 leading-tight"
          >
            Crafting{' '}
            <span className="text-gradient bg-gradient-to-r from-royal-gold via-orange to-pink bg-clip-text text-transparent">
              Royal Experiences
            </span>
            <br />
            For Your Special Moments
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-ivory text-lg md:text-xl font-nunito mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            From grand weddings to corporate excellence, we transform your vision into unforgettable celebrations with our signature touch of elegance and innovation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a
              href="#contact"
              className="group bg-gradient-to-r from-royal-gold to-orange text-maroon px-8 py-4 rounded-full font-montserrat font-bold text-lg shadow-2xl hover:shadow-royal-gold/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Plan Your Event
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#gallery"
              className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white px-8 py-4 rounded-full font-montserrat font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              View Portfolio
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-center"
              >
                <badge.icon className="text-royal-gold text-3xl mx-auto mb-3" />
                <div className="font-playfair font-bold text-3xl text-white mb-1">
                  {badge.count}
                </div>
                <div className="text-ivory text-sm font-nunito">{badge.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1.5 h-1.5 bg-royal-gold rounded-full"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
