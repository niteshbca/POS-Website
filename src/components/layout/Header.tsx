import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import { site, telHref } from '@/config/site';
import { cx } from '@/lib/cx';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useScrolled } from '@/hooks/useScrolled';
import { buttonClasses } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { MobileNav } from './MobileNav';

export function Header() {
  const scrolled = useScrolled(10);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useBodyScrollLock(menuOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={cx(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-navy-100 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/75'
          : 'border-b border-transparent bg-white/0',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:h-20 lg:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cx(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-electric-50 text-electric-700'
                    : 'text-navy-600 hover:bg-navy-50 hover:text-navy-950',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={telHref()}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-navy-700 transition hover:text-electric-600"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden xl:inline">{site.contact.phoneDisplay}</span>
            <span className="xl:hidden">Call</span>
          </a>
          <Link to="/login" className={buttonClasses({ variant: 'ghost', size: 'md' })}>
            Login
          </Link>
          <Link to="/book-demo" className={buttonClasses({ variant: 'primary', size: 'md' })}>
            Book a Demo
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telHref()}
            aria-label={`Call ${site.contact.phoneDisplay}`}
            className="grid h-10 w-10 place-items-center rounded-full border border-navy-200 text-navy-700 transition hover:border-electric-400 hover:text-electric-600"
          >
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-navy-200 text-navy-800 transition hover:border-electric-400 hover:text-electric-600"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
