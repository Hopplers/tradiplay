'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import { getAllUsers, updateUserRole } from '../../lib/database'

export default function SuperAdminPanel() {
  const { user, userProfile, signOut } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    if (!userProfile || userProfile.role !== 'superadmin') {
      router.push('/explore')
      return
    }
  }, [user, userProfile, router])

  useEffect(() => {
    async function fetchData() {
      try {
        const usersData = await getAllUsers()
        setAllUsers(usersData || [])
        // Filter to show only admins and superadmins
        const adminUsers = usersData?.filter(user => 
          user.role === 'admin' || user.role === 'superadmin'
        ) || []
        setUsers(adminUsers)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const promoteToAdmin = async (userId: string) => {
    try {
      await updateUserRole(userId, 'admin')
      // Refresh data
      const usersData = await getAllUsers()
      setAllUsers(usersData || [])
      const adminUsers = usersData?.filter(user => 
        user.role === 'admin' || user.role === 'superadmin'
      ) || []
      setUsers(adminUsers)
      setShowModal(false)
    } catch (error) {
      console.error('Error promoting user:', error)
    }
  }

  const demoteToUser = async (userId: string) => {
    try {
      await updateUserRole(userId, 'user')
      // Refresh data
      const usersData = await getAllUsers()
      setAllUsers(usersData || [])
      const adminUsers = usersData?.filter(user => 
        user.role === 'admin' || user.role === 'superadmin'
      ) || []
      setUsers(adminUsers)
    } catch (error) {
      console.error('Error demoting user:', error)
    }
  }

  const regularUsers = allUsers.filter(u => u.role === 'user')

  const handleLogout = async () => {
    await signOut()
    router.push('/auth/login')
  }

  if (!user || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[var(--text-primary)]">Loading...</div>
      </div>
    )
  }

  if (userProfile.role !== 'superadmin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[var(--text-primary)]">Access denied</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[var(--text-primary)]">Loading superadmin panel...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background-color)] p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">TradiPlay</h1>
          <p className="text-lg text-[var(--text-secondary)]">Super Admin Panel</p>
        </div>
        <button 
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          onClick={handleLogout}
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
      </header>

      <main className="space-y-8 max-w-6xl">
        {/* Statistics */}
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[var(--surface-color)] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Total Admins</h3>
              <p className="text-2xl font-bold text-[var(--primary-color)]">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <div className="bg-[var(--surface-color)] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Total Superadmins</h3>
              <p className="text-2xl font-bold text-[var(--primary-color)]">
                {users.filter(u => u.role === 'superadmin').length}
              </p>
            </div>
          </div>
        </section>

        {/* Admin Management */}
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Admin Management</h2>
          <div className="bg-[var(--surface-color)] rounded-lg p-4">
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex justify-between items-center p-3 border border-gray-600 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {user.username || user.email}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
                    <span className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                      user.role === 'superadmin' ? 'bg-red-600' : 'bg-yellow-600'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <button 
                    className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg transition-colors"
                    onClick={() => demoteToUser(user.id)}
                    title="Demote to User"
                  >
                    <span className="material-symbols-outlined">arrow_downward</span>
                  </button>
                </div>
              ))}
            </div>
            <button 
              className="mt-4 w-full bg-[var(--primary-color)] text-black py-3 px-6 rounded-lg font-bold hover:bg-[var(--accent-color)] transition-colors"
              onClick={() => setShowModal(true)}
            >
              Add Admin User
            </button>
          </div>
        </section>
      </main>

      {/* Add Admin Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--surface-color)] rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Select User to Promote</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3">
              {regularUsers.length === 0 ? (
                <p className="text-[var(--text-secondary)] text-center py-4">No regular users found</p>
              ) : (
                regularUsers.map((user) => (
                  <div key={user.id} className="flex justify-between items-center p-3 border border-gray-600 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-[var(--text-primary)]">
                        {user.username || user.email}
                      </h4>
                      <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
                    </div>
                    <button
                      onClick={() => promoteToAdmin(user.id)}
                      className="bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-black p-2 rounded-lg transition-colors"
                      title="Promote to Admin"
                    >
                      <span className="material-symbols-outlined">arrow_upward</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
