import type { Metadata } from "next"
import { Fraunces, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Made Reeyza — Portfolio",
  description: "Mahasiswa Elektro yang coba membangun hal-hal yang unik. Cross-domain Elektro × Machine Learning × IoT.",
  openGraph: {
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-bg focus:rounded text-sm font-mono"
          >
            Langsung ke konten
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
