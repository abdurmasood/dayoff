import { Noto_Sans_JP, Oswald, Space_Mono, Syncopate } from 'next/font/google'

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

export default function ManifestoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={`${oswald.variable} ${spaceMono.variable} ${syncopate.variable} ${notoSansJp.variable}`}
      style={{ display: 'contents' }}
    >
      {children}
    </div>
  )
}
