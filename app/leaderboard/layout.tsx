import BottomNav from '../../components/layout/BottomNav'

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden">
      {children}
      <BottomNav />
    </div>
  )
}
