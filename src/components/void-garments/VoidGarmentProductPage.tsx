import Link from 'next/link'
import type { LookbookItem } from './products'
import { VoidGarmentsAddToCart } from './VoidGarmentsAddToCart'
import { VoidGarmentsChrome } from './VoidGarmentsChrome'
import { VoidGarmentsShell } from './VoidGarmentsShell'

export function VoidGarmentProductPage({ product }: { product: LookbookItem }) {
  const titleLines = product.name.split(' ')

  return (
    <VoidGarmentsShell>
      <div className="poster poster-product">
        <div className="header">
          <div className="header-left">
            <Link href="/void-garments" className="mono header-home">
              {'< BACK [INDEX]'}
            </Link>
            <span className="mono">ITEM {product.id} // FW/24</span>
          </div>
          <VoidGarmentsChrome />
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

            <VoidGarmentsAddToCart />
          </div>
        </div>
      </div>
    </VoidGarmentsShell>
  )
}
