import { Dashboard } from '@/components/hero-dashboard/Dashboard';
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
          <div className="relative overflow-hidden rounded-2xl bg-petrolio p-6 shadow-2xl sm:p-8">
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <Dashboard />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
