'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAllGames, updateGame, getAllUsers, createGame } from '../../lib/database'

export default function AdminPanel() {
  const router = useRouter()
  const [games, setGames] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingGame, setEditingGame] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rules: '',
    history: '',
    cultural_context: '',
    is_enabled: true,
    is_playable: false,
    image_url: ''
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const [gamesData, usersData] = await Promise.all([
          getAllGames(),
          getAllUsers()
        ])
        setGames(gamesData || [])
        setUsers(usersData || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const openModal = (game?: any) => {
    if (game) {
      setEditingGame(game)
      setFormData({
        name: game.name || '',
        description: game.description || '',
        rules: game.rules || '',
        history: game.history || '',
        cultural_context: game.cultural_context || '',
        is_enabled: game.is_enabled || false,
        is_playable: game.is_playable || false,
        image_url: game.image_url || ''
      })
    } else {
      setEditingGame(null)
      setFormData({
        name: '',
        description: '',
        rules: '',
        history: '',
        cultural_context: '',
        is_enabled: true,
        is_playable: false,
        image_url: ''
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingGame(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingGame) {
        await updateGame(editingGame.id, formData)
        setGames(games.map(g => g.id === editingGame.id ? { ...g, ...formData } : g))
      } else {
        const newGame = await createGame(formData)
        setGames([...games, newGame])
      }
      closeModal()
    } catch (error) {
      console.error('Error saving game:', error)
    }
  }

  const toggleGameVisibility = async (gameId: number) => {
    try {
      const game = games.find(g => g.id === gameId)
      if (game) {
        await updateGame(gameId, { is_enabled: !game.is_enabled })
        setGames(games.map(g => 
          g.id === gameId ? { ...g, is_enabled: !g.is_enabled } : g
        ))
      }
    } catch (error) {
      console.error('Error updating game visibility:', error)
    }
  }

  const toggleGamePlayable = async (gameId: number) => {
    try {
      const game = games.find(g => g.id === gameId)
      if (game) {
        await updateGame(gameId, { is_playable: !game.is_playable })
        setGames(games.map(g => 
          g.id === gameId ? { ...g, is_playable: !g.is_playable } : g
        ))
      }
    } catch (error) {
      console.error('Error updating game playability:', error)
    }
  }

  const handleLogout = () => {
    router.push('/auth/signup')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[var(--text-primary)]">Loading admin panel...</div>
      </div>
    )
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
                    <button 
                      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      onClick={() => openModal(game)}
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">{game.description}</p>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-primary)]">Status</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-[var(--text-secondary)]">
                          {game.is_enabled ? 'Visible' : 'Hidden'}
                        </span>
                        <label className="switch">
                          <input 
                            type="checkbox" 
                            checked={game.is_enabled}
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
                          {game.is_playable ? 'Enabled' : 'Disabled'}
                        </span>
                        <label className="switch">
                          <input 
                            type="checkbox" 
                            checked={game.is_playable}
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
            <button 
              className="mt-6 w-full bg-[var(--primary-color)] text-[var(--background-color)] py-3 px-6 rounded-full font-bold hover:bg-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition-colors duration-200 ease-in-out shadow-lg flex items-center justify-center"
              onClick={() => openModal()}
            >
              <span className="material-symbols-outlined mr-2">add</span> Add New Game
            </button>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Manage Users</h2>
            <div className="bg-[var(--surface-color)] rounded-lg p-4 space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-[var(--text-primary)] font-semibold">{user.username || user.email}</p>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--surface-color)] rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                {editingGame ? 'Edit Game' : 'Add New Game'}
              </h3>
              <button onClick={closeModal} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Game Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[var(--background-color)] border border-gray-600 rounded-lg text-[var(--text-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 bg-[var(--background-color)] border border-gray-600 rounded-lg text-[var(--text-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Rules</label>
                <textarea
                  name="rules"
                  value={formData.rules}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 bg-[var(--background-color)] border border-gray-600 rounded-lg text-[var(--text-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">History</label>
                <textarea
                  name="history"
                  value={formData.history}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 bg-[var(--background-color)] border border-gray-600 rounded-lg text-[var(--text-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Cultural Context</label>
                <textarea
                  name="cultural_context"
                  value={formData.cultural_context}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 bg-[var(--background-color)] border border-gray-600 rounded-lg text-[var(--text-primary)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Image URL</label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[var(--background-color)] border border-gray-600 rounded-lg text-[var(--text-primary)]"
                />
              </div>

              <div className="flex space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_enabled"
                    checked={formData.is_enabled}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label className="text-sm text-[var(--text-primary)]">Enable (Visible to users)</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_playable"
                    checked={formData.is_playable}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label className="text-sm text-[var(--text-primary)]">Playable</label>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[var(--primary-color)] text-black py-3 px-6 rounded-lg font-bold hover:bg-[var(--accent-color)] transition-colors"
                >
                  {editingGame ? 'Update Game' : 'Create Game'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
