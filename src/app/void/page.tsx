import type { Metadata } from 'next'
import { VoidPage } from '@/components/void/VoidPage'
import '@/styles/void.css'

export const metadata: Metadata = {
  title: 'V_OID',
}

export default function VoidRoute() {
  return <VoidPage />
}
