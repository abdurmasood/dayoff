export type Product = {
  id: string
  skuLabel: string
  material: string
  name?: string
  description: string
  price: string
  barcode?: string
  image?: string
  imageHeight?: number
  alt?: string
  variant: 'image' | 'text'
  soldOut?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: '001',
    skuLabel: 'ITEM // 001',
    material: '100% NYLON',
    name: 'TACTICAL\nHARNESS V.2',
    description:
      'WHAT A LIBERATION TO REALIZE THAT THE STRUCTURAL INTEGRITY OF THIS GARMENT IS NOT DEFINED BY ITS UTILITY, BUT BY ITS PRESENCE. HEAVYWEIGHT WEBBING, MATTE HARDWARE, ADJUSTABLE FIT. THE ONE WHO WEARS THIS SEES THAT.',
    price: '$ 240.00 USD',
    barcode: '|| | ||| || | | ||',
    image:
      'https://images.unsplash.com/photo-1520975867597-0af37a22e31e?q=80&w=1000&auto=format&fit=crop',
    imageHeight: 300,
    alt: 'Texture',
    variant: 'image',
  },
  {
    id: '002',
    skuLabel: 'ITEM // 002',
    material: 'COTTON / 400GSM',
    name: 'VOID\nHOODIE\nOVER\nSIZED',
    description:
      'ENGINEERED FOR ISOLATION. DROPPED SHOULDERS, RAW HEMS, DOUBLE-LAYERED HOOD. A VOID TO INHABIT. THIS PIECE ACTS AS A PHYSICAL MANIFESTATION OF ABSENCE. WASH COLD. DRY FLAT. DO NOT IRON.',
    price: '$ 185.00 USD',
    barcode: '| ||| | || | ||| |',
    variant: 'text',
    soldOut: true,
  },
  {
    id: '003',
    skuLabel: 'ITEM // 003',
    material: 'METAL / ACETATE',
    description:
      'OPTICAL SHIELDING. UV400 PROTECTION ENCASED IN INDUSTRIAL GRADE ACETATE. DESIGNED FOR HARSH ENVIRONMENTS AND ARTIFICIAL LIGHT.',
    price: '$ 310.00 USD',
    barcode: 'SKU: OPT-99X',
    image:
      'https://images.unsplash.com/photo-1614165936126-2ed18e471b3b?q=80&w=1000&auto=format&fit=crop',
    imageHeight: 200,
    alt: 'Sunglasses',
    variant: 'image',
  },
  {
    id: '004',
    skuLabel: 'ITEM // 004',
    material: 'SYNTHETIC LEATHER',
    name: 'TREAD BOOT',
    description:
      'AGGRESSIVE OUTSOLE, ZIP CLOSURE, REINFORCED TOE. BUILT TO TRAVERSE CONCRETE LANDSCAPES. ABRASION RESISTANT.',
    price: '$ 450.00 USD',
    barcode: '||| || | | || |||',
    image:
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1000&auto=format&fit=crop',
    imageHeight: 400,
    alt: 'Shoes',
    variant: 'image',
  },
]
