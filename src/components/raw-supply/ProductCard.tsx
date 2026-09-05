import { useState } from 'react'
import type { Product, StickerKind } from './products'

type CartStatus = 'idle' | 'adding' | 'added'

type ProductCardProps = {
  product: Product
  onAddToCart: () => void
}

function LimitedBarcode() {
  return (
    <svg
      className="barcode-svg"
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
    >
      <rect x="0" y="0" width="2" height="30" fill="#050505" />
      <rect x="4" y="0" width="5" height="30" fill="#050505" />
      <rect x="11" y="0" width="1" height="30" fill="#050505" />
      <rect x="14" y="0" width="3" height="30" fill="#050505" />
      <rect x="19" y="0" width="6" height="30" fill="#050505" />
      <rect x="27" y="0" width="2" height="30" fill="#050505" />
      <rect x="31" y="0" width="1" height="30" fill="#050505" />
      <rect x="34" y="0" width="4" height="30" fill="#050505" />
      <rect x="40" y="0" width="2" height="30" fill="#050505" />
      <rect x="44" y="0" width="7" height="30" fill="#050505" />
      <rect x="53" y="0" width="1" height="30" fill="#050505" />
      <rect x="56" y="0" width="3" height="30" fill="#050505" />
      <rect x="61" y="0" width="2" height="30" fill="#050505" />
      <rect x="65" y="0" width="5" height="30" fill="#050505" />
      <rect x="72" y="0" width="1" height="30" fill="#050505" />
      <rect x="75" y="0" width="4" height="30" fill="#050505" />
      <rect x="81" y="0" width="2" height="30" fill="#050505" />
      <rect x="85" y="0" width="6" height="30" fill="#050505" />
      <rect x="93" y="0" width="1" height="30" fill="#050505" />
      <rect x="96" y="0" width="4" height="30" fill="#050505" />
    </svg>
  )
}

function ProductSticker({ kind }: { kind: StickerKind }) {
  if (kind === 'hot') {
    return (
      <div className="sticker st-4 sticker-stamp solid-shadow stamp-hot">
        <div className="stamp-inner">
          HOT
          <br />
          ITEM
        </div>
      </div>
    )
  }

  if (kind === 'check') {
    return (
      <div className="sticker st-5 sticker-check">
        <svg viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="var(--c-yellow)"
            stroke="var(--fg)"
            strokeWidth="3"
          />
          <path
            d="M30 50 L45 65 L70 35"
            fill="none"
            stroke="var(--fg)"
            strokeWidth="6"
            strokeLinecap="square"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="sticker st-2 sticker-barcode sticker-limited">
      <span className="barcode-text">LIMITED EDITION</span>
      <LimitedBarcode />
    </div>
  )
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [status, setStatus] = useState<CartStatus>('idle')

  function handleAdd() {
    if (status !== 'idle') return
    setStatus('adding')
    window.setTimeout(() => {
      onAddToCart()
      setStatus('added')
      window.setTimeout(() => setStatus('idle'), 1500)
    }, 500)
  }

  const label =
    status === 'adding'
      ? 'ADDING...'
      : status === 'added'
        ? 'ADDED [OK]'
        : 'ADD TO CART'

  const priceClass =
    product.priceTone && product.priceTone !== 'yellow'
      ? `product-price tone-${product.priceTone}`
      : 'product-price'

  const buttonClass = [
    'btn-add',
    'solid-shadow',
    product.buttonTone && product.buttonTone !== 'default'
      ? `tone-${product.buttonTone}`
      : '',
    status !== 'idle' ? 'is-busy' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className="product-card">
      {product.sticker ? <ProductSticker kind={product.sticker} /> : null}
      <div className="product-image-container">
        <img src={product.image} alt={product.alt} />
      </div>
      <div className="product-meta">
        <div className="product-header">
          <h2 className="product-title">{product.name}</h2>
          <span className={priceClass}>{product.price}</span>
        </div>
        <div className="product-specs">
          <span className="spec-line">SKU: {product.sku}</span>
          {product.specs.map((spec) => (
            <span className="spec-line" key={spec}>
              {spec}
            </span>
          ))}
        </div>
        <button type="button" className={buttonClass} onClick={handleAdd}>
          <span>{label}</span>
        </button>
      </div>
    </article>
  )
}
