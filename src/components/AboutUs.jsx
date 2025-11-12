import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaTrophy, FaHeart, FaLightbulb, FaHandshake } from 'react-icons/fa'

const AboutUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const story = {
    title: 'Our Story',
    content: "Founded in the heart of Kolkata, Royal STAR Event Management has been crafting extraordinary celebrations for over a decade. Born from a passion for perfection and a love for bringing dreams to life, we've grown from a small team to Kolkata's most sought-after event planners. Our journey is defined by countless smiles, unforgettable moments, and the trust of thousands of families and businesses.",
  }

  const values = [
    {
      icon: FaHeart,
      title: 'Passion',
      description: 'We pour our hearts into every event, treating each celebration as if it were our own.',
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'Constantly evolving with fresh ideas and cutting-edge trends to create unique experiences.',
    },
    {
      icon: FaHandshake,
      title: 'Trust',
      description: 'Building lasting relationships through transparency, reliability, and exceptional service.',
    },
    {
      icon: FaTrophy,
      title: 'Excellence',
      description: 'Unwavering commitment to quality in every detail, from concept to execution.',
    },
  ]

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Founder & Creative Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Operations Head',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    },
    {
      name: 'Anjali Roy',
      role: 'Wedding Specialist',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    },
    {
      name: 'Vikram Mehta',
      role: 'Corporate Events Manager',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    },
  ]

  const awards = [
    'Best Event Management Company - Kolkata 2024',
    'Excellence in Wedding Planning Award 2023',
    'Corporate Events Excellence Award 2023',
    'Customer Choice Award 2022',
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-ivory to-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl text-maroon mb-4">
            About Royal STAR
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-royal-gold to-orange mx-auto mb-6"></div>
          <p className="text-sapphire text-lg font-nunito max-w-2xl mx-auto">
            Where tradition meets innovation, and every event becomes a masterpiece
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-playfair font-bold text-3xl text-maroon mb-6">
                {story.title}
              </h3>
              <p className="text-gray-700 font-nunito leading-relaxed text-lg mb-6">
                {story.content}
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="font-playfair font-bold text-4xl text-royal-gold">10+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair font-bold text-4xl text-orange">500+</div>
                  <div className="text-sm text-gray-600">Events</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair font-bold text-4xl text-emerald">10K+</div>
                  <div className="text-sm text-gray-600">Clients</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600"
                alt="Event Planning"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-royal-gold to-orange rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="font-playfair font-bold text-3xl text-center text-maroon mb-12">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center card-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-maroon to-pink rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-white text-2xl" />
                </div>
                <h4 className="font-cinzel font-bold text-xl text-maroon mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 font-nunito text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="font-playfair font-bold text-3xl text-center text-maroon mb-12">
            Meet Our Team
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-2xl shadow-xl"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon via-maroon/50 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="font-cinzel font-bold text-xl mb-1">{member.name}</h4>
                  <p className="text-royal-gold font-nunito text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-maroon to-sapphire rounded-3xl p-12 text-center"
        >
          <FaTrophy className="text-royal-gold text-5xl mx-auto mb-6" />
          <h3 className="font-playfair font-bold text-3xl text-white mb-8">
            Awards & Recognition
          </h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-4 text-ivory font-nunito"
              >
                ⭐ {award}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUs
