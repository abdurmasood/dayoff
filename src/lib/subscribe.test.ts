import { describe, expect, it, vi } from 'vitest'
import { handleConfirm, handleSubscribe } from './subscribe'

describe('handleSubscribe', () => {
  it('rejects a missing email', async () => {
    const requestConfirmation = vi.fn()
    const result = await handleSubscribe({}, { requestConfirmation })

    expect(result.status).toBe(400)
    expect(result.body).toEqual({ error: 'Email required' })
    expect(requestConfirmation).not.toHaveBeenCalled()
  })

  it('rejects an invalid email', async () => {
    const requestConfirmation = vi.fn()
    const result = await handleSubscribe(
      { email: 'not-an-email' },
      { requestConfirmation },
    )

    expect(result.status).toBe(400)
    expect(result.body).toEqual({ error: 'Invalid email' })
    expect(requestConfirmation).not.toHaveBeenCalled()
  })

  it('ignores honeypot submissions without requesting confirmation', async () => {
    const requestConfirmation = vi.fn()
    const result = await handleSubscribe(
      { email: 'person@example.com', website: 'https://spam.test' },
      { requestConfirmation },
    )

    expect(result.status).toBe(200)
    expect(result.body).toEqual({ ok: true })
    expect(requestConfirmation).not.toHaveBeenCalled()
  })

  it('does not enroll the address; it only requests confirmation', async () => {
    const requestConfirmation = vi.fn()
    const result = await handleSubscribe(
      { email: '  Person@Example.COM  ' },
      { requestConfirmation },
    )

    expect(result.status).toBe(200)
    expect(result.body).toEqual({ ok: true })
    expect(requestConfirmation).toHaveBeenCalledWith('person@example.com')
  })

  it('rejects when the client is over the request quota', async () => {
    const requestConfirmation = vi.fn()
    const result = await handleSubscribe(
      { email: 'person@example.com' },
      { requestConfirmation, allowRequest: () => false },
    )

    expect(result.status).toBe(429)
    expect(result.body).toEqual({ error: 'Try again later' })
    expect(requestConfirmation).not.toHaveBeenCalled()
  })

  it('returns 500 when confirmation request fails', async () => {
    const requestConfirmation = vi.fn().mockRejectedValue(new Error('loops down'))
    const result = await handleSubscribe(
      { email: 'person@example.com' },
      { requestConfirmation },
    )

    expect(result.status).toBe(500)
    expect(result.body).toEqual({ error: 'Subscription failed' })
  })
})

describe('handleConfirm', () => {
  it('enrolls the address only after a valid confirmation token', async () => {
    const subscribe = vi.fn()
    const result = await handleConfirm('valid-token', {
      subscribe,
      resolveEmail: (token) => (token === 'valid-token' ? 'person@example.com' : null),
    })

    expect(result.status).toBe(200)
    expect(result.body).toEqual({ ok: true })
    expect(subscribe).toHaveBeenCalledWith('person@example.com')
  })

  it('does not enroll when the token is missing or invalid', async () => {
    const subscribe = vi.fn()
    const result = await handleConfirm('bad-token', {
      subscribe,
      resolveEmail: () => null,
    })

    expect(result.status).toBe(400)
    expect(result.body).toEqual({ error: 'Invalid confirmation' })
    expect(subscribe).not.toHaveBeenCalled()
  })

  it('returns 500 when enrollment after confirm fails', async () => {
    const subscribe = vi.fn().mockRejectedValue(new Error('loops down'))
    const result = await handleConfirm('valid-token', {
      subscribe,
      resolveEmail: () => 'person@example.com',
    })

    expect(result.status).toBe(500)
    expect(result.body).toEqual({ error: 'Subscription failed' })
  })
})
