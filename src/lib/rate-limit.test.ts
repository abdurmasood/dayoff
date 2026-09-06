import { describe, expect, it } from 'vitest'
import { createRateLimiter } from './rate-limit'

describe('createRateLimiter', () => {
  it('allows up to max hits in the window and then blocks', () => {
    const allow = createRateLimiter({ windowMs: 1000, max: 2 })

    expect(allow('ip', 0)).toBe(true)
    expect(allow('ip', 100)).toBe(true)
    expect(allow('ip', 200)).toBe(false)
  })

  it('allows a new hit after older hits leave the window', () => {
    const allow = createRateLimiter({ windowMs: 1000, max: 1 })

    expect(allow('ip', 0)).toBe(true)
    expect(allow('ip', 999)).toBe(false)
    expect(allow('ip', 1000)).toBe(true)
  })
})
