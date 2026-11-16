import type { ContactPayload } from '@/types/contact';
import { ContactApiError } from './errors';

const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ?? 'http://localhost:8781/functions/v1/contact';
const CONTACT_MODE = import.meta.env.VITE_CONTACT_MODE ?? 'demo';

export async function submitContactRequest(payload: ContactPayload): Promise<void> {
  if (CONTACT_MODE === 'demo') {
    throw new ContactApiError(503, 'Modo demo: el envío de consultas no está disponible.');
  }

  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ContactApiError(response.status, body?.message ?? 'No pudimos enviar tu consulta.');
  }
}
