import { getArticles } from "@/actions/articleActions"
import Link from "next/link"

export default async function HomePage() {
  const articles = await getArticles()

  return (
    <div className="animate-in duration-500 fade-in">
      {/* Section header */}
      <div className="mb-8 flex items-end justify-between border-b-2 border-foreground pb-2">
        <h2 className="font-serif text-2xl tracking-widest uppercase md:text-3xl">
          All News
        </h2>
        <span className="hidden text-xs text-muted-foreground uppercase sm:block">
          {new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      {articles.length === 0 ? (
        <div className="py-20 text-center">
          <h3 className="mb-2 font-serif text-2xl">
            No stories published yet.
          </h3>
          <p className="text-muted-foreground">
            Head over to the admin dashboard to add your first article.
          </p>
        </div>
      ) : (
        <div className="relative grid grid-flow-row-dense grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-0 bottom-0 left-1/2 z-0 hidden w-[1px] -translate-x-1/2 bg-border lg:block"></div>

          {articles.map((article, index) => {
            const pos = index % 10
            const isHero = pos === 0 || pos === 7

            let gridClasses =
              "flex flex-col group border-b border-border pb-6 lg:border-b-0 lg:pb-0 relative z-10 "

            if (pos === 0) {
              gridClasses +=
                "md:col-span-2 lg:col-start-1 lg:col-span-2 lg:row-span-2 border-b-2 md:border-b-0 border-border pb-8 md:pb-0"
            } else if (pos >= 1 && pos <= 4) {
              gridClasses += "lg:col-span-1"
            } else if (pos === 5) {
              gridClasses += "lg:col-span-1 lg:col-start-1"
            } else if (pos === 6) {
              gridClasses += "lg:col-span-1 lg:col-start-2"
            } else if (pos === 7) {
              gridClasses +=
                "md:col-span-2 lg:col-start-3 lg:col-span-2 lg:row-span-2 border-b-2 md:border-b-0 border-border pb-8 md:pb-0"
            } else if (pos === 8) {
              gridClasses += "lg:col-span-1 lg:col-start-1"
            } else if (pos === 9) {
              gridClasses += "lg:col-span-1 lg:col-start-2"
            }

            return (
              <article key={article._id} className={gridClasses}>
                <div className="mb-3 flex justify-between border-b border-border pb-2 text-[10px] tracking-wider text-muted-foreground uppercase sm:text-xs">
                  <span>{article.category}</span>
                  <span>
                    {new Date(article.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>

                {article.imageUrl && (
                  <Link
                    href={`/article/${article._id}`}
                    className="group mb-4 block overflow-hidden"
                  >
                    <div
                      className={`w-full ${isHero ? "h-[300px] sm:h-[450px]" : "h-[180px]"} bg-muted`}
                    >
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
                      />
                    </div>
                  </Link>
                )}

                <Link
                  href={`/article/${article._id}`}
                  className="group flex-grow"
                >
                  <h3
                    className={`font-serif leading-tight break-words decoration-1 underline-offset-4 group-hover:underline ${
                      isHero
                        ? "mb-4 text-3xl sm:text-5xl"
                        : "mb-2 text-lg sm:text-xl"
                    }`}
                  >
                    {article.title}
                  </h3>
                </Link>

                <p
                  className={`leading-relaxed break-words text-muted-foreground ${
                    isHero ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"
                  }`}
                >
                  {article.content}
                </p>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
