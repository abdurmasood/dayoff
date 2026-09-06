import { ProductCard } from './ProductCard'
import { PRODUCTS } from './products'
import { ShopCartBadge } from './ShopCartBadge'

export function ShopMain() {
  return (
    <div className="main-content">
      <div className="top-bar">
        <div className="page-title">TOPS_GRID</div>
        <div>SHOWING: 1-6 OF 28 ITEMS</div>
        <ShopCartBadge />
      </div>

      <div className="shop-grid">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
