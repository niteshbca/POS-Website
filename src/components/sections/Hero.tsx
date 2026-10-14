import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Play } from 'lucide-react';
import { site, telHref } from '@/config/site';
import { buttonClasses } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { DashboardMock } from '@/components/mock/DashboardMock';
import { useWhatsAppModal } from '@/components/whatsapp/WhatsAppWidget';

const trustChips = [
  'GST-ready invoicing',
  'Offline-first billing',
  'Multi-store ready',
  'Cloud & on-premise',
];

export function Hero() {
  const { openModal } = useWhatsAppModal();

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-light bg-[size:44px_44px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-electric-500" aria-hidden="true" />
              Point of Sale &amp; Business Management
            </Badge>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-950 sm:text-5xl lg:text-[3.4rem]">
              NiteshPro POS Software -
              <span className="text-gradient"> Billing, Inventory, CRM &amp; More</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-500 sm:text-lg">
              NiteshPro POS Software for Billing, Inventory, GST Invoicing, Khata (Udhaar), CRM, Website Integration, 
              Multi-Store Management, Sales Reports &amp; Business Growth. Easy to use, Offline Billing, Fast &amp; Affordable.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/get-started" className={buttonClasses({ variant: 'primary', size: 'lg' })}>
                Get Started
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/book-demo" className={buttonClasses({ variant: 'outline', size: 'lg' })}>
                <Play className="h-4 w-4" aria-hidden="true" />
                Book a Demo
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <a href={telHref()} className="inline-flex items-center gap-2 font-semibold text-navy-700 transition hover:text-electric-600">
                <Phone className="h-4 w-4 text-electric-600" aria-hidden="true" />
                Call {site.contact.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-2 font-semibold text-navy-700 transition hover:text-[#128C7E]"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                WhatsApp us
              </button>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2">
              {trustChips.map((chip) => (
                <li key={chip} className="flex items-center gap-2 text-sm text-navy-600">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-electric-600" aria-hidden="true" />
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <DashboardMock className="lg:ml-4" />
              <div className="absolute -left-3 top-1/3 hidden animate-float rounded-xl border border-navy-100 bg-white/95 p-3 shadow-card backdrop-blur lg:block">
                <p className="text-[10px] font-medium uppercase tracking-wide text-navy-400">Stock alert</p>
                <p className="mt-0.5 text-sm font-bold text-navy-950">3 items low</p>
                <p className="text-[10px] text-amber-600">Reorder suggested</p>
              </div>
              <div className="absolute -bottom-4 right-4 hidden animate-float rounded-xl border border-navy-100 bg-white/95 p-3 shadow-card backdrop-blur [animation-delay:1.2s] lg:block">
                <p className="text-[10px] font-medium uppercase tracking-wide text-navy-400">Today</p>
                <p className="mt-0.5 text-sm font-bold text-navy-950">₹1,24,560</p>
                <p className="text-[10px] text-emerald-600">+12.4% vs yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
