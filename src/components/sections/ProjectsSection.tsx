import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Project } from '@/types/project';

const PROJECTS: Project[] = [
  {
    id: 'sistema-taller',
    name: 'Sistema de gestión para taller mecánico',
    category: 'Sistema de gestión',
    description: 'Organización de turnos, repuestos y historial de mantenimientos para talleres independientes.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    status: 'conceptual',
  },
  {
    id: 'ecommerce-comercio',
    name: 'Plataforma de comercio local',
    category: 'Desarrollo web',
    description: 'Catálogo, carrito y flujo de compra adaptados a la operación de un comercio de barrio.',
    technologies: ['React', 'PostgreSQL'],
    status: 'conceptual',
  },
  {
    id: 'automatizacion-inventario',
    name: 'Automatización de control de inventario',
    category: 'Automatización e Integraciones',
    description: 'Registro de entradas y salidas con alertas de stock mínimo para pequeñas y medianas empresas.',
    technologies: ['Node.js', 'API REST'],
    status: 'conceptual',
  },
];

export function ProjectsSection() {
  return (
    <section id="proyectos" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Proyectos"
          title="Soluciones que podemos desarrollar"
          description="Presentamos algunos de los tipos de soluciones que nuestro equipo puede construir para tu empresa. Los proyectos detallados se incorporarán a esta sección próximamente."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <Reveal key={project.id}>
              <article className="flex h-full flex-col rounded-2xl border border-petrolio/10 bg-white p-6 shadow-sm sm:p-8">
                <span className="self-start rounded-full bg-accent/10 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-accent">
                  Concepto
                </span>
                <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-petrolio">{project.name}</h3>
                <p className="mt-3 text-slate">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-petrolio/5 px-3 py-1 font-sans text-xs font-medium text-petrolio"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
                <p className="mt-6 font-sans text-xs text-slate">Estado: {project.status}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button to="/demo">Ver caso de estudio</Button>
          <Button to="/contacto" variant="secondary">
            Solicitar esta solución
          </Button>
        </div>
      </div>
    </section>
  );
}
