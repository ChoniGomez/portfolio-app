"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

function SubmitButton({ isCaptchaVerified }: { isCaptchaVerified: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || !isCaptchaVerified}
      className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
    >
      {pending ? "Enviando..." : "Enviar mensaje"}
    </button>
  );
}

export function ContactForm() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Asegurar que el componente solo se monte en el cliente para evitar mismatch de hidratación y loops
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Callbacks memoizados con referencia estable para evitar que react-google-recaptcha
  // detecte nuevas funciones en cada render y dispare un bucle infinito de re-renderizado
  const handleCaptchaChange = useCallback((token: string | null) => {
    setRecaptchaToken(token);
  }, []);

  const handleCaptchaExpired = useCallback(() => {
    setRecaptchaToken(null);
  }, []);

  const [, formAction] = useActionState(
    async (prevState: { success: boolean } | null, formData: FormData) => {
      if (!recaptchaToken) {
        toast.error("Por favor completa la verificación de reCAPTCHA.");
        return null;
      }

      try {
        formData.append("recaptchaToken", recaptchaToken);

        const response = await fetch("/api/contact", {
          method: "POST",
          body: formData,
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            data?.error || `Error ${response.status}: No se pudo enviar el mensaje`,
          );
        }

        toast.success("¡Mensaje enviado con éxito!");
        // Reset form y widget
        const form = document.querySelector("form") as HTMLFormElement;
        form?.reset();
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return { success: true };
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Ocurrió un error al enviar el mensaje",
        );
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return null;
      }
    },
    null,
  );

  const siteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-200"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Tu nombre completo"
          className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          formNoValidate
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-200"
        >
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="tu-correo@ejemplo.com"
          className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          formNoValidate
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-200"
        >
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Escribe tu mensaje aquí..."
          className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Google reCAPTCHA v2 Widget posicionado justo sobre el botón de envío */}
      <div className="flex min-h-[78px] items-center justify-center py-2">
        {isMounted ? (
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            theme="dark"
            onChange={handleCaptchaChange}
            onExpired={handleCaptchaExpired}
          />
        ) : (
          <div className="h-[78px] w-[304px] animate-pulse rounded bg-gray-700/40" />
        )}
      </div>

      <SubmitButton isCaptchaVerified={Boolean(recaptchaToken)} />
    </form>
  );
}
