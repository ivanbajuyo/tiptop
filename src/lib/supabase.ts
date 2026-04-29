import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

if (!supabaseUrl || !supabaseServiceKey || supabaseServiceKey.startsWith('YOUR_')) {
  console.warn('⚠️ Supabase not configured — contact form will fail. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env')
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey)
