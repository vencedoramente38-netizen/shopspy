import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUsers() {
  const { data, error } = await supabase.from('users_shopspy').select('email, created_at').order('created_at', { ascending: false }).limit(5);
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('---RECENT USERS---');
  data.forEach(user => console.log(`${user.email} (${user.created_at})`));
  console.log('------------------');
}

checkUsers();
