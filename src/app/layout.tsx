import type { Metadata } from 'next'
import { Noto_Sans_JP, Oswald, Space_Mono, Syncopate } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'A/A/V/V - FASHION STUDIO',
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
      className={`${oswald.variable} ${spaceMono.variable} ${syncopate.variable} ${notoSansJp.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
