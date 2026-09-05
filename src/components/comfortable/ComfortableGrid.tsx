import { ProductCard } from './ProductCard'
import { PRODUCTS } from './products'

export function ComfortableGrid() {
  return (
    <main className="comfortable-main">
      {PRODUCTS.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          cardClass={`card-${index + 1}`}
        />
      ))}
    </main>
  )
}
