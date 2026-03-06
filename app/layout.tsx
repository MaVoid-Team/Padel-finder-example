import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import { LanguageProvider } from '@/components/language-provider'
import { DemoModeBanner } from '@/components/demo-mode-banner'
import './globals.css'

export const metadata: Metadata = {
  title: 'بادل كلوب - احجز ملعبك',
  description: 'منصة مميزة لحجز ملاعب البادل',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">
        <LanguageProvider>
          <DemoModeBanner />
          {children}
          <Toaster />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}
