import { VoidGarmentsExperience } from '@/components/void-garments/VoidGarmentsExperience'
import '@/styles/void-garments.css'

export default function VoidGarmentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <VoidGarmentsExperience>{children}</VoidGarmentsExperience>
}
