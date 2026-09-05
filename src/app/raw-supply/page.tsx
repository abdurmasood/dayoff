import type { Metadata } from 'next'
import { RawSupplyPage } from '@/components/raw-supply/RawSupplyPage'
import '@/styles/raw-supply.css'

export const metadata: Metadata = {
  title: 'RAW SUPPLY',
}

export default function RawSupplyRoute() {
  return <RawSupplyPage />
}
