import { useState } from 'react'
import type { Product } from './products'

type CartStatus = 'idle' | 'adding' | 'added'

type ProductCardProps = {
  product: Product
  cardClass: string
  onAddToCart: () => void
}

function TitleLines({ name, className }: { name: string; className: string }) {
  const lines = name.split('\n')
  return (
    <h2 className={className}>
      {lines.map((line, index) => (
        <span key={line}>
          {index > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </h2>
  )
}

export function ProductCard({
  product,
  cardClass,
  onAddToCart,
}: ProductCardProps) {
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

  const label = product.soldOut
    ? '[ OUT OF STOCK ]'
    : status === 'adding'
      ? 'ADDING...'
      : status === 'added'
        ? 'ADDED [OK]'
        : '[ ADD TO CART ]'

  const cardClasses = [
    'product-card',
    cardClass,
    product.variant === 'text' ? 'text-only-card' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const buttonClasses = [
    'btn-add',
    product.soldOut ? 'is-sold-out' : '',
    status !== 'idle' ? 'is-busy' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const markerClass = product.barcode?.includes('|') ? 'barcode' : undefined

  const details = (
    <>
      {product.name ? (
        <TitleLines
          name={product.name}
          className={
            product.variant === 'text' ? 'massive-text' : 'product-title'
          }
        />
      ) : null}
      <div className="product-desc">{product.description}</div>
      <div className="price-row">
        <span className={markerClass}>{product.barcode}</span>
        <span>{product.price}</span>
      </div>
      <button
        type="button"
        className={buttonClasses}
        disabled={product.soldOut}
        onClick={handleAdd}
      >
        {label}
      </button>
    </>
  )

  return (
    <article className={cardClasses}>
      <div className="card-header">
        <span>{product.skuLabel}</span>
        <span>{product.material}</span>
      </div>
      {product.variant === 'image' && product.image ? (
        <img
          className="card-image"
          src={product.image}
          alt={product.alt ?? product.name ?? product.skuLabel}
          style={
            product.imageHeight
              ? { height: `${product.imageHeight}px` }
              : undefined
          }
        />
      ) : null}
      {product.variant === 'text' ? details : <div className="card-body">{details}</div>}
    </article>
  )
}
