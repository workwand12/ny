import { NextResponse } from 'next/server'
import { getAllContent } from '@/lib/content'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const content = await getAllContent()
    return NextResponse.json(content)
  } catch (error) {
    console.error('[API] Failed to fetch content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}


