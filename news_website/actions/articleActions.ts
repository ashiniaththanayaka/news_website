"use server"

import clientPromise from "@/lib/mongodb"
import cloudinary from "@/lib/cloudinary"
import { ObjectId } from "mongodb"
import { revalidatePath } from "next/cache"
import { auth, currentUser } from "@clerk/nextjs/server" // <-- Clerk Authentication

// ==========================================
// HELPER FUNCTIONS
// ==========================================

async function getCollection() {
  const client = await clientPromise
  const db = client.db("news_app")
  // Remember: This is NoSQL, so we are keeping this flat without relational joins
  return db.collection("articles")
}

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

// ==========================================
// DML OPERATIONS (CRUD)
// ==========================================

// 1. Fetch ALL articles (Public - For the Home Page)
export async function getArticles() {
  const collection = await getCollection()
  const articles = await collection.find({}).sort({ createdAt: -1 }).toArray()

  return articles.map((article) => ({
    _id: article._id.toString(),
    title: article.title,
    category: article.category,
    content: article.content,
    imageUrl: article.imageUrl,
    authorId: article.authorId || null,
    createdAt: article.createdAt,
  }))
}

// 2. Fetch USER'S articles ONLY (Protected - For the User Dashboard)
export async function getUserArticles(userId: string) {
  // If no ID is passed in, instantly return empty
  if (!userId) return []

  const collection = await getCollection()

  // Search Mongo explicitly for the string that was passed in
  const articles = await collection
    .find({ authorId: userId })
    .sort({ createdAt: -1 })
    .toArray()

  return articles.map((article) => ({
    _id: article._id.toString(),
    title: article.title,
    category: article.category,
    content: article.content,
    imageUrl: article.imageUrl,
    authorId: article.authorId,
    createdAt: article.createdAt,
  }))
}

// 3. Fetch ONE article (Public - For the Single Article View)
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
    authorId: article.authorId || null,
    createdAt: article.createdAt,
  }
}

// 4. CREATE a new article (Protected - Attached to the logged-in user)
export async function createArticle(formData: FormData) {
  const authObject = await auth()
  const userId = authObject.userId

  // This will print in your VS Code terminal (not the browser console)
  console.log("SERVER CHECK - Logged in User ID:", userId)

  if (!userId) {
    throw new Error("You must be logged in to post.")
  }

  const collection = await getCollection()
  const file = formData.get("image") as File
  let imageUrl = ""

  if (file && file.size > 0) {
    imageUrl = await uploadToCloudinary(file)
  }

  const newArticle = {
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
    imageUrl: imageUrl,
    authorId: userId,
    createdAt: new Date(),
  }

  await collection.insertOne(newArticle)

  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath("/dashboard")
}

// 5. UPDATE an article (NEW RULE: EVERYONE can only edit their own)
export async function updateArticle(id: string, formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error(
      "Unauthorized: Your session expired. Please refresh the page."
    )
  }

  const collection = await getCollection()
  const article = await collection.findOne({ _id: new ObjectId(id) })

  if (!article) throw new Error("Article not found")

  // STRICT NEW RULE: We don't even check if they are an admin.
  // If their ID doesn't match the author's ID, block the edit immediately.
  if (article.authorId !== userId) {
    throw new Error(
      "Security Block: You can only edit articles that you originally wrote."
    )
  }

  const updatedData: any = {
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  }

  const file = formData.get("image") as File
  if (file && file.size > 0) {
    updatedData.imageUrl = await uploadToCloudinary(file)
  }

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData })

  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath("/dashboard")
  revalidatePath(`/article/${id}`)
}

// 6. DELETE an article (RULE REMAINS: Admin OR Original Author can delete)
export async function deleteArticle(id: string) {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    throw new Error("Unauthorized: Please refresh and try again.")
  }

  const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase()
  const userEmail = user.emailAddresses[0].emailAddress.toLowerCase()
  const isAdmin = adminEmail === userEmail

  const collection = await getCollection()
  const article = await collection.findOne({ _id: new ObjectId(id) })

  if (!article) return

  // Security Check: If they are NOT the admin, and they DID NOT write it, block deletion.
  if (!isAdmin && article.authorId !== userId) {
    throw new Error("You do not have permission to delete this article.")
  }

  await collection.deleteOne({ _id: new ObjectId(id) })

  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath("/dashboard")
}
