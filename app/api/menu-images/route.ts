import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

export async function GET() {
  try {
    const dataPath = join(process.cwd(), "data", "menu-images.json")
    
    try {
      const fs = require("fs")
      if (fs.existsSync(dataPath)) {
        const data = fs.readFileSync(dataPath, "utf8")
        const parsed = JSON.parse(data)
        return NextResponse.json({ images: parsed.images || [] })
      }
    } catch (error) {
      console.error("Error reading menu images:", error)
    }

    return NextResponse.json({ images: [] })
  } catch (error) {
    console.error("Error getting menu images:", error)
    return NextResponse.json({ error: "Lỗi khi tải ảnh menu" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { images } = await request.json()

    if (!Array.isArray(images)) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 })
    }

    const dataPath = join(process.cwd(), "data", "menu-images.json")
    const dataDir = join(process.cwd(), "data")
    
    await mkdir(dataDir, { recursive: true })
    
    const fs = require("fs")
    fs.writeFileSync(dataPath, JSON.stringify({ images }, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving menu images:", error)
    return NextResponse.json({ error: "Lỗi khi lưu ảnh menu" }, { status: 500 })
  }
}
