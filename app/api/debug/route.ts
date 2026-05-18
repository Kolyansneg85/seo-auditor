import { NextResponse } from "next/server"

export async function GET() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  
  return NextResponse.json({
    has_url: !!url,
    url_value: url || null,
    has_key: !!key,
    key_length: key?.length || 0,
    key_prefix: key?.slice(0, 20) || null,
    key_suffix: key?.slice(-10) || null,
  })
}
