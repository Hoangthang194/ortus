import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary'
import { createClient } from '@supabase/supabase-js'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// Table name configurable by env var
const TABLE_NAME = 'ortus_db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const imageId = params.id

    // 1) Fetch the record from Supabase to get public_id/src
    const { data: records, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('id, src')
      .eq('id', imageId)
      .limit(1)

    if (fetchError) {
      console.error('Error fetching record from Supabase:', fetchError)
      return NextResponse.json({ error: 'Lỗi khi lấy dữ liệu' }, { status: 500 })
    }

    const record = records && records[0]
    if (!record) {
      console.debug('Supabase returned no record for id:', imageId, 'records:', records)
      return NextResponse.json({ error: 'Không tìm thấy ảnh' }, { status: 404 })
    }

    // 2) Delete from Cloudinary (use public_id)
    try {
      await cloudinary.uploader.destroy(record.id)
    } catch (cloudErr) {
      console.error('Cloudinary delete error:', cloudErr)
      // Continue even if cloudinary deletion fails
    }

    // 3) Delete the record from Supabase
    const { error: deleteError } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', imageId)

    if (deleteError) {
      console.error('Error deleting record from Supabase:', deleteError)
      return NextResponse.json({ error: 'Lỗi khi xóa ảnh' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting menu image:', error)
    return NextResponse.json({ error: 'Lỗi khi xóa ảnh' }, { status: 500 })
  }
}
