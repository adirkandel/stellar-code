import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string; // Honeypot field
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message, website }: ContactFormData = await req.json();

    // Honeypot check - if website field is filled, it's likely a bot
    if (website) {
      console.log('Bot submission detected - honeypot field filled');
      return new Response(
        JSON.stringify({ error: 'Invalid submission' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Received contact form submission:", { name, email, company });

    // Send email to your inbox
    const emailResponse = await resend.emails.send({
      from: "Stellar Code Contact <akandel@stellar-code.dev>",
      to: ["akandel@stellar-code.dev"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Send confirmation email to the user
    await resend.emails.send({
      from: "Stellar Code <akandel@stellar-code.dev>",
      to: [email],
      subject: "We received your message!",
      html: `
        <h1>Thank you for contacting Stellar Code, ${name}!</h1>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to check out our <a href="https://stellar-code.dev">latest projects</a>.</p>
        <br>
        <p>Best regards,<br>The Stellar Code Team</p>
      `,
    });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
