export const DEPARTMENTS = [
  { id: 'tops', label: '01_TOPS', href: '/tops' },
  { id: 'jackets', label: '02_JACKETS' },
  { id: 'accessories', label: '03_ACCESSORIES', href: '/accessories' },
  { id: 'comfortable', label: '04_COMFORTABLE', href: '/comfortable' },
] as const

export type DepartmentId = (typeof DEPARTMENTS)[number]['id']
