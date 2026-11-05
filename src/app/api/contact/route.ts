import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createElement } from "react";
import { ContactTemplate } from "@/components/emails/ContactTemplate";
import { contactFormSchema } from "@/lib/validation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    let name = "";
    let email = "";
    let message = "";

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      name = body.name;
      email = body.email;
      message = body.message;
    } else {
      const formData = await req.formData();
      name = (formData.get("name") as string) || "";
      email = (formData.get("email") as string) || "";
      message = (formData.get("message") as string) || "";
    }

    const validation = contactFormSchema.safeParse({ name, email, message });
    if (!validation.success) {
      const errorMsg = validation.error.errors.map((e) => e.message).join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const validatedData = validation.data;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ing.gomezjonathan@gmail.com",
      subject: `[Portfolio Contact] - ${validatedData.name}`,
      replyTo: validatedData.email,
      react: createElement(ContactTemplate, validatedData),
    });

    if (error) {
      console.error("Error de Resend:", error);
      return NextResponse.json(
        { error: error.message || "Error al enviar correo con Resend" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error de Resend:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error interno del servidor al procesar el mensaje",
      },
      { status: 500 },
    );
  }
}

