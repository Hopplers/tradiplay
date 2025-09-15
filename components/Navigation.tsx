'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, User, Settings, Trophy } from 'lucide-react'

export default function Navigation() {
  const { user, userRole, signOut } = useAuth()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              TradiPlay
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/games" className="text-gray-700 hover:text-gray-900">
              Games
            </Link>
            
            {user && (
              <Link href="/leaderboard" className="flex items-center text-gray-700 hover:text-gray-900">
                <Trophy className="w-4 h-4 mr-1" />
                Leaderboard
              </Link>
            )}
            
            {userRole === 'admin' || userRole === 'superadmin' ? (
              <Link href="/admin" className="flex items-center text-gray-700 hover:text-gray-900">
                <Settings className="w-4 h-4 mr-1" />
                Admin
              </Link>
            ) : null}
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile" className="flex items-center text-gray-700 hover:text-gray-900">
                  <User className="w-4 h-4 mr-1" />
                  Profile
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
