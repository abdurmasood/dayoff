import { JetBrains_Mono, Syne } from 'next/font/google'

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

export default function ObscuroLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={`${syne.variable} ${jetbrainsMono.variable}`}
      style={{ display: 'contents' }}
    >
      {children}
    </div>
  )
}
