'use client'
import { useState, useEffect, use } from 'react'
import { notFound } from 'next/navigation'
import BackButton from '../../../components/ui/BackButton'
import PlayPrompt from '../../../components/ui/PlayPrompt'
import { getGameById } from '../../../lib/database'

interface GamePageProps {
  params: Promise<{
    gameId: string
  }>
}

export default function GamePage({ params }: GamePageProps) {
  const { gameId } = use(params)
  const [game, setGame] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchGame() {
      try {
        const id = parseInt(gameId)
        const gameData = await getGameById(id)
        setGame(gameData)
      } catch (error) {
        console.error('Error fetching game:', error)
        setGame(null)
      } finally {
        setLoading(false)
      }
    }
    fetchGame()
  }, [gameId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[var(--text-primary)]">Loading game...</div>
      </div>
    )
  }
  
  if (!game) {
    notFound()
  }

  const handleSignUp = () => {
    window.location.href = '/auth/signup'
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[var(--background-color)] bg-opacity-80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <BackButton />
          <h1 className="text-xl md:text-2xl font-bold text-center flex-1 pr-10">{game.name}</h1>
        </div>
      </header>

      <main>
        {/* Hero Image */}
        <div 
          className="w-full h-64 md:h-80 bg-center bg-cover" 
          style={{ backgroundImage: `url("${game.image_url}")` }}
        />

        {/* Content */}
        <div className="p-6 space-y-8 max-w-4xl mx-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">About {game.name}</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
              {game.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">How to Play</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
              {game.rules}
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">History</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
              {game.history}
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Cultural Significance</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
              {game.cultural_context}
            </p>
          </div>

          <PlayPrompt gameName={game.name} onSignUp={handleSignUp} />
        </div>
      </main>
    </>
  )
}
