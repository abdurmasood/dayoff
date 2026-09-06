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
