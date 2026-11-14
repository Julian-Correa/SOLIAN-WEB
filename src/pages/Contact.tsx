import { Seo } from '@/components/ui/Seo';
import { ContactSection } from '@/components/sections/ContactSection';

export function ContactPage() {
  return (
    <>
      <Seo title="Contacto | SOLIAN" description="Contanos qué necesita tu negocio y te ayudamos a convertirlo en una solución digital." />
      <ContactSection />
    </>
  );
}
