import type { CaseStudy } from '@/types/caseStudy';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'sistema-taller',
    slug: 'sistema-taller',
    eyebrow: 'Caso de estudio · Concepto',
    title: 'Sistema de gestión para taller mecánico',
    summary:
      'Diseñamos una plataforma para ordenar turnos, repuestos y el historial de mantenimientos de talleres independientes.',
    sector: 'Servicios automotrices',
    type: 'Sistema de gestión',
    status: 'Concepto',
    stack: ['React', 'Node.js', 'PostgreSQL', 'API REST'],
    challenge: {
      heading: 'El desafío',
      body: 'Los talleres independientes suelen coordinar el trabajo diario entre papel, planillas y mensajes de WhatsApp. Esa dispersión hace que la información se pierda y que la operación dependa de la memoria de cada persona.',
      painPoints: [
        'Turnos anotados en distintos lugares, sin una agenda compartida.',
        'Historial de cada vehículo repartido entre notas y conversaciones.',
        'Repuestos sin control de stock ni alertas de reposición.',
        'Poca visibilidad sobre la carga de trabajo y los tiempos de entrega.',
      ],
    },
    solution: {
      heading: 'La solución',
      body: 'Una única plataforma donde el taller agenda turnos, registra el trabajo de cada vehículo y controla sus repuestos. La información queda centralizada y disponible para todo el equipo, con una interfaz simple pensada para usarse en el mostrador.',
    },
    modules: [
      {
        title: 'Agenda de turnos',
        description: 'Calendario compartido con disponibilidad por día y recordatorios para el cliente.',
      },
      {
        title: 'Fichas de vehículos',
        description: 'Datos del vehículo y de su dueño con historial de intervenciones.',
      },
      {
        title: 'Órdenes de trabajo',
        description: 'Registro del servicio, repuestos utilizados y estado de cada orden.',
      },
      {
        title: 'Inventario de repuestos',
        description: 'Altas, bajas y alertas cuando un repuesto llega al stock mínimo.',
      },
      {
        title: 'Panel de control',
        description: 'Vista general de turnos del día, trabajos en curso y entregas pendientes.',
      },
      {
        title: 'Reportes simples',
        description: 'Resumen de servicios realizados y repuestos más utilizados en un período.',
      },
    ],
    approach: [
      {
        title: 'Relevamiento',
        description: 'Entendimos cómo trabaja el taller y qué información necesita en cada etapa.',
      },
      {
        title: 'Prototipo',
        description: 'Definimos las pantallas principales y validamos el flujo con un caso real.',
      },
      {
        title: 'Desarrollo',
        description: 'Construimos la plataforma por módulos, priorizando la operación diaria.',
      },
      {
        title: 'Puesta en marcha',
        description: 'Carga inicial de datos, capacitación breve y acompañamiento en las primeras semanas.',
      },
    ],
    outcomes: [
      'Menos tareas manuales en la atención al cliente.',
      'Historial de cada vehículo disponible en un solo lugar.',
      'Control real del stock de repuestos.',
      'Mejor visibilidad de la carga de trabajo del taller.',
    ],
  },
];
