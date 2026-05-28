import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="mb-8 flex items-center justify-between border-b bg-background p-4">
            <h1 className="font-sans text-xl font-bold tracking-tight">
              Global News
            </h1>
            <div className="space-x-2">
              <Link href="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link href="/category">
                <Button variant="ghost">Categories</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost">Contact Us</Button>
              </Link>
              <Link href="/admin">
                <Button variant="default">Admin Dashboard</Button>
              </Link>
              <AnimatedThemeToggler variant="circle" />
            </div>
          </nav>

          <main className="container mx-auto flex-grow px-4">{children}</main>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
