export type SubscribeResult = {
  status: number
  body: { ok?: boolean; error?: string }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function handleSubscribe(
  body: unknown,
  deps: { subscribe: (email: string) => Promise<void> },
): Promise<SubscribeResult> {
  if (!body || typeof body !== 'object') {
    return { status: 400, body: { error: 'Email required' } }
  }

  const { email, website } = body as {
    email?: unknown
    website?: unknown
  }

  if (typeof website === 'string' && website.trim() !== '') {
    return { status: 200, body: { ok: true } }
  }

  if (typeof email !== 'string' || email.trim() === '') {
    return { status: 400, body: { error: 'Email required' } }
  }

  const normalized = email.trim().toLowerCase()
  if (!EMAIL_PATTERN.test(normalized)) {
    return { status: 400, body: { error: 'Invalid email' } }
  }

  try {
    await deps.subscribe(normalized)
    return { status: 200, body: { ok: true } }
  } catch {
    return { status: 500, body: { error: 'Subscription failed' } }
  }
}
