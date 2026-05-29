import { getArticles } from "@/actions/articleActions"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  // Fetch all articles
  const allArticles = await getArticles()

  // Filter for specific category
  const filteredArticles = allArticles.filter(
    (a) => a.category.toLowerCase() === category.toLowerCase()
  )

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="mx-auto max-w-7xl animate-in px-4 py-8 duration-500 fade-in sm:px-6 md:py-12">
      {/* Header */}
      <header className="mb-16 border-b-2 border-foreground pb-8">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tighter uppercase md:text-7xl">
          {categoryName}
        </h1>
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          {filteredArticles.length}{" "}
          {filteredArticles.length === 1 ? "Article" : "Articles"} Found
        </p>
      </header>

      {/* Artical grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Link
              href={`/article/${article._id}`}
              key={article._id}
              className="group flex flex-col border border-border p-4 transition-shadow hover:shadow-lg"
            >
              <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-muted">
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

              <div className="flex flex-grow flex-col">
                <time className="mb-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <h3 className="line-clamp-3 font-serif text-xl leading-snug decoration-foreground/30 decoration-2 underline-offset-4 group-hover:underline md:text-2xl">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-border py-20 text-center">
          <h2 className="mb-2 font-serif text-2xl">
            No articles in this section.
          </h2>
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            Check back later for updates.
          </p>
        </div>
      )}
    </div>
  )
}
