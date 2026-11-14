import type { ContactPayload } from '@/types/contact';
import type { ContactFormValues } from '@/schemas/contactSchema';

export function toContactPayload(values: ContactFormValues): ContactPayload {
  const optional = (value?: string) => (value && value.trim() ? value.trim() : undefined);

  return {
    nombre: values.nombre.trim(),
    ...(optional(values.empresa) ? { empresa: optional(values.empresa) } : {}),
    email: values.email.trim().toLowerCase(),
    ...(optional(values.telefono) ? { telefono: optional(values.telefono) } : {}),
    ...(optional(values.servicio) ? { servicio: optional(values.servicio) } : {}),
    ...(optional(values.presupuesto) ? { presupuesto: optional(values.presupuesto) } : {}),
    ...(optional(values.descripcion) ? { descripcion: optional(values.descripcion) } : {}),
  };
}
