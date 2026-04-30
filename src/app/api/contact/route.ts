import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

// Initialize Resend client
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

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

    // Sanitize
    const cleanName = String(name).slice(0, 100)
    const cleanCompany = String(company).slice(0, 200)
    const cleanEmail = String(email).slice(0, 200)
    const cleanMessage = String(message).slice(0, 5000)

    // Save to local database via Prisma
    const inquiry = await db.contactInquiry.create({
      data: {
        name: cleanName,
        company: cleanCompany,
        email: cleanEmail,
        message: cleanMessage,
      },
    })

    console.log(`✅ New inquiry #${inquiry.id} from ${cleanEmail}`)

    // Send email notification to admin via Resend
    if (resend && ADMIN_EMAIL) {
      console.log(`📧 Sending email to ${ADMIN_EMAIL} via Resend...`)
      try {
        const { data, error } = await resend.emails.send({
          from: 'Tip Top Distribution <onboarding@resend.dev>',
          to: ADMIN_EMAIL,
          replyTo: cleanEmail,
          subject: `New Inquiry from ${cleanName} — ${cleanCompany}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 24px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Inquiry</h1>
                <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0 0; font-size: 14px;">Tip Top Distribution, Inc.</p>
              </div>

              <div style="background: #f9fafb; padding: 20px; border-left: 4px solid #10B981; margin: 0;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; width: 120px; vertical-align: top;"><strong>ID</strong></td>
                    <td style="padding: 8px 0;">#${inquiry.id}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>From</strong></td>
                    <td style="padding: 8px 0;">${cleanName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Email</strong></td>
                    <td style="padding: 8px 0;"><a href="mailto:${cleanEmail}" style="color: #10B981;">${cleanEmail}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Company</strong></td>
                    <td style="padding: 8px 0;">${cleanCompany}</td>
                  </tr>
                </table>
              </div>

              <div style="padding: 20px;">
                <h3 style="color: #1f2937; margin: 0 0 12px 0; font-size: 16px;">Message:</h3>
                <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #374151; white-space: pre-wrap;">${cleanMessage}</div>
              </div>

              <div style="padding: 16px 20px; background: #f9fafb; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                  <strong>Reply to:</strong> <a href="mailto:${cleanEmail}" style="color: #10B981;">${cleanEmail}</a>
                </p>
                <p style="margin: 8px 0 0 0; font-size: 11px; color: #9ca3af;">
                  This inquiry was submitted via the Tip Top Distribution website.
                </p>
              </div>
            </div>
          `,
        })

        if (error) {
          console.error('❌ Resend error:', error)
        } else {
          console.log(`📧 Email sent successfully! ID: ${data?.id}`)
        }
      } catch (emailError) {
        console.error('❌ Resend exception:', emailError)
      }
    } else {
      console.warn(`⚠️ Email NOT sent. RESEND_API_KEY=${RESEND_API_KEY ? 'set' : 'missing'}, ADMIN_EMAIL=${ADMIN_EMAIL || 'missing'}`)
    }

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
