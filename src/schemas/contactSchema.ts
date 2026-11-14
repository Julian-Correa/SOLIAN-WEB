import { z } from 'zod';

const optionalText = (max: number) =>
  z.string().trim().max(max, `Debe tener menos de ${max} caracteres.`).default('');

export const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(120, 'El nombre es demasiado largo.'),
  empresa: optionalText(120),
  email: z.string().trim().email('Ingresá un correo electrónico válido.'),
  telefono: optionalText(20),
  servicio: z.string().optional(),
  presupuesto: z.string().optional(),
  descripcion: optionalText(1000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const emptyContactForm: ContactFormValues = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  servicio: '',
  presupuesto: '',
  descripcion: '',
};
