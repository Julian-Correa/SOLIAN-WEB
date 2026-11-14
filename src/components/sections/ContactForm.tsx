import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { emptyContactForm, contactSchema, type ContactFormValues } from '@/schemas/contactSchema';
import { ContactApiError } from '@/services/api/errors';
import { submitContactRequest } from '@/services/api/contactService';
import { toContactPayload } from '@/utils/contact';

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, error, required = false, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="font-sans text-sm font-semibold text-petrolio">
        {label}
        {required ? ' *' : ''}
      </label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-2 font-sans text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

export function ContactForm() {
  const [searchParams] = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [demoError, setDemoError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ...emptyContactForm,
      servicio: searchParams.get('servicio') ?? '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null);
    setDemoError(null);
    setSubmitting(true);
    try {
      await submitContactRequest(toContactPayload(values));
      setSubmitted(true);
    } catch (error) {
      if (error instanceof ContactApiError && error.status === 503) {
        setDemoError(error.message);
        return;
      }
      setServerError(
        error instanceof Error ? error.message : 'No pudimos enviar tu consulta. Intentá nuevamente.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    reset({ ...emptyContactForm, servicio: searchParams.get('servicio') ?? '' });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-petrolio/10 bg-white p-8 text-center shadow-sm sm:p-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-petrolio" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-bold text-petrolio">¡Gracias por escribirnos!</h3>
        <p className="mt-3 text-slate">Recibimos tu consulta y te responderemos a la brevedad.</p>
        <div className="mt-8">
          <Button variant="secondary" size="sm" onClick={handleReset}>
            Volver a enviar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Field id="nombre" label="Nombre y apellido" error={errors.nombre?.message} required>
        <input
          id="nombre"
          type="text"
          className="h-12 w-full rounded-xl border border-petrolio/15 bg-white px-4 font-sans text-petrolio shadow-sm focus:outline-2 focus:outline-accent"
          {...register('nombre')}
        />
      </Field>

      <Field id="empresa" label="Empresa">
        <input
          id="empresa"
          type="text"
          className="h-12 w-full rounded-xl border border-petrolio/15 bg-white px-4 font-sans text-petrolio shadow-sm focus:outline-2 focus:outline-accent"
          {...register('empresa')}
        />
      </Field>

      <Field id="email" label="Correo electrónico" error={errors.email?.message} required>
        <input
          id="email"
          type="email"
          className="h-12 w-full rounded-xl border border-petrolio/15 bg-white px-4 font-sans text-petrolio shadow-sm focus:outline-2 focus:outline-accent"
          {...register('email')}
        />
      </Field>

      <Field id="telefono" label="Teléfono">
        <input
          id="telefono"
          type="tel"
          className="h-12 w-full rounded-xl border border-petrolio/15 bg-white px-4 font-sans text-petrolio shadow-sm focus:outline-2 focus:outline-accent"
          {...register('telefono')}
        />
      </Field>

      <Field id="servicio" label="Servicio de interés">
        <select
          id="servicio"
          className="h-12 w-full rounded-xl border border-petrolio/15 bg-white px-4 font-sans text-petrolio shadow-sm focus:outline-2 focus:outline-accent"
          {...register('servicio')}
        >
          <option value="">Todos los servicios</option>
          <option value="desarrollo-web">Desarrollo Web</option>
          <option value="sistemas-gestion">Sistemas de Gestión</option>
          <option value="automatizacion">Automatización e Integraciones</option>
          <option value="soporte">Soporte y Mantenimiento</option>
        </select>
      </Field>

      <Field id="presupuesto" label="Presupuesto estimado">
        <select
          id="presupuesto"
          className="h-12 w-full rounded-xl border border-petrolio/15 bg-white px-4 font-sans text-petrolio shadow-sm focus:outline-2 focus:outline-accent"
          {...register('presupuesto')}
        >
          <option value="">Por definir</option>
          <option value="menos-de-5000">Menos de $5.000</option>
          <option value="entre-5000-y-10000">Entre $5.000 y $10.000</option>
          <option value="entre-10000-y-25000">Entre $10.000 y $25.000</option>
          <option value="mas-de-25000">Más de $25.000</option>
        </select>
      </Field>

      <Field id="descripcion" label="Descripción del proyecto">
        <textarea
          id="descripcion"
          rows={4}
          className="w-full rounded-xl border border-petrolio/15 bg-white px-4 py-3 font-sans text-petrolio shadow-sm focus:outline-2 focus:outline-accent"
          {...register('descripcion')}
        />
      </Field>

      {demoError ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 font-sans text-sm text-amber-900"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>{demoError}</p>
        </div>
      ) : null}

      {serverError ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 font-sans text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>{serverError}</p>
        </div>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? 'Enviando...' : 'Enviar consulta'}
      </Button>
    </form>
  );
}
