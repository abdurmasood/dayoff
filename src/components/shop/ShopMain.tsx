import { ProductCard } from './ProductCard'
import { PRODUCTS } from './products'

type ShopMainProps = {
  cartCount: number
  onAddToCart: () => void
}

export function ShopMain({ cartCount, onAddToCart }: ShopMainProps) {
  return (
    <div className="main-content">
      <div className="marquee-container">
        <div className="marquee-content">
          INVENTORY UPDATE /// AW&apos;24 SUBTERRANEAN COLLECTION NOW AVAILABLE
          /// WARNING: GARMENTS MAY CAUSE ABRASION /// DESIGNED FOR EXTREME
          CONDITIONS ONLY ///
        </div>
      </div>

      <div className="top-bar">
        <div className="page-title">TOPS_GRID</div>
        <div>SHOWING: 1-6 OF 28 ITEMS</div>
        <div className="cart-btn">CART [{cartCount}]</div>
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
