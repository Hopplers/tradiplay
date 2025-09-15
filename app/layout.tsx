import './globals.css'
import FloatingChatButton from '../components/ui/FloatingChatButton'
import { AuthProvider } from '../contexts/AuthContext'

export const metadata = {
  title: 'TradiPlay',
  description: 'Your Gateway to Malay Heritage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <meta name="theme-color" content="#38e07b" />
      </head>
      <body className="bg-[var(--background-color)]">
        <AuthProvider>
          {children}
          <FloatingChatButton />
        </AuthProvider>
      </body>
    </html>
  )
}