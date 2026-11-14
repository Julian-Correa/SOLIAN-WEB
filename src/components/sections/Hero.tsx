import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-petrolio/15 bg-white px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-petrolio">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              Software a medida
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-petrolio sm:text-5xl lg:text-6xl">
              Software a medida para <span className="text-accent">hacer crecer tu negocio</span>.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
              Desarrollamos soluciones digitales, sistemas de gestión y automatizaciones adaptadas a
              las necesidades de cada empresa.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button to="/contacto" size="lg">
                Solicitar presupuesto
              </Button>
              <Button to="/servicios" size="lg" variant="secondary">
                Conocer servicios
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="rounded-2xl bg-petrolio p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-cream/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-cream/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-cream/30" />
              </div>
              <span className="font-display text-sm font-semibold text-cream">Panel de gestión</span>
            </div>
            <div className="mt-6 space-y-4">
              {[0, 1, 2].map((row) => (
                <div key={row} className="rounded-xl bg-cream/5 p-4">
                  <div className="h-3 w-28 rounded-full bg-cream/20" />
                  <div className="mt-3 h-2.5 w-2/3 rounded-full bg-cream/10" />
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-accent/15 p-4">
              <div className="h-3 w-24 rounded-full bg-accent/60" />
              <div className="mt-2 h-2.5 w-1/2 rounded-full bg-cream/20" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
