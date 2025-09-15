'use client'
import BackButton from '../../components/ui/BackButton'

export default function ProfilePage() {
  return (
    <div className="flex-grow">
      <header className="sticky top-0 z-10 bg-[var(--background-color)] bg-opacity-80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <BackButton />
          <h1 className="text-xl font-bold text-center flex-1 pr-10">Profile</h1>
        </div>
      </header>

      <main className="p-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Avatar Section */}
          <div className="relative">
            <img 
              alt="User Avatar" 
              className="w-32 h-32 rounded-full border-4 border-[var(--primary-color)]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbAgyTbqHTU_9axH4Sz0yrlrbBAD_fdIWEQwmONmNSKRIfjlU5rWRXUO9sl1pJUFhXEFTYuLyz4_-2BsGx62sqEVGCHG6RAUv9o5rWEJgA7keoz5pgrDIL_3r-VejeSaERJ3CYpRKlOxKdXReNjGiXDPRlxAs66ANuG-9MQZhussVt_Fr85o05wRqugHa3hj4bL7kHra9b9RhwBsu1TpBKc1XlvgY3fU4bXoaLbIVl84MuPKjsHWsVjG8JfDmafBKWeQVDTnWNWgg-"
            />
            <button className="absolute bottom-0 right-0 bg-[var(--primary-color)] text-black p-2 rounded-full hover:bg-[var(--accent-color)] transition-colors">
              <svg className="feather feather-edit-2" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
            </button>
          </div>

          {/* Name */}
          <h2 className="text-3xl font-bold text-white">Ahmad Zulkifli</h2>

          {/* Profile Settings */}
          <div className="w-full space-y-4 pt-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Email Address</p>
                <p className="text-lg font-medium text-white">ahmad.z@email.com</p>
              </div>
              <button className="text-[var(--primary-color)] hover:text-[var(--accent-color)] font-semibold transition-colors">
                Change
              </button>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Password</p>
                <p className="text-lg font-medium text-white">••••••••••••</p>
              </div>
              <button className="text-[var(--primary-color)] hover:text-[var(--accent-color)] font-semibold transition-colors">
                Change
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
