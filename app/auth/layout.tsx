export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden bg-[#122118]">
      {children}
    </div>
  )
}
