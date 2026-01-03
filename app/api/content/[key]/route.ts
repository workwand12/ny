import { NextRequest, NextResponse } from 'next/server'
import { getContent, updateContent } from '@/lib/content'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const value = await getContent(params.key)
    return NextResponse.json({ key: params.key, value })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { value } = await request.json()
    await updateContent(params.key, value)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}


