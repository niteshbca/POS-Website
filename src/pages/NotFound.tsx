import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { buttonClasses } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';

export function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'The page you are looking for could not be found.',
    path: '/404',
    noIndex: true,
  });

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-electric-600">404</p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
        We couldn’t find that page
      </h1>
      <p className="mt-3 max-w-md text-navy-500">
        The link may be broken or the page may have moved. Let’s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className={buttonClasses({ variant: 'primary', size: 'lg' })}>
          <Home className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
        <Link to="/contact" className={buttonClasses({ variant: 'outline', size: 'lg' })}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Contact support
        </Link>
      </div>
    </Container>
  );
}
