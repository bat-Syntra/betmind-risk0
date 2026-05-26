import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/components/betmind/auth-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'BetMind — +EV Sports Betting Terminal',
  description:
    'Real-time +EV value bets, CLV tracking, and sharp money analysis. UFC, NBA, NFL, Football.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BetMind',
  },
  openGraph: {
    title: 'BetMind — +EV Sports Betting Terminal',
    description: 'Real-time +EV value bets and CLV tracking',
    url: 'https://betmind.biz',
    siteName: 'BetMind',
  },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} bg-[#111111]`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
