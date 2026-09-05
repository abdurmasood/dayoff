import Link from 'next/link'

type RawSupplyHeaderProps = {
  cartCount: number
}

function HeaderBarcode() {
  return (
    <svg
      className="barcode-svg"
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
    >
      <rect x="0" y="0" width="3" height="30" fill="#050505" />
      <rect x="5" y="0" width="1" height="30" fill="#050505" />
      <rect x="8" y="0" width="4" height="30" fill="#050505" />
      <rect x="14" y="0" width="2" height="30" fill="#050505" />
      <rect x="18" y="0" width="1" height="30" fill="#050505" />
      <rect x="22" y="0" width="6" height="30" fill="#050505" />
      <rect x="30" y="0" width="2" height="30" fill="#050505" />
      <rect x="34" y="0" width="5" height="30" fill="#050505" />
      <rect x="42" y="0" width="1" height="30" fill="#050505" />
      <rect x="45" y="0" width="3" height="30" fill="#050505" />
      <rect x="50" y="0" width="2" height="30" fill="#050505" />
      <rect x="54" y="0" width="7" height="30" fill="#050505" />
      <rect x="63" y="0" width="1" height="30" fill="#050505" />
      <rect x="66" y="0" width="3" height="30" fill="#050505" />
      <rect x="71" y="0" width="4" height="30" fill="#050505" />
      <rect x="77" y="0" width="2" height="30" fill="#050505" />
      <rect x="81" y="0" width="5" height="30" fill="#050505" />
      <rect x="88" y="0" width="1" height="30" fill="#050505" />
      <rect x="91" y="0" width="3" height="30" fill="#050505" />
      <rect x="96" y="0" width="4" height="30" fill="#050505" />
    </svg>
  )
}

export function RawSupplyHeader({ cartCount }: RawSupplyHeaderProps) {
  return (
    <header className="page-header">
      <Link href="/" className="system-code">
        <span className="system-code-arrow">←</span>
        Day Off
      </Link>
      <div className="cart-btn solid-shadow">
        CART [{cartCount}] <span className="cart-arrow">→</span>
      </div>
      <h1 className="massive-title">ACCESSORIES.</h1>
      <div className="subtitle-block">
        <div>
          <span className="spec-line">COLLECTION: 001</span>
          <span className="spec-line">AESTHETIC: BRUTAL</span>
        </div>
        <div className="subtitle-right">
          <span className="spec-line">ITEMS: 04</span>
          <span className="spec-line">STATUS: LIVE</span>
        </div>
      </div>
      <div className="sticker st-1 sticker-barcode">
        <span className="barcode-text">VERIFIED AUTHENTIC</span>
        <HeaderBarcode />
        <span className="barcode-text barcode-caption">84930-229-11</span>
      </div>
    </header>
  )
}
