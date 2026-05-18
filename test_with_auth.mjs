import fetch from 'node-fetch';

const url = 'https://qlhviddjwhuliioabcio.supabase.co/functions/v1/shopspy-webhook';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNzkzNTYsImV4cCI6MjA5Mzg1NTM1Nn0.ncQEPTLySJ_VjO_c31RPPwp3xKusXJbssR80MU7Wqe0';

const payload = {
  event: 'transaction.paid',
  data: {
    id: 'test_auth_trans_' + Date.now(),
    amount: 147,
    status: 'paid',
    client: {
      name: 'Test Auth User',
      email: 'test_auth_' + Date.now() + '@example.com'
    }
  }
};

async function test() {
  console.log('Sending mock webhook WITH AUTHORIZATION to:', url);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(result, null, 2));

  } catch (e) {
    console.error('Error sending request:', e);
  }
}

test();
