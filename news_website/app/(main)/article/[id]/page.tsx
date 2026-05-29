import { getArticleById } from "@/actions/articleActions"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function SingleArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Fetch the article from MongoDB
  const article = await getArticleById(id)

  if (!article) {
    notFound()
  }

  // Format date
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )

  return (
    <article className="mx-auto max-w-5xl animate-in py-8 duration-500 fade-in md:py-12">
      {/* Back*/}
      <Link
        href="/"
        className="mb-10 inline-flex items-center text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      {/* Header */}
      <header className="mx-auto mb-12 max-w-4xl text-center">
        <span className="mb-6 inline-block border-b-2 border-foreground pb-1 text-xs font-bold tracking-widest text-muted-foreground uppercase">
          {article.category}
        </span>

        <h1 className="mb-8 font-serif text-5xl leading-tight font-bold break-words md:text-7xl">
          {article.title}
        </h1>

        <div className="flex items-center justify-center gap-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          <time dateTime={new Date(article.createdAt).toISOString()}>
            {formattedDate}
          </time>
          <span>•</span>
          <span>By Global News Staff</span>
        </div>
      </header>

      {/* Image */}
      {article.imageUrl && (
        <div className="mb-14">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="max-h-[600px] w-full border border-border object-cover shadow-sm"
          />
        </div>
      )}

      {/* Artical body */}
      <div className="mx-auto max-w-3xl px-4 sm:px-0">
        <div className="font-serif text-lg leading-relaxed break-words whitespace-pre-wrap text-foreground/90 md:text-xl">
          {article.content}
        </div>
      </div>
    </article>
  )
}
