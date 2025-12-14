import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { AuthProvider } from "@/providers/AuthProvider"

import { Toaster } from "sonner"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Rahul Verma | Self-taught Web Developer",
  description: "Modern developer portfolio showcasing projects, skills, and experience.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}