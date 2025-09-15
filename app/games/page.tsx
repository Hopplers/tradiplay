'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Search, Play, BookOpen } from 'lucide-react'

interface Game {
  id: string
  name: string
  description: string
  is_enabled: boolean
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    const { data, error } = await supabase
      .from('games')
      .select('id, name, description, is_enabled')
      .order('name')

    if (data) {
      setGames(data)
    }
    setLoading(false)
  }

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading games...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Traditional Malay Games
        </h1>
        <p className="text-lg text-gray-600">
          Explore our collection of traditional games
        </p>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <div key={game.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
              <p className="text-gray-600 mb-4">{game.description}</p>
              
              <div className="flex space-x-2">
                {game.is_enabled ? (
                  <Link
                    href={`/games/${game.id}/play`}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Play
                  </Link>
                ) : (
                  <div className="flex items-center bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed">
                    <Play className="w-4 h-4 mr-1" />
                    Coming Soon
                  </div>
                )}
                <Link
                  href={`/games/${game.id}`}
                  className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  Learn
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No games found matching your search.</p>
        </div>
      )}
    </div>
  )
}
