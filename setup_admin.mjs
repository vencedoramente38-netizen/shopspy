import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhviddjwhuliioabcio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupAdmin() {
  console.log('1. Trying to create Auth user...');
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: 'shopspyadmin@gmail.com',
    password: 'ShopSpy@Admin2026',
    email_confirm: true
  });
  
  if (authError) {
    if (authError.message.includes('already registered')) {
        console.log('User already registered in auth.users, continuing...');
    } else {
        console.error('Auth check error:', authError);
    }
  } else {
    console.log('Auth user created successfully:', authData.user?.id);
  }

  console.log('2. Deleting old admin...');
  await supabase.from('admins_shopspy').delete().eq('email', 'shopspy123@gmail.com');

  console.log('3. Inserting new admin...');
  const { error: insertError } = await supabase.from('admins_shopspy').upsert({
    email: 'shopspyadmin@gmail.com',
    name: 'Admin ShopSpy'
  }, { onConflict: 'email' });

  if (insertError) {
    console.error('Error inserting admin:', insertError);
  } else {
    console.log('Admin inserted into admins_shopspy successfully.');
  }

  console.log('4. Fetching the created user id...');
  const { data: users, error: findError } = await supabase.auth.admin.listUsers();
  const shopSpyAdmin = users?.users?.find(u => u.email === 'shopspyadmin@gmail.com');

  if (shopSpyAdmin) {
    console.log('5. Upserting into users_shopspy...');
    const { error: usersShopSpyError } = await supabase.from('users_shopspy').upsert({
      id: shopSpyAdmin.id,
      email: shopSpyAdmin.email,
      name: 'Admin ShopSpy',
      plan: 'vitalicio',
      is_active: true,
      plan_expires_at: null
    }, { onConflict: 'email' });

    if (usersShopSpyError) {
        console.error('Error upserting into users_shopspy:', usersShopSpyError);
    } else {
        console.log('Upserted successfully into users_shopspy.');
    }
  } else {
      console.log('Could not find auth user to insert into users_shopspy.');
  }
}

setupAdmin();
