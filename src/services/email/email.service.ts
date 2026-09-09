import { Resend } from "resend";
import type { ContactInput } from "@/lib/validations";
import { siteConfig } from "@/config/site";

export type EmailResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

export async function sendContactEmail(
  input: ContactInput,
): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      ok: false,
      error: "Email is not configured. Set RESEND_API_KEY in the environment.",
    };
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: input.email,
      subject: `Portfolio contact from ${input.name}`,
      text: [
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        "",
        input.message,
      ].join("\n"),
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, id: data?.id };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to send message.",
    };
  }
}
