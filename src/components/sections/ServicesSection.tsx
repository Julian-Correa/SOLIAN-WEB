import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SERVICES } from '@/config/services';

export function ServicesSection() {
  return (
    <section id="servicios" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Servicios"
          title="Soluciones digitales a medida"
          description="Cuatro áreas de especialidad que cubren el ciclo completo de una solución tecnológica para tu negocio."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.id} delay={index * 90}>
                <article className="flex h-full flex-col rounded-2xl border border-petrolio/10 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-petrolio">{service.title}</h3>
                  <p className="mt-3 text-slate">{service.description}</p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 font-sans text-sm text-petrolio">
                        <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button to={`/contacto?servicio=${service.slug}`} variant="secondary" size="sm">
                      Consultar {service.title}
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
