import type { Metadata } from 'next'
import { JacketsPage } from '@/components/jackets/JacketsPage'

export const metadata: Metadata = {
  title: 'JACKETS',
}

export default function JacketsRoute() {
  return <JacketsPage />
}
