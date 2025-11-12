import { useState, useEffect } from 'react'
import { authService } from '../services'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const Admin = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-maroon via-sapphire to-emerald flex items-center justify-center">
        <div className="text-white font-cinzel text-2xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return <Dashboard user={user} onLogout={handleLogout} />
}

export default Admin
