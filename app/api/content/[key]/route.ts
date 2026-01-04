import { NextRequest, NextResponse } from 'next/server'
import { getContent, updateContent } from '@/lib/content'
import { revalidatePath } from 'next/cache'

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
    const { value, type, section } = await request.json()
    await updateContent(params.key, value, type || 'text', section)
    
    // Revalidate pages that use this content
    revalidatePath('/')
    revalidatePath('/stay')
    revalidatePath('/experience')
    revalidatePath('/gallery')
    revalidatePath('/location')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] Failed to update content:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}


