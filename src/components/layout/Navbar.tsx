import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { NAV_ITEMS } from '@/config/site';
import { useScrolled } from '@/hooks/useScrolled';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(8);

  useEffect(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 font-sans text-sm font-semibold transition-colors ${
      isActive ? 'bg-petrolio text-cream' : 'text-petrolio hover:bg-petrolio/10'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled || open ? 'border-petrolio/10 bg-cream' : 'border-transparent bg-cream'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center" aria-label="SOLIAN inicio">
          <Logo />
        </Link>

        <nav className="hidden md:flex" aria-label="Navegación principal">
          <ul className="flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Button to="/contacto" size="sm">
            Solicitar presupuesto
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-petrolio/20 text-petrolio transition-colors hover:bg-petrolio/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-navigation" className="border-t border-petrolio/10 bg-cream md:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-4 sm:px-6" aria-label="Navegación móvil">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `block rounded-full px-4 py-3 font-sans text-base font-semibold transition-colors ${
                        isActive ? 'bg-petrolio text-cream' : 'text-petrolio hover:bg-petrolio/10'
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Button to="/contacto" className="w-full">
                Solicitar presupuesto
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
