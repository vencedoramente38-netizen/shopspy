import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

console.log('=== ShopSpy Auth Diagnostics ===');
console.log('URL:', url);
console.log('Key prefix:', key?.substring(0, 20) + '...');

const supabase = createClient(url, key);

// 1. Verificar se a tabela users_shopspy existe e listar usuários
console.log('\n--- Usuários em users_shopspy ---');
const { data: users, error: usersError } = await supabase
  .from('users_shopspy')
  .select('id, email, is_active, plan, plan_expires_at')
  .limit(20);

if (usersError) {
  console.error('ERRO ao buscar users_shopspy:', usersError.message);
  console.error('Code:', usersError.code);
} else {
  console.log(`Total encontrado: ${users.length}`);
  users.forEach(u => {
    console.log(`  - ${u.email} | active:${u.is_active} | plan:${u.plan} | expires:${u.plan_expires_at}`);
  });
}

// 2. Verificar tabela admins_shopspy
console.log('\n--- Admins em admins_shopspy ---');
const { data: admins, error: adminsError } = await supabase
  .from('admins_shopspy')
  .select('email')
  .limit(20);

if (adminsError) {
  console.error('ERRO ao buscar admins_shopspy:', adminsError.message);
} else {
  console.log(`Total admins: ${admins.length}`);
  admins.forEach(a => console.log('  -', a.email));
}

// 3. Tentar listar usuários auth (só funciona com service_role, vai dar erro - útil para diagnóstico)
console.log('\n--- Resumo do status ---');
console.log('Se "users_shopspy" retornou 0 usuários com RLS, pode ser problema de RLS ou tabela vazia.');
console.log('Verifique nas tabelas acima quais emails estão cadastrados e se is_active=true.');
