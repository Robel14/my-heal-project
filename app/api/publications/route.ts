import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { put } from "@vercel/blob"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("heal-ethiopia")

    const publications = await db
      .collection("publications")
      .find({ status: "published" })
      .sort({ publishedDate: -1 })
      .toArray()

    return NextResponse.json(publications)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch publications" }, { status: 500 })
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
    const type = formData.get("type") as string
    const description = formData.get("description") as string
    const publishedDate = formData.get("publishedDate") as string
    const status = formData.get("status") as string
    const file = formData.get("file") as File
    const thumbnail = formData.get("thumbnail") as File

    if (!title || !type || !file || !thumbnail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Upload file to Vercel Blob
    const fileBlob = await put(file.name, file, {
      access: "public",
    })

    // Upload thumbnail to Vercel Blob
    const thumbnailBlob = await put(thumbnail.name, thumbnail, {
      access: "public",
    })

    const client = await clientPromise
    const db = client.db("heal-ethiopia")

    const result = await db.collection("publications").insertOne({
      title,
      type,
      description,
      publishedDate: new Date(publishedDate),
      status,
      fileUrl: fileBlob.url,
      thumbnailUrl: thumbnailBlob.url,
      createdAt: new Date(),
      updatedAt: new Date(),
      uploadedBy: session.user?.email,
    })

    return NextResponse.json({
      id: result.insertedId,
      message: "Publication added successfully",
    })
  } catch (error) {
    console.error("Error adding publication:", error)
    return NextResponse.json({ error: "Failed to add publication" }, { status: 500 })
  }
}
