import { NextRequest, NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client (server-side)
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

const TABLE_NAME = process.env.SUPABASE_INFO_TABLE || 'info_db'

export async function GET() {
  try {
    // Only select rows with type = 'ortus'
    const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('type', 'ortus')
    if (error) {
      console.error('Supabase select error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ info: data || [] })
  } catch (err) {
    console.error('GET /api/info error:', err)
    return NextResponse.json({ error: 'Lỗi khi lấy thông tin' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, phone_number, address, type } = body || {}

    if (!phone_number && !address) {
      return NextResponse.json({ error: 'Thiếu dữ liệu để cập nhật' }, { status: 400 })
    }
    // Ensure we always set type to 'ortus' for this API
    const enforcedType = 'ortus'

    if (id) {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .update({ phone_number, address, type: enforcedType })
        .eq('id', id)

      if (error) {
        console.error('Supabase update error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ info: data })
    }

    // Try updating an existing ortus row first (upsert-like behavior by type)
    const { data: updatedData, error: updateError } = await supabase
      .from(TABLE_NAME)
      .update({ phone_number, address, type: enforcedType })
      .eq('type', enforcedType)

    if (updateError) {
      console.error('Supabase update by type error:', updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    if (updatedData && (updatedData as any).length > 0) {
      return NextResponse.json({ info: updatedData })
    }

    // No existing ortus row — insert a new one
    const payload = { phone_number, address, type: enforcedType }
    const { data, error } = await supabase.from(TABLE_NAME).insert([payload])
    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ info: data })
  } catch (err) {
    console.error('PUT /api/info error:', err)
    return NextResponse.json({ error: 'Lỗi khi cập nhật thông tin' }, { status: 500 })
  }
}
