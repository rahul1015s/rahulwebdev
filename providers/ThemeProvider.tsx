"use client";

import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

// =======================
// MacOS Style Toggle
// =======================
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-12 h-6 rounded-full bg-neutral-300 dark:bg-neutral-700" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full 
                 bg-neutral-300 dark:bg-neutral-700 
                 transition-colors duration-300 
                 shadow-inner overflow-hidden"
    >
      {/* macOS inner subtle shine */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none 
          ${isDark ? "opacity-20 bg-black/20" : "opacity-40 bg-white/30"}`}
      />

      {/* Thumb */}
      <motion.div
        className="absolute top-1/2 w-6 h-6 rounded-full bg-white dark:bg-neutral-800
                   shadow-[0_2px_6px_rgba(0,0,0,0.25)]
                   flex items-center justify-center z-10"
        style={{ y: "-50%" }}
        animate={{
          x: isDark ? 30 : 2,
          // use two-value spring for scale to avoid three-frame keyframes
          scale: isDark ? 1.05 : 1,
        }}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 20 },
          scale: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        {/* Icons animate inside thumb only */}
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.svg
              key="moon"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              className="w-3.5 h-3.5 text-neutral-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              className="w-3.5 h-3.5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 
                11-2 0V3a1 1 0 011-1zm4 8a4 4 0 
                11-8 0 4 4 0 018 0z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
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
