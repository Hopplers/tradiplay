'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '../../../lib/database'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(formData.email, formData.password)
      router.push('/explore')
    } catch (error: any) {
      setError(error.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Welcome Back</h1>
          <p className="text-[var(--text-secondary)]">Login to your TradiPlay account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-[var(--text-secondary)]">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-[var(--primary-color)] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link href="/explore" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm">
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  )
}
