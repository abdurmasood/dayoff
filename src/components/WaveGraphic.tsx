export function WaveGraphic() {
  return (
    <svg width="100%" height="40" viewBox="0 0 200 50" preserveAspectRatio="none">
      <path
        d="M0,25 Q20,0 40,25 T80,25 T120,25 T160,25 T200,25"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M0,25 Q20,50 40,25 T80,25 T120,25 T160,25 T200,25"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}
