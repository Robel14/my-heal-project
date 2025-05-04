import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { put } from "@vercel/blob"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("heal-ethiopia")

    const gallery = await db.collection("gallery").find({ status: "published" }).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
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
    const category = formData.get("category") as string
    const description = formData.get("description") as string
    const status = formData.get("status") as string
    const image = formData.get("image") as File

    if (!title || !category || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Upload image to Vercel Blob
    const blob = await put(image.name, image, {
      access: "public",
    })

    const client = await clientPromise
    const db = client.db("heal-ethiopia")

    const result = await db.collection("gallery").insertOne({
      title,
      category,
      description,
      status,
      imageUrl: blob.url,
      createdAt: new Date(),
      updatedAt: new Date(),
      uploadedBy: session.user?.email,
    })

    return NextResponse.json({
      id: result.insertedId,
      message: "Gallery image added successfully",
    })
  } catch (error) {
    console.error("Error adding gallery image:", error)
    return NextResponse.json({ error: "Failed to add gallery image" }, { status: 500 })
  }
}
