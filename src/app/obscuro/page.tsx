import type { Metadata } from 'next'
import { ObscuroPage } from '@/components/obscuro/ObscuroPage'
import '@/styles/obscuro.css'

export const metadata: Metadata = {
  title: 'Obscuro',
}

export default function ObscuroRoute() {
  return <ObscuroPage />
}
