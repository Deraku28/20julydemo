import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      interest_submissions: {
        Row: {
          id: string
          name: string
          email: string
          subscribe_newsletter: boolean
          subscribe_updates: boolean
          subscribe_releases: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subscribe_newsletter?: boolean
          subscribe_updates?: boolean
          subscribe_releases?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subscribe_newsletter?: boolean
          subscribe_updates?: boolean
          subscribe_releases?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 