const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

export function shopIntegrationIdentifier() {
  let suffix = ''
  for (let index = 0; index < 8; index += 1) {
    suffix += LETTERS[Math.floor(Math.random() * LETTERS.length)]
  }

  return `dayoff_shop_${suffix}`
}
