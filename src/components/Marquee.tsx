type MarqueeProps = {
  text: string
}

export function Marquee({ text }: MarqueeProps) {
  return (
    <div className="marquee-container">
      <div className="marquee-content">{text}</div>
    </div>
  )
}
