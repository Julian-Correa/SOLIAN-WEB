import { Seo } from '@/components/ui/Seo';
import { CtaSection } from '@/components/sections/CtaSection';
import { ServicesSection } from '@/components/sections/ServicesSection';

export function ServicesPage() {
  return (
    <>
      <Seo title="Servicios | SOLIAN" description="Desarrollamos sitios web, sistemas de gestión y automatizaciones para empresas y pymes." />
      <ServicesSection />
      <CtaSection />
    </>
  );
}
