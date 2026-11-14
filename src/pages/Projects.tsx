import { Seo } from '@/components/ui/Seo';
import { CtaSection } from '@/components/sections/CtaSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

export function ProjectsPage() {
  return (
    <>
      <Seo title="Proyectos | SOLIAN" description="Soluciones de software que podemos desarrollar para empresas y pymes." />
      <ProjectsSection />
      <CtaSection />
    </>
  );
}
