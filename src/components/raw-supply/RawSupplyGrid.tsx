import { ProductCard } from './ProductCard'
import { PRODUCTS } from './products'

type RawSupplyGridProps = {
  onAddToCart: () => void
}

export function RawSupplyGrid({ onAddToCart }: RawSupplyGridProps) {
  return (
    <main className="shop-container">
      {PRODUCTS.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </main>
  )
}
