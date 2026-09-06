import { ProductCard } from './ProductCard'
import { PRODUCTS } from './products'

export function AccessoriesGrid() {
  return (
    <main className="shop-container">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  )
}
