import { Reveal } from '@/components/ui/Reveal';
import { Logo } from '@/components/ui/Logo';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function AboutSection() {
  return (
    <section id="nosotros" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Nosotros"
            title="Tecnología pensada para resolver problemas reales."
          />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate">
            En SOLIAN creemos que la tecnología debe ser una herramienta para simplificar el trabajo,
            mejorar procesos y abrir nuevas oportunidades. Por eso desarrollamos soluciones de
            software adaptadas a las necesidades de cada negocio.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-3xl bg-petrolio p-10 sm:p-14">
            <Logo tone="dark" markClassName="h-16 w-16" />
            <p className="mt-6 font-display text-2xl font-bold text-cream">Transformamos ideas en soluciones.</p>
            <p className="mt-3 font-sans text-sm text-cream/70">Desarrollo de Software</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
