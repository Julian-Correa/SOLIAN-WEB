import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const resendApiKey = Deno.env.get('RESEND_API_KEY') ?? '';
const resendFromEmail = Deno.env.get('RESEND_FROM_EMAIL') ?? 'SOLIAN <noreply@solian.com>';
const resendToEmail = Deno.env.get('RESEND_TO_EMAIL') ?? 'hola@solian.com';
const allowedOrigin = Deno.env.get('ALLOWED_ORIGIN') ?? '*';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

interface ContactBody {
  nombre?: string;
  empresa?: string;
  email?: string;
  telefono?: string;
  servicio?: string;
  presupuesto?: string;
  descripcion?: string;
  honeypot?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return json(405, { message: 'Method not allowed' });
  }

  const body = (await req.json().catch(() => ({}))) as ContactBody;
  const honeypot = (body.honeypot ?? '').trim();

  if (honeypot) {
    return json(200, { ok: true });
  }

  const nombre = (body.nombre ?? '').trim();
  const email = (body.email ?? '').trim().toLowerCase();

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (nombre.length < 2 || !emailIsValid) {
    return json(400, { message: 'Datos invalidos.' });
  }

  const { error } = await supabase
    .from('contacts')
    .insert({
      nombre,
      empresa: body.empresa?.trim() || null,
      email,
      telefono: body.telefono?.trim() || null,
      servicio: body.servicio || null,
      presupuesto: body.presupuesto || null,
      descripcion: body.descripcion?.trim() || null,
      honeypot: body.honeypot?.trim() || null,
    });

  if (error) {
    console.error('Error inserting contact:', error);
    return json(502, { message: 'No pudimos enviar tu consulta.' });
  }

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY no configurada: se omitio el email de notificacion.');
    return json(201, { ok: true });
  }

  const { error: emailError } = await sendNotificationEmail({
    nombre,
    empresa: body.empresa?.trim() || undefined,
    email,
    telefono: body.telefono?.trim() || undefined,
    servicio: body.servicio || undefined,
    presupuesto: body.presupuesto || undefined,
    descripcion: body.descripcion?.trim() || undefined,
  });

  if (emailError) {
    console.error('Error sending notification email (la consulta quedo guardada):', emailError);
  }

  return json(201, { ok: true });
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

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: resendFromEmail,
      to: [resendToEmail],
      subject: `Nueva consulta de ${nombre} - SOLIAN`,
      html: [
        '<p>Tienes una nueva consulta de contacto.</p>',
        '<ul>',
        `<li><strong>Nombre:</strong> ${nombre}</li>`,
        ...(empresa ? [`<li><strong>Empresa:</strong> ${empresa}</li>`] : []),
        `<li><strong>Email:</strong> ${email}</li>`,
        ...(telefono ? [`<li><strong>Telefono:</strong> ${telefono}</li>`] : []),
        ...(servicio ? [`<li><strong>Servicio:</strong> ${servicio}</li>`] : []),
        ...(presupuesto ? [`<li><strong>Presupuesto:</strong> ${presupuesto}</li>`] : []),
        '</ul>',
        ...(descripcion ? [`<p><strong>Descripcion:</strong> ${descripcion}</p>`] : []),
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
