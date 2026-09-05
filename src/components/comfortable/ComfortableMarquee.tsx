const MARQUEE_COPY =
  '// FW24 COLLECTION // NEW ARRIVALS // GLOBAL SHIPPING // NO REFUNDS // '

export function ComfortableMarquee() {
  return (
    <div className="marquee">
      <div className="marquee-content">
        {MARQUEE_COPY}
        {MARQUEE_COPY}
      </div>
    </div>
  )
}
