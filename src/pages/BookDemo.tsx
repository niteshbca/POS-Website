import { CalendarCheck, CheckCircle2, Clock, MessageCircle, Phone } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { site, telHref } from '@/config/site';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/sections/PageHero';
import { DemoForm } from '@/components/forms/DemoForm';
import { useWhatsAppModal } from '@/components/whatsapp/WhatsAppWidget';

const expectations = [
  'A walkthrough tailored to your business type',
  'Your questions on billing, GST and inventory',
  'Guidance on migration and hardware',
  'A clear view of pricing for your setup',
];

export function BookDemo() {
  const { openModal } = useWhatsAppModal();

  useSeo({
    title: 'Book Free Demo - NiteshPro POS Software',
    description:
      'Book Free Demo of NiteshPro POS Software. See Billing, Inventory, GST, Khata, CRM Live. Call/WhatsApp +91 88107 51872.',
    path: '/book-demo',
  });

  return (
    <>
      <PageHero
        eyebrow="Book a demo"
        title="See NiteshPro POS with your own products"
        description="Pick a time that suits you and our team will walk you through a live demo — no pressure, no obligation."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-xl font-bold text-navy-950">What to expect</h2>
            <ul className="mt-5 space-y-3.5">
              {expectations.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy-600">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-electric-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-navy-100 bg-navy-50/60 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-navy-800">
                <Clock className="h-4 w-4 text-electric-600" aria-hidden="true" />
                Typical demo runs 30 minutes
              </div>
              <p className="mt-2 text-sm text-navy-500">
                Prefer to talk right away? We are happy to jump on a call or chat.
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <a href={telHref()} className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 transition hover:text-electric-600">
                  <Phone className="h-4 w-4 text-electric-600" aria-hidden="true" />
                  {site.contact.phoneDisplay}
                </a>
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 transition hover:text-[#128C7E]"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-electric-600 to-violet-600 text-white">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-navy-950">Request your demo</h2>
                <p className="text-xs text-navy-400">We will confirm the slot within one business day.</p>
              </div>
            </div>
            <div className="mt-6">
              <DemoForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
