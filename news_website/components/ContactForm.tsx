"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { submitContactMessage } from "@/actions/contactActions"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Stop browser refresh
    e.preventDefault()

    // Force the spinner to appear instantly
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await Promise.all([
        submitContactMessage(formData),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ])

      // Clear the form
      form.reset()

      toast.success("Message sent! Our newsroom will review your submission.")
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 border border-border bg-muted/30 p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            required
            className="border border-border bg-background p-3 text-sm transition-colors outline-none focus:border-foreground"
            placeholder="John"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            required
            className="border border-border bg-background p-3 text-sm transition-colors outline-none focus:border-foreground"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          required
          className="border border-border bg-background p-3 text-sm transition-colors outline-none focus:border-foreground"
          placeholder="john@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Subject
        </label>
        <select
          name="subject"
          required
          className="appearance-none border border-border bg-background p-3 text-sm transition-colors outline-none focus:border-foreground"
        >
          <option value="tip">News Tip</option>
          <option value="support">Technical Support</option>
          <option value="advertising">Advertising Inquiry</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="resize-none border border-border bg-background p-3 text-sm leading-relaxed transition-colors outline-none focus:border-foreground"
          placeholder="How can we help you?"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 flex items-center justify-center bg-foreground px-8 py-3 text-sm font-semibold tracking-widest text-background uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  )
}
