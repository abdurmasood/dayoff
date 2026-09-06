import Link from 'next/link'
import { PRODUCTS } from './products'
import { VoidGarmentsNoise } from './VoidGarmentsNoise'

export function VoidGarmentsPage() {
  return (
    <div className="void-garments">
      <svg className="svg-filters" aria-hidden>
        <defs>
          <filter
            id="void-garments-bleed"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6 0.1"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feMorphology
              operator="dilate"
              radius="0.5"
              in="displaced"
              result="thickened"
            />
            <feColorMatrix
              type="matrix"
              values="
                    0 0 0 0 0.12
                    0 0 0 0 0.11
                    0 0 0 0 0.11
                    0 0 0 1 0
                "
              in="thickened"
            />
          </filter>
        </defs>
      </svg>

      <VoidGarmentsNoise />

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
              <div key={item.id} className="data-item">
                <span>[{item.id}]</span>
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>

          <div className="massive side-massive">BODY</div>
        </div>

        <div className="sub-footer">
          <span className="distressed">SUPPORT</span>
          <span className="distressed">FROM</span>
        </div>

        <h1 className="massive bottom-massive">SYNDICATE</h1>

        <div className="footer">
          <span className="mono">©2024 VOID ENT.</span>
          <Link href="/" className="mono">
            VOID-GARMENT.COM
          </Link>
        </div>
      </div>
    </div>
  )
}
