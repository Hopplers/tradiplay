'use client'
import { useRouter } from 'next/navigation'
import Button from '../components/ui/Button'

export default function WelcomePage() {
  const router = useRouter()

  const handleExploreAsGuest = () => {
    router.push('/explore')
  }

  const handleSignUp = () => {
    // Add your sign up logic here
    console.log('Sign up clicked')
  }

  return (
    <div className="relative flex flex-col min-h-screen justify-between overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Malay traditional games background" 
          className="w-full h-full object-cover opacity-30" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkJdVdUj5ygPY1-wDhKAl_h68sjiwdSFB8VXNUeP5fi4pnTOEL5WF8g7KNeOse_5fWjhBxvi1QVP86kMN5J5s__aNvNuK05b41x5uCtH5b3sVcfyUTZTxOX8ghMzf75extpvukUX8re2JGGSW0gOQfN4pqfFo7JGojQvPGSuA-vyy2XO0n6682sCP6-rCEnqV3o_LAYC-84-m_KNpUFPrRVWBIFyvrgtTwEXBbnhvRhemLXFzzQ_VAvLXlass6f_nY78f2AGGjLfgd"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-color)] via-[var(--background-color)]/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center flex-grow text-center px-6 pt-20">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-2">TradiPlay</h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)]">Your Gateway to Malay Heritage</p>
        </div>
        
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">Welcome!</h2>
          <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-10">
            Discover and play traditional Malay games, preserving our cultural heritage in a digital world.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 p-6 w-full max-w-md mx-auto">
        <div className="flex flex-col gap-4">
          <Button onClick={handleExploreAsGuest}>
            Explore as Guest
          </Button>
          <Button variant="secondary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}