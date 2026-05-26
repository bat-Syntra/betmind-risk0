import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'BetMind - AI Sports Predictions',
  description:
    'AI-powered sports betting predictions. UFC, NBA, NFL, Football. Find +EV value bets and winning strategies.',
  generator: 'v0.app',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BetMind',
  },
  openGraph: {
    title: 'BetMind - AI Sports Predictions',
    description: 'AI-powered sports betting predictions',
    url: 'https://betmind.biz',
    siteName: 'BetMind',
  },
}

export const viewport: Viewport = {
  themeColor: '#0b1120',
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
    <html lang="en" className={`${inter.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
