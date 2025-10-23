import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuidv4 } from "uuid"
import { createClient } from '@supabase/supabase-js'

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Initialize Supabase client (uses service_role key on server)
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// Table name configurable by env var (some projects have different table names)
const TABLE_NAME = process.env.SUPABASE_TABLE || 'menu_images'

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

    // Save record to Supabase
    try {
      const { data: insertData, error: insertError } = await supabase
        .from('ortus_db')
        .insert([
          {
            id: image.id,
            src: image.src,
            alt: image.alt,
          },
        ])

      if (insertError) {
        console.error('Supabase insert error:', insertError)
      } else {
        console.log('Saved image record to Supabase:', insertData)
      }
    } catch (error) {
      console.error('Error saving to Supabase:', error)
    }

    console.log("=== UPLOAD MENU IMAGE SUCCESS ===")
    return NextResponse.json({ image })
  } catch (error) {
    console.error("=== UPLOAD MENU IMAGE ERROR ===")
    console.error("=== END ERROR LOG ===")
    return NextResponse.json({ error: "Lỗi khi upload ảnh" }, { status: 500 })
  }
}
