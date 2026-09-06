import Link from 'next/link'
import { PRODUCTS } from './products'
import { VoidGarmentsShell } from './VoidGarmentsShell'

export function VoidGarmentsPage() {
  return (
    <VoidGarmentsShell>
      <div className="poster">
        <div className="header">
          <Link href="/" className="mono">
            001
          </Link>
          <span className="mono">FW/24</span>
        </div>

        <div className="title-block">
          <h1 className="massive title-line title-void">VOID</h1>
          <h1 className="massive title-line garments">GARMENT</h1>
        </div>

        <div className="mid-section">
          <div className="jagged-col left">
            <span className="distressed">SYSTEMS</span>
            <span className="distressed">OF</span>
            <span className="distressed">DRESS</span>
          </div>

          <div className="massive mid-massive">THE</div>

          <div className="jagged-col right">
            <span className="distressed">FORM</span>
            <span className="distressed">OVER</span>
            <span className="distressed">FLESH</span>
            <span className="distressed">2024</span>
          </div>
        </div>

        <div className="lower-section">
          <div className="massive side-massive">ON</div>

          <div className="data-list">
            {PRODUCTS.map((item) => (
              <Link
                key={item.id}
                href={`/void-garments/${item.id}`}
                className="data-item"
              >
                <span>[{item.id}]</span>
                <span>{item.name}</span>
                <span>{item.price}</span>
              </Link>
            ))}
          </div>

          <div className="massive side-massive">BODY</div>
        </div>

        <div className="sub-footer">
          <span className="distressed">JACKETS</span>
        </div>

        <h1 className="massive bottom-massive">SYNDICATE</h1>

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
