import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  console.log('Fetching most recent log details...');
  
  try {
    const { data: logs, error: logError } = await supabase
      .from('webhook_logs_shopspy')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (logError) {
      console.error('Error fetching logs:', logError.message);
    } else {
      if (logs.length > 0) {
        const log = logs[0];
        console.log('--- LOG DETAILS ---');
        console.log('ID:', log.id);
        console.log('Event:', log.event_type);
        console.log('Processed:', log.processed);
        console.log('Error:', log.error);
        console.log('Payload:', JSON.stringify(log.payload, null, 2));
      } else {
        console.log('No logs found.');
      }
    }
  } catch (e) {
    console.error('Exception:', e);
  }
}

check();
