import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" })

export const metadata: Metadata = {
  title: "SEO Auditor — Enterprise-grade SEO intelligence in minutes",
  description:
    "Run a complete SEO audit against 230+ ranking factors. Get a prioritized, developer-ready action plan — no credit card, results in under three minutes.",
  keywords: [
    "SEO audit",
    "technical SEO",
    "Core Web Vitals",
    "site audit",
    "SEO tool",
    "on-page SEO",
    "enterprise SEO",
  ],
  openGraph: {
    title: "SEO Auditor — Enterprise-grade SEO intelligence in minutes",
    description:
      "230+ ranking factors analyzed. A prioritized action plan your team can ship this sprint.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
