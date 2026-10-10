import Link from 'next/link'
import { getStripe } from '@/lib/stripe'
import '@/styles/shop.css'

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>
}) {
  const params = await searchParams
  const sessionId = Array.isArray(params.session_id)
    ? params.session_id[0]
    : params.session_id

  let paid = false
  if (sessionId?.startsWith('cs_')) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId)
      paid = session.payment_status === 'paid'
    } catch {
      paid = false
    }
  }

  return (
    <main className="shop shop-checkout">
      <p>{paid ? 'Payment received' : 'Payment not confirmed'}</p>
      <Link href="/tops">Back to shop</Link>
    </main>
  )
}
