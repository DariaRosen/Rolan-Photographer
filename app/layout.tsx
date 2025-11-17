import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.scss'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rolan - Professional Photography',
  description: 'Professional photography services for portraits, events, and commercial projects.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

