import { NextRequest, NextResponse } from "next/server"
import { join } from "path"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const imageId = params.id
    const dataPath = join(process.cwd(), "data", "menu-images.json")
    
    try {
      const fs = require("fs")
      if (fs.existsSync(dataPath)) {
        const data = fs.readFileSync(dataPath, "utf8")
        const parsed = JSON.parse(data)
        const images = parsed.images || []
        
        // Find the image to delete
        const imageToDelete = images.find((img: any) => img.id === imageId)
        if (!imageToDelete) {
          return NextResponse.json({ error: "Không tìm thấy ảnh" }, { status: 404 })
        }

        // Delete the file from filesystem
        const filePath = join(process.cwd(), "public", imageToDelete.src)
        try {
          fs.unlinkSync(filePath)
        } catch (fileError) {
          console.error("Error deleting file:", fileError)
          // Continue even if file deletion fails
        }

        // Remove from JSON
        const updatedImages = images.filter((img: any) => img.id !== imageId)
        
        fs.writeFileSync(dataPath, JSON.stringify({ images: updatedImages }, null, 2))
        
        return NextResponse.json({ success: true })
      }
    } catch (error) {
      console.error("Error deleting menu image:", error)
      return NextResponse.json({ error: "Lỗi khi xóa ảnh" }, { status: 500 })
    }

    return NextResponse.json({ error: "Không tìm thấy dữ liệu" }, { status: 404 })
  } catch (error) {
    console.error("Error deleting menu image:", error)
    return NextResponse.json({ error: "Lỗi khi xóa ảnh" }, { status: 500 })
  }
}
