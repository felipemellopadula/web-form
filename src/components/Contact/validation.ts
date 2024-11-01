import { z } from "zod";  

export const contactFormSchema = z.object({  
  nome: z  
    .string()  
    .min(2, "Nome deve ter pelo menos 2 caracteres")  
    .max(50, "Nome deve ter no máximo 50 caracteres"),  
  email: z  
    .string()  
    .email("Email inválido")  
    .min(5, "Email deve ter pelo menos 5 caracteres")  
    .max(50, "Email deve ter no máximo 50 caracteres"),  
  celular: z  
    .string()  
    .regex(  
      /^\(\d{2}\)\s\d{5}-\d{4}$/,  
      "Celular deve estar no formato (XX) XXXXX-XXXX"  
    ),  
  empresa: z  
    .string()  
    .min(2, "Nome da empresa deve ter pelo menos 2 caracteres")  
    .max(50, "Nome da empresa deve ter no máximo 50 caracteres"),  
  mensagem: z  
    .string()  
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")  
    .max(500, "Mensagem deve ter no máximo 500 caracteres"),  
});  

export type ContactFormData = z.infer<typeof contactFormSchema>;