import Link from "next/link"
import { SignInButton, Show, UserButton } from "@clerk/nextjs"
import { auth, currentUser } from "@clerk/nextjs/server"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import Footer from "@/components/Footer"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  const user = await currentUser()

  const isAdmin =
    user?.emailAddresses[0].emailAddress === process.env.ADMIN_EMAIL

  return (
    <div className="flex min-h-screen flex-col">
      {/* Topbar */}
      <div className="flex items-center justify-between border-b border-border px-6 py-3 text-xs font-semibold tracking-widest uppercase">
        <div className="hidden sm:block">The Local Newspaper</div>
        <div className="ml-auto flex items-center gap-6">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="transition-colors hover:text-muted-foreground">
                Sign In / Sign Up
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
          <AnimatedThemeToggler />
        </div>
      </div>

      {/* Header*/}
      <header className="flex justify-center border-b border-border py-10">
        <Link href="/">
          <h1 className="cursor-pointer text-center font-serif text-6xl font-bold tracking-tighter uppercase md:text-8xl">
            Local News
          </h1>
        </Link>
      </header>

      {/* Subnav */}
      <nav className="flex justify-center gap-8 overflow-x-auto border-b border-border px-4 py-4 text-xs font-medium tracking-widest whitespace-nowrap uppercase sm:text-sm">
        <Link href="/" className="underline-offset-4 hover:underline">
          Home
        </Link>
        <Link href="/category" className="underline-offset-4 hover:underline">
          Categories
        </Link>
        <Link href="/contact" className="underline-offset-4 hover:underline">
          Contact Us
        </Link>

        {/* Public */}
        {!userId && (
          <Link
            href="/sign-in"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Publish a Story
          </Link>
        )}

        {/* Normal user */}
        {userId && !isAdmin && (
          <Link
            href="/dashboard"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Your Content
          </Link>
        )}

        {/* Admin user */}
        {userId && isAdmin && (
          <Link
            href="/admin"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Admin
          </Link>
        )}
      </nav>

      <main className="container mx-auto flex-grow px-4 py-8 md:px-8">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
