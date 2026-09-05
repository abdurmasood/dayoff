import type { Metadata } from 'next'
import { SiteCursor } from '@/components/SiteCursor'
import '@/styles/cursor.css'
import '@/styles/studio.css'

export const metadata: Metadata = {
  title: {
    default: 'Day Off',
    template: '%s | Day Off',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SiteCursor />
        {children}
      </body>
    </html>
  )
}
