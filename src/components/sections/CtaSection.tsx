import { Button } from '@/components/ui/Button';

export function CtaSection() {
  return (
    <section className="bg-accent py-20 text-petrolio sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-petrolio sm:text-4xl lg:text-5xl">
          Tu próximo proyecto puede empezar hoy.
        </h2>
        <p className="mt-6 text-lg text-petrolio/80">
          Contanos qué necesita tu negocio. Analizamos tu idea y te ayudamos a convertirla en una
          solución digital.
        </p>
        <div className="mt-10">
          <Button to="/contacto" size="lg" variant="dark">
            Solicitar presupuesto
          </Button>
        </div>
      </div>
    </section>
  );
}
