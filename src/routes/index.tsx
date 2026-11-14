import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/Home';
import { ServicesPage } from '@/pages/Services';
import { ProjectsPage } from '@/pages/Projects';
import { AboutPage } from '@/pages/About';
import { ContactPage } from '@/pages/Contact';
import { NotFoundPage } from '@/pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="servicios" element={<ServicesPage />} />
        <Route path="proyectos" element={<ProjectsPage />} />
        <Route path="nosotros" element={<AboutPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
