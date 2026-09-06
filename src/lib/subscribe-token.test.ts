import { afterEach, describe, expect, it } from 'vitest'
import {
  createSubscribeToken,
  verifySubscribeToken,
} from './subscribe-token'

const originalSecret = process.env.SUBSCRIBE_SECRET

afterEach(() => {
  process.env.SUBSCRIBE_SECRET = originalSecret
})

describe('subscribe tokens', () => {
  it('round-trips an email and rejects a tampered token', () => {
    process.env.SUBSCRIBE_SECRET = 'test-secret'
    const token = createSubscribeToken('person@example.com')

    expect(verifySubscribeToken(token)).toBe('person@example.com')
    expect(verifySubscribeToken(`${token}x`)).toBeNull()
  })

  it('rejects an expired token', () => {
    process.env.SUBSCRIBE_SECRET = 'test-secret'
    const token = createSubscribeToken('person@example.com', 0)

    expect(verifySubscribeToken(token, 24 * 60 * 60 * 1000 + 1)).toBeNull()
  })
})
