'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../../components/ui/Button'
import GameCard from '../../components/ui/GameCard'
import SearchBar from '../../components/ui/SearchBar'

const featuredGames = [
  {
    id: 'congkak',
    title: "Congkak",
    description: "A traditional mancala game",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcFvtLVeK-kD20vjpXJCP6sy3DOLTMCNP0oo8vmKuHlJ8EiFGtZ_NkKNdiWDXW2whEr-utO14AdjMbdBub9SnjZS8sEO3vGEN4DniJ7xXCSMNyxV40Mg4i9M04Y5intRr3NtUHGjpLogCGNFcVdTsbxPQLXdK_IPncsnT_UTbjBb2LMtRbE4XdZ7DyJB0ojeTZKFvcQKIV0eyXjxfvRFVa4KZueeXNoJD5ZbAi8kahGDOjmIUGbPqBMDthYs7ZfPRWOBcRr4-dfT8Q"
  },
  {
    id: 'gasing',
    title: "Gasing",
    description: "A traditional spinning top game",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3Ub1r8OkzdvB6LV8qcoq-MQcH7pnuDF5EU9XbtCR9wKUCvye-hri03LCRwLNJbeSYHvYGKH2xn-X1NTYnqNc3iaSYABEyHZo75RS_GGBzm3JJpL5liD6Huy_vwsL8axM-_fk5QU6NXKZVwt3ba5VM7NX_k6oYsi2nEoOkZKQyF8XDsTpP7OWkBgnkSiKU5CA8_mJNRJaqjSrHYc6e0GpvD4irgNDS-wmYcP-G-xhmR3faxWKgcbbwYPrbvKkWCngq0UlrUnAIsn0F"
  },
  {
    id: 'wau',
    title: "Wau",
    description: "A traditional kite game",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPslYJigkkmE5D-ZJl-jdJNZem8_Upv5Z0jdDhO8cxRmd-P5pHbLDqjBmPZ0kVFjQBth9tNtiimHwwqkETC_Ec9a1uFlN4cALzeyjKk-0AbGr-VzJbqrv68ZQS4pJfeIIQsCCP1MNu6PQEEoIX28JZz4oMOm9DprpIgalYB8C0Ja3bAMRLQQ2dLlVSHIdLyfojw8mGAUsH3FyWCxqbRxUxXGdBCQuNwSgQvKk7d-_SCBkjBeC_lbS1c1gmWA0MeickITPO83MgQNLQ"
  }
]

const otherGames = [
  {
    id: 'batu-seremban',
    title: "Batu Seremban",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIIeXizaNjMadeKrrvgOag1smLpTiCUhXP0moXSMA34-t-JleFBtd39nfkE-cu4m-iu1ZIHoXNu6Ae_CRUU9tUu5Eibxeyi3X95yCIcP_aKlenWJT0v4ho5PZ-e71x4IHcM5TMpZCFwp9ysjEWCgPxjUH0Lua-85W-xySEwh_Ap8znQtQNZrfwhTy0UjmSJddCCIubOQ0vpvBX9wOW8LKwcXl8SSTL1zZl9NAX3Np1NG_6Iuiz5HwpYVQ0piRfc_-W8oSGeqWrZ-XO"
  },
  {
    id: 'sepak-takraw',
    title: "Sepak Takraw",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5TQJssGELYEAnwGR223u-u0NzQ0DlQvZtE9_EtrHHsVXtc6dhLIAzdPE0Mopv3_SyLeChky6_GXoKqcTEBLno4e1zGf9iTfBZbGJ8-jgphASZWUb0glXhhNznGxj1BoCIp3n3r3GGusyyatuHLkRyPxlLSTr0-Vi3PIMc388piKkuSgLobcwnlEpA-HhhoQKrueJBnqaGaZ7MqIvRlnkqkxNdAsa_PXrs8bgqP17iWTOPaQH3TgEbZLCPBj4XUCEZohhpPNaDi8nA"
  },
  {
    id: 'dam-haji',
    title: "Dam Haji",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlVFyWcXcKglY6C40FSQH7vSidkHKB7oNXWEEMVTSacCNbIfcPeUEps4aO9WyUNIZbyZqlXL_7uVNK8t7dgXhdvkfz0_BWS2jZCk3HVxKWZNWdNQEQYiGoGa5HbHngewBM1q5WEHfVGUXq7xP657NyTdRFrZkyvVg9X2z2-l6m9h4UbqW-eEYyEv0t_L7-O0Op3ZbWHfonZXzzG-0el3584jy2fbDrw5Wcstqri1Q2TME5IuQpXOjoteYjFEvFr2HaK4TwEpWQ61fW"
  },
  {
    id: 'kabbadi',
    title: "Kabbadi",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNWkEWzDDTtpfEIbZCu_GPmBoBPm0oWkUqe9cZoJd1p2R8bJJ7Zc3A1qFUa2396kCZ12xprre-tVD9v47mvqtOIRJs3DH2M0CJz9PQYJT08WEqgVZoK3cf4qjx9BSwU5bI5o-srhBq5JgRvtcfkyPDUpchTfC4LE_qAkE8AYAhiRRz3FrhpNC-bsZh1LxlNpc_euw2Yc3cH99uJpwPM7XdsSMlXNXmdAxCvXaEa5Q8pAreCJkoP8juSqKDuZszXq-SOKuUS0YCue6H"
  }
]

const categories = [
  "Board Games",
  "Outdoor Games", 
  "Strategy",
  "Skill"
]

export default function ExplorePage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleGameClick = (gameId: string) => {
    router.push(`/games/${gameId}`)
  }

  const handleSignUp = () => {
    router.push('/auth/signup')
  }

  const handleLearnMore = () => {
    console.log('Learn more clicked')
  }

  return (
    <div>
      {/* Header */}
      <header className="flex items-center p-4 pb-2 justify-between">
        <h1 className="text-[var(--text-primary)] text-xl md:text-2xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12">
          TradiPlay
        </h1>
        <div className="flex w-12 items-center justify-end">
          <button className="p-2 rounded-full hover:bg-gray-700 text-[var(--text-primary)] transition-colors duration-200 ease-in-out">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <SearchBar />

      {/* Featured Games Section */}
      <section className="py-5">
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-3 px-4">
          Featured Games
        </h2>
        <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 gap-4">
          {featuredGames.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              imageUrl={game.imageUrl}
              onClick={() => handleGameClick(game.id)}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-5">
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-3">
          Categories
        </h2>
        <div className="flex gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-[var(--secondary-color)] text-[var(--text-primary)]'
                  : 'bg-gray-800 text-[var(--text-primary)] hover:bg-[var(--secondary-color)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Games Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4 pb-20">
        {otherGames.map((game) => (
          <div key={game.id} className="flex flex-col gap-3">
            <div 
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl cursor-pointer hover:scale-105 transition-transform duration-200"
              style={{ backgroundImage: `url("${game.imageUrl}")` }}
              onClick={() => handleGameClick(game.id)}
            />
            <p className="text-[var(--text-primary)] text-base font-medium">{game.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
