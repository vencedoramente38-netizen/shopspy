import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  console.log('--- DIAGNOSTIC START ---');
  
  try {
    const tables = ['webhook_logs_shopspy', 'users_shopspy'];
    for (const table of tables) {
      console.log(`Checking table: ${table}...`);
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error(`  Error for ${table}:`, error.message);
      } else {
        console.log(`  Table ${table} exists. Row count: ${count}`);
      }
    }

    console.log('Checking Auth Users...');
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) {
      console.error('  Auth Error:', authError.message);
    } else {
      console.log('  Auth Users count:', authUsers.users.length);
    }

  } catch (e) {
    console.error('--- CRITICAL EXCEPTION ---', e);
  }
  console.log('--- DIAGNOSTIC END ---');
}

check();
