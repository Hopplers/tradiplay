'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '../../../components/ui/BackButton'
import Input from '../../../components/ui/Input'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Signup attempt:', formData)
      setIsLoading(false)
      // Add your registration logic here
      // For now, just redirect to explore page
      router.push('/explore')
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full bg-[var(--background-color)]">
      {/* Header */}
      <header className="flex items-center p-4">
        <BackButton />
        <h2 className="text-[var(--text-primary)] text-lg md:text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
          TradiPlay
        </h2>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center px-6 max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-[var(--text-primary)] text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-2">
            Join TradiPlay
          </h1>
          <p className="text-[var(--text-secondary)] text-base md:text-lg">
            Create your account to access all traditional games
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <Input
            name="username"
            type="text"
            placeholder="Username"
            icon="person"
            variant="auth"
            value={formData.username}
            onChange={handleInputChange}
            required
          />

          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            icon="email"
            variant="auth"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            icon="lock"
            variant="auth"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            icon="lock"
            variant="auth"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />

          <div className="py-4 text-center">
            <p className="text-[var(--text-secondary)] text-sm">
              Already have an account?{' '}
              <Link 
                href="/auth/login" 
                className="text-[var(--primary-color)] hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-[var(--primary-color)] text-[var(--background-color)] text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[var(--accent-color)] transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="truncate">
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </span>
          </button>
        </form>
      </main>

      {/* Footer with Background Pattern */}
      <footer className="relative w-full">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[var(--background-color)] to-transparent z-10"></div>
        <img 
          alt="Malay traditional pattern" 
          className="w-full h-auto object-cover opacity-10" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIkMMPmrxoTeCV46OtRicjB3RTsKvwtaM6346GTQ9F6-adD9tOVEfSDf_jiZF-EflNzne6yO3o63CbBGVN5aOjSd1lthy9ZqPOe-9x9Q60iG0VHwA6uZID4CXiOY_c--fhsol_18Ttw2XM_omwolNPnAWGk9I5mh8XgaR-2ahTjXdeNKshrOWAwB8d56v99KYF9hEWymZLRrKEXEnUUDK7tRBTda2nSs7bIwgXcTWrxHb9BQdmLBWUE8hYukSvmVT7tlrqSDoTjGaS" 
          style={{ aspectRatio: '390 / 320', objectPosition: 'center bottom' }}
        />
      </footer>
    </div>
  )
}