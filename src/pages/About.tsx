import { Seo } from '@/components/ui/Seo';
import { AboutSection } from '@/components/sections/AboutSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { MethodologySection } from '@/components/sections/MethodologySection';

export function AboutPage() {
  return (
    <>
      <Seo title="Nosotros | SOLIAN" description="Conoce nuestra visión y cómo resolvemos problemas reales con tecnología." />
      <AboutSection />
      <MethodologySection />
      <CtaSection />
    </>
  );
}
