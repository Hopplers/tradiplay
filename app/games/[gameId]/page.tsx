'use client'
import { notFound } from 'next/navigation'
import BackButton from '../../../components/ui/BackButton'
import PlayPrompt from '../../../components/ui/PlayPrompt'
import { gamesData } from '../../../lib/gameData'

interface GamePageProps {
  params: {
    gameId: string
  }
}

export default function GamePage({ params }: GamePageProps) {
  const game = gamesData[params.gameId]
  
  if (!game) {
    notFound()
  }

  const handleSignUp = () => {
    // Navigate to signup page
    window.location.href = '/auth/signup'
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[var(--background-color)] bg-opacity-80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <BackButton />
          <h1 className="text-xl md:text-2xl font-bold text-center flex-1 pr-10">{game.title}</h1>
        </div>
      </header>

      <main>
        {/* Hero Image */}
        <div 
          className="w-full h-64 md:h-80 bg-center bg-cover" 
          style={{ backgroundImage: `url("${game.heroImageUrl || game.imageUrl}")` }}
        />

        {/* Content */}
        <div className="p-6 space-y-8 max-w-4xl mx-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">About {game.title}</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
              {game.about}
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">How to Play</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
              {game.howToPlay}
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Cultural Significance</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
              {game.culturalSignificance}
            </p>
          </div>

          <PlayPrompt gameName={game.title} onSignUp={handleSignUp} />
        </div>
      </main>
    </>
  )
}
