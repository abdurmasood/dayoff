/**
 * POST /api/subscribe
 *
 * Reads the email and sends the confirmation link.
 */

import { subscribe } from './subscribe'

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
  const result = await subscribe(body, { origin, clientKey: clientKey(request) })
  return Response.json(result.body, { status: result.status })
}
