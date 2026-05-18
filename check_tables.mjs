import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  console.log('Listing all tables in public schema...');
  
  try {
    const { data: tables, error: tableError } = await supabase
      .rpc('get_tables'); // This might not exist, let's try raw query if possible or just check common names

    if (tableError) {
      console.log('RPC get_tables not found, trying common tables...');
      const tablesToCheck = ['users', 'profiles', 'orders', 'webhooks', 'users_shopspy', 'webhook_logs_shopspy', 'kirvano_logs'];
      for (const table of tablesToCheck) {
          const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
          if (!error) {
              console.log(`Table ${table} exists with ${count} rows.`);
          } else {
              console.log(`Table ${table} check failed: ${error.message}`);
          }
      }
    } else {
      console.log('Tables:', tables);
    }

  } catch (e) {
    console.error('Exception:', e);
  }
}

check();
