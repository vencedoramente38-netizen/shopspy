function normalizeEvent(payload) {
    const event = String(
      payload.event_type || payload.event || payload.type || 
      payload.data?.event_type || payload.data?.event || payload.data?.type || ''
    ).toLowerCase().replace(/\./g, '_');
    return event;
}

function extractCustomer(payload) {
    const data = payload.data || {};
    const customer = payload.customer || payload.buyer || payload.client || 
                     data.customer || data.buyer || data.client || {};
    
    const email = (
      customer.email || payload.email || payload.customer_email || 
      data.email || data.customer_email || ''
    ).toLowerCase().trim();

    const name = customer.name || payload.name || payload.customer_name || 
                 data.name || data.customer_name || 'Usuário ShopSpy';
    
    return { email, name };
}

const tests = [
    {
        name: 'Legacy Format (Payload Root)',
        payload: { event: 'sale.approved', customer: { email: 'legacy@test.com', name: 'Legacy User' } },
        expectedEmail: 'legacy@test.com',
        expectedEvent: 'sale_approved'
    },
    {
        name: 'Kirvano v2 (Data Wrapper)',
        payload: { 
            event: 'transaction.paid', 
            data: { 
                client: { email: 'kirvano@test.com', name: 'Kirvano User' } 
            } 
        },
        expectedEmail: 'kirvano@test.com',
        expectedEvent: 'transaction_paid'
    },
    {
        name: 'Data Status Check',
        payload: {
            event: 'webhook',
            data: {
                status: 'paid',
                client: { email: 'status@test.com' }
            }
        },
        expectedEmail: 'status@test.com',
        expectedEvent: 'webhook'
    }
];

tests.forEach(t => {
    const event = normalizeEvent(t.payload);
    const { email, name } = extractCustomer(t.payload);
    console.log(`Test: ${t.name}`);
    console.log(`  Event: ${event} (Expected: ${t.expectedEvent})`);
    console.log(`  Email: ${email} (Expected: ${t.expectedEmail})`);
    if (event === t.expectedEvent && email === t.expectedEmail) {
        console.log('  PASS');
    } else {
        console.log('  FAIL');
    }
});
