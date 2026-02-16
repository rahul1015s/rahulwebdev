"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

// =======================
// MacOS Style Toggle
// =======================
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full bg-neutral-300 dark:bg-neutral-700 transition-colors duration-300 shadow-inner overflow-hidden"
    >
      <div
        className="absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none opacity-40 bg-white/30 dark:opacity-20 dark:bg-black/20"
      />

      <span
        className="absolute top-1/2 left-0.5 -translate-y-1/2 h-6 w-6 rounded-full bg-white dark:bg-neutral-800 shadow-[0_2px_6px_rgba(0,0,0,0.25)] flex items-center justify-center z-10 transition-transform duration-300 dark:translate-x-7"
      >
        <svg
          className="w-3.5 h-3.5 text-yellow-500 transition-opacity duration-200 dark:opacity-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <svg
          className="absolute w-3.5 h-3.5 text-neutral-700 opacity-0 transition-opacity duration-200 dark:opacity-100"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>
    </button>
  );
}

// =======================
// Theme Provider
// =======================
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="light"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export default ThemeProvider;
