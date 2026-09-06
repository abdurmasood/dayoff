export type LookbookItem = {
  id: string
  name: string
  price: string
  description: string
}

export const PRODUCTS: LookbookItem[] = [
  {
    id: '01',
    name: 'HEAVY CANVASS BLAZER',
    price: '$850',
    description:
      'CONSTRUCTED FROM 24OZ MILITARY-GRADE CANVASS. REINFORCED SEAMS. ASYMMETRIC CLOSURE. DESIGNED FOR URBAN ABRASION AND ELEMENTAL RESISTANCE. FORM OVER FLESH.',
  },
  {
    id: '02',
    name: 'DISTRESSED KNIT SWEATER',
    price: '$420',
    description:
      'SHREDDED MERINO KNIT WITH DROPPED SHOULDER AND RAW-CUT HEM. HOLES ARE STRUCTURAL, NOT DECAY. BUILT TO LOOK USED BEFORE IT IS WORN. FORM OVER FLESH.',
  },
  {
    id: '03',
    name: 'ASYMMETRIC CARGO PANT',
    price: '$600',
    description:
      'OFFSET CARGO STACK. REINFORCED KNEE. ONE-SIDED CLOSURE THAT REFUSES SYMMETRY. CUT FOR MOVEMENT THROUGH RUINED TERRAIN. FORM OVER FLESH.',
  },
  {
    id: '04',
    name: 'TACTICAL HARNESS VEST',
    price: '$350',
    description:
      'LOAD-BEARING WEBBING OVER A RIGID PLACKET. NO ORNAMENT. EVERY STRAP IS A HANDLE. WORN OVER THE BLAZER OR AGAINST THE RIB. FORM OVER FLESH.',
  },
  {
    id: '05',
    name: 'STEEL-TOE COMBAT BOOT',
    price: '$980',
    description:
      'GOODYEAR-WELTED COMBAT LAST. STEEL TOE. LUG SOLE FOR BROKEN GROUND. BUILT TO OUTLAST THE BODY THAT WEARS IT. FORM OVER FLESH.',
  },
]

export function getProduct(id: string): LookbookItem | undefined {
  return PRODUCTS.find((item) => item.id === id)
}
