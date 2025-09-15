import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string | null
          role: 'user' | 'admin' | 'superadmin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          username?: string | null
          role?: 'user' | 'admin' | 'superadmin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string | null
          role?: 'user' | 'admin' | 'superadmin'
          created_at?: string
          updated_at?: string
        }
      }
      games: {
        Row: {
          id: number
          name: string
          description: string
          rules: string
          history: string
          cultural_context: string
          image_url: string
          is_enabled: boolean
          is_playable: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          rules: string
          history: string
          cultural_context: string
          image_url: string
          is_enabled?: boolean
          is_playable?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          rules?: string
          history?: string
          cultural_context?: string
          image_url?: string
          is_enabled?: boolean
          is_playable?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      leaderboard: {
        Row: {
          id: string
          user_id: string
          game_id: number
          wins: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_id: number
          wins?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          game_id?: number
          wins?: number
          created_at?: string
          updated_at?: string
        }
      }
      feedback: {
        Row: {
          id: string
          user_id: string
          message: string
          type: 'feedback' | 'report'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          message: string
          type: 'feedback' | 'report'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          message?: string
          type?: 'feedback' | 'report'
          created_at?: string
        }
      }
    }
  }
}
