import { sendConfirmationEmail } from '@/lib/loops'
import { createRateLimiter } from '@/lib/rate-limit'
import { handleSubscribe } from '@/lib/subscribe'
import { createSubscribeToken } from '@/lib/subscribe-token'

const allowIp = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 5 })
const allowEmail = createRateLimiter({ windowMs: 60 * 60 * 1000, max: 3 })

function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }

  return request.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Email required' }, { status: 400 })
  }

  const origin = new URL(request.url).origin
  const result = await handleSubscribe(body, {
    allowRequest(email) {
      const ipOk = allowIp(clientKey(request))
      const emailOk = allowEmail(email)
      return ipOk && emailOk
    },
    async requestConfirmation(email) {
      const token = createSubscribeToken(email)
      await sendConfirmationEmail(
        email,
        `${origin}/api/subscribe/confirm?token=${encodeURIComponent(token)}`,
      )
    },
  })

  return Response.json(result.body, { status: result.status })
}
