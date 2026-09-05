import type { Metadata } from 'next'
import {
  JetBrains_Mono,
  Noto_Sans_JP,
  Oswald,
  Space_Mono,
  Syncopate,
  Syne,
} from 'next/font/google'
import { SiteCursor } from '@/components/SiteCursor'
import '@/styles/cursor.css'
import '@/styles/studio.css'

const oswald = Oswald({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-oswald',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
})

const syncopate = Syncopate({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-syncopate',
})

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-noto-sans-jp',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains-mono',
})

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
    <html
      lang="en"
      className={`${oswald.variable} ${spaceMono.variable} ${syncopate.variable} ${notoSansJp.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SiteCursor />
        {children}
      </body>
    </html>
  )
}
