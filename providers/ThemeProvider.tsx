"use client"

// ThemeProvider wrapper
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Forward props to next-themes provider; keep it simple and typed
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default ThemeProvider