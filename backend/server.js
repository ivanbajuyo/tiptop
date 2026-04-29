require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { createClient } = require('@supabase/supabase-js');

// ─── Init ───────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 4000;

// ─── Supabase ───────────────────────────────────────────────────────
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Middleware ─────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:3000',
  // Add your Vercel URL after deploying, e.g.:
  // 'https://tiptop-ivanbajuyo.vercel.app',
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
    supabase: supabaseUrl ? 'connected' : 'not configured',
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

    console.log(`✅ New inquiry #${data?.[0]?.id} from ${cleanEmail}`);
    return res.status(200).json({ success: true, id: data?.[0]?.id });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET — Fetch all inquiries (admin use — protect with auth in production)
app.get('/api/inquiries', async (_req, res) => {
  try {
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
  console.log(`   Supabase: ${supabaseUrl}\n`);
});
