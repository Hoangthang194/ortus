import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuidv4 } from "uuid"

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request: NextRequest) {
  try {
    console.log("=== UPLOAD MENU IMAGE START ===")
    const formData = await request.formData()
    const file = formData.get("image") as File

    console.log("File received:", {
      name: file?.name,
      type: file?.type,
      size: file?.size,
      lastModified: file?.lastModified
    })

    if (!file) {
      console.error("No file provided in request")
      return NextResponse.json({ error: "Không có file được upload" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      console.error("Invalid file type:", file.type)
      return NextResponse.json({ error: "Chỉ được upload file ảnh" }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error("File too large:", file.size, "bytes")
      return NextResponse.json({ error: "Kích thước file không được vượt quá 5MB" }, { status: 400 })
    }

    // Convert file to base64
    console.log("Converting file to base64...")
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64String = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${base64String}`

    // Upload to Cloudinary
    console.log("Uploading to Cloudinary...")
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: 'ortus/menu',
      resource_type: 'auto',
      public_id: uuidv4(),
    })
    console.log("Upload successful, URL:", uploadResult.secure_url)

    // Create image object
    const image = {
      id: uploadResult.public_id,
      src: uploadResult.secure_url,
      alt: `Menu Image ${Date.now()}`
    }
    console.log("Created image object:", image)

    // Save URL to JSON file
    try {
      const fs = require('fs')
      const path = require('path')
      const dataDir = path.join(process.cwd(), 'data')
      const dataPath = path.join(dataDir, 'menu-images.json')

      // Create data directory if it doesn't exist
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }

      // Read existing data or create new array
      let images = []
      if (fs.existsSync(dataPath)) {
        const data = fs.readFileSync(dataPath, 'utf8')
        const parsed = JSON.parse(data)
        images = parsed.images || []
      }

      // Add new image and save
      images.push(image)
      fs.writeFileSync(dataPath, JSON.stringify({ images }, null, 2))
      console.log("Image URL saved to JSON file")
    } catch (error) {
      console.error("Error saving to JSON:", error)
      // Continue anyway since the image was uploaded successfully
    }

    console.log("=== UPLOAD MENU IMAGE SUCCESS ===")
    return NextResponse.json({ image })
  } catch (error) {
    console.error("=== UPLOAD MENU IMAGE ERROR ===")
    console.error("=== END ERROR LOG ===")
    return NextResponse.json({ error: "Lỗi khi upload ảnh" }, { status: 500 })
  }
}
