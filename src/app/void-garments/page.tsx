import type { Metadata } from 'next'
import { VoidGarmentsPage } from '@/components/void-garments/VoidGarmentsPage'

export const metadata: Metadata = {
  title: 'VOID GARMENTS',
}

export default function VoidGarmentsRoute() {
  return <VoidGarmentsPage />
}
