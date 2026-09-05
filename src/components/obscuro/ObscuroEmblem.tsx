export function ObscuroEmblem() {
  return (
    <div className="emblem-container">
      <svg className="emblem-svg" viewBox="0 0 200 200">
        <path
          id="obscuro-text-path"
          d="M 100, 10 a 90, 90 0 1,1 0, 180 a 90, 90 0 1,1 0, -180"
          fill="none"
        />
        <text>
          <textPath href="#obscuro-text-path" startOffset="0" className="emblem-text">
            02025 ARCHITECTURE * IS OUR GARMENT * LONDON 51.50N * FW.25 *{' '}
          </textPath>
        </text>
      </svg>
      <div className="center-crosshair">
        <div className="cross-line-h" />
        <div className="cross-line-v" />
      </div>
    </div>
  )
}
