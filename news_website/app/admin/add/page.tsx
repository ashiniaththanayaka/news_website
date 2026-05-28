"use client"

import { createArticle } from "@/actions/articleActions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

export default function AddArticlePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Client side form handler
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    try {
      // Call the server action
      await createArticle(formData)

      // Trigger the success toast using Sonner
      toast.success("Success!", {
        description: "The article has been published securely.",
      })

      // Send the user back to the dashboard
      router.push("/admin")
    } catch (error) {
      // Trigger the error toast using Sonner
      toast.error("Error", {
        description: "Something went wrong while publishing.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add New Article</CardTitle>
          <CardDescription>
            Publish a new news story. The cover image will be securely uploaded
            via Cloudinary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Headline</Label>
              <Input id="title" name="title" required />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Cover Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Full Story</Label>
              <Textarea id="content" name="content" rows={10} required />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Publishing..." : "Publish Article"}
              </Button>
              <Button variant="outline" size="lg" type="button" asChild>
                <Link href="/admin">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
