import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNzkzNTYsImV4cCI6MjA5Mzg1NTM1Nn0.ncQEPTLySJ_VjO_c31RPPwp3xKusXJbssR80MU7Wqe0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLogin() {
  const email = 'shopspyadmin@gmail.com';
  const password = 'shopspy12345';
  
  console.log(`Testing login for ${email}...`);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Login Failed:', error.message);
  } else {
    console.log('Login Successful!');
    console.log('User ID:', data.user.id);
  }
}

testLogin();
