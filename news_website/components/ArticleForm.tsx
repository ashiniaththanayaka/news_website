"use client"

import { useState } from "react"
import { createArticle, updateArticle } from "@/actions/articleActions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface ArticleFormProps {
  article?: any
  onClose?: () => void
}

export default function ArticleForm({ article, onClose }: ArticleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const isEditing = !!article

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    // Grab the form data
    const formData = new FormData(e.currentTarget)

    try {
      if (isEditing) {
        await updateArticle(article._id, formData)
        toast.success("Article updated successfully!")
      } else {
        await createArticle(formData)
        toast.success("Article published successfully!")
      }

      if (onClose) {
        onClose()
      } else {
        router.back()
        router.refresh()
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save article.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleCancel() {
    if (onClose) onClose()
    else router.back()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Headline
        </label>
        <input
          type="text"
          name="title"
          defaultValue={article?.title || ""}
          required
          className="border border-border bg-transparent p-3 font-serif text-lg transition-colors outline-none focus:border-foreground"
          placeholder="Enter a compelling headline..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Category
        </label>
        <select
          name="category"
          defaultValue={article?.category || "World"}
          required
          className="appearance-none border border-border bg-transparent p-3 text-sm transition-colors outline-none focus:border-foreground"
        >
          <option value="World">World</option>
          <option value="Politics">Politics</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Cover Image
        </label>
        {isEditing && article?.imageUrl && (
          <img
            src={article.imageUrl}
            alt="Current cover"
            className="mb-2 h-32 w-48 border border-border object-cover"
          />
        )}
        <p className="text-xs text-muted-foreground italic">
          {isEditing
            ? "Upload a new image to replace the current one, or leave blank to keep it."
            : "Please upload a high-quality cover image."}
        </p>
        <input
          type="file"
          name="image"
          accept="image/*"
          required={!isEditing}
          className="border border-border bg-transparent p-2 text-sm file:mr-4 file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-xs file:font-semibold file:text-background hover:file:opacity-80"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Article Body
        </label>
        <textarea
          name="content"
          defaultValue={article?.content || ""}
          required
          rows={10}
          className="resize-none border border-border bg-transparent p-3 text-sm leading-relaxed transition-colors outline-none focus:border-foreground"
          placeholder="Write your story here..."
        ></textarea>
      </div>

      <div className="mt-4 flex justify-end gap-4 border-t border-border pt-6">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 text-sm font-semibold tracking-widest uppercase transition-colors hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex min-w-[150px] items-center justify-center bg-foreground px-8 py-2 text-sm font-semibold tracking-widest text-background uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Publishing..."}
            </>
          ) : isEditing ? (
            "Save Changes"
          ) : (
            "Publish"
          )}
        </button>
      </div>
    </form>
  )
}
