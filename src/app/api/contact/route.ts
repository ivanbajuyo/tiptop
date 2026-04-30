import { NextResponse } from 'next/server'
import type { ServerResponse } from 'http'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'

function sendResendEmail(data: { fromName: string; to: string; replyTo: string; subject: string; html: string }): Promise<{ success: boolean; id?: string }> {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      from: `${data.fromName} <${FROM_EMAIL}>`,
      to: data.to,
      reply_to: data.replyTo,
      subject: data.subject,
      html: data.html,
    })

    const options = {
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Length': Buffer.byteLength(postData),
      },
    }

    const req = require('https').request(options, (res: ServerResponse) => {
      let body = ''
      res.on('data', (chunk: Buffer) => { body += chunk.toString() })
      res.on('end', () => {
        try {
          const result = JSON.parse(body)
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300 && result.id) {
            console.log(`📧 Email sent! ID: ${result.id}`)
            resolve({ success: true, id: result.id })
          } else {
            console.error('❌ Resend error:', result)
            resolve({ success: false })
          }
        } catch {
          resolve({ success: false })
        }
      })
    })

    req.on('error', (err: Error) => {
      console.error('❌ Resend request error:', err.message)
      resolve({ success: false })
    })

    req.write(postData)
    req.end()
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, message } = body

    if (!name || !company || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (message.length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 })
    }

    const cleanName = String(name).slice(0, 100)
    const cleanCompany = String(company).slice(0, 200)
    const cleanEmail = String(email).slice(0, 200)
    const cleanMessage = String(message).slice(0, 5000)

    console.log(`✅ New inquiry from ${cleanEmail} (${cleanCompany})`)

    // Send email via Resend using Node https module (Turbopack-safe)
    let emailResult = { success: false }
    if (RESEND_API_KEY && ADMIN_EMAIL) {
      emailResult = await sendResendEmail({
        fromName: cleanName,
        to: ADMIN_EMAIL,
        replyTo: cleanEmail,
        subject: `New Inquiry from ${cleanName} — ${cleanCompany}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Inquiry</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0 0; font-size: 14px;">Tip Top Distribution, Inc.</p>
            </div>
            <div style="background: #f9fafb; padding: 20px; border-left: 4px solid #10B981;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;"><strong>From</strong></td><td>${cleanName}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Email</strong></td><td><a href="mailto:${cleanEmail}" style="color: #10B981;">${cleanEmail}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Company</strong></td><td>${cleanCompany}</td></tr>
              </table>
            </div>
            <div style="padding: 20px;">
              <h3 style="color: #1f2937; margin: 0 0 12px 0;">Message:</h3>
              <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${cleanMessage}</div>
            </div>
            <div style="padding: 16px 20px; background: #f9fafb; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 12px; color: #6b7280;"><strong>Reply to:</strong> <a href="mailto:${cleanEmail}" style="color: #10B981;">${cleanEmail}</a></p>
            </div>
          </div>
        `,
      })
    } else {
      console.warn('⚠️ RESEND_API_KEY or ADMIN_EMAIL not configured')
    }

    return NextResponse.json({
      success: true,
      emailSent: emailResult.success,
      emailId: emailResult.id,
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
