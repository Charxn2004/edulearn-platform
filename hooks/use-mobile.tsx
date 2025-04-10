"use client"

import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      const onChange = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }

      // Use the correct event listener based on browser support
      if (mql.addEventListener) {
        mql.addEventListener("change", onChange)
      } else {
        // @ts-ignore - For older browsers
        mql.addListener(onChange)
      }

      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

      return () => {
        if (mql.removeEventListener) {
          mql.removeEventListener("change", onChange)
        } else {
          // @ts-ignore - For older browsers
          mql.removeListener(onChange)
        }
      }
    }
  }, [])

  // Return false during SSR to avoid hydration mismatch
  if (typeof window === "undefined") {
    return false
  }

  return !!isMobile
}
