import ContactForm from "@/components/ContactForm"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl animate-in px-4 py-8 duration-500 fade-in sm:px-0 md:py-12">
      {/* header */}
      <header className="mb-12 border-b-2 border-foreground pb-8">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tighter uppercase md:text-7xl">
          Contact Us
        </h1>
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Get in touch with the Local News newsroom
        </p>
      </header>

      {/* layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
        {/* info */}
        <div className="space-y-10">
          <div>
            <h2 className="mb-4 font-serif text-3xl font-bold">
              Send us a tip.
            </h2>
            <p className="font-serif text-lg leading-relaxed text-foreground/80">
              Our journalism relies on readers like you. If you have a story
              idea, a breaking news tip, or feedback on our coverage, our
              editors want to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 border-t border-border pt-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Headquarters
              </h3>
              <address className="text-sm leading-relaxed not-italic">
                Local News Tower
                <br />
                123 Journalism Way
                <br />
                Colombo 07
                <br />
                Sri Lanka
              </address>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Direct Lines
              </h3>
              <div className="space-y-1 text-sm leading-relaxed">
                <p>
                  <span className="font-semibold">Newsroom:</span> (+94) 14 724
                  9201
                </p>
                <p>
                  <span className="font-semibold">Support:</span> (+94) 12 324
                  1234
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  tips@localnews.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
