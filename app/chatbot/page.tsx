'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ChatbotPage() {
  const router = useRouter()
  const [message, setMessage] = useState('')

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="flex-grow flex flex-col">
        <header className="flex items-center bg-[var(--background-color)] p-4 pb-2 justify-between sticky top-0 z-10 border-b border-gray-800">
          <div className="flex w-12">
            <button 
              onClick={() => router.back()}
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 text-[var(--text-primary)] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-2 hover:bg-gray-800"
            >
              <svg className="text-[var(--text-primary)]" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-[var(--text-primary)] text-lg font-bold leading-tight tracking-[-0.015em]">TradiBot</h1>
            <p className="text-xs text-[var(--text-secondary)]">Online</p>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button 
              onClick={() => router.push('/explore')}
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 text-[var(--text-primary)] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-2 hover:bg-gray-800"
            >
              <svg className="text-[var(--text-primary)]" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-grow p-4 overflow-y-auto space-y-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center">
              <svg className="text-[var(--primary-color)]" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V4H8"></path><rect height="8" rx="2" width="8" x="4" y="12"></rect><path d="M20 12v4h-4"></path><path d="m18.5 6.5-5 5"></path>
              </svg>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-xs">
              <p className="text-sm">Hello! I'm TradiBot. I can help you learn about traditional Malay games. What would you like to know?</p>
            </div>
          </div>

          <div className="flex items-start gap-3 justify-end">
            <div className="bg-[var(--primary-color)] text-black p-3 rounded-lg rounded-br-none max-w-xs">
              <p className="text-sm">Tell me about Congkak.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center">
              <svg className="text-[var(--primary-color)]" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V4H8"></path><rect height="8" rx="2" width="8" x="4" y="12"></rect><path d="M20 12v4h-4"></path><path d="m18.5 6.5-5 5"></path>
              </svg>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-xs">
              <p className="text-sm">Congkak is a mancala game played in Malaysia, Singapore, and Brunei. It involves two players moving seeds or marbles around a wooden board with several holes. The goal is to collect more seeds than your opponent. Would you like to know the rules?</p>
            </div>
          </div>

          <div className="flex gap-2 justify-start ml-11">
            <button className="bg-gray-700 text-white py-2 px-4 rounded-full text-sm hover:bg-gray-600">Yes, please</button>
            <button className="bg-gray-700 text-white py-2 px-4 rounded-full text-sm hover:bg-gray-600">No, thanks</button>
            <button className="bg-gray-700 text-white py-2 px-4 rounded-full text-sm hover:bg-gray-600">Another game</button>
          </div>
        </main>

        <footer className="sticky bottom-0 bg-gray-900 p-4">
          <div className="flex items-center gap-2">
            <input 
              className="form-input flex-grow min-w-0 resize-none overflow-hidden rounded-full text-[var(--text-primary)] focus:outline-0 focus:ring-2 focus:ring-[var(--primary-color)] border-none bg-gray-800 h-12 placeholder:text-gray-400 px-4 text-sm font-normal leading-normal" 
              placeholder="Type your message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="flex items-center justify-center h-12 w-12 rounded-full bg-[var(--primary-color)] text-black hover:bg-[var(--secondary-color)] transition-colors">
              <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13L2 9L22 2zM13 22L9 13"></path>
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
