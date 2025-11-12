import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import BlogsPage from './pages/BlogsPage'
import BlogDetailPage from './pages/BlogDetailPage'
import EventsPage from './pages/EventsPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import SuccessStoryDetailPage from './pages/SuccessStoryDetailPage'
import Admin from './admin/Admin'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Handle route changes
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    // Check initial path
    handleLocationChange()

    window.addEventListener('popstate', handleLocationChange)
    
    // Custom event for programmatic navigation
    window.addEventListener('navigate', handleLocationChange)
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('navigate', handleLocationChange)
    }
  }, [])

  // Render admin panel if on /admin route
  if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
    return <Admin />
  }

  return (
    <Router>
      <div className="min-h-screen bg-ivory">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar scrolled={scrolled} />
              <HomePage />
            </>
          } />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/success-story/:id" element={<SuccessStoryDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
