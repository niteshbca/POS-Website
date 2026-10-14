import { Link } from 'react-router-dom';
import { BarChart3, Boxes, ScanBarcode, ShieldCheck } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { site } from '@/config/site';
import { Logo } from '@/components/ui/Logo';
import { LoginForm } from '@/components/forms/LoginForm';

const points = [
  { icon: ScanBarcode, text: 'Pick up billing right where you left off' },
  { icon: Boxes, text: 'Check live stock across every store' },
  { icon: BarChart3, text: 'Review today’s sales and reports' },
  { icon: ShieldCheck, text: 'Secure, role-based access' },
];

export function Login() {
  useSeo({
    title: 'Login',
    description: 'Sign in to your NiteshPro POS dashboard.',
    path: '/login',
    noIndex: true,
  });

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-navy-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(50% 60% at 15% 10%, rgba(51,102,255,0.4) 0%, transparent 60%), radial-gradient(45% 55% at 90% 90%, rgba(139,92,246,0.35) 0%, transparent 55%)',
          }}
        />
        <div className="relative">
          <Logo tone="dark" />
        </div>
        <div className="relative max-w-md">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome back to {site.brand.name}
          </h2>
          <p className="mt-3 text-navy-200">
            Sign in to manage sales, stock, staff and reports across all your stores.
          </p>
          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li key={point.text} className="flex items-center gap-3 text-sm text-navy-100">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10">
                  <point.icon className="h-4 w-4 text-electric-300" aria-hidden="true" />
                </span>
                {point.text}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-navy-400">
          &copy; {new Date().getFullYear()} {site.brand.company}
        </p>
      </div>

      <div className="flex items-center justify-center bg-white px-5 py-14 sm:px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h1 className="mt-8 text-2xl font-bold tracking-tight text-navy-950 lg:mt-0">
            Sign in to your dashboard
          </h1>
          <p className="mt-2 text-sm text-navy-500">
            Enter your details below. Don’t have an account?{' '}
            <Link to="/get-started" className="font-semibold text-electric-600 hover:text-electric-700">
              Get started
            </Link>
            .
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <p className="mt-6 text-center text-xs text-navy-400">
            By signing in you agree to our{' '}
            <Link to="/terms" className="font-semibold text-electric-600 hover:text-electric-700">
              terms
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="font-semibold text-electric-600 hover:text-electric-700">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
