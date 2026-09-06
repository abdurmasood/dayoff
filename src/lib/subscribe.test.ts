import { describe, expect, it, vi } from 'vitest'
import { handleSubscribe } from './subscribe'

describe('handleSubscribe', () => {
  it('rejects a missing email', async () => {
    const subscribe = vi.fn()
    const result = await handleSubscribe({}, { subscribe })

    expect(result.status).toBe(400)
    expect(result.body).toEqual({ error: 'Email required' })
    expect(subscribe).not.toHaveBeenCalled()
  })

  it('rejects an invalid email', async () => {
    const subscribe = vi.fn()
    const result = await handleSubscribe({ email: 'not-an-email' }, { subscribe })

    expect(result.status).toBe(400)
    expect(result.body).toEqual({ error: 'Invalid email' })
    expect(subscribe).not.toHaveBeenCalled()
  })

  it('ignores honeypot submissions without calling subscribe', async () => {
    const subscribe = vi.fn()
    const result = await handleSubscribe(
      { email: 'person@example.com', website: 'https://spam.test' },
      { subscribe },
    )

    expect(result.status).toBe(200)
    expect(result.body).toEqual({ ok: true })
    expect(subscribe).not.toHaveBeenCalled()
  })

  it('subscribes a trimmed lowercase email', async () => {
    const subscribe = vi.fn()
    const result = await handleSubscribe(
      { email: '  Person@Example.COM  ' },
      { subscribe },
    )

    expect(result.status).toBe(200)
    expect(result.body).toEqual({ ok: true })
    expect(subscribe).toHaveBeenCalledWith('person@example.com')
  })

  it('returns 500 when subscribe fails', async () => {
    const subscribe = vi.fn().mockRejectedValue(new Error('loops down'))
    const result = await handleSubscribe(
      { email: 'person@example.com' },
      { subscribe },
    )

    expect(result.status).toBe(500)
    expect(result.body).toEqual({ error: 'Subscription failed' })
  })
})
