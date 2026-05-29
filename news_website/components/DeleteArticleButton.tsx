"use client"

import { useState } from "react"
import { deleteArticle } from "@/actions/articleActions"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export function DeleteArticleButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    // Ask for confirmation before destroying data!
    const confirmed = window.confirm(
      "Are you sure you want to delete this article? This cannot be undone."
    )
    if (!confirmed) return

    // Trigger the spinning loading state
    setIsDeleting(true)

    try {
      // Call Server Action
      await deleteArticle(id)
      toast.success("Article deleted successfully.")
    } catch (error: any) {
      toast.error(error.message || "Failed to delete article.")
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
      className="min-w-[90px] rounded-none text-xs tracking-widest uppercase"
    >
      {isDeleting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Wait
        </>
      ) : (
        "Delete"
      )}
    </Button>
  )
}
