# SOLIAN — Desarrollo de Software

Sitio institucional de **SOLIAN — Desarrollo de Software**, agencia de desarrollo de software orientada a pequeñas y medianas empresas (pymes).

## Concepto

SOLIAN transforma necesidades empresariales en soluciones tecnológicas concretas.

- **Eslogan:** "Transformamos ideas en soluciones."
- **Público objetivo:** pymes, comercios, profesionales independientes, emprendimientos y empresas que necesitan digitalizar procesos.

## Stack tecnológico

- React 19 + TypeScript (strict mode)
- Vite 7
- Tailwind CSS 4
- React Router 7
- Lucide React
- React Hook Form + Zod

## Puesta en marcha

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Variables de entorno

Copiar `.env.example` a `.env` (o configurar las variables en el entorno).

```env
VITE_CONTACT_ENDPOINT=http://localhost:8781/functions/v1/contact
VITE_CONTACT_MODE=demo
VITE_WHATSAPP_URL=
```

- `VITE_CONTACT_ENDPOINT`: URL de la Edge Function que recibe las consultas.
- `VITE_CONTACT_MODE`: `demo` (por defecto) o `api`.
- `VITE_WHATSAPP_URL`: URL de WhatsApp configurable. Si está vacía, el acceso por WhatsApp no se muestra.

## Formulario de contacto

- Validación con Zod + React Hook Form.
- Servicio desacoplado (`src/services/api/contactService.ts`) que hace `POST {VITE_CONTACT_ENDPOINT}`.
- En modo demo (`VITE_CONTACT_MODE=demo`) el envío no realiza ninguna petición ni simula éxito.
- En modo API la consulta se persiste en PostgreSQL (Supabase) y se notifica por email (Resend).

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio |
| `/servicios` | Servicios |
| `/proyectos` | Proyectos |
| `/nosotros` | Nosotros |
| `/contacto` | Contacto |
| `/demo` | Caso de estudio (portfolio) |

## Demostraciones animadas

Las simulaciones de producto están construidas con React + CSS keyframes: no usan videos, GIF ni imágenes.

### Dashboard del HERO

La tarjeta "Panel de gestión" del inicio es un dashboard SaaS animado (`src/components/hero-dashboard/`):

| Archivo | Rol |
| --- | --- |
| `Dashboard.tsx` | Orquesta la secuencia, el bucle de actualizaciones y las animaciones |
| `KpiCard.tsx` | Tarjeta de métrica con conteo animado desde cero |
| `SalesChart.tsx` | Gráfico de línea/área de 7 días con dibujo progresivo |
| `ActivityFeed.tsx` | Registros de actividad que aparecen escalonados y rotan |
| `useInView.ts` | IntersectionObserver + detección de `prefers-reduced-motion` |
| `useCountUp.ts` | Interpolación con `requestAnimationFrame` (easeOutCubic) |

Secuencia: fade-in del panel → KPIs con stagger y conteo → gráfico que se dibuja → actividad escalonada → punto "en vivo" parpadeando. Después, un bucle con intervalos jitterizados (1,7–3,2 s) actualiza métricas, rota la actividad y redibuja el gráfico cada 8 ticks. El contenido tiene altura fija para no producir saltos de layout y se pausa cuando la pestaña no está visible.

### Demos de la sección Proyectos

Cada card de "Soluciones que podemos desarrollar" incluye una simulación propia (`src/components/demos/`): `WorkshopDemo`, `StoreDemo` e `InventoryDemo`, compartiendo `DemoFrame` y el hook `useDemoTick`. La card seleccionada reproduce su animación; las demás quedan estáticas y atenuadas.

### Accesibilidad y rendimiento

- `prefers-reduced-motion: reduce`: se desactivan animaciones, conteos y actualizaciones periódicas; se muestran los valores finales.
- Las demos son decorativas (`aria-hidden`) y no incluyen controles interactivos.
- Las animaciones corren solo con el componente visible en el viewport y se detienen con la pestaña oculta.

## Backend

- Frontend: React + TypeScript.
- Backend: Supabase Edge Functions + TypeScript.
- Base de datos: PostgreSQL (Supabase).
- Email: Resend.

### Edge Function `contact`

Secrets configurados en Supabase (Edge Functions → Secrets):

- `RESEND_API_KEY`: clave de Resend con permiso `sending`.
- `RESEND_FROM_EMAIL`: remitente verificado en Resend.
- `RESEND_TO_EMAIL`: casilla que recibe las notificaciones.
- `RATE_LIMIT_SALT`: salt para hashear la IP usada en el rate limit.
- `ALLOWED_ORIGINS`: orígenes permitidos separados por coma (por defecto `*`).

Protecciones: honeypot, máximo 3 envíos cada 10 minutos por IP (hash HMAC-SHA256), límite de 16 KB por request y de largo por campo, `reply_to` con el email del contacto, y sin insert anónimo directo (solo la función con service role escribe en `contacts`).

## Decisiones de diseño

- Paleta oficial: verde petróleo `#1F2D2A`, naranja quemado `#E16A1F`, marfil `#F5F4F0`, gris pizarra `#6B7280`.
- Tipografías: Montserrat (títulos) y Source Sans 3 (textos).
- Estética minimalista, fondos sólidos, sin gradientes ni efectos decorativos.

