import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Log environment variables in development
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing')
}

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.error('Missing environment variables:', {
      url: supabaseUrl ? 'Present' : 'Missing',
      key: supabaseAnonKey ? 'Present' : 'Missing'
    })
  }
  throw new Error('Missing Supabase environment variables')
}

// Create and export the typed client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
})

// Test connection in development
if (process.env.NODE_ENV === 'development' && supabase) {
  void (async () => {
    try {
      const { data, error } = await supabase.from('roles').select('*').limit(1)
      if (error) {
        console.error('Supabase connection test failed:', error.message)
      } else {
        console.log('Supabase connection test successful')
      }
    } catch (err: unknown) {
      console.error('Supabase connection test error:', err)
    }
  })()
} 