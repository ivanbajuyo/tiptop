require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

// ─── Init ───────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 4000;

// ─── Supabase (optional — falls back to local JSON storage) ─────────
let supabase = null;
let supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (supabaseUrl && supabaseKey) {
  try {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized');
  } catch (err) {
    console.warn('⚠️ Failed to initialize Supabase, using local storage fallback');
    supabase = null;
    supabaseUrl = null;
  }
} else {
  console.warn('⚠️ SUPABASE_URL or SUPABASE_SERVICE_KEY not set — using local JSON storage');
  supabaseUrl = null;
}

// ─── Local JSON storage fallback ─────────────────────────────────────
const DATA_FILE = path.join(__dirname, 'inquiries.json');

function readLocalInquiries() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    return [];
  } catch {
    return [];
  }
}

function writeLocalInquiries(inquiries) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2), 'utf8');
}

// ─── Email Configuration (Resend) ────────────────────────────────────
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

let resend = null;
if (RESEND_API_KEY) {
  try {
    const { Resend } = require('resend');
    resend = new Resend(RESEND_API_KEY);
    console.log('✅ Resend email service initialized');
  } catch (err) {
    console.warn('⚠️ Failed to initialize Resend');
  }
} else {
  console.warn('⚠️ RESEND_API_KEY not set - emails will not be sent');
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

// Health check — Render uses this to confirm your service is alive
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'tiptop-api',
    timestamp: new Date().toISOString(),
    supabase: supabaseUrl ? 'connected' : 'not configured (local storage)',
  });
});

// POST — Create a new contact inquiry
app.post('/api/contact', async (req, res) => {
  try {
    const { name, company, email, message } = req.body;

    // Validate
    if (!name || !company || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (message.length < 10) {
      return res.status(400).json({
        error: 'Message must be at least 10 characters.',
      });
    }

    // Sanitize — truncate to prevent abuse
    const cleanName = String(name).slice(0, 100);
    const cleanCompany = String(company).slice(0, 200);
    const cleanEmail = String(email).slice(0, 200);
    const cleanMessage = String(message).slice(0, 5000);

    let inquiryId;

    if (supabase) {
      // Save to Supabase
      const { data, error } = await supabase
        .from('contact_inquiries')
        .insert([{
          name: cleanName,
          company: cleanCompany,
          email: cleanEmail,
          message: cleanMessage,
        }])
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        return res.status(500).json({
          error: 'Failed to save inquiry. Please try again.',
        });
      }

      inquiryId = data?.[0]?.id;
    } else {
      // Fallback: save to local JSON file
      const inquiries = readLocalInquiries();
      inquiryId = inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1;
      inquiries.unshift({
        id: inquiryId,
        name: cleanName,
        company: cleanCompany,
        email: cleanEmail,
        message: cleanMessage,
        created_at: new Date().toISOString(),
      });
      writeLocalInquiries(inquiries);
    }

    console.log(`✅ New inquiry #${inquiryId} from ${cleanEmail}`);

    // Send email notification to admin using Resend
    if (ADMIN_EMAIL && resend) {
      console.log(`📧 Attempting to send email to ${ADMIN_EMAIL}...`);
      try {
        await resend.emails.send({
          from: 'noreply@resend.dev',
          to: ADMIN_EMAIL,
          subject: `New Inquiry from ${cleanName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1f2937;">New Contact Inquiry</h2>
              <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
                <p><strong>ID:</strong> #${inquiryId}</p>
                <p><strong>From:</strong> ${cleanName}</p>
                <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
                <p><strong>Company:</strong> ${cleanCompany}</p>
              </div>
              <h3 style="color: #1f2937; margin-top: 24px;">Message:</h3>
              <p style="white-space: pre-wrap; background: #f9fafb; padding: 12px; border-left: 4px solid #10b981; border-radius: 4px;">
                ${cleanMessage}
              </p>
              <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px;">
                <strong>Reply to:</strong> ${cleanEmail}
              </p>
            </div>
          `,
        });

        console.log(`📧 Email sent to ${ADMIN_EMAIL}`);
      } catch (emailError) {
        console.error('❌ Resend email error:', emailError);
      }
    }

    return res.status(200).json({ success: true, id: inquiryId });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET — Fetch all inquiries (admin use — protect with auth in production)
app.get('/api/inquiries', async (_req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Supabase fetch error:', error);
        return res.status(500).json({ error: 'Failed to fetch inquiries' });
      }

      return res.json({ success: true, count: data.length, data });
    } else {
      // Fallback: read from local JSON
      const inquiries = readLocalInquiries();
      return res.json({ success: true, count: inquiries.length, data: inquiries });
    }
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 for everything else
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── Start ──────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Tip Top API running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Contact: POST http://localhost:${PORT}/api/contact`);
  console.log(`   Inquiries: GET http://localhost:${PORT}/api/inquiries`);
  console.log(`   Storage: ${supabaseUrl ? 'Supabase' : 'Local JSON file'}\n`);
});
