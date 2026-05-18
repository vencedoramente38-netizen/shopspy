import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  console.log('Fetching row ID 8...');
  
  try {
    const { data, error } = await supabase
      .from('webhook_logs_shopspy')
      .select('*')
      .eq('id', 8);

    if (error) {
      console.error('Error:', error.message);
    } else {
      console.log('Row ID 8:', JSON.stringify(data, null, 2));
    }

    const { data: allLogs } = await supabase.from('webhook_logs_shopspy').select('id, event_type, created_at');
    console.log('All Logs visible:', allLogs?.length);
    allLogs?.forEach(l => console.log(` - ID: ${l.id}, Event: ${l.event_type}`));

  } catch (e) {
    console.error('Exception:', e);
  }
}

check();
