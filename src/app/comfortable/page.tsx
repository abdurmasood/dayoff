import type { Metadata } from 'next'
import { ComfortablePage } from '@/components/comfortable/ComfortablePage'
import '@/styles/comfortable.css'

export const metadata: Metadata = {
  title: 'Comfortable',
}

export default function ComfortableRoute() {
  return <ComfortablePage />
}
