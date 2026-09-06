import { JacketsExperience } from '@/components/jackets/JacketsExperience'
import '@/styles/jackets.css'

export default function JacketsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <JacketsExperience>{children}</JacketsExperience>
}
