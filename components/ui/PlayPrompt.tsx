interface PlayPromptProps {
  gameName: string
  onSignUp?: () => void
}

export default function PlayPrompt({ gameName, onSignUp }: PlayPromptProps) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 text-center">
      <h2 className="text-2xl font-bold mb-2 text-white">Play Now</h2>
      <p className="text-[var(--text-secondary)] mb-6">
        As an unregistered user, you have limited playability. Sign up now for full access to {gameName} and other traditional Malay games!
      </p>
      <button 
        onClick={onSignUp}
        className="w-full bg-[var(--primary-color)] text-black py-3 px-6 rounded-full font-bold hover:bg-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition-colors duration-200 ease-in-out"
      >
        Sign Up for Full Access
      </button>
    </div>
  )
}
