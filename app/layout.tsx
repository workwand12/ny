import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { BookingButton } from '@/components/BookingButton'
import { BookingPanel } from '@/components/BookingPanel'
import { BookingPanelProvider } from '@/hooks/useBookingPanel'

export const metadata: Metadata = {
  title: 'Náttúra YÚRTEL | Experience Iceland\'s Golden Circle',
  description: 'Custom-made yurts, handcrafted in Mongolia and nestled in the heart of Iceland\'s wilderness. Authentic Mongolian yurt experience in the Golden Circle.',
  openGraph: {
    title: 'Náttúra YÚRTEL | Experience Iceland\'s Golden Circle',
    description: 'Custom-made yurts, handcrafted in Mongolia and nestled in the heart of Iceland\'s wilderness.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans">
        <BookingPanelProvider>
          <Navigation />
          <main>{children}</main>
          <BookingButton />
          <BookingPanel />
        </BookingPanelProvider>
      </body>
    </html>
  )
}

