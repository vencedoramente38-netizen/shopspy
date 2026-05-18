import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Configurações do Supabase (Preferencialmente usar Deno.env.get('SUPABASE_URL'), mas hardcoded para garantir)
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://qlhviddjwhuliioabcio.supabase.co'
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || 
                            Deno.env.get('SERVICE_ROLE_KEY') || 
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHZpZGRqd2h1bGlpb2FiY2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3OTM1NiwiZXhwIjoyMDkzODU1MzU2fQ.kOXkkAmAYI-oiAtHeNRbEIdmhH8iKp92xRNPOk3_h-k'
  
  console.log('--- SHOPSPY WEBHOOK INIT ---')
  console.log('URL defined:', !!supabaseUrl)
  console.log('Key defined:', !!supabaseServiceKey)

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  let payload: any
  let transactionId = ''

  try {
    const rawBody = await req.text()
    console.log('Raw Body length:', rawBody.length)
    payload = JSON.parse(rawBody)
    console.log('--- PAYLOAD PARSED ---')

    // Normalizar evento e ID de transação
    const event = String(
      payload.event_type || payload.event || payload.type || 
      payload.data?.event_type || payload.data?.event || payload.data?.type || ''
    ).toLowerCase().replace(/\./g, '_')

    transactionId = String(
      payload.sale_id || payload.id ||
      payload.transaction?.id || payload.purchase?.id ||
      payload.identifier || 
      payload.data?.id || payload.data?.transaction_id ||
      payload.data?.sale_id || 'NO_TRANS_ID'
    )

    console.log(`Event detected: ${event} | Transaction: ${transactionId}`)

    // Log webhook
    const { data: logData } = await supabase
      .from('webhook_logs_shopspy')
      .insert({ event_type: event, payload, processed: false })
      .select()
    const logId = logData?.[0]?.id

    // Extrair dados do cliente de forma robusta
    const data = payload.data || {}
    const customer = payload.customer || payload.buyer || payload.client || 
                     data.customer || data.buyer || data.client || {}
    
    const email = (
      customer.email || payload.email || payload.customer_email || 
      data.email || data.customer_email || ''
    ).toLowerCase().trim()

    const name = customer.name || payload.name || payload.customer_name || 
                 data.name || data.customer_name || 'Usuário ShopSpy'

    if (!email) {
      console.warn('Webhook sem email:', JSON.stringify(payload))
      return new Response(JSON.stringify({ success: true, message: 'No email' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200
      })
    }

    // Extrair valor pago
    let amount = 0
    if (payload.total_price && typeof payload.total_price === 'string') {
      amount = Number(payload.total_price.replace(/[^\d.-]/g, '').replace(',', '.'))
    } else {
      amount = Number(
        payload.amount || payload.transaction?.amount ||
        payload.purchase?.amount || payload.price || 0
      )
    }

    // LÓGICA DE PLANO:
    // Novo: R$ 247 = mensal | R$ 497 = vitalício
    // Antigo (Legado): R$ 97 = mensal | R$ 147 = vitalício
    // amount >= 400 ou (amount >= 140 e < 240) = vitalício
    const isVitalicio = amount >= 400 || (amount >= 140 && amount < 240) ||
      String(payload.product?.name || '').toLowerCase().includes('vitalicio') ||
      String(payload.product?.name || '').toLowerCase().includes('vitalício') ||
      String(payload.product?.name || '').toLowerCase().includes('lifetime')

    const plan = isVitalicio ? 'vitalicio' : 'mensal'
    const expiresAt = isVitalicio
      ? null
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

    const defaultPassword = 'shopspy12345'

    console.log(`Email: ${email} | Plano: ${plan} | Valor: R$${amount}`)

    // Verificar eventos de compra aprovada
    const isPurchaseApproved =
      event === 'purchase_approved' ||
      event === 'sale_approved' ||
      event === 'subscription_activated' ||
      event === 'transaction_paid' ||
      event === 'order_approved' ||
      event === 'paid' ||
      event === 'approved' ||
      (payload.status && String(payload.status).toLowerCase() === 'approved') ||
      (payload.transaction?.status && String(payload.transaction.status).toLowerCase() === 'completed') ||
      (data.status && String(data.status).toLowerCase() === 'approved') ||
      (data.status && String(data.status).toLowerCase() === 'paid')

    if (isPurchaseApproved) {
      let userId: string | undefined

      // Checar se usuário já existe
      const { data: existingUser } = await supabase
        .from('users_shopspy')
        .select('id')
        .eq('email', email)
        .maybeSingle()

      if (existingUser?.id) {
        userId = existingUser.id
        console.log(`Usuário existente: ${userId}`)
      } else {
        // Criar novo usuário no Auth
        const { data: newUser, error: authError } = await supabase.auth.admin.createUser({
          email,
          password: defaultPassword,
          email_confirm: true,
          user_metadata: { name, plan }
        })

        if (authError) {
          if (authError.message.toLowerCase().includes('already')) {
            const { data: { users } } = await supabase.auth.admin.listUsers()
            const found = users.find(u => u.email?.toLowerCase() === email)
            if (found) userId = found.id
          } else {
            throw authError
          }
        } else {
          userId = newUser?.user?.id
          console.log(`Novo usuário criado: ${userId}`)
        }
      }

      if (userId) {
        // Upsert na tabela de usuários
        const { error: upsertError } = await supabase
          .from('users_shopspy')
          .upsert({
            id: userId,
            email,
            name,
            plan,
            plan_expires_at: expiresAt,
            is_active: true,
            transaction_id: transactionId,
            customer_name: name
          }, { onConflict: 'email' })

        if (upsertError) throw upsertError
        console.log(`Usuário provisionado com sucesso: ${email} | Plano: ${plan}`)
      }
    }

    // Renovação de assinatura
    else if (event === 'subscription.renewed' || event === 'sale.renewed') {
      const newExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      await supabase.from('users_shopspy')
        .update({ plan_expires_at: newExpiry, is_active: true })
        .eq('email', email)
      console.log(`Renovação processada: ${email}`)
    }

    // Cancelamento ou reembolso
    else if (
      event === 'subscription.canceled' ||
      event === 'subscription.expired' ||
      event === 'sale.refunded' ||
      event === 'sale.chargeback'
    ) {
      await supabase.from('users_shopspy')
        .update({ is_active: false })
        .eq('email', email)
      console.log(`Cancelamento processado: ${email}`)
    } else {
      console.log(`Webhook ignorado (Evento sem ação: ${event})`)
    }

    // Marcar log como processado
    if (logId) {
      await supabase.from('webhook_logs_shopspy')
        .update({ processed: true })
        .eq('id', logId)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Webhook processado com sucesso' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (err: any) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    console.error('ERRO CRÍTICO:', errorMsg)

    try {
      await supabase.from('webhook_logs_shopspy').insert({
        event_type: 'error',
        payload: payload || {},
        processed: false,
        error: errorMsg
      })
    } catch (e) {
      console.error('Erro ao salvar log de erro:', e)
    }

    return new Response(
      JSON.stringify({ success: true, error: errorMsg }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  }
})
