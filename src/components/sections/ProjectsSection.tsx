import { useState, type ComponentType } from 'react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InventoryDemo } from '@/components/demos/InventoryDemo';
import { StoreDemo } from '@/components/demos/StoreDemo';
import { WorkshopDemo } from '@/components/demos/WorkshopDemo';
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

const DEMOS: Record<string, ComponentType<{ active: boolean }>> = {
  'sistema-taller': WorkshopDemo,
  'ecommerce-comercio': StoreDemo,
  'automatizacion-inventario': InventoryDemo,
};

export function ProjectsSection() {
  const [selectedId, setSelectedId] = useState(PROJECTS[0].id);

  return (
    <section id="proyectos" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Proyectos"
          title="Soluciones que podemos desarrollar"
          description="Presentamos algunos de los tipos de soluciones que nuestro equipo puede construir para tu empresa. Los proyectos detallados se incorporarán a esta sección próximamente."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => {
            const isActive = project.id === selectedId;
            const Demo = DEMOS[project.id];
            const select = () => setSelectedId(project.id);

            return (
              <Reveal key={project.id}>
                <article
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`Ver demostración de ${project.name}`}
                  onClick={select}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      select();
                    }
                  }}
                  className={`flex h-full cursor-pointer flex-col rounded-2xl border bg-white p-4 shadow-sm outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:p-5 ${
                    isActive
                      ? 'border-accent/50 shadow-lg ring-2 ring-accent/25'
                      : 'border-petrolio/10 opacity-90 hover:border-petrolio/25 hover:opacity-100'
                  }`}
                >
                  {Demo ? <Demo active={isActive} /> : null}

                  <div className="mt-5 flex flex-1 flex-col">
                    <span className="self-start rounded-full bg-accent/10 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-accent">
                      Concepto
                    </span>
                    <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                      {project.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-petrolio">
                      {project.name}
                    </h3>
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
                  </div>
                </article>
              </Reveal>
            );
          })}
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
