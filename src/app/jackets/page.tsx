import type { Metadata } from 'next'
import { VoidGarmentsPage } from '@/components/void-garments/VoidGarmentsPage'

export const metadata: Metadata = {
  title: 'JACKETS',
}

export default function JacketsRoute() {
  return <VoidGarmentsPage />
}
