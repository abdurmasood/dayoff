'use client'

import { createContext, useContext } from 'react'

export const GlitchStartContext = createContext<() => void>(() => {})

export function useGlitchStart() {
  return useContext(GlitchStartContext)
}
