"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DeleteArticleButton } from "@/components/DeleteArticleButton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

export type Article = {
  _id: string
  title: string
  category: string
  imageUrl?: string
  authorId?: string | null
  createdAt: Date | string
}

const ActionCell = ({ article }: { article: Article }) => {
  const { userId } = useAuth()

  const isAuthor = userId === article.authorId

  return (
    <div className="flex justify-end gap-2">
      {isAuthor ? (
        <Button
          variant="outline"
          size="sm"
          className="rounded-none text-xs tracking-widest uppercase"
          asChild
        >
          <Link href={`/edit/${article._id}`}>Edit</Link>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="rounded-none text-xs tracking-widest uppercase"
          asChild
        >
          <Link href={`/article/${article._id}`}>View</Link>
        </Button>
      )}

      <DeleteArticleButton id={article._id} />
    </div>
  )
}

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl") as string
      return imageUrl ? (
        <img
          src={imageUrl}
          alt="cover"
          className="h-12 w-12 rounded-md object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          No Img
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: "Headline",
    cell: ({ row }) => {
      return <span className="font-serif text-lg">{row.getValue("title")}</span>
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <span className="text-xs tracking-widest text-muted-foreground uppercase">
          {row.getValue("category")}
        </span>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Published",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-muted-foreground">
          {new Date(row.getValue("createdAt")).toLocaleDateString("en-GB")}
        </span>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell article={row.original} />,
  },
]
