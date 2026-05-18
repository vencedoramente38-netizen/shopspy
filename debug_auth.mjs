import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkAuth() {
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('--- AUTH USERS ---');
  users.forEach(u => {
    console.log(`- Email: ${u.email} | ID: ${u.id}`);
  });

  const { data: publicUsers } = await supabase.from('users_shopspy').select('id, email');
  console.log('--- PUBLIC USERS ---');
  publicUsers.forEach(u => {
    console.log(`- Email: ${u.email} | ID: ${u.id}`);
  });
}

checkAuth();
