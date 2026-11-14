import { ClipboardList, Code2, LifeBuoy, Workflow } from 'lucide-react';
import type { Service } from '@/types/service';

export const SERVICES: Service[] = [
  {
    id: 'desarrollo-web',
    slug: 'desarrollo-web',
    title: 'Desarrollo Web',
    description: 'Creamos sitios web profesionales y aplicaciones digitales adaptadas a los objetivos de cada negocio.',
    features: [
      'Sitios institucionales',
      'Landing pages',
      'Catálogos digitales',
      'Aplicaciones web',
      'Plataformas personalizadas',
    ],
    icon: Code2,
  },
  {
    id: 'sistemas-gestion',
    slug: 'sistemas-gestion',
    title: 'Sistemas de Gestión',
    description: 'Desarrollamos herramientas para organizar, administrar y controlar las operaciones de una empresa.',
    features: [
      'Sistemas administrativos',
      'Gestión de clientes',
      'Control de inventario',
      'Gestión de ventas',
      'Paneles de control',
      'Sistemas personalizados',
    ],
    icon: ClipboardList,
  },
  {
    id: 'automatizacion',
    slug: 'automatizacion',
    title: 'Automatización e Integraciones',
    description: 'Conectamos herramientas y automatizamos procesos para reducir tareas manuales y mejorar la productividad.',
    features: [
      'Integraciones mediante API',
      'Automatización de procesos',
      'Integración entre plataformas',
      'Procesamiento de información',
      'Flujos de trabajo',
    ],
    icon: Workflow,
  },
  {
    id: 'soporte',
    slug: 'soporte',
    title: 'Soporte y Mantenimiento',
    description: 'Acompañamos la evolución de los sistemas mediante mantenimiento, mejoras y asistencia técnica.',
    features: [
      'Mantenimiento preventivo',
      'Corrección de errores',
      'Actualizaciones',
      'Mejoras funcionales',
      'Soporte técnico',
    ],
    icon: LifeBuoy,
  },
];
