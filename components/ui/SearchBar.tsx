export default function SearchBar() {
    return (
      <div className="px-4 py-3">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
            search
          </span>
          <input 
            className="w-full p-3 pl-12 bg-gray-800 border border-gray-700 rounded-full text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors duration-200 ease-in-out" 
            placeholder="Search for games" 
            type="text"
          />
        </div>
      </div>
    )
  }