import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ContactForm } from './ContactForm';
import { WHATSAPP_URL } from '@/config/site';

export function ContactSection() {
  return (
    <section id="contacto" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Contacto
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-petrolio sm:text-4xl">
              Contáctanos
            </h2>
            <p className="mt-6 text-lg text-slate">
              Contanos qué necesita tu negocio. Analizamos tu idea y te ayudamos a convertirla en una
              solución digital.
            </p>

            <div className="mt-10">
              {WHATSAPP_URL ? (
                <Button href={WHATSAPP_URL} size="lg">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Escribinos por WhatsApp
                </Button>
              ) : null}
            </div>

            <p className="mt-6 font-sans text-sm text-slate">
              Respondemos dentro del mismo día hábil.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
