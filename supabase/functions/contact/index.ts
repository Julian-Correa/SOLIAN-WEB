import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const resendApiKey = Deno.env.get('RESEND_API_KEY') ?? '';
const resendFromEmail = Deno.env.get('RESEND_FROM_EMAIL') ?? 'onboarding@resend.dev';
const resendToEmail = Deno.env.get('RESEND_TO_EMAIL') ?? '';
const rateLimitSalt = Deno.env.get('RATE_LIMIT_SALT') ?? 'solian-contact-salt';

const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') ?? '*')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MINUTES = 10;
const MAX_BODY_BYTES = 16 * 1024;

const MAX_LENGTHS = {
  nombre: 120,
  empresa: 160,
  email: 254,
  telefono: 40,
  servicio: 80,
  presupuesto: 80,
  descripcion: 4000,
} as const;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

interface ContactBody {
  nombre?: unknown;
  empresa?: unknown;
  email?: unknown;
  telefono?: unknown;
  servicio?: unknown;
  presupuesto?: unknown;
  descripcion?: unknown;
  honeypot?: unknown;
}

function resolveOrigin(origin: string | null): string {
  if (allowedOrigins.includes('*')) {
    return '*';
  }
  if (origin && allowedOrigins.includes(origin)) {
    return origin;
  }
  return allowedOrigins[0] ?? '*';
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(
  status: number,
  body: unknown,
  origin: string,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json', ...extraHeaders },
  });
}

const asText = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('cf-connecting-ip') ?? req.headers.get('x-real-ip') ?? 'unknown';
}

async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(rateLimitSalt),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(ip));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

async function isRateLimited(ipHash: string): Promise<boolean> {
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60_000).toISOString();
  const { count, error } = await supabase
    .from('contacts')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', since);

  if (error) {
    console.error('Rate limit check failed:', error);
    return false;
  }

  return (count ?? 0) >= RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

Deno.serve(async (req: Request) => {
  const origin = resolveOrigin(req.headers.get('origin'));

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (req.method !== 'POST') {
    return json(405, { message: 'Method not allowed' }, origin);
  }

  const contentType = (req.headers.get('content-type') ?? '').toLowerCase();
  if (!contentType.includes('application/json')) {
    return json(415, { message: 'Formato no soportado.' }, origin);
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json(413, { message: 'La consulta es demasiado grande.' }, origin);
  }

  let body: ContactBody;
  try {
    body = JSON.parse(raw) as ContactBody;
  } catch {
    return json(400, { message: 'Datos invalidos.' }, origin);
  }

  if (!body || typeof body !== 'object') {
    return json(400, { message: 'Datos invalidos.' }, origin);
  }

  const honeypot = asText(body.honeypot);
  if (honeypot) {
    return json(200, { ok: true }, origin);
  }

  const nombre = asText(body.nombre);
  const empresa = asText(body.empresa);
  const email = asText(body.email).toLowerCase();
  const telefono = asText(body.telefono);
  const servicio = asText(body.servicio);
  const presupuesto = asText(body.presupuesto);
  const descripcion = asText(body.descripcion);

  const fields: Record<keyof typeof MAX_LENGTHS, string> = {
    nombre,
    empresa,
    email,
    telefono,
    servicio,
    presupuesto,
    descripcion,
  };

  for (const key of Object.keys(fields) as Array<keyof typeof MAX_LENGTHS>) {
    if (fields[key].length > MAX_LENGTHS[key]) {
      return json(400, { message: 'Datos invalidos.' }, origin);
    }
  }

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (nombre.length < 2 || !emailIsValid) {
    return json(400, { message: 'Datos invalidos.' }, origin);
  }

  const ipHash = await hashIp(getClientIp(req));

  if (await isRateLimited(ipHash)) {
    return json(
      429,
      { message: 'Recibimos varias consultas seguidas. Espera unos minutos y volve a intentar.' },
      origin,
      { 'Retry-After': String(RATE_LIMIT_WINDOW_MINUTES * 60) },
    );
  }

  const { error } = await supabase.from('contacts').insert({
    nombre,
    empresa: empresa || null,
    email,
    telefono: telefono || null,
    servicio: servicio || null,
    presupuesto: presupuesto || null,
    descripcion: descripcion || null,
    honeypot: null,
    ip_hash: ipHash,
  });

  if (error) {
    console.error('Error inserting contact:', error);
    return json(502, { message: 'No pudimos enviar tu consulta.' }, origin);
  }

  if (!resendApiKey || !resendToEmail) {
    console.warn('Resend sin configurar: se omitio el email de notificacion.');
    return json(201, { ok: true }, origin);
  }

  const { error: emailError } = await sendNotificationEmail({
    nombre,
    empresa: empresa || undefined,
    email,
    telefono: telefono || undefined,
    servicio: servicio || undefined,
    presupuesto: presupuesto || undefined,
    descripcion: descripcion || undefined,
  });

  if (emailError) {
    console.error('Error sending notification email (la consulta quedo guardada):', emailError);
  }

  return json(201, { ok: true }, origin);
});

async function sendNotificationEmail(params: {
  nombre: string;
  empresa?: string;
  email: string;
  telefono?: string;
  servicio?: string;
  presupuesto?: string;
  descripcion?: string;
}): Promise<{ error: Error | null }> {
  const { nombre, empresa, email, telefono, servicio, presupuesto, descripcion } = params;
  const safe = {
    nombre: escapeHtml(nombre),
    empresa: empresa ? escapeHtml(empresa) : '',
    email: escapeHtml(email),
    telefono: telefono ? escapeHtml(telefono) : '',
    servicio: servicio ? escapeHtml(servicio) : '',
    presupuesto: presupuesto ? escapeHtml(presupuesto) : '',
    descripcion: descripcion ? escapeHtml(descripcion) : '',
  };
  const subjectName = nombre.replace(/[\r\n]+/g, ' ').slice(0, 120);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: resendFromEmail,
      to: [resendToEmail],
      reply_to: [email],
      subject: `Nueva consulta de ${subjectName} - SOLIAN`,
      html: [
        '<p>Tienes una nueva consulta de contacto.</p>',
        '<ul>',
        `<li><strong>Nombre:</strong> ${safe.nombre}</li>`,
        ...(safe.empresa ? [`<li><strong>Empresa:</strong> ${safe.empresa}</li>`] : []),
        `<li><strong>Email:</strong> ${safe.email}</li>`,
        ...(safe.telefono ? [`<li><strong>Telefono:</strong> ${safe.telefono}</li>`] : []),
        ...(safe.servicio ? [`<li><strong>Servicio:</strong> ${safe.servicio}</li>`] : []),
        ...(safe.presupuesto ? [`<li><strong>Presupuesto:</strong> ${safe.presupuesto}</li>`] : []),
        '</ul>',
        ...(safe.descripcion ? [`<p><strong>Descripcion:</strong> ${safe.descripcion}</p>`] : []),
      ].join(''),
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    console.error('Resend error:', data);
    return { error: new Error(data?.message ?? 'Error sending email') };
  }

  return { error: null };
}
