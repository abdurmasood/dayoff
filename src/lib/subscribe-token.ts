import { createHmac, timingSafeEqual } from 'node:crypto'

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000

function secret() {
  const value = process.env.SUBSCRIBE_SECRET ?? process.env.LOOPS_API_KEY
  if (!value) {
    throw new Error('Subscribe token secret is not configured')
  }
  return value
}

function sign(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('hex')
}

export function createSubscribeToken(email: string, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ email, exp: now + TOKEN_TTL_MS })).toString(
    'base64url',
  )
  return `${payload}.${sign(payload)}`
}

export function verifySubscribeToken(token: string, now = Date.now()): string | null {
  const separator = token.lastIndexOf('.')
  if (separator <= 0) return null

  const payload = token.slice(0, separator)
  const signature = token.slice(separator + 1)

  try {
    const expected = sign(payload)
    if (signature.length !== expected.length) return null
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null

    const data = JSON.parse(Buffer.from(payload, 'base64url').toString()) as {
      email?: unknown
      exp?: unknown
    }
    if (typeof data.email !== 'string' || typeof data.exp !== 'number') return null
    if (data.exp < now) return null
    return data.email
  } catch {
    return null
  }
}
