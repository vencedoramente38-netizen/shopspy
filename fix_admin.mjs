import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixAdmin() {
  const email = 'shopspyadmin@gmail.com';
  console.log(`Fixing user: ${email}...`);

  // 1. Get user by email
  const { data: { users } } = await supabase.auth.admin.listUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    console.error('User not found in Auth!');
    return;
  }

  // 2. Reset password
  const { error: authError } = await supabase.auth.admin.updateUserById(user.id, {
    password: 'shopspy12345'
  });

  if (authError) {
    console.error('Error updating password:', authError.message);
  } else {
    console.log('Password reset to: shopspy12345');
  }

  // 3. Ensure is_active in public table
  const { error: dbError } = await supabase
    .from('users_shopspy')
    .update({ is_active: true, plan: 'vitalicio' })
    .eq('email', email);

  if (dbError) {
    console.error('Error updating public record:', dbError.message);
  } else {
    console.log('User status set to active (vitalicio).');
  }
}

fixAdmin();
