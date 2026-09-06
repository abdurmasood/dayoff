export type SubscribeResult = {
  status: number
  body: { ok?: boolean; error?: string }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function handleSubscribe(
  body: unknown,
  deps: {
    requestConfirmation: (email: string) => Promise<void>
    allowRequest?: (email: string) => boolean
  },
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

  if (deps.allowRequest && !deps.allowRequest(normalized)) {
    return { status: 429, body: { error: 'Try again later' } }
  }

  try {
    await deps.requestConfirmation(normalized)
    return { status: 200, body: { ok: true } }
  } catch {
    return { status: 500, body: { error: 'Subscription failed' } }
  }
}

export async function handleConfirm(
  token: unknown,
  deps: {
    subscribe: (email: string) => Promise<void>
    resolveEmail: (token: string) => string | null
  },
): Promise<SubscribeResult> {
  if (typeof token !== 'string' || token.trim() === '') {
    return { status: 400, body: { error: 'Invalid confirmation' } }
  }

  const email = deps.resolveEmail(token)
  if (!email) {
    return { status: 400, body: { error: 'Invalid confirmation' } }
  }

  try {
    await deps.subscribe(email)
    return { status: 200, body: { ok: true } }
  } catch {
    return { status: 500, body: { error: 'Subscription failed' } }
  }
}
