import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  subject: z.string().trim().min(1, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

const OWNER_EMAIL = "singhdevender0079@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");

    const supabaseUrl = process.env["SUPABASE_URL"];
    const publishableKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!supabaseUrl || !publishableKey) {
      throw new Error("Backend is not configured.");
    }

    const supabase = createClient(supabaseUrl, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (
            publishableKey.startsWith("sb_") &&
            headers.get("Authorization") === `Bearer ${publishableKey}`
          ) {
            headers.delete("Authorization");
          }
          headers.set("apikey", publishableKey);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { data: inserted, error } = await supabase
      .from("contact_messages")
      .insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      })
      .select("id")
      .single();

    if (error) {
      console.error("contact insert failed", error.message);
      throw new Error("We couldn't save your message. Please try again.");
    }

    // Optional email delivery. Add a RESEND_API_KEY secret to enable it —
    // the message is stored either way, so nothing is ever lost.
    const resendKey = process.env["RESEND_API_KEY"];
    const lovableKey = process.env["LOVABLE_API_KEY"];
    let emailSent = false;

    if (resendKey && lovableKey) {
      try {
        const response = await fetch(
          "https://connector-gateway.lovable.dev/resend/emails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${lovableKey}`,
              "X-Connection-Api-Key": resendKey,
            },
            body: JSON.stringify({
              from: "Portfolio Contact <onboarding@resend.dev>",
              to: [OWNER_EMAIL],
              reply_to: data.email,
              subject: `Portfolio: ${data.subject}`,
              html: `
                <h2>New portfolio message</h2>
                <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
                <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
                <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
              `,
            }),
          },
        );

        if (!response.ok) {
          console.error(`resend failed [${response.status}]: ${await response.text()}`);
        } else {
          emailSent = true;
          await supabase
            .from("contact_messages")
            .update({ email_sent: true })
            .eq("id", inserted.id);
        }
      } catch (cause) {
        console.error("resend request threw", cause);
      }
    }

    return { ok: true as const, emailSent };
  });
