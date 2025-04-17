"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Store theme preference in localStorage for persistence
  React.useEffect(() => {
    // Check if we have a stored theme preference
    const storedTheme = localStorage.getItem("theme")

    if (storedTheme && props.defaultTheme !== storedTheme) {
      // Apply the stored theme if it exists and differs from default
      const themeChangeEvent = new CustomEvent("themeChange", {
        detail: { theme: storedTheme },
      })
      window.dispatchEvent(themeChangeEvent)
    }

    // Listen for theme changes and store in localStorage
    const handleThemeChange = (e: CustomEvent) => {
      localStorage.setItem("theme", e.detail.theme)
    }

    window.addEventListener("themeChange", handleThemeChange as EventListener)

    return () => {
      window.removeEventListener("themeChange", handleThemeChange as EventListener)
    }
  }, [props.defaultTheme])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

