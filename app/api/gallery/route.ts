import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, alt, order } = body

    const image = await prisma.galleryImage.create({
      data: {
        url,
        alt: alt || null,
        order: order || 0,
      },
    })

    return NextResponse.json(image)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add image' }, { status: 500 })
  }
}

