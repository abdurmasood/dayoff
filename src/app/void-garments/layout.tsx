import { Anton, Space_Mono } from 'next/font/google'

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
})

export default function VoidGarmentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={`${anton.variable} ${spaceMono.variable}`}
      style={{ display: 'contents' }}
    >
      {children}
    </div>
  )
}
