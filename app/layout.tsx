import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const metadata: Metadata = {
  title: 'PadelClub - Book Your Court',
  description: 'Premium padel court booking platform',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">
        {process.env.MONGODB_URI ? null : (
          <div className="w-full bg-blue-50 border-b border-blue-200 text-blue-900 py-3 text-center text-sm z-60">
            <strong>Demo Mode:</strong> All data is stored locally in your browser. Refresh the page to keep your bookings!
          </div>
        )}
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
