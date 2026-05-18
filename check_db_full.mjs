import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  console.log('Checking database...');
  
  try {
    // Check logs
    const { data: logs, error: logError } = await supabase
      .from('webhook_logs_shopspy')
      .select('*')
      .limit(1);

    if (logError) {
      console.error('Error fetching logs:', logError.message);
    } else {
      console.log('Logs table exists. Count (limit 1):', logs.length);
    }

    // Check users
    const { data: users, error: userError } = await supabase
      .from('users_shopspy')
      .select('*')
      .limit(5);

    if (userError) {
      console.error('Error fetching users:', userError.message);
    } else {
      console.log('Users found:', users.length);
      users.forEach(u => console.log('User:', u.email, 'Plan:', u.plan, 'Active:', u.is_active));
    }

    // Check auth users
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) {
        console.error('Error listing auth users:', authError.message);
    } else {
        console.log('Auth users count:', authUsers.users.length);
        authUsers.users.slice(0, 5).forEach(u => console.log('Auth User:', u.email));
    }

  } catch (e) {
    console.error('Exception:', e);
  }
}

check();
