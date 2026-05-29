import { getArticleById } from "@/actions/articleActions"
import ArticleForm from "@/components/ArticleForm"
import { notFound } from "next/navigation"

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = await getArticleById(id)

  if (!article) notFound()

  return (
    <div className="animate-in py-8 duration-500 fade-in">
      <div className="mx-auto mb-8 max-w-3xl border-b-2 border-foreground pb-2">
        <h2 className="font-serif text-2xl tracking-widest uppercase md:text-3xl">
          Edit Story
        </h2>
        <p className="mt-1 text-sm tracking-widest text-muted-foreground uppercase">
          Content Management
        </p>
      </div>

      <div className="mx-auto max-w-3xl border border-border bg-background p-6 shadow-sm md:p-8">
        {/* Edit form */}
        <ArticleForm article={article} />
      </div>
    </div>
  )
}
