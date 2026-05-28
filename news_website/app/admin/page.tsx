import { getArticles, deleteArticle } from "@/actions/articleActions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { DeleteArticleButton } from "@/components/DeleteArticleButton"

export default async function AdminDashboard() {
  // Fetch all articles directly from MongoDB
  const articles = await getArticles()

  return (
    <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Article Management</h2>
          <p className="text-sm text-muted-foreground">
            Manage your news website content.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/add">+ Add New Article</Link>
        </Button>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-border py-12 text-center">
          <p className="mb-4 text-muted-foreground">
            No articles found. Start publishing!
          </p>
          <Button asChild variant="outline">
            <Link href="/admin/add">Create your first article</Link>
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="w-16 text-muted-foreground">
                Image
              </TableHead>
              <TableHead className="text-muted-foreground">Title</TableHead>
              <TableHead className="text-muted-foreground">Category</TableHead>
              <TableHead className="text-muted-foreground">Published</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article._id} className="border-border">
                <TableCell>
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
                      No Img
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      {/* Edit Here */}
                      <Link href={`/admin/edit/${article._id}`}>Edit</Link>
                    </Button>

                    {/* Delete action */}
                    <DeleteArticleButton id={article._id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
