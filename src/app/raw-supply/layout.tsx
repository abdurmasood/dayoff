import { Space_Mono } from 'next/font/google'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
})

export default function RawSupplyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={spaceMono.variable} style={{ display: 'contents' }}>
      {children}
    </div>
  )
}
