import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("heal-ethiopia")

    const news = await db.collection("news").find({ status: "published" }).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(news)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const title = formData.get("title") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const status = formData.get("status") as string
    const featuredImage = formData.get("featuredImage") as File

    if (!title || !content || !featuredImage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Upload image to Vercel Blob
    const blob = await put(featuredImage.name, featuredImage, {
      access: "public",
    })

    const client = await clientPromise
    const db = client.db("heal-ethiopia")

    const result = await db.collection("news").insertOne({
      title,
      excerpt,
      content,
      status,
      featuredImage: blob.url,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: session.user?.email,
    })

    return NextResponse.json({
      id: result.insertedId,
      message: "News created successfully",
    })
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 })
  }
}
