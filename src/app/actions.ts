"use server";

import { Resend } from "resend";
import { createElement } from "react";
import { ContactTemplate } from "@/components/emails/ContactTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

type State = { success: boolean } | null;

export async function sendEmail(prevState: State, formData: FormData) {
  const recaptchaToken = formData.get("recaptchaToken") as string;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (secretKey) {
    if (!recaptchaToken) {
      throw new Error("Verificación de reCAPTCHA requerida.");
    }

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(recaptchaToken)}`,
      },
    );

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      console.error("Fallo de verificación reCAPTCHA:", verifyData);
      throw new Error(
        "La verificación de reCAPTCHA no fue válida. Por favor intenta de nuevo.",
      );
    }
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
