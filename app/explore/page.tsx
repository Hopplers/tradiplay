'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../components/ui/Button'
import GameCard from '../../components/ui/GameCard'
import SearchBar from '../../components/ui/SearchBar'
import { getGames } from '../../lib/database'

const categories = [
  "Board Games",
  "Outdoor Games", 
  "Strategy",
  "Skill"
]

export default function ExplorePage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [games, setGames] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    async function fetchGames() {
      try {
        const gamesData = await getGames()
        setGames(gamesData || [])
      } catch (error) {
        console.error('Error fetching games:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGames()
  }, [])

  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false)
    if (showDropdown) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showDropdown])

  const handleGameClick = (gameId: number) => {
    router.push(`/games/${gameId}`)
  }

  const handleSignUp = () => {
    router.push('/auth/signup')
  }

  const handleLearnMore = () => {
    console.log('Learn more clicked')
  }

  const handleLogout = async () => {
    try {
      await signOut()
      setShowDropdown(false)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const featuredGames = games.slice(0, 3)
  const otherGames = games.slice(3)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[var(--text-primary)]">Loading games...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <header className="flex items-center p-4 pb-2 justify-between">
        <h1 className="text-[var(--text-primary)] text-xl md:text-2xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12">
          TradiPlay
        </h1>
        <div className="flex w-12 items-center justify-end relative">
          <button 
            className="p-2 rounded-full hover:bg-gray-700 text-[var(--text-primary)] transition-colors duration-200 ease-in-out"
            onClick={(e) => {
              e.stopPropagation()
              setShowDropdown(!showDropdown)
            }}
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
          
          {showDropdown && (
            <div className="absolute top-12 right-0 bg-[var(--surface-color)] border border-gray-600 rounded-lg shadow-lg py-2 min-w-32 z-50">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-[var(--text-primary)] hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => router.push('/auth/login')}
                  className="w-full px-4 py-2 text-left text-[var(--text-primary)] hover:bg-gray-700 transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Search Bar */}
      <SearchBar />

      {/* Featured Games Section */}
      <section className="py-5">
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-3 px-4">
          Featured Games
        </h2>
        <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 gap-4">
          {featuredGames.map((game) => (
            <GameCard
              key={game.id}
              title={game.name}
              description={game.description}
              imageUrl={game.image_url}
              onClick={() => handleGameClick(game.id)}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-5">
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-3">
          Categories
        </h2>
        <div className="flex gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-[var(--secondary-color)] text-[var(--text-primary)]'
                  : 'bg-gray-800 text-[var(--text-primary)] hover:bg-[var(--secondary-color)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Games Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4 pb-20">
        {otherGames.map((game) => (
          <div key={game.id} className="flex flex-col gap-3">
            <div 
              className="w-full h-40 bg-center bg-no-repeat bg-cover rounded-xl cursor-pointer hover:scale-105 transition-transform duration-200"
              style={{ backgroundImage: `url("${game.image_url}")` }}
              onClick={() => handleGameClick(game.id)}
            />
            <p className="text-[var(--text-primary)] text-base font-medium">{game.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
