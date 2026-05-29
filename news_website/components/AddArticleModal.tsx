"use client"

import { useState } from "react"
import ArticleForm from "./ArticleForm"

export default function AddArticleModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-foreground px-6 py-2 text-sm font-semibold tracking-widest text-background uppercase transition-opacity hover:opacity-80"
      >
        + Write New Article
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200 fade-in">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-background p-6 shadow-2xl md:p-8">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-xl text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
            <h2 className="mb-6 border-b border-border pb-4 font-serif text-3xl tracking-widest uppercase">
              Publish Story
            </h2>

            <ArticleForm onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
