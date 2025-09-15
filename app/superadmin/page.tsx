'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SuperadminPanel() {
  const router = useRouter()
  const [admins] = useState([
    {
      id: 1,
      name: 'Ahmad',
      role: 'Admin',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAoqQJ_O9Oty83KZyV0aJXC8Q8a3_k07sE0jCqZjPkO4oJMEXXbyGSEbYcltSWHmDR-5y00qDxVEWbZNnfwTuIRcnDA2i_gaMQBZhBk76PaCazcD9vz4tuuM5nT5CMrrECNGqJ2UoM3uStJ7Q_jO6lbwAB6y4Xr0clC0EV45ZWvHLZQWyF6Z76-4whz9McVIh902uBqWsc6P_iXwW9etBNDPUpBJHHgEMhBhag_U21FMJZaEHSDjiRve0qoAimgWB_Dx9Q5P9MN8n9'
    },
    {
      id: 2,
      name: 'Siti',
      role: 'Admin',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaZ6P0wwe668mDS8oLTN-38T9mGvRLIPsezBuoZS1xhGcariJtkK6bHi0XB_Kt3x12ldOT37xf-_X8WBiUy-Lb2BnXsNEIwCQZ4y1vV7-_fDECTLtn0GsfphQwlU2jFNz5XpRhV8RJirvfDmQmPoGTCIYA8t2KZXA3TW6JEyh2XprRGJAhsIvj2i0rz4_-jqFbfe14s5_qPqQhKektRtz_ThkWVggLGuX-fucHMt1EA8d9naT0U2zIQlWxuoV56HqLw0BfBxfVvvB8'
    },
    {
      id: 3,
      name: 'Ravi',
      role: 'Admin',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTWke_CXR9cRypDDbID_iUTDm49Lcnw8IHZ4P--jxDQyAPRX9cX6qwKS8nstBlwCrKss2V3BDxGSdpH832YBx-2RC9szO8pQGqkWkgeu65wga2aA7hdyryjiPEjA6eS8VuZLxruMr154CG6z8qentvpbiRPyHp8Zj1twUymyzXVml-K4hgf28mQkx_dMG5oAs06-w7o2ySOdZHcNVkvs_6khmjE0zSKptl8x42Jb4oFXQhDGGVr8PoKMuniGuCj8KgBSFcDaOD0fIV'
    },
    {
      id: 4,
      name: 'Mei Ling',
      role: 'Admin',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqu3jFha7yorCa8ylzcTrhrO_HU3pC53Ww1Dt4LSxvps3wCnnraCszLEiZkVyLcV3cHLdRVDvAP5Hs1uJ-i0mfHKVncpyVB4KxOTN6rLleIt9taHnHhT5WwvSg2Ylwe5eZtxhTDWV_haJlFSwV9DaSdZi356uwuW4T6lFd67LFkus3PbqvTyZYLmh-L41bBGtENf5LGHkN77G4i9fnTYQwjUe6sal-QrHN0RU1J5_0HrwZ8Chzh9amnYaj_BUbSt0EWUyUPtI3e42T'
    }
  ])

  const handleBack = () => {
    router.back()
  }

  const handleLogout = () => {
    router.push('/auth/signup')
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col justify-between">
      <div>
        <header className="flex items-center p-4">
          <button className="text-[var(--text-primary)] p-2" onClick={handleBack}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold text-center flex-grow">Superadmin Panel</h1>
          <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2" onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span>
          </button>
        </header>
        
        <main className="px-4">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Manage Admins</h2>
          <div className="space-y-4">
            {admins.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-4 bg-[var(--surface-color)] rounded-xl border border-[#444444]">
                <div className="flex items-center gap-4">
                  <img 
                    alt={`${admin.name}'s profile picture`} 
                    className="h-14 w-14 rounded-full object-cover" 
                    src={admin.avatar}
                  />
                  <div>
                    <p className="text-lg font-semibold text-[var(--text-primary)]">{admin.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{admin.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors p-2">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className="text-[var(--text-secondary)] hover:text-red-500 transition-colors p-2">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      
      <footer className="sticky bottom-0 p-4 bg-[var(--background-color)]">
        <button className="w-full flex items-center justify-center gap-2 rounded-xl h-14 bg-[var(--primary-color)] text-black font-bold text-lg leading-normal tracking-wide shadow-lg hover:bg-opacity-90 transition-all duration-300">
          <span className="material-symbols-outlined">add_circle</span>
          <span>Add New Admin</span>
        </button>
      </footer>
    </div>
  )
}
