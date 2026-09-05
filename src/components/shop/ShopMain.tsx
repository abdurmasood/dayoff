import { ProductCard } from './ProductCard'
import { PRODUCTS } from './products'
import { ShopMarquee } from './ShopMarquee'

type ShopMainProps = {
  cartCount: number
  onAddToCart: () => void
}

export function ShopMain({ cartCount, onAddToCart }: ShopMainProps) {
  return (
    <div className="main-content">
      <ShopMarquee />

      <div className="top-bar">
        <div className="page-title">TOPS_GRID</div>
        <div>SHOWING: 1-6 OF 28 ITEMS</div>
        <div className="cart-btn">
          CART [{cartCount}] <span className="cart-arrow">→</span>
        </div>
      </div>

      <div className="shop-grid">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  )
}
