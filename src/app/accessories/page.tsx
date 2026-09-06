import type { Metadata } from 'next'
import { AccessoriesPage } from '@/components/accessories/AccessoriesPage'
import '@/styles/accessories.css'

export const metadata: Metadata = {
  title: 'Accessories',
}

export default function AccessoriesRoute() {
  return <AccessoriesPage />
}
