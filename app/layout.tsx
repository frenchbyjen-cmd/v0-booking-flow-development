import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'

import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-dm-serif' })

export const metadata: Metadata = {
  title: 'Sports With Jen | Book Your Flow in Tamraght',
  description: 'Book sports & wellness activities in Tamraght, Morocco. Choose your flow and start your journey with surf, yoga, and more.',
}

export const viewport: Viewport = {
  themeColor: '#3a9eaa',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
