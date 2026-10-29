"use server";

import { Resend } from "resend";
import { createElement } from "react";
import { ContactTemplate } from "@/components/emails/ContactTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

type State = { success: boolean } | null;

export async function sendEmail(prevState: State, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    throw new Error("Por favor completa todos los campos.");
  }

  const recipientEmail =
    process.env.CONTACT_EMAIL || "ing.gomezjonathan@gmail.com";

  try {
    await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `${name} se ha puesto en contacto desde el Portfolio`,
      replyTo: email,
      react: createElement(ContactTemplate, { name, email, message }),
    });

    return { success: true };
  } catch {
    throw new Error("No se pudo enviar el mensaje. Por favor intenta de nuevo.");
  }
}
