import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file')
  throw new Error('Supabase credentials not configured')
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Test connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('events').select('count')
    if (error && error.code !== 'PGRST116') {
      console.error('Supabase connection error:', error.message)
      return false
    }
    console.log('✅ Supabase connected successfully')
    return true
  } catch (err) {
    console.error('❌ Failed to connect to Supabase:', err.message)
    return false
  }
}

export { supabase }
export default supabase
