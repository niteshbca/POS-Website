import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { site, telHref } from '@/config/site';
import { buttonClasses } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import { useWhatsAppModal } from '@/components/whatsapp/WhatsAppWidget';

export function CtaSection() {
  const { openModal } = useWhatsAppModal();

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-14 text-center shadow-card sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            aria-hidden="true"
            style={{
              backgroundImage:
                'radial-gradient(50% 60% at 20% 0%, rgba(51,102,255,0.35) 0%, transparent 60%), radial-gradient(45% 60% at 85% 100%, rgba(139,92,246,0.32) 0%, transparent 55%)',
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to Grow Your Business with NiteshPro POS Software?
            </h2>
            <p className="mt-4 text-navy-200">
              Get the Best POS Software in India for Billing, Inventory, GST, CRM &amp; Website. Book a Free Demo Today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/get-started" className={buttonClasses({ variant: 'white', size: 'lg' })}>
                Get Started
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/book-demo" className={buttonClasses({ variant: 'primary', size: 'lg' })}>
                Book a Demo
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
              <a href={telHref()} className="inline-flex items-center gap-2 font-semibold text-white/90 transition hover:text-white">
                <Phone className="h-4 w-4 text-electric-300" aria-hidden="true" />
                {site.contact.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-2 font-semibold text-white/90 transition hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
