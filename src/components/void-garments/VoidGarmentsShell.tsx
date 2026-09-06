import type { ReactNode } from 'react'
import { VoidGarmentsNoise } from './VoidGarmentsNoise'

export function VoidGarmentsShell({ children }: { children: ReactNode }) {
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

      {children}
    </div>
  )
}
