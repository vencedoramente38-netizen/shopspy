import fetch from 'node-fetch';

const url = 'https://qlhviddjwhuliioabcio.supabase.co/functions/v1/shopspy-webhook';

const payload = {
  event: 'transaction.paid',
  data: {
    id: 'test_real_trans_' + Date.now(),
    amount: 147,
    status: 'paid',
    client: {
      name: 'Test Real User',
      email: 'test_real_' + Date.now() + '@example.com'
    },
    product: {
      name: 'Plano Vitalício'
    }
  }
};

async function test() {
  console.log('Sending mock webhook to:', url);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
