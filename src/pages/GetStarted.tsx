import { Link } from 'react-router-dom';
import { BadgeCheck, CheckCircle2, Headphones, Rocket, TrendingUp } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { Logo } from '@/components/ui/Logo';
import { SignupForm } from '@/components/forms/SignupForm';

const benefits = [
  { icon: Rocket, title: 'Quick setup', text: 'Most single stores are billing the same day.' },
  { icon: TrendingUp, title: 'Grow safely', text: 'Add stores, counters and staff as you expand.' },
  { icon: Headphones, title: 'Guided onboarding', text: 'We help with imports, taxes and hardware.' },
  { icon: BadgeCheck, title: 'Transparent pricing', text: 'Plans scale with your needs — no surprises.' },
];

const included = [
  'Barcode billing & GST-ready invoices',
  'Inventory with low-stock alerts',
  'Customer & supplier management',
  'Sales analytics & exportable reports',
  'Role-based staff permissions',
  'Multi-store support',
];

export function GetStarted() {
  useSeo({
    title: 'Get Started with NiteshPro POS Software - Free Demo',
    description:
      'Get Started with NiteshPro POS Software - Free Demo, Quick Setup. Call/WhatsApp +91 88107 51872 | nitesh@niteshpro.in',
    path: '/get-started',
  });

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative overflow-hidden bg-navy-950 p-8 text-white sm:p-12">
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
          <h2 className="mt-10 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Start running your business smarter
          </h2>
          <p className="mt-4 max-w-md text-navy-200">
            Create your account to bring sales, stock, customers and reporting into one place.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <benefit.icon className="h-5 w-5 text-electric-300" aria-hidden="true" />
                <p className="mt-3 text-sm font-bold text-white">{benefit.title}</p>
                <p className="mt-1 text-xs text-navy-300">{benefit.text}</p>
              </div>
            ))}
          </div>

          <ul className="mt-8 space-y-2.5">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-navy-100">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-electric-300" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-start justify-center bg-white px-5 py-14 sm:px-8">
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold tracking-tight text-navy-950">Create your account</h1>
          <p className="mt-2 text-sm text-navy-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-electric-600 hover:text-electric-700">
              Sign in
            </Link>
            .
          </p>
          <div className="mt-8">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
