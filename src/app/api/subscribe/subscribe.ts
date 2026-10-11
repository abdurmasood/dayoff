import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { LoopsClient } from 'loops'

export type SubscribeResult = {
  status: number
  body: { ok?: boolean; error?: string }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function createRateLimiter(options: { windowMs: number; max: number }) {
  const hits = new Map<string, number[]>()

  return function allow(key: string, now = Date.now()) {
    const windowStart = now - options.windowMs
    const recent = (hits.get(key) ?? []).filter((time) => time > windowStart)

    if (recent.length >= options.max) {
      hits.set(key, recent)
      return false
    }

    recent.push(now)
    hits.set(key, recent)
    return true
  }
}

const allowIp = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 5 })
const allowEmail = createRateLimiter({ windowMs: 60 * 60 * 1000, max: 3 })

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

const CONFIRM_EMAIL_NAME = 'Day Off subscribe confirmation'

let cachedConfirmTransactionalId: string | null = null

function loopsClient() {
  const apiKey = process.env.LOOPS_API_KEY
  const listId = process.env.LOOPS_MAILING_LIST_ID

  if (!apiKey || !listId) {
    throw new Error('Loops is not configured')
  }

  return { loops: new LoopsClient(apiKey), listId }
}

async function addToLoopsList(email: string) {
  const { loops, listId } = loopsClient()
  await loops.updateContact({
    email,
    mailingLists: { [listId]: true },
  })
}

async function sendConfirmationEmail(email: string, confirmUrl: string) {
  const { loops } = loopsClient()
  const transactionalId = await getConfirmTransactionalId(loops)
  await loops.sendTransactionalEmail({
    transactionalId,
    email,
    addToAudience: false,
    dataVariables: { confirmUrl },
  })
}

async function getConfirmTransactionalId(loops: LoopsClient) {
  if (process.env.LOOPS_CONFIRM_TRANSACTIONAL_ID) {
    return process.env.LOOPS_CONFIRM_TRANSACTIONAL_ID
  }

  if (cachedConfirmTransactionalId) {
    return cachedConfirmTransactionalId
  }

  const listed = await loops.listTransactionalEmails({ perPage: 50 })
  const existing = listed.data.find(
    (item) => item.name === CONFIRM_EMAIL_NAME && item.publishedEmailMessageId,
  )
  if (existing) {
    cachedConfirmTransactionalId = existing.id
    return existing.id
  }

  const created = await loops.createTransactionalEmail({ name: CONFIRM_EMAIL_NAME })
  if (!created.draftEmailMessageId) {
    throw new Error('Loops confirmation email draft is missing')
  }

  await loops.updateEmailMessage(created.draftEmailMessageId, {
    expectedRevisionId: created.draftEmailMessageContentRevisionId ?? undefined,
    subject: 'Confirm your Day Off signup',
    previewText: 'Confirm to join the list',
    fromName: 'Day Off',
    fromEmail: 'hello',
    emailFormat: 'plain',
    lmx: '<Paragraph><Text>Confirm your Day Off mailing list signup:</Text></Paragraph><Button href="{data.confirmUrl}">Confirm subscription</Button>',
  })
  await loops.publishTransactionalEmail(created.id)
  cachedConfirmTransactionalId = created.id
  return created.id
}

export async function subscribe(
  body: unknown,
  input: { origin: string; clientKey: string },
): Promise<SubscribeResult> {
  return handleSubscribe(body, {
    allowRequest(email) {
      const ipOk = allowIp(input.clientKey)
      const emailOk = allowEmail(email)
      return ipOk && emailOk
    },
    async requestConfirmation(email) {
      const token = createSubscribeToken(email)
      await sendConfirmationEmail(
        email,
        `${input.origin}/api/subscribe/confirm?token=${encodeURIComponent(token)}`,
      )
    },
  })
}

export async function confirm(token: unknown): Promise<SubscribeResult> {
  return handleConfirm(token, {
    subscribe: addToLoopsList,
    resolveEmail: verifySubscribeToken,
  })
}
