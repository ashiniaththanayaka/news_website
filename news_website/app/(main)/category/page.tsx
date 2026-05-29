import { getArticles } from "@/actions/articleActions"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// The categories we defined in creation form
const CATEGORIES = ["World", "Politics", "Technology", "Business", "Sports"]

export const dynamic = "force-dynamic"

export default async function CategoryHubPage() {
  // Fetch all articles from the server
  const allArticles = await getArticles()

  return (
    <div className="animate-in py-8 duration-500 fade-in md:py-12">
      {/* Header */}
      <header className="mx-auto mb-16 max-w-3xl border-b-2 border-foreground pb-8 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tighter uppercase md:text-7xl">
          Sections
        </h1>
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Browse the latest headlines by topic
        </p>
      </header>

      {/* Category sections */}
      <div className="space-y-20">
        {CATEGORIES.map((category) => {
          // Filter articles for this specific category and grab the newest 3
          const categoryArticles = allArticles
            .filter((article) => article.category === category)
            .slice(0, 3)

          // If nobody has written an article for this category, skip rendering it
          if (categoryArticles.length === 0) return null

          return (
            <section key={category} className="border-t border-border pt-8">
              {/* View all link */}
              <div className="mb-8 flex items-end justify-between">
                <h2 className="font-serif text-4xl font-bold tracking-widest uppercase">
                  {category}
                </h2>
                <Link
                  href={`/category/${category.toLowerCase()}`}
                  className="hidden items-center text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground sm:flex"
                >
                  View All {category} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Article grid */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {categoryArticles.map((article) => (
                  <Link
                    href={`/article/${article._id}`}
                    key={article._id}
                    className="group flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative mb-4 aspect-[4/3] overflow-hidden border border-border bg-muted">
                      {article.imageUrl ? (
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Article info */}
                    <div className="flex flex-grow flex-col">
                      <time className="mb-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        {new Date(article.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </time>
                      <h3 className="line-clamp-3 font-serif text-xl leading-snug decoration-foreground/30 decoration-2 underline-offset-4 group-hover:underline md:text-2xl">
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile "View All" Button */}
              <div className="mt-6 sm:hidden">
                <Link
                  href={`/category/${category.toLowerCase()}`}
                  className="inline-flex items-center text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
                >
                  View All {category} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
