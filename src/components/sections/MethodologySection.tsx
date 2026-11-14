import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STEPS = [
  {
    number: '01',
    title: 'Análisis',
    description: 'Comprendemos las necesidades y los problemas del negocio.',
  },
  {
    number: '02',
    title: 'Planificación',
    description: 'Definimos alcance, funcionalidades y objetivos.',
  },
  {
    number: '03',
    title: 'Desarrollo',
    description: 'Construimos la solución y validamos su funcionamiento.',
  },
  {
    number: '04',
    title: 'Implementación',
    description: 'Entregamos y ponemos en funcionamiento el sistema.',
  },
  {
    number: '05',
    title: 'Acompañamiento',
    description: 'Ofrecemos mantenimiento y evolución.',
  },
];

export function MethodologySection() {
  return (
    <section id="metodologia" className="bg-petrolio py-20 text-cream sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Metodología"
          title="Así trabajamos"
          description="Un proceso claro y ordenado para convertir una necesidad empresarial en una solución tecnológica funcional."
        />

        <ol className="mt-14">
          {STEPS.map((step) => (
            <Reveal key={step.number}>
              <li className="grid gap-3 border-b border-cream/10 py-8 last:border-b-0 sm:grid-cols-[72px_1fr] sm:gap-8">
                <span className="font-display text-4xl font-bold text-accent">{step.number}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-cream">{step.title}</h3>
                  <p className="mt-2 max-w-2xl text-cream/70">{step.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
