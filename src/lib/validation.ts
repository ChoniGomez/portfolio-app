import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres"),
  email: z
    .string()
    .email("Por favor ingresa un correo electrónico válido")
    .min(5, "El correo debe tener al menos 5 caracteres")
    .max(100, "El correo no puede superar los 100 caracteres"),
  message: z
    .string()
    .min(1, "El mensaje no puede estar vacío")
    .max(1000, "El mensaje no puede superar los 1000 caracteres"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
