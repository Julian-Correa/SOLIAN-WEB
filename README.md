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
VITE_API_URL=http://localhost:3000/api
VITE_CONTACT_MODE=demo
VITE_WHATSAPP_URL=
```

- `VITE_API_URL`: endpoint futuro de la API REST de SOLIAN.
- `VITE_CONTACT_MODE`: `demo` (por defecto) o `api`.
- `VITE_WHATSAPP_URL`: URL de WhatsApp configurable. Si está vacía, el acceso por WhatsApp no se muestra.

## Formulario de contacto

- Validación con Zod + React Hook Form.
- Servicio desacoplado (`src/services/api/contactService.ts`) que consume `POST {VITE_API_URL}/contacts`.
- En modo demo (`VITE_CONTACT_MODE=demo`) el envío no realiza ninguna petición ni simula éxito.
- En modo API se realiza la integración con la futura backend.

## Backend futuro

- Frontend: React + TypeScript.
- Backend: Node.js + Express + TypeScript.
- Base de datos: PostgreSQL.
- ORM: Prisma.

## Decisiones de diseño

- Paleta oficial: verde petróleo `#1F2D2A`, naranja quemado `#E16A1F`, marfil `#F5F4F0`, gris pizarra `#6B7280`.
- Tipografías: Montserrat (títulos) y Source Sans 3 (textos).
- Estética minimalista, fondos sólidos, sin gradientes ni efectos decorativos.
