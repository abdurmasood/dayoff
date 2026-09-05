import type { Metadata } from 'next'
import { ShopPage } from '@/components/shop/ShopPage'
import '@/styles/shop.css'

export const metadata: Metadata = {
  title: 'Shop',
}

export default function ShopRoute() {
  return <ShopPage />
}
