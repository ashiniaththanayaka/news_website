import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-foreground bg-background pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {/* Brand section */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="mb-4 inline-block font-serif text-3xl font-bold tracking-tighter uppercase md:text-4xl"
            >
              Local News
            </Link>
            <p className="max-w-md font-serif text-lg leading-relaxed text-muted-foreground">
              Delivering independent, factual, and uncompromising journalism to
              the Sri Lanka since 2026. Truth matters.
            </p>
          </div>

          {/* Sections links */}
          <div>
            <h3 className="mb-6 text-xs font-bold tracking-widest text-foreground uppercase">
              Sections
            </h3>
            <ul className="space-y-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              <li>
                <Link
                  href="/category"
                  className="transition-colors hover:text-foreground"
                >
                  World
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className="transition-colors hover:text-foreground"
                >
                  Politics
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className="transition-colors hover:text-foreground"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className="transition-colors hover:text-foreground"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className="transition-colors hover:text-foreground"
                >
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-6 text-xs font-bold tracking-widest text-foreground uppercase">
              Company
            </h3>
            <ul className="space-y-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="gap-4 border-t border-border pt-8 text-center md:flex-row">
          {/* Copyright */}
          <div className="text-center text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            &copy; 2026 Local News Media. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
