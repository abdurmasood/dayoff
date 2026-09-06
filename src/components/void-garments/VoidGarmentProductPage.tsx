import Link from 'next/link'
import type { LookbookItem } from './products'
import { VoidGarmentsShell } from './VoidGarmentsShell'

export function VoidGarmentProductPage({ product }: { product: LookbookItem }) {
  const titleLines = product.name.split(' ')

  return (
    <VoidGarmentsShell>
      <div className="poster poster-product">
        <div className="header">
          <Link href="/void-garments" className="mono">
            {'< BACK [INDEX]'}
          </Link>
          <span className="mono">
            ITEM {product.id} // FW/24
          </span>
        </div>

        <div className="content-grid">
          <div className="image-col">
            <div className="placeholder-image">
              <span>[IMAGE MISSING]</span>
            </div>
          </div>

          <div className="info-col">
            <div>
              <h1 className="massive product-title">
                {titleLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </h1>
              <div className="distressed product-price">{product.price}</div>
              <div className="product-desc">{product.description}</div>
            </div>

            <button type="button" className="massive add-to-cart">
              ADD TO CART
            </button>
          </div>
        </div>

        <div className="footer">
          <span className="mono">©2024 VOID ENT.</span>
          <Link href="/" className="mono">
            VOID-GARMENT.COM
          </Link>
        </div>
      </div>
    </VoidGarmentsShell>
  )
}
