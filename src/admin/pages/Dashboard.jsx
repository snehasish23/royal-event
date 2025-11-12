import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCalendar, FaEnvelope, FaBlog, FaTrophy, FaSignOutAlt, FaPlus, FaList, FaImages } from 'react-icons/fa'
import { eventService, blogService, enquiryService, successStoryService, authService } from '../../services'
import EventsManagement from './EventsManagement'
import EnquiriesManagement from './EnquiriesManagement'
import BlogsManagement from './BlogsManagement'
import SuccessStoriesManagement from './SuccessStoriesManagement'
import PortfolioManagement from './PortfolioManagement'

const Dashboard = ({ user, onLogout }) => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBlogs: 0,
    totalEnquiries: 0,
    totalSuccessStories: 0,
    pendingEnquiries: 0,
  })
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState('dashboard')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [events, blogs, enquiries, stories] = await Promise.all([
        eventService.getAllEvents({ limit: 1000 }),
        blogService.getAllBlogs({ limit: 1000 }),
        enquiryService.getAllEnquiries({ limit: 1000 }),
        successStoryService.getAllSuccessStories({ limit: 1000 }),
      ])

      setStats({
        totalEvents: events.pagination?.total || events.data?.length || 0,
        totalBlogs: blogs.pagination?.total || blogs.data?.length || 0,
        totalEnquiries: enquiries.pagination?.total || enquiries.data?.length || 0,
        totalSuccessStories: stories.pagination?.total || stories.data?.length || 0,
        pendingEnquiries: enquiries.data?.filter(e => e.status === 'pending').length || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      icon: FaCalendar,
      title: 'Total Events',
      value: stats.totalEvents,
      color: 'from-royal-gold to-orange',
      bgColor: 'bg-orange/10',
      onClick: () => setCurrentView('events')
    },
    {
      icon: FaEnvelope,
      title: 'Enquiries',
      value: stats.totalEnquiries,
      subtitle: `${stats.pendingEnquiries} pending`,
      color: 'from-pink to-maroon',
      bgColor: 'bg-pink/10',
      onClick: () => setCurrentView('enquiries')
    },
    {
      icon: FaBlog,
      title: 'Blog Posts',
      value: stats.totalBlogs,
      color: 'from-sapphire to-emerald',
      bgColor: 'bg-sapphire/10',
      onClick: () => setCurrentView('blogs')
    },
    {
      icon: FaTrophy,
      title: 'Success Stories',
      value: stats.totalSuccessStories,
      color: 'from-emerald to-sapphire',
      bgColor: 'bg-emerald/10',
      onClick: () => setCurrentView('stories')
    },
  ]

  // Render different views based on currentView
  if (currentView === 'events') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ivory to-white">
        <header className="bg-white shadow-lg border-b-4 border-royal-gold">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 text-maroon hover:text-sapphire transition-colors"
              >
                <span className="text-2xl">←</span>
                <span className="font-montserrat font-semibold">Back to Dashboard</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-maroon to-pink text-white px-6 py-3 rounded-full font-montserrat font-semibold hover:shadow-xl transition-all"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </header>
        <EventsManagement />
      </div>
    )
  }

  if (currentView === 'enquiries') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ivory to-white">
        <header className="bg-white shadow-lg border-b-4 border-royal-gold">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 text-maroon hover:text-sapphire transition-colors"
              >
                <span className="text-2xl">←</span>
                <span className="font-montserrat font-semibold">Back to Dashboard</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-maroon to-pink text-white px-6 py-3 rounded-full font-montserrat font-semibold hover:shadow-xl transition-all"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </header>
        <EnquiriesManagement />
      </div>
    )
  }

  if (currentView === 'blogs') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ivory to-white">
        <header className="bg-white shadow-lg border-b-4 border-royal-gold">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 text-maroon hover:text-sapphire transition-colors"
              >
                <span className="text-2xl">←</span>
                <span className="font-montserrat font-semibold">Back to Dashboard</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-maroon to-pink text-white px-6 py-3 rounded-full font-montserrat font-semibold hover:shadow-xl transition-all"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </header>
        <BlogsManagement />
      </div>
    )
  }

  if (currentView === 'stories') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ivory to-white">
        <header className="bg-white shadow-lg border-b-4 border-royal-gold">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 text-maroon hover:text-sapphire transition-colors"
              >
                <span className="text-2xl">←</span>
                <span className="font-montserrat font-semibold">Back to Dashboard</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-maroon to-pink text-white px-6 py-3 rounded-full font-montserrat font-semibold hover:shadow-xl transition-all"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </header>
        <SuccessStoriesManagement />
      </div>
    )
  }

  if (currentView === 'portfolio') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ivory to-white">
        <header className="bg-white shadow-lg border-b-4 border-royal-gold">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 text-maroon hover:text-sapphire transition-colors"
              >
                <span className="text-2xl">←</span>
                <span className="font-montserrat font-semibold">Back to Dashboard</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-maroon to-pink text-white px-6 py-3 rounded-full font-montserrat font-semibold hover:shadow-xl transition-all"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </header>
        <PortfolioManagement />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory to-white">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-royal-gold">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-royal-gold to-orange rounded-full flex items-center justify-center">
                <span className="text-maroon font-cinzel font-bold text-xl">RS</span>
              </div>
              <div>
                <h1 className="font-cinzel font-bold text-2xl text-maroon">Admin Dashboard</h1>
                <p className="text-sm text-sapphire font-nunito">Welcome, {user?.name || 'Admin'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  window.history.pushState({}, '', '/')
                  window.dispatchEvent(new Event('navigate'))
                }}
                className="flex items-center gap-2 bg-sapphire text-white px-6 py-3 rounded-full font-montserrat font-semibold hover:shadow-xl transition-all"
              >
                ← Back to Home
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-maroon to-pink text-white px-6 py-3 rounded-full font-montserrat font-semibold hover:shadow-xl transition-all"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={stat.onClick}
              className={`${stat.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all card-hover cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-gray-600 font-montserrat font-semibold text-sm mb-2">
                {stat.title}
              </h3>
              <p className="font-playfair font-bold text-4xl text-maroon mb-1">
                {loading ? '...' : stat.value}
              </p>
              {stat.subtitle && (
                <p className="text-sm text-gray-500 font-nunito">{stat.subtitle}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="font-cinzel font-bold text-2xl text-maroon mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <button 
              onClick={() => setCurrentView('events')}
              className="flex flex-col items-center gap-3 bg-gradient-to-br from-royal-gold/10 to-orange/10 border-2 border-royal-gold p-6 rounded-xl hover:shadow-lg transition-all"
            >
              <FaPlus className="text-3xl text-orange" />
              <span className="font-montserrat font-semibold text-maroon">Manage Events</span>
            </button>
            <button 
              onClick={() => setCurrentView('blogs')}
              className="flex flex-col items-center gap-3 bg-gradient-to-br from-sapphire/10 to-emerald/10 border-2 border-sapphire p-6 rounded-xl hover:shadow-lg transition-all"
            >
              <FaBlog className="text-3xl text-sapphire" />
              <span className="font-montserrat font-semibold text-maroon">Manage Blogs</span>
            </button>
            <button 
              onClick={() => setCurrentView('stories')}
              className="flex flex-col items-center gap-3 bg-gradient-to-br from-emerald/10 to-sapphire/10 border-2 border-emerald p-6 rounded-xl hover:shadow-lg transition-all"
            >
              <FaTrophy className="text-3xl text-emerald" />
              <span className="font-montserrat font-semibold text-maroon">Success Stories</span>
            </button>
            <button 
              onClick={() => setCurrentView('enquiries')}
              className="flex flex-col items-center gap-3 bg-gradient-to-br from-pink/10 to-maroon/10 border-2 border-pink p-6 rounded-xl hover:shadow-lg transition-all"
            >
              <FaList className="text-3xl text-pink" />
              <span className="font-montserrat font-semibold text-maroon">View Enquiries</span>
            </button>
            <button 
              onClick={() => setCurrentView('portfolio')}
              className="flex flex-col items-center gap-3 bg-gradient-to-br from-royal-gold/10 to-sapphire/10 border-2 border-royal-gold p-6 rounded-xl hover:shadow-lg transition-all"
            >
              <FaImages className="text-3xl text-royal-gold" />
              <span className="font-montserrat font-semibold text-maroon">Portfolio Images</span>
            </button>
          </div>
        </motion.div>

        {/* Coming Soon Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="bg-gradient-to-r from-royal-gold/20 to-orange/20 rounded-xl p-6">
            <h3 className="font-cinzel font-bold text-xl text-maroon mb-2">
              Full Admin Panel
            </h3>
            <p className="text-sapphire font-nunito">
              Complete management interface for Events, Blogs, Enquiries, and Success Stories is ready!
            </p>
            <p className="text-gray-600 font-nunito mt-2 text-sm">
              Navigate using the quick actions above or the navigation menu (to be added)
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
