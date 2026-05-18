const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  console.log('Fetching logs...');
  
  const { data: logs, error: logError } = await supabase
    .from('webhook_logs_shopspy')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (logError) {
    console.error('Error fetching logs:', logError.message);
  } else {
    console.log('Logs found:', logs.length);
    logs.forEach(log => {
      console.log('---');
      console.log('ID:', log.id);
      console.log('Event:', log.event_type);
      console.log('Created At:', log.created_at);
      console.log('Processed:', log.processed);
      console.log('Error:', log.error);
      // Only log a bit of payload if it exists
      if (log.payload) {
          console.log('Payload Event:', log.payload.event || log.payload.event_type || log.payload.type);
          console.log('Payload Email:', log.payload.customer?.email || log.payload.email);
      }
    });
  }
}

check();
