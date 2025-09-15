'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import BackButton from '../../components/ui/BackButton'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { supabase } from '../../lib/supabase'

export default function ProfilePage() {
  const { user, userProfile, refreshUser, signOut } = useAuth()
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }
    
    if (userProfile) {
      setFormData({
        username: userProfile.username || '',
        email: userProfile.email || user.email || ''
      })
    }
  }, [user, userProfile, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const { error } = await supabase
        .from('users')
        .update({
          username: formData.username,
          email: formData.email
        })
        .eq('id', user.id)

      if (error) throw error
      
      await refreshUser()
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  if (!user || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[var(--text-primary)]">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="flex-grow">
      <header className="sticky top-0 z-10 bg-[var(--background-color)] bg-opacity-80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <BackButton />
          <h1 className="text-xl font-bold text-center flex-1 pr-10">Profile</h1>
        </div>
      </header>

      <main className="p-6 pb-24">
        <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-[var(--primary-color)] bg-[var(--surface-color)] flex items-center justify-center">
              <span className="text-4xl font-bold text-[var(--text-primary)]">
                {(userProfile.username || userProfile.email || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Name */}
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            {userProfile.username || 'User'}
          </h2>
          <p className="text-[var(--text-secondary)] capitalize">{userProfile.role}</p>

          {/* Profile Form */}
          <div className="w-full space-y-4 pt-8">
            {editing ? (
              <>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2">Username</label>
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => setEditing(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="bg-[var(--surface-color)] border border-gray-700 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Username</p>
                    <p className="text-lg font-medium text-[var(--text-primary)]">
                      {userProfile.username || 'Not set'}
                    </p>
                  </div>
                </div>

                <div className="bg-[var(--surface-color)] border border-gray-700 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Email Address</p>
                    <p className="text-lg font-medium text-[var(--text-primary)]">
                      {userProfile.email}
                    </p>
                  </div>
                </div>

                <Button onClick={() => setEditing(true)} className="w-full">
                  Edit Profile
                </Button>

                <Button 
                  variant="secondary" 
                  onClick={handleLogout}
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
