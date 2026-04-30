require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

// ─── Init ───────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 4000;

// ─── Email Configuration (Resend REST API) ─────────────────────────
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function sendResendEmail({ to, replyTo, subject, html }) {
  if (!RESEND_API_KEY || !ADMIN_EMAIL) {
    console.warn('⚠️ RESEND_API_KEY or ADMIN_EMAIL not set');
    return null;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ivanbajuyo <onboarding@resend.dev>',
        to,
        replyTo,
        subject,
        html,
      }),
    });

    const result = await res.json();
    if (!res.ok) {
      console.error('❌ Resend API error:', result);
    } else {
      console.log(`📧 Email sent to ${to}! ID: ${result.id}`);
    }
    return result;
  } catch (err) {
    console.error('❌ Resend fetch error:', err.message);
    return null;
  }
}

const allowedOrigins = [
  'http://localhost:3000',
];

app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// ─── Routes ─────────────────────────────────────────────────────────

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'tiptop-api',
    timestamp: new Date().toISOString(),
    email: RESEND_API_KEY ? 'resend configured' : 'not configured',
  });
});

// POST — Create a new contact inquiry
app.post('/api/contact', async (req, res) => {
  try {
    const { name, company, email, message } = req.body;

    if (!name || !company || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (message.length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters.' });
    }

    const cleanName = String(name).slice(0, 100);
    const cleanCompany = String(company).slice(0, 200);
    const cleanEmail = String(email).slice(0, 200);
    const cleanMessage = String(message).slice(0, 5000);

    console.log(`✅ New inquiry from ${cleanEmail} (${cleanCompany})`);

    // Send email notification via Resend
    await sendResendEmail({
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
              <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;"><strong>From</strong></td><td style="padding: 8px 0;">${cleanName}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${cleanEmail}" style="color: #10B981;">${cleanEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Company</strong></td><td style="padding: 8px 0;">${cleanCompany}</td></tr>
            </table>
          </div>
          <div style="padding: 20px;">
            <h3 style="color: #1f2937; margin: 0 0 12px 0; font-size: 16px;">Message:</h3>
            <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #374151; white-space: pre-wrap;">${cleanMessage}</div>
          </div>
          <div style="padding: 16px 20px; background: #f9fafb; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #6b7280;"><strong>Reply to:</strong> <a href="mailto:${cleanEmail}" style="color: #10B981;">${cleanEmail}</a></p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── Start ──────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Tip Top API running on port ${PORT}`);
  console.log(`   Email: ${RESEND_API_KEY ? 'Resend configured' : 'Not configured'}\n`);
});
