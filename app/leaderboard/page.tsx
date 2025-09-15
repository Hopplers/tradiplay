'use client'
import { useState } from 'react'

const games = ['Congkak', 'Gasing', 'Wau']

const leaderboardData = [
  {
    rank: 1,
    name: 'Raja Piatu',
    wins: 125,
    badge: 'Top 1%',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXqW3Fq-2g_HODT_oOFAF1J1z02f8u57a5t_T2h1c8d_w=s96-c',
    borderColor: 'border-yellow-400',
    textColor: 'text-yellow-400'
  },
  {
    rank: 2,
    name: 'Siti Payung',
    wins: 118,
    badge: 'Top 5%',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKw_kYcW3XyKz0j-J3oF1w9_e5w_fF-G5qW-f_N6L-p=s96-c',
    borderColor: 'border-gray-500',
    textColor: 'text-gray-400'
  },
  {
    rank: 3,
    name: 'Awang Kenit',
    wins: 112,
    badge: 'Top 10%',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJk_J-1c-f-5t-h-G-w_K3J_y1w-oO9f-5c-G-a-k-w=s96-c',
    borderColor: 'border-orange-400',
    textColor: 'text-orange-400'
  },
  {
    rank: 4,
    name: 'Dayang Senandung',
    wins: 105,
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVp-e3j_y-J-5Fz-j-5F-e-w_e-5t-j-oO-q-K-f-h-b=s96-c'
  },
  {
    rank: 5,
    name: 'Puteri Gunung Ledang',
    wins: 98,
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocL8j-o-f-J-k-w_z-K-z-f-w_z-j-o-f-w_K-f-w=s96-c'
  }
]

const currentUser = {
  rank: 42,
  name: 'You',
  wins: 52,
  badge: 'Top 45%',
  avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ-k-j-o-f-w_z-K-f-w_z-j-o-f-w_K-f-w_z-j=s96-c'
}

export default function LeaderboardPage() {
  const [selectedGame, setSelectedGame] = useState('Congkak')

  return (
    <div className="flex-grow">
      <header className="sticky top-0 z-10 bg-[var(--background-color)] bg-opacity-80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <h1 className="text-xl font-bold text-center flex-1">Leaderboard</h1>
        </div>
      </header>

      <main className="p-4">
        {/* Game Selector */}
        <div className="mb-4">
          <div className="relative">
            <select 
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="w-full appearance-none bg-gray-800 border border-gray-700 text-white py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
            >
              {games.map(game => (
                <option key={game} value={game}>{game}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          {leaderboardData.map((player) => (
            <div key={player.rank} className={`flex items-center bg-gray-800/50 ${player.borderColor ? `border-2 ${player.borderColor}` : ''} rounded-xl p-3 shadow-lg`}>
              <div className={`w-10 text-center text-xl font-bold ${player.textColor || 'text-[var(--text-secondary)]'}`}>
                {player.rank}
              </div>
              <img 
                alt={`User ${player.rank}`} 
                className={`w-12 h-12 rounded-full mx-4 ${player.borderColor ? `border-2 ${player.borderColor}` : ''}`} 
                src={player.avatar}
              />
              <div className="flex-grow">
                <div className="font-bold text-white">{player.name}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-white">{player.wins} Wins</div>
                {player.badge && (
                  <div className={`flex items-center justify-end text-sm ${player.rank === 1 ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {player.rank === 1 && (
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
                      </svg>
                    )}
                    {player.badge}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Current User */}
        <div className="mt-8 bg-gray-800/70 border border-gray-700 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 text-center text-lg font-medium text-[var(--text-primary)]">
              {currentUser.rank}
            </div>
            <img 
              alt="Current User" 
              className="w-12 h-12 rounded-full mx-4" 
              src={currentUser.avatar}
            />
            <div className="flex-grow">
              <div className="font-bold text-[var(--primary-color)]">{currentUser.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-white">{currentUser.wins} Wins</div>
            <div className="text-sm text-[var(--text-secondary)]">{currentUser.badge}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
