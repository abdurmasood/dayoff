const MARQUEE_ITEMS = [
  '*** SYSTEM INITIALIZED ***',
  'NO RESTOCKS // ALL SALES FINAL',
  'GLOBAL SHIPPING AVAILABLE',
  'ACCESSORIES CO. FW/24',
] as const

export function RawSupplyMarquee() {
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  )
}
