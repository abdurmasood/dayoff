import type { Metadata } from 'next'
import { ShopPage } from '@/components/shop/ShopPage'
import '@/styles/shop.css'

export const metadata: Metadata = {
  title: 'Tops',
}

export default function TopsRoute() {
  return <ShopPage />
}
