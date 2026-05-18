import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listUsers() {
  const { data, error } = await supabase.from('users_shopspy').select('email, is_active, plan');
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('Registered Users:');
  data.forEach(user => {
    console.log(`- Email: ${user.email} | Active: ${user.is_active} | Plan: ${user.plan}`);
  });
}

listUsers();
