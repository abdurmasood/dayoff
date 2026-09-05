import { Space_Mono, Syncopate } from 'next/font/google'

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

export default function ComfortableLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={`${spaceMono.variable} ${syncopate.variable}`}
      style={{ display: 'contents' }}
    >
      {children}
    </div>
  )
}
