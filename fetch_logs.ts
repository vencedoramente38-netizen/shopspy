import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  console.log('Fetching logs...');
  
  const { data: logs, error: logError } = await supabase
    .from('webhook_logs_shopspy')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (logError) {
    console.error('Error fetching logs:', logError.message);
  } else {
    console.log('Logs:', JSON.stringify(logs, null, 2));
  }
}

check();
