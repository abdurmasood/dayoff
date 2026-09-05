export type FilterItem = {
  id: string
  label: string
  count?: string
  checked: boolean
}

export const INITIAL_MATERIALS: FilterItem[] = [
  { id: 'kevlar', label: 'KEVLAR', checked: false },
  { id: 'nylon', label: 'NYLON', checked: false },
  { id: 'tyvek', label: 'TYVEK', checked: false },
]
