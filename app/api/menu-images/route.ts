import { NextRequest, NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client using server-side key
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// Table name configurable by env var
const TABLE_NAME = process.env.SUPABASE_TABLE || 'menu_images'

export async function GET() {
  try {
    // Query Supabase for menu images
    const { data, error } = await supabase
      .from('ortus_db')
      .select('id,  src, alt')
    if (error) {
      console.error('Supabase query error:', error)
      return NextResponse.json({ images: [] })
    }

    return NextResponse.json({ images: data || [] })
  } catch (error) {
    console.error('Error getting menu images:', error)
    return NextResponse.json({ error: 'Lỗi khi tải ảnh menu' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { images } = await request.json()

    if (!Array.isArray(images)) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 })
    }
    // Prepare payload for Supabase upsert
    const payload = images.map((img: any) => ({
      id: img.id,
      public_id: img.public_id ?? img.id,
      src: img.src,
      alt: img.alt ?? null,
      created_at: img.created_at ?? new Date().toISOString(),
    }))

    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .upsert(payload, { onConflict: 'id' })

      if (error) {
        console.error('Supabase upsert error:', error)
        return NextResponse.json({ error: 'Lỗi khi lưu ảnh vào database' }, { status: 500 })
      }

      return NextResponse.json({ success: true, data })
    } catch (err) {
      console.error('Error upserting to Supabase:', err)
      return NextResponse.json({ error: 'Lỗi khi lưu ảnh' }, { status: 500 })
    }
  } catch (error) {
    console.error("Error saving menu images:", error)
    return NextResponse.json({ error: "Lỗi khi lưu ảnh menu" }, { status: 500 })
  }
}
