import { Seo } from '@/components/ui/Seo';
import { AboutSection } from '@/components/sections/AboutSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Hero } from '@/components/sections/Hero';
import { MethodologySection } from '@/components/sections/MethodologySection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';

const SEO_TITLE = 'SOLIAN | Desarrollo de Software a Medida para Empresas';
const SEO_DESCRIPTION =
  'Desarrollamos sitios web, sistemas de gestión y automatizaciones para empresas y pymes. Transformamos ideas en soluciones.';

export function HomePage() {
  return (
    <>
      <Seo title={SEO_TITLE} description={SEO_DESCRIPTION} />
      <Hero />
      <ServicesSection />
      <MethodologySection />
      <ProjectsSection />
      <AboutSection />
      <CtaSection />
      <ContactSection />
    </>
  );
}
