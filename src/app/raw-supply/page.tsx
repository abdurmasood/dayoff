import type { Metadata } from 'next'
import { RawSupplyPage } from '@/components/raw-supply/RawSupplyPage'
import '@/styles/raw-supply.css'

export const metadata: Metadata = {
  title: 'Accessories',
}

export default function RawSupplyRoute() {
  return <RawSupplyPage />
}
