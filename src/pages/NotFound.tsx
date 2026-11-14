import { Link } from 'react-router-dom';
import { Seo } from '@/components/ui/Seo';

export function NotFoundPage() {
  return (
    <>
      <Seo title="Página no encontrada | SOLIAN" description="La página que buscás no existe." />
      <section className="bg-cream py-32">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-display text-6xl font-bold text-accent">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold text-petrolio">Página no encontrada</h1>
          <p className="mt-4 text-slate">La página que buscás no existe o se movió.</p>
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 font-sans text-base font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
