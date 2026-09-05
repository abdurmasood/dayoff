import { useState } from 'react'
import type { Product } from './products'

type CartStatus = 'idle' | 'adding' | 'added'

type ProductCardProps = {
  product: Product
  onAddToCart: () => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [status, setStatus] = useState<CartStatus>('idle')

  function handleAdd() {
    if (product.soldOut || status !== 'idle') return
    setStatus('adding')
    window.setTimeout(() => {
      onAddToCart()
      setStatus('added')
      window.setTimeout(() => setStatus('idle'), 1500)
    }, 500)
  }

  const label =
    product.soldOut
      ? 'UNAVAILABLE // -'
      : status === 'adding'
        ? 'ADDING...'
        : status === 'added'
          ? 'ADDED [OK]'
          : 'ADD TO CART // +'

  return (
    <div className={`product-card${product.soldOut ? ' sold-out' : ''}`}>
      <div className="product-image-container">
        {product.rare && <div className="product-meta">RARE</div>}
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-price-row">
          <span>COLOR: {product.color}</span>
          <span>{product.price}</span>
        </div>
        <button
          className={`add-to-cart${status !== 'idle' ? ' is-busy' : ''}`}
          disabled={product.soldOut}
          onClick={handleAdd}
        >
          {label}
        </button>
      </div>
    </div>
  )
}
