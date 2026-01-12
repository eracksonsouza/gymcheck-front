import { z } from "zod";

// Schema de validação para Login
export const signInSchema = z.object({
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  rememberMe: z.boolean().optional(),
});

// Schema de validação para Cadastro
export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "O nome deve ter no mínimo 3 caracteres")
      .max(100, "O nome deve ter no máximo 100 caracteres"),
    email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
      ),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

// Tipos TypeScript inferidos dos schemas
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
