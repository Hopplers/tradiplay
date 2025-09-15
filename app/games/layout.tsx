import BottomNav from '../../components/layout/BottomNav'

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden">
      <div className="flex-grow">
        {children}
      </div>
      <BottomNav />
    </div>
  )
}