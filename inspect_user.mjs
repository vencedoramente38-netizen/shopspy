import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inspectUser() {
  const email = 'shopspyadmin@gmail.com';
  console.log(`Inspecting user: ${email}...`);

  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error('Error listing users:', error.message);
    return;
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    console.error('User not found in Auth!');
    return;
  }

  console.log('User Properties:');
  console.log(`- ID: ${user.id}`);
  console.log(`- Confirmed At: ${user.email_confirmed_at}`);
  console.log(`- Last Sign In: ${user.last_sign_in_at}`);
  console.log(`- Banned Until: ${user.banned_until}`);

  if (!user.email_confirmed_at) {
    console.log('User is not confirmed! Confirming now...');
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      email_confirm: true
    });
    if (updateError) console.error('Error confirming user:', updateError.message);
    else console.log('User successfully confirmed.');
  }

  // Double check the password reset
  const { error: pwError } = await supabase.auth.admin.updateUserById(user.id, {
    password: 'shopspy12345'
  });
  if (pwError) console.error('Error resetting password:', pwError.message);
  else console.log('Password set to shopspy12345 again.');
}

inspectUser();
