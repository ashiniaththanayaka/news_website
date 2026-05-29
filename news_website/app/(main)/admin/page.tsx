import { getArticles } from "@/actions/articleActions"
import AddArticleModal from "@/components/AddArticleModal"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default async function AdminDashboard() {
  // Fetch all articles directly from MongoDB (Runs securely on the server)
  const articles = await getArticles()

  return (
    <div className="animate-in duration-500 fade-in">
      {/* HEADER SECTION */}
      <div className="mb-8 flex items-end justify-between border-b-2 border-foreground pb-2">
        <div>
          <h2 className="font-serif text-2xl tracking-widest uppercase md:text-3xl">
            Master Control
          </h2>
          <p className="mt-1 text-sm tracking-widest text-muted-foreground uppercase">
            Admin Dashboard
          </p>
        </div>
        <AddArticleModal />
      </div>

      {/* RENDER TABLE OR EMPTY STATE */}
      {articles.length === 0 ? (
        <div className="rounded-none border border-dashed border-border py-20 text-center">
          <p className="font-serif text-xl text-muted-foreground">
            No articles found. Start publishing!
          </p>
        </div>
      ) : (
        <DataTable columns={columns} data={articles} />
      )}
    </div>
  )
}
