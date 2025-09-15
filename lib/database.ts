import { supabase } from './supabase'
import type { Database } from './supabase'

type Game = Database['public']['Tables']['games']['Row']
type User = Database['public']['Tables']['users']['Row']
type LeaderboardEntry = Database['public']['Tables']['leaderboard']['Row']

// Game functions
export async function getGames() {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('is_enabled', true)
    .order('created_at')
  
  if (error) throw error
  return data
}

export async function getAllGames() {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('created_at')
  
  if (error) throw error
  return data
}

export async function getGameById(id: number) {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function updateGame(id: number, updates: Partial<Game>) {
  const { data, error } = await supabase
    .from('games')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// User functions
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (error) throw error
  return data
}

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at')
  
  if (error) throw error
  return data
}

export async function updateUserRole(userId: string, role: 'user' | 'admin' | 'superadmin') {
  const { data, error } = await supabase
    .from('users')
    .update({ role })
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Leaderboard functions
export async function getLeaderboard(gameId?: number) {
  let query = supabase
    .from('leaderboard')
    .select(`
      *,
      users (username, email),
      games (name)
    `)
    .order('wins', { ascending: false })

  if (gameId) {
    query = query.eq('game_id', gameId)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function updateUserScore(userId: string, gameId: number) {
  const { data, error } = await supabase
    .from('leaderboard')
    .upsert({
      user_id: userId,
      game_id: gameId,
      wins: 1
    }, {
      onConflict: 'user_id,game_id',
      ignoreDuplicates: false
    })
    .select()

  if (error) {
    // If upsert failed, try to increment existing record
    const { data: existing } = await supabase
      .from('leaderboard')
      .select('wins')
      .eq('user_id', userId)
      .eq('game_id', gameId)
      .single()

    if (existing) {
      const { data: updated, error: updateError } = await supabase
        .from('leaderboard')
        .update({ wins: existing.wins + 1 })
        .eq('user_id', userId)
        .eq('game_id', gameId)
        .select()

      if (updateError) throw updateError
      return updated
    }
    throw error
  }
  return data
}

// Auth functions
export async function signUp(email: string, password: string, username?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username || email.split('@')[0]
      }
    }
  })
  
  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
// Leaderboard functions
export async function updateLeaderboard(userId: string, gameId: number) {
  // First try to get existing record
  const { data: existing } = await supabase
    .from('leaderboard')
    .select('wins')
    .eq('user_id', userId)
    .eq('game_id', gameId)
    .single()

  if (existing) {
    // Update existing record
    const { data, error } = await supabase
      .from('leaderboard')
      .update({ wins: existing.wins + 1 })
      .eq('user_id', userId)
      .eq('game_id', gameId)
      .select()

    if (error) throw error
    return data
  } else {
    // Create new record
    const { data, error } = await supabase
      .from('leaderboard')
      .insert({ user_id: userId, game_id: gameId, wins: 1 })
      .select()

    if (error) throw error
    return data
  }
}
