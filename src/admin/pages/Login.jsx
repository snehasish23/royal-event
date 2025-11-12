import { useState } from 'react'
import { motion } from 'framer-motion'
import { authService } from '../../services'
import { FaEnvelope, FaLock } from 'react-icons/fa'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authService.login(formData.email, formData.password)

      if (response.success) {
        onLogin(response.data.user)
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials. Access restricted to authorized admins only.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon via-sapphire to-emerald flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-royal-gold to-orange rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-maroon font-cinzel font-bold text-3xl">RS</span>
          </div>
          <h1 className="font-cinzel font-bold text-3xl text-maroon mb-2">
            Royal STAR Admin
          </h1>
          <p className="text-sapphire font-nunito">
            Authorized Access Only
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-maroon font-montserrat font-semibold mb-2">
              <FaEnvelope className="inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none font-nunito"
              placeholder="admin@royalstar.in"
            />
          </div>

          <div>
            <label className="block text-maroon font-montserrat font-semibold mb-2">
              <FaLock className="inline mr-2" />
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-royal-gold focus:outline-none font-nunito"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-maroon to-pink text-white py-4 rounded-full font-montserrat font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 font-nunito text-sm">
            Access restricted to authorized administrators only.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
