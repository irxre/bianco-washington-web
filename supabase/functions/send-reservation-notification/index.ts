
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { reservation } = await req.json()
    console.log('Received reservation:', reservation)

    if (!Deno.env.get('RESEND_API_KEY')) {
      throw new Error('RESEND_API_KEY is not set')
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #8B5A3C; padding-bottom: 10px;">New Reservation Request - Bianco Washington</h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #8B5A3C; margin-top: 0;">Reservation Details</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 8px 0;">${reservation.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;">${reservation.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;">${reservation.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Date:</td>
              <td style="padding: 8px 0;">${reservation.date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Time:</td>
              <td style="padding: 8px 0;">${reservation.time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Guests:</td>
              <td style="padding: 8px 0;">${reservation.guests}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Special Requests:</td>
              <td style="padding: 8px 0;">${reservation.special_requests || 'None'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Submitted:</td>
              <td style="padding: 8px 0;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          This reservation request was submitted through the Bianco Washington website.
        </p>
      </div>
    `

    console.log('Attempting to send email...')

    const emailResponse = await resend.emails.send({
      from: 'Bianco Restaurant <onboarding@resend.dev>',
      to: ['irlind.reshiti@gmail.com'],
      subject: `New Reservation Request - ${reservation.name} for ${reservation.date}`,
      html: emailHtml,
    })

    console.log('Email sent successfully:', emailResponse)

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending notification:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to send email notification'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
