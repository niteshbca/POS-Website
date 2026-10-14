import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';

export interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: string;
  actions?: ReactNode;
  align?: 'left' | 'center';
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  actions,
  align = 'left',
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-navy-100 bg-navy-50/40">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-light bg-[size:44px_44px] [mask-image:radial-gradient(60%_80%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <Container className="relative py-14 sm:py-16 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex items-center gap-1.5 text-xs font-medium text-navy-400">
            <li>
              <Link to="/" className="transition hover:text-electric-600">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li aria-current="page" className="text-navy-700">
              {breadcrumb ?? title}
            </li>
          </ol>
        </nav>

        <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
          {eyebrow ? <Badge>{eyebrow}</Badge> : null}
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-navy-500 sm:text-lg">{description}</p>
          ) : null}
          {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
