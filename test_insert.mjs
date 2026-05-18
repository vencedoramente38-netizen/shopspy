import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  console.log('Attempting manual insert into webhook_logs_shopspy...');
  
  try {
    const { data, error } = await supabase
      .from('webhook_logs_shopspy')
      .insert({ 
        event_type: 'test-diagnostic', 
        payload: { test: true }, 
        processed: false 
      })
      .select();

    if (error) {
      console.error('Insert failed:', error.message);
    } else {
      console.log('Insert successful! ID:', data[0].id);
    }

  } catch (e) {
    console.error('Exception during insert:', e);
  }
}

check();
