'use client'
import { useRouter, usePathname } from 'next/navigation'

export default function FloatingChatButton() {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === '/chatbot' || pathname === '/admin' || pathname === '/superadmin'|| pathname === '/'|| pathname === '/auth/login'|| pathname === '/auth/signup') return null

  return (
    <button
      onClick={() => router.push('/chatbot')}
      className="fixed bottom-20 right-4 z-50 w-14 h-14 bg-[var(--primary-color)] text-black rounded-full shadow-lg hover:bg-[var(--accent-color)] transition-colors duration-200 flex items-center justify-center"
    >
      <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V4H8"/>
        <rect width="16" height="12" x="4" y="8" rx="2"/>
        <path d="M2 14h2"/>
        <path d="M20 14h2"/>
        <path d="M15 13v2"/>
        <path d="M9 13v2"/>
      </svg>
    </button>
  )
}
