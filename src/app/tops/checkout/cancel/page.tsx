import Link from 'next/link'
import '@/styles/shop.css'

export default function CheckoutCancelPage() {
  return (
    <main className="shop shop-checkout">
      <p>Payment cancelled</p>
      <Link href="/tops">Back to shop</Link>
    </main>
  )
}
