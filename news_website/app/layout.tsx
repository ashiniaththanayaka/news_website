import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import "./globals.css"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {/* Topbar */}
          <div className="flex items-center justify-between border-b border-border px-6 py-3 text-xs font-semibold tracking-widest uppercase">
            <div className="hidden sm:block">The Local Newspaper</div>
            <div className="ml-auto flex gap-6">
              <Link
                href="#"
                className="transition-colors hover:text-muted-foreground"
              >
                Sign In
              </Link>
              <Link
                href="#"
                className="transition-colors hover:text-muted-foreground"
              >
                Sign Up
              </Link>
              <AnimatedThemeToggler />
            </div>
          </div>

          {/* Header */}
          <header className="flex justify-center border-b border-border py-10">
            <h1 className="text-center font-serif text-6xl font-bold tracking-tighter uppercase md:text-8xl">
              Local News
            </h1>
          </header>

          {/* sub nav */}
          <nav className="flex justify-center gap-8 overflow-x-auto border-b border-border px-4 py-4 text-xs font-medium tracking-widest whitespace-nowrap uppercase sm:text-sm">
            <Link href="/" className="underline-offset-4 hover:underline">
              Home
            </Link>
            <Link
              href="/category"
              className="underline-offset-4 hover:underline"
            >
              Categories
            </Link>
            <Link
              href="/contact"
              className="underline-offset-4 hover:underline"
            >
              Contact Us
            </Link>
            <Link
              href="/admin"
              className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Admin
            </Link>
          </nav>

          {/* Main content */}
          <main className="container mx-auto flex-grow px-4 py-8 md:px-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-auto bg-foreground px-8 py-12 text-xs tracking-widest text-background uppercase">
            <div className="container mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex gap-8">
                <Link href="#" className="hover:opacity-70">
                  Follow
                </Link>
                <span className="text-muted opacity-50">
                  © 2026 All Rights Reserved
                </span>
              </div>
              <div className="flex gap-8">
                <Link href="#" className="hover:opacity-70">
                  Legal
                </Link>
                <Link href="#" className="hover:opacity-70">
                  Subscribe
                </Link>
              </div>
            </div>
          </footer>

          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
