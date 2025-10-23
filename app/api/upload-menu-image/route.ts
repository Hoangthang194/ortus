import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

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

    console.log("Processing file buffer...")
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log("Buffer size:", buffer.length, "bytes")

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "menu")
    console.log("Uploads directory:", uploadsDir)
    await mkdir(uploadsDir, { recursive: true })
    console.log("Directory created/verified")

    // Generate unique filename
    const fileExtension = file.name.split('.').pop()
    const filename = `${uuidv4()}.${fileExtension}`
    const filepath = join(uploadsDir, filename)
    console.log("Generated filename:", filename)
    console.log("Full filepath:", filepath)

    // Save file
    console.log("Writing file to disk...")
    await writeFile(filepath, buffer)
    console.log("File saved successfully")

    // Create image object
    const image = {
      id: uuidv4(),
      src: `/uploads/menu/${filename}`,
      alt: `Menu Image ${Date.now()}`
    }
    console.log("Created image object:", image)

    // Load existing images
    const dataPath = join(process.cwd(), "data", "menu-images.json")
    console.log("Data file path:", dataPath)
    let images = []
    
    try {
      const fs = require("fs")
      if (fs.existsSync(dataPath)) {
        console.log("Reading existing data file...")
        const data = fs.readFileSync(dataPath, "utf8")
        const parsed = JSON.parse(data)
        images = parsed.images || []
        console.log("Loaded existing images:", images.length)
      } else {
        console.log("Data file does not exist, starting with empty array")
      }
    } catch (error) {
      console.error("Error reading existing images:", error)
    }

    // Add new image
    images.push(image)
    console.log("Added new image, total images:", images.length)

    // Save updated images
    const fs = require("fs")
    const dataDir = join(process.cwd(), "data")
    console.log("Data directory:", dataDir)
    await mkdir(dataDir, { recursive: true })
    console.log("Data directory created/verified")
    
    console.log("Writing updated data to file...")
    fs.writeFileSync(dataPath, JSON.stringify({ images }, null, 2))
    console.log("Data file updated successfully")

    console.log("=== UPLOAD MENU IMAGE SUCCESS ===")
    return NextResponse.json({ image })
  } catch (error) {
    console.error("=== UPLOAD MENU IMAGE ERROR ===")
    console.error("Error type:", error.constructor.name)
    console.error("Error message:", error.message)
    console.error("Error stack:", error.stack)
    console.error("Full error object:", error)
    console.error("=== END ERROR LOG ===")
    return NextResponse.json({ error: "Lỗi khi upload ảnh" }, { status: 500 })
  }
}
