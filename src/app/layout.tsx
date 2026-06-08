import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI PC Builder",
  description: "Build your perfect PC with AI — just describe your needs, budget, and preferences.",
  openGraph: {
    title: "AI PC Builder",
    description: "Build your perfect PC with AI — just describe your needs, budget, and preferences.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-surface-950 text-surface-100 antialiased">
        {children}
      </body>
    </html>
  )
}
