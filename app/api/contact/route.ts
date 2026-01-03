import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, enquiryType } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await prisma.contactEnquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
        enquiryType: enquiryType || 'contact',
      },
    })

    // TODO: Send email notification if SMTP configured
    // if (process.env.SMTP_HOST) { ... }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 })
  }
}

