import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, message } = body

    // Validate
    if (!name || !company || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters.' },
        { status: 400 }
      )
    }

    // Save to local database via Prisma
    const inquiry = await db.contactInquiry.create({
      data: {
        name: String(name).slice(0, 100),
        company: String(company).slice(0, 200),
        email: String(email).slice(0, 200),
        message: String(message).slice(0, 5000),
      },
    })

    return NextResponse.json(
      { success: true, id: inquiry.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET — fetch all inquiries (for future admin use)
export async function GET() {
  try {
    const inquiries = await db.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(inquiries)
  } catch (error) {
    console.error('Fetch inquiries error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
