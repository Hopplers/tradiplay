'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPanel() {
  const router = useRouter()
  const [games, setGames] = useState([
    {
      id: 1,
      name: 'Congkak',
      description: 'A traditional Malay board game of "count and capture".',
      visible: true,
      playable: true
    },
    {
      id: 2,
      name: 'Gasing',
      description: 'The art of spinning giant tops, a test of skill and strength.',
      visible: false,
      playable: false
    }
  ])

  const [users] = useState([
    { id: 1, username: 'user_alpha', email: 'alpha@email.com' },
    { id: 2, username: 'user_beta', email: 'beta@email.com' },
    { id: 3, username: 'user_gamma', email: 'gamma@email.com' }
  ])

  const toggleGameVisibility = (gameId: number) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, visible: !game.visible } : game
    ))
  }

  const toggleGamePlayable = (gameId: number) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, playable: !game.playable } : game
    ))
  }

  const handleLogout = () => {
    router.push('/auth/signup')
  }

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="absolute inset-0 z-0">
        <img 
          alt="Malay traditional games background" 
          className="w-full h-full object-cover opacity-10" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkJdVdUj5ygPY1-wDhKAl_h68sjiwdSFB8VXNUeP5fi4pnTOEL5WF8g7KNeOse_5fWjhBxvi1QVP86kMN5J5s__aNvNuK05b41x5uCtH5b3sVcfyUTZTxOX8ghMzf75extpvukUX8re2JGGSW0gOQfN4pqfFo7JGojQvPGSuA-vyy2XO0n6682sCP6-rCEnqV3o_LAYC-84-m_KNpUFPrRVWBIFyvrgtTwEXBbnhvRhemLXFzzQ_VAvLXlass6f_nY78f2AGGjLfgd"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-color)] via-[var(--background-color)]/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 flex flex-col flex-grow p-6 pt-12">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">TradiPlay</h1>
            <p className="text-lg text-[var(--text-secondary)]">Admin Panel</p>
          </div>
          <button 
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={handleLogout}
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </header>

        <main className="flex-grow space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Game Management</h2>
            <div className="space-y-4">
              {games.map((game) => (
                <div key={game.id} className="bg-[var(--surface-color)] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">{game.name}</h3>
                    <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">{game.description}</p>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-primary)]">Status</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-[var(--text-secondary)]">
                          {game.visible ? 'Visible' : 'Hidden'}
                        </span>
                        <label className="switch">
                          <input 
                            type="checkbox" 
                            checked={game.visible}
                            onChange={() => toggleGameVisibility(game.id)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-primary)]">Playable</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-[var(--text-secondary)]">
                          {game.playable ? 'Enabled' : 'Disabled'}
                        </span>
                        <label className="switch">
                          <input 
                            type="checkbox" 
                            checked={game.playable}
                            onChange={() => toggleGamePlayable(game.id)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full bg-[var(--primary-color)] text-[var(--background-color)] py-3 px-6 rounded-full font-bold hover:bg-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition-colors duration-200 ease-in-out shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined mr-2">add</span> Add New Game
            </button>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Manage Users</h2>
            <div className="bg-[var(--surface-color)] rounded-lg p-4 space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-[var(--text-primary)] font-semibold">{user.username}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{user.email}</p>
                  </div>
                  <button className="text-red-500 hover:text-red-400">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
