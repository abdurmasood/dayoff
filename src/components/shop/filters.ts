export type FilterItem = {
  id: string
  label: string
  count?: string
  checked: boolean
}

export const INITIAL_CATEGORIES: FilterItem[] = [
  { id: 'outerwear', label: 'OUTERWEAR', count: '12', checked: false },
  { id: 'tops', label: 'TOPS', count: '08', checked: true },
  { id: 'bottoms', label: 'BOTTOMS', count: '05', checked: false },
  { id: 'accs', label: 'ACCS', count: '03', checked: false },
]

export const INITIAL_MATERIALS: FilterItem[] = [
  { id: 'kevlar', label: 'KEVLAR', checked: false },
  { id: 'nylon', label: 'NYLON', checked: false },
  { id: 'tyvek', label: 'TYVEK', checked: false },
]
