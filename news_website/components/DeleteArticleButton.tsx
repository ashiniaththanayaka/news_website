"use client"

import { Button } from "@/components/ui/button"
import { deleteArticle } from "@/actions/articleActions"
import { toast } from "sonner"
import { useState } from "react"

export function DeleteArticleButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)

    try {
      await deleteArticle(id)

      toast.success("Article Deleted", {
        description: "The article has been permanently removed.",
      })
    } catch (error) {
      toast.error("Deletion Failed", {
        description: "Could not delete the article. Please try again.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  )
}
