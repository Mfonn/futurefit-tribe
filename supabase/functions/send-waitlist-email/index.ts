import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const BodySchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional(),
  source: z.string().max(100).optional(),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { firstName, lastName, email, phone, source } = parsed.data

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')

    if (!RESEND_API_KEY || !LOVABLE_API_KEY) {
      console.error('Missing RESEND_API_KEY or LOVABLE_API_KEY')
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #080a09; border-bottom: 2px solid #00e5c8; padding-bottom: 10px;">
          New Waitlist Signup
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px 0;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">${phone || 'Not provided'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Source:</td><td style="padding: 8px 0;">${source || 'Website'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Time:</td><td style="padding: 8px 0;">${new Date().toISOString()}</td></tr>
        </table>
      </div>
    `

    const resendRes = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'CoppahandGold Waitlist <onboarding@resend.dev>',
        to: ['business@coppahandgold.org'],
        subject: `New Waitlist Signup: ${firstName} ${lastName}`,
        html: emailHtml,
      }),
    })

    const resendData = await resendRes.json()
    console.log('Resend response:', JSON.stringify(resendData))

    if (!resendRes.ok) {
      console.error('Resend error:', JSON.stringify(resendData))
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
