export type PriceTone = 'yellow' | 'sunshine' | 'plain' | 'green'
export type ButtonTone = 'default' | 'denim' | 'inverted'
export type StickerKind = 'hot' | 'check' | 'limited'

export type Product = {
  id: string
  name: string
  price: string
  sku: string
  specs: string[]
  image: string
  alt: string
  sticker?: StickerKind
  priceTone?: PriceTone
  buttonTone?: ButtonTone
}

export const PRODUCTS: Product[] = [
  {
    id: 'HD-09-BLK',
    name: 'HEAVYWEIGHT OVERSIZED HOODIE',
    price: '$120',
    sku: 'HD-09-BLK',
    specs: ['WT: 450 GSM COTTON', 'FIT: BOXY / CROPPED'],
    image:
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Heavyweight Hoodie',
    sticker: 'hot',
  },
  {
    id: 'PT-11-OLV',
    name: 'RIPSTOP TACTICAL CARGO',
    price: '$145',
    sku: 'PT-11-OLV',
    specs: ['MAT: NYLON RIPSTOP', 'FEAT: 8-POCKET SYSTEM'],
    image:
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Tactical Cargo Pants',
    priceTone: 'sunshine',
    buttonTone: 'denim',
  },
  {
    id: 'TS-01-WHT',
    name: 'INDUSTRIAL LOGO TEE',
    price: '$45',
    sku: 'TS-01-WHT',
    specs: ['PRNT: PUFF INK', 'FIT: RELAXED'],
    image:
      'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Graphic Tee',
    sticker: 'check',
    priceTone: 'plain',
  },
  {
    id: 'FT-99-GRY',
    name: 'TREAD-01 UTILITY SNEAKER',
    price: '$210',
    sku: 'FT-99-GRY',
    specs: ['SOLE: VIBRAM CHUNKY', 'MAT: SUEDE / MESH'],
    image:
      'https://images.pexels.com/photos/2068257/pexels-photo-2068257.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Chunky Sneakers',
    sticker: 'limited',
    priceTone: 'green',
    buttonTone: 'inverted',
  },
]
