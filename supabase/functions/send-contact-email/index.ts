import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";
import { z } from "npm:zod@3.25.76";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters")
});

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate input data
    const validation = contactSchema.safeParse(rawData);
    if (!validation.success) {
      console.error("Validation failed:", validation.error.issues);
      return new Response(
        JSON.stringify({ 
          error: "Invalid input data", 
          details: validation.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, company, message } = validation.data;
    console.log("Received valid contact form submission:", { name, email, company });

    // Extract IP address from request headers
    const ip_address = req.headers.get("x-forwarded-for")?.split(",")[0] || 
                       req.headers.get("x-real-ip") || 
                       "unknown";

    // Check rate limit for email (1 submission per minute)
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
    
    const { data: recentEmailSubmissions } = await supabase
      .from("contact_submissions")
      .select("submitted_at")
      .eq("email", email)
      .gte("submitted_at", oneMinuteAgo)
      .order("submitted_at", { ascending: false })
      .limit(1);

    if (recentEmailSubmissions && recentEmailSubmissions.length > 0) {
      console.log("Rate limit exceeded for email:", email);
      return new Response(
        JSON.stringify({ 
          error: "Please wait at least 1 minute before submitting another message from this email." 
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Check rate limit for IP (1 submission per minute)
    const { data: recentIpSubmissions } = await supabase
      .from("contact_submissions")
      .select("submitted_at")
      .eq("ip_address", ip_address)
      .gte("submitted_at", oneMinuteAgo)
      .order("submitted_at", { ascending: false })
      .limit(1);

    if (recentIpSubmissions && recentIpSubmissions.length > 0) {
      console.log("Rate limit exceeded for IP:", ip_address);
      return new Response(
        JSON.stringify({ 
          error: "Please wait at least 1 minute before submitting another message." 
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Record this submission
    await supabase
      .from("contact_submissions")
      .insert({ email, ip_address });

    // Send email to your inbox
    const emailResponse = await resend.emails.send({
      from: "Stellar Code Contact <akandel@stellar-code.dev>",
      to: ["akandel@stellar-code.dev"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        <p><strong>Email:</strong> ${email.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        ${company ? `<p><strong>Company:</strong> ${company.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>` : ""}
        <h3>Message:</h3>
        <p>${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</p>
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
