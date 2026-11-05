"use server";

import { Resend } from "resend";
import { createElement } from "react";
import { ContactTemplate } from "@/components/emails/ContactTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

type State = { success: boolean } | null;

export async function sendEmail(prevState: State, formData: FormData) {
  const website = formData.get("website") as string;

  // Honeypot check: si un bot llenó el campo señuelo, retornar éxito sin enviar email
  if (website && website.trim() !== "") {
    console.warn("Honeypot activado: se detectó un bot y se omitió el envío.");
    return { success: true };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    throw new Error("Por favor completa todos los campos.");
  }

  try {
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ing.gomezjonathan@gmail.com",
      subject: `[Portfolio Contact] - ${name}`,
      replyTo: email,
      react: createElement(ContactTemplate, { name, email, message }),
    });

    if (error) {
      console.error("Error de Resend:", error);
      throw new Error(error.message || "Error al enviar correo con Resend");
    }

    return { success: true };
  } catch (error) {
    console.error("Error de Resend:", error);
    throw error instanceof Error
      ? error
      : new Error("No se pudo enviar el mensaje. Por favor intenta de nuevo.");
  }
}
