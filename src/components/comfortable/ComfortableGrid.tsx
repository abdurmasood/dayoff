import { ProductCard } from './ProductCard'
import { PRODUCTS } from './products'

type ComfortableGridProps = {
  onAddToCart: () => void
}

export function ComfortableGrid({ onAddToCart }: ComfortableGridProps) {
  return (
    <main className="comfortable-main">
      {PRODUCTS.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          cardClass={`card-${index + 1}`}
          onAddToCart={onAddToCart}
        />
      ))}
    </main>
  )
}
