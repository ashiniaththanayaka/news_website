"use server"

import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { revalidatePath } from "next/cache"

// Helper to get the database collection
async function getCollection() {
  const client = await clientPromise
  const db = client.db("news_app")
  return db.collection("articles")
}

// Fetch all articles
export async function getArticles() {
  const collection = await getCollection()
  const articles = await collection.find({}).sort({ createdAt: -1 }).toArray()

  // Convert MongoDB ObjectId to string so it can be passed to the frontend
  return articles.map((article) => ({
    _id: article._id.toString(),
    title: article.title,
    category: article.category,
    content: article.content,
    imageUrl: article.imageUrl,
    createdAt: article.createdAt,
  }))
}

// Insert a new article
export async function createArticle(formData: FormData) {
  const collection = await getCollection()

  const newArticle = {
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
    imageUrl: formData.get("imageUrl"), // Saving the image URL here
    createdAt: new Date(),
  }

  await collection.insertOne(newArticle)

  // Refresh the pages so the new data shows up instantly
  revalidatePath("/")
  revalidatePath("/admin")
}

// Remove an article by ID
export async function deleteArticle(id: string) {
  const collection = await getCollection()

  await collection.deleteOne({ _id: new ObjectId(id) })

  revalidatePath("/")
  revalidatePath("/admin")
}

// Edit an existing article
export async function updateArticle(id: string, formData: FormData) {
  const collection = await getCollection()

  const updatedData = {
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
    imageUrl: formData.get("imageUrl"),
  }

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData })

  revalidatePath("/")
  revalidatePath("/admin")
}
