import { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import { mailtoHref, site, telHref } from '@/config/site';
import { cx } from '@/lib/cx';
import { buttonClasses } from '@/components/ui/button';

export interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  // Keep the hidden menu out of the tab order without unmounting it.
  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    if (open) element.removeAttribute('inert');
    else element.setAttribute('inert', '');
  }, [open]);

  return (
    <div
      ref={rootRef}
      id="mobile-nav"
      className={cx(
        'lg:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <div
        className={cx(
          'fixed inset-0 top-16 z-40 bg-navy-950/40 backdrop-blur-sm transition-opacity duration-300 sm:top-20',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cx(
          'fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-navy-100 bg-white px-5 pb-8 pt-4 shadow-card transition-transform duration-300 sm:top-20',
          open ? 'translate-y-0' : '-translate-y-4 opacity-0',
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cx(
                  'flex items-center justify-between border-b border-navy-100 py-3.5 text-base font-semibold',
                  isActive ? 'text-electric-600' : 'text-navy-800',
                )
              }
            >
              {item.label}
              <ChevronRight className="h-4 w-4 text-navy-300" aria-hidden="true" />
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 grid gap-3">
          <Link to="/get-started" onClick={onClose} className={buttonClasses({ variant: 'primary', size: 'lg', fullWidth: true })}>
            Get Started
          </Link>
          <Link to="/book-demo" onClick={onClose} className={buttonClasses({ variant: 'outline', size: 'lg', fullWidth: true })}>
            Book a Demo
          </Link>
          <Link to="/login" onClick={onClose} className={buttonClasses({ variant: 'ghost', size: 'lg', fullWidth: true })}>
            Login
          </Link>
        </div>

        <div className="mt-6 space-y-3 rounded-2xl border border-navy-100 bg-navy-50/60 p-4 text-sm">
          <a href={telHref()} className="flex items-center gap-3 font-medium text-navy-700">
            <Phone className="h-4 w-4 text-electric-600" aria-hidden="true" />
            {site.contact.phoneDisplay}
          </a>
          <a href={mailtoHref()} className="flex items-center gap-3 font-medium text-navy-700">
            <Mail className="h-4 w-4 text-electric-600" aria-hidden="true" />
            {site.contact.email}
          </a>
          <p className="flex items-start gap-3 text-navy-500">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric-600" aria-hidden="true" />
            {site.contact.address}
          </p>
        </div>
      </div>
    </div>
  );
}
