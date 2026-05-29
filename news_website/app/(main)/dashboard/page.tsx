import { auth } from "@clerk/nextjs/server"
import { getUserArticles } from "@/actions/articleActions"
import AddArticleModal from "@/components/AddArticleModal"
import { DataTable } from "../admin/data-table"
import { columns } from "../admin/columns"

export const dynamic = "force-dynamic"

export default async function UserDashboard() {
  const { userId } = await auth()

  const articles = await getUserArticles(userId as string)

  return (
    <div className="animate-in duration-500 fade-in">
      <div className="mb-8 flex items-end justify-between border-b-2 border-foreground pb-2">
        <div>
          <h2 className="font-serif text-2xl tracking-widest uppercase md:text-3xl">
            Your Content
          </h2>
          <p className="mt-1 text-sm tracking-widest text-muted-foreground uppercase">
            Writer Dashboard
          </p>
          <p className="mt-2 font-mono text-[10px] text-muted-foreground/50">
            System ID: {userId}
          </p>
        </div>

        <AddArticleModal />
      </div>

      {articles.length === 0 ? (
        <div className="rounded-none border border-dashed border-border py-20 text-center">
          <p className="font-serif text-xl text-muted-foreground">
            You haven't published any stories yet. Start writing!
          </p>
        </div>
      ) : (
        <DataTable columns={columns} data={articles} />
      )}
    </div>
  )
}
