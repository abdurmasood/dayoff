export type Product = {
  id: string
  name: string
  price: string
  color: string
  ref: string
  material: string
  image: string
  soldOut?: boolean
  rare?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: '8892-A',
    name: 'KEVLAR VEST V.1',
    price: '$850.00',
    color: 'OBSIDIAN',
    ref: '8892-A',
    material: 'BALLISTIC',
    image:
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
    rare: true,
  },
  {
    id: '7710-B',
    name: 'TACTICAL SHELL',
    price: '$1200.00',
    color: 'VOID',
    ref: '7710-B',
    material: 'NYLON-RIPSTOP',
    image:
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
    rare: true,
  },
  {
    id: '4421-C',
    name: 'ISOLATION PANTS',
    price: '$650.00',
    color: 'ASH',
    ref: '4421-C',
    material: 'TYVEK',
    image:
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
    soldOut: true,
  },
  {
    id: '1102-D',
    name: 'HARNESS TEE',
    price: '$320.00',
    color: 'OBSIDIAN',
    ref: '1102-D',
    material: 'SYNTHETIC',
    image:
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '9980-E',
    name: 'UTILITY RIG',
    price: '$980.00',
    color: 'VOID',
    ref: '9980-E',
    material: 'CORDURA',
    image:
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2234-F',
    name: 'EXO-GLOVES',
    price: '$150.00',
    color: 'ASH',
    ref: '2234-F',
    material: 'NEOPRENE',
    image:
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]
