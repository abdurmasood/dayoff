import type { LookbookItem } from './products'
import { JacketsAddToCart } from './JacketsAddToCart'
import { JacketsChrome } from './JacketsChrome'
import { JacketsShell } from './JacketsShell'

export function JacketProductPage({ product }: { product: LookbookItem }) {
  const titleLines = product.name.split(' ')

  return (
    <JacketsShell>
      <div className="poster poster-product">
        <div className="header">
          <JacketsChrome />
          <span className="mono header-item">ITEM {product.id} // FW/24</span>
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

            <JacketsAddToCart />
          </div>
        </div>
      </div>
    </JacketsShell>
  )
}
