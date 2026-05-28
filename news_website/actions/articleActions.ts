"use server"

import clientPromise from "@/lib/mongodb"
import cloudinary from "@/lib/cloudinary"
import { ObjectId } from "mongodb"
import { revalidatePath } from "next/cache"

// Helper functions

// Helper to get the MongoDB collection
async function getCollection() {
  const client = await clientPromise
  const db = client.db("news_app")
  return db.collection("articles")
}

// Helper to upload files to Cloudinary
async function uploadToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "news_website" },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"))
        } else {
          resolve(result.secure_url)
        }
      }
    )
    uploadStream.end(buffer)
  })
}

// DML Operations

// Fetch all articles for the Home and Admin pages
export async function getArticles() {
  const collection = await getCollection()
  const articles = await collection.find({}).sort({ createdAt: -1 }).toArray()

  // Convert MongoDB ObjectId to string to passed safely to client components
  return articles.map((article) => ({
    _id: article._id.toString(),
    title: article.title,
    category: article.category,
    content: article.content,
    imageUrl: article.imageUrl,
    createdAt: article.createdAt,
  }))
}

// Fetch one article
export async function getArticleById(id: string) {
  const collection = await getCollection()
  const article = await collection.findOne({ _id: new ObjectId(id) })

  if (!article) return null

  return {
    _id: article._id.toString(),
    title: article.title,
    category: article.category,
    content: article.content,
    imageUrl: article.imageUrl,
    createdAt: article.createdAt,
  }
}

// Insert a new article with an image upload
export async function createArticle(formData: FormData) {
  const collection = await getCollection()

  // Extract the file from the form
  const file = formData.get("image") as File
  let imageUrl = ""

  // If user uploaded a file, send it to Cloudinary
  if (file && file.size > 0) {
    imageUrl = await uploadToCloudinary(file)
  }

  const newArticle = {
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
    imageUrl: imageUrl,
    createdAt: new Date(),
  }

  await collection.insertOne(newArticle)

  // Refresh the UI instantly
  revalidatePath("/")
  revalidatePath("/admin")
}

// Edit an existing article
export async function updateArticle(id: string, formData: FormData) {
  const collection = await getCollection()

  const updatedData: any = {
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  }

  // Check if a new image was uploaded during the edit
  const file = formData.get("image") as File
  if (file && file.size > 0) {
    updatedData.imageUrl = await uploadToCloudinary(file)
  }

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData })

  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath(`/article/${id}`) // Refresh the specific article page if it exists
}

// Remove an article by ID
export async function deleteArticle(id: string) {
  const collection = await getCollection()

  await collection.deleteOne({ _id: new ObjectId(id) })

  revalidatePath("/")
  revalidatePath("/admin")
}
