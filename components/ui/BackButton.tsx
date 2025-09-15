'use client'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button 
      onClick={() => router.back()}
      className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
    >
      <svg 
        className="text-[var(--text-primary)]" 
        fill="currentColor" 
        height="24" 
        viewBox="0 0 256 256" 
        width="24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
      </svg>
    </button>
  )
}
