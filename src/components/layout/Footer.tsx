import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { NAV_ITEMS } from '@/config/site';
import { SERVICES } from '@/config/services';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-petrolio text-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Logo tone="dark" />
            <p className="mt-6 max-w-xs font-sans text-sm text-cream/70">
              Desarrollo de software a medida para empresas y emprendimientos.
            </p>
          </div>

          <nav aria-label="Navegación del sitio">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-cream">
              Navegación
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="font-sans text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-cream">
              Servicios
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/servicios?servicio=${service.slug}`}
                    className="font-sans text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/10 pt-8">
          <p className="font-sans text-sm text-cream/60">
            © {year} SOLIAN · Desarrollo de Software
          </p>
        </div>
      </div>
    </footer>
  );
}
