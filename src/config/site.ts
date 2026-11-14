export const siteConfig = {
  name: 'SOLIAN',
  descriptor: 'Desarrollo de Software',
  slogan: 'Transformamos ideas en soluciones.',
  whatsappUrl: import.meta.env.VITE_WHATSAPP_URL ?? '',
};

export const NAV_ITEMS = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
] as const;

export const WHATSAPP_URL = siteConfig.whatsappUrl;
