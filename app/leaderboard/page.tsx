'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getLeaderboard, getGames } from '../../lib/database'

export default function LeaderboardPage() {
  const { user } = useAuth()
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null)
  const [games, setGames] = useState<any[]>([])
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const gamesData = await getGames()
        setGames(gamesData || [])
        if (gamesData && gamesData.length > 0) {
          setSelectedGameId(gamesData[0].id)
        }
      } catch (error) {
        console.error('Error fetching games:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchLeaderboard() {
      if (!selectedGameId) return
      
      setLoading(true)
      try {
        const leaderboardData = await getLeaderboard(selectedGameId)
        setLeaderboard(leaderboardData || [])
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLeaderboard()
  }, [selectedGameId])

  const currentUserEntry = leaderboard.find(entry => entry.user_id === user?.id)
  const topEntries = leaderboard.slice(0, 10)

  return (
    <div className="flex-grow">
      <header className="sticky top-0 z-10 bg-[var(--background-color)] bg-opacity-80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <h1 className="text-xl font-bold text-center flex-1">Leaderboard</h1>
        </div>
      </header>

      <main className="p-4 pb-24">
        {/* Game Selector */}
        <div className="mb-4">
          <div className="relative">
            <select 
              value={selectedGameId || ''}
              onChange={(e) => setSelectedGameId(Number(e.target.value))}
              className="w-full appearance-none bg-[var(--surface-color)] border border-gray-700 text-[var(--text-primary)] py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
            >
              {games.map(game => (
                <option key={game.id} value={game.id}>{game.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
              </svg>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-[var(--text-secondary)] py-8">
            Loading leaderboard...
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center text-[var(--text-secondary)] py-8">
            No scores yet for this game. Be the first to play!
          </div>
        ) : (
          <>
            {/* Leaderboard */}
            <div className="space-y-4">
              {topEntries.map((entry, index) => {
                const rank = index + 1
                const isTop3 = rank <= 3
                const borderColor = rank === 1 ? 'border-yellow-400' : rank === 2 ? 'border-gray-400' : rank === 3 ? 'border-orange-400' : ''
                const textColor = rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-400' : rank === 3 ? 'text-orange-400' : 'text-[var(--text-secondary)]'
                
                return (
                  <div key={entry.id} className={`flex items-center bg-[var(--surface-color)] ${isTop3 ? `border-2 ${borderColor}` : 'border border-gray-700'} rounded-xl p-3 shadow-lg`}>
                    <div className={`w-10 text-center text-xl font-bold ${textColor}`}>
                      {rank}
                    </div>
                    <div className={`w-12 h-12 rounded-full mx-4 bg-[var(--primary-color)] flex items-center justify-center text-black font-bold ${isTop3 ? `border-2 ${borderColor}` : ''}`}>
                      {(entry.users?.username || entry.users?.email || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-grow">
                      <div className="font-bold text-[var(--text-primary)]">
                        {entry.users?.username || entry.users?.email?.split('@')[0] || 'Anonymous'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-[var(--text-primary)]">{entry.wins} Wins</div>
                      {isTop3 && (
                        <div className={`flex items-center justify-end text-sm ${textColor}`}>
                          {rank === 1 && (
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
                            </svg>
                          )}
                          Top {rank === 1 ? '1%' : rank === 2 ? '5%' : '10%'}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Current User */}
            {user && currentUserEntry && (
              <div className="mt-8 bg-[var(--surface-color)] border-2 border-[var(--primary-color)] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 text-center text-lg font-medium text-[var(--text-primary)]">
                    {leaderboard.findIndex(entry => entry.user_id === user.id) + 1}
                  </div>
                  <div className="w-12 h-12 rounded-full mx-4 bg-[var(--primary-color)] flex items-center justify-center text-black font-bold">
                    {(currentUserEntry.users?.username || currentUserEntry.users?.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-[var(--primary-color)]">You</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-[var(--text-primary)]">{currentUserEntry.wins} Wins</div>
                  <div className="text-sm text-[var(--text-secondary)]">Your Score</div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
