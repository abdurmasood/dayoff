import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { VoidGarmentProductPage } from '@/components/void-garments/VoidGarmentProductPage'
import { getProduct, PRODUCTS } from '@/components/void-garments/products'

export async function generateStaticParams() {
  return PRODUCTS.map((item) => ({ id: item.id }))
}

export async function generateMetadata({
  params,
}: PageProps<'/void-garments/[id]'>): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  if (!product) {
    return { title: 'VOID GARMENTS' }
  }
  return { title: `VOID GARMENTS — ${product.name}` }
}

export default async function VoidGarmentProductRoute({
  params,
}: PageProps<'/void-garments/[id]'>) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) {
    notFound()
  }

  return <VoidGarmentProductPage product={product} />
}
