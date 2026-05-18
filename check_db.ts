import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  console.log('Checking tables...');
  
  const { data: tables, error: tableError } = await supabase
    .from('webhook_logs_shopspy')
    .select('*')
    .limit(1);

  if (tableError) {
    console.error('Error querying webhook_logs_shopspy:', tableError.message);
  } else {
    console.log('webhook_logs_shopspy exists and is accessible.');
  }

  const { data: userTables, error: userError } = await supabase
    .from('users_shopspy')
    .select('*')
    .limit(1);

  if (userError) {
    console.error('Error querying users_shopspy:', userError.message);
  } else {
    console.log('users_shopspy exists and is accessible.');
  }
}

check();
