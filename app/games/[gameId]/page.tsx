'use client'
import { useState, useEffect, use } from 'react'
import { notFound, useRouter } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'
import BackButton from '../../../components/ui/BackButton'
import PlayPrompt from '../../../components/ui/PlayPrompt'
import Button from '../../../components/ui/Button'
import { getGameById } from '../../../lib/database'

interface GamePageProps {
  params: Promise<{
    gameId: string
  }>
}

export default function GamePage({ params }: GamePageProps) {
  const { gameId } = use(params)
  const { user } = useAuth()
  const router = useRouter()
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

  const handlePlay = () => {
    // Navigate to specific game play page
    if (game.id === 1) {
      router.push('/games/play/congkak')
    } else {
      router.push(`/games/${gameId}/play`)
    }
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
        <div className="p-6 space-y-8 max-w-4xl mx-auto pb-24">
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

          {/* Sign Up Prompt for Non-Logged In Users */}
          {!user && (
            <PlayPrompt gameName={game.name} onSignUp={handleSignUp} />
          )}

          {/* Play Button for Logged In Users */}
          {user && game.is_playable && (
            <div className="mt-6">
              <Button onClick={handlePlay} className="w-full">
                Play {game.name}
              </Button>
            </div>
          )}

          {/* Game Not Playable Message */}
          {user && !game.is_playable && (
            <div className="mt-6 p-4 bg-[var(--surface-color)] rounded-lg text-center">
              <p className="text-[var(--text-secondary)]">
                This game is currently not available for play.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
