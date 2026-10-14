import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Handshake, Plug, ShieldCheck } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { buttonClasses } from '@/components/ui/button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/sections/PageHero';
import { IntegrationsSection } from '@/components/sections/IntegrationsSection';
import { CtaSection } from '@/components/sections/CtaSection';

const steps = [
  { icon: Handshake, title: 'Tell us your stack', text: 'Share the tools, terminals and hardware you rely on today.' },
  { icon: Plug, title: 'We map the connection', text: 'Our team confirms what can connect natively and what needs custom work.' },
  { icon: Code2, title: 'Configure & test', text: 'We set up the connection and run a live test at your counter.' },
  { icon: ShieldCheck, title: 'Go live safely', text: 'Roll out with a fallback so billing never stops if a service is unavailable.' },
];

export function Integrations() {
  useSeo({
    title: 'NiteshPro POS Software Integrations - Hardware & API',
    description:
      'NiteshPro POS Software Integrations - Barcode Scanner, Thermal Printer, Cash Drawer, UPI, Tally, Website, CRM, API & Custom Integrations.',
    path: '/integrations',
  });

  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Connect NiteshPro POS to your stack"
        description="Payments, hardware, accounting exports, messaging and your own systems. Below are the categories we can support — compatibility is confirmed for your exact setup."
        actions={
          <Link to="/contact" className={buttonClasses({ variant: 'primary', size: 'lg' })}>
            Discuss your integrations
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />

      <Section>
        <IntegrationsSection />
      </Section>

      <Section className="bg-navy-50/40">
        <SectionHeading
          eyebrow="How it works"
          title="A simple path to a connected setup"
          description="We do not claim ready-made partnerships we cannot deliver. Instead we confirm each connection with you before you commit."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
              <span className="absolute right-5 top-5 text-xs font-bold text-navy-200">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-950 text-white">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-10 rounded-3xl border border-navy-100 bg-white p-8 shadow-soft sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              REST API &amp; webhooks
            </h2>
            <p className="mt-3 text-navy-500">
              For teams with in-house systems, NiteshPro POS can expose an API and webhooks so your
              developers can build custom flows — syncing products, pushing orders or streaming sales
              events into your own dashboards.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-navy-600">
              <li>Scoped access keys per store or app</li>
              <li>Webhooks for key business events</li>
              <li>CSV / Excel import and export</li>
            </ul>
            <Link to="/contact" className={buttonClasses({ variant: 'outline', size: 'md', className: 'mt-6' })}>
              Request API details
            </Link>
          </div>
          <div className="rounded-2xl bg-navy-950 p-6 font-mono text-xs leading-relaxed text-navy-200 shadow-card">
            <p className="text-electric-300">POST /v1/webhooks</p>
            <pre className="mt-3 whitespace-pre-wrap text-navy-300">{`{
  "event": "sale.completed",
  "store_id": "store_001",
  "invoice": "INV-2041",
  "total": 2480,
  "payment": "upi",
  "ts": "2026-10-14T10:24:00Z"
}`}</pre>
            <p className="mt-3 text-navy-500">Example payload — schema shared during onboarding.</p>
          </div>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
