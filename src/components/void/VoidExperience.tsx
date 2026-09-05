import Link from 'next/link'
import { VoidArchiveDate } from './VoidArchiveDate'
import { VoidEnterControl } from './VoidEnterControl'

export function VoidExperience() {
  return (
    <main className="interface">
      <div className="margin-top">
        <div className="brand-cluster text-bold">
          <Link href="/" className="brand-name interactive">
            <span className="brand-back" aria-hidden>
              ←
            </span>
            <span className="brand-label">Day Off</span>
          </Link>
        </div>
        <div className="text-small text-right">
          COORDINATES
          <br />
          51.5074° N, 0.1278° W
          <br />
          <span className="inverted-badge location-badge">
            London, United Kingdom
          </span>
        </div>
      </div>

      <div className="margin-left text-small text-bold">
        <span>
          VALID ON <VoidArchiveDate />
        </span>
      </div>

      <div className="center-stage">
        <div className="crosshair-tl" />
        <div className="crosshair-br" />
        <VoidEnterControl />
      </div>

      <div className="specs-overlay interactive">
        <div className="text-bold specs-heading">COLLECTION OVERVIEW</div>
        <div className="spec-row text-small">
          <span>SEASON</span>
          <span>AUTUMN/WINTER &apos;24</span>
        </div>
        <div className="spec-row text-small">
          <span>MATERIALS</span>
          <span>DECONSTRUCTED KEVLAR</span>
        </div>
        <div className="spec-row text-small">
          <span>METHOD</span>
          <span>SUBTRACTIVE PATTERNING</span>
        </div>
        <div className="spec-row text-small">
          <span>ITEMS</span>
          <span>14 UNIQUE FORMS</span>
        </div>
      </div>

      <div className="margin-right text-small text-bold">
        <span>PROCESS OVER OUTCOME</span>
        <span>STUDIO_V_OID // DECONSTRUCTED FORM</span>
      </div>

      <div className="margin-bottom">
        <div className="text-small">
          SYSTEM VER. 9.4.2
          <br />
          RENDER QUALITY: DEGRADED
        </div>
        <div className="text-small text-right">
          V_OID vs. THE INDUSTRY
          <br />
          COPYRIGHT MMXXIV
        </div>
      </div>
    </main>
  )
}
