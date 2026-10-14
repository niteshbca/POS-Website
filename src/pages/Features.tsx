import { Link } from 'react-router-dom';
import { ArrowRight, ScanBarcode, ShieldCheck, Store } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { featureGroups } from '@/data/content';
import { buttonClasses } from '@/components/ui/button';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { PageHero } from '@/components/sections/PageHero';
import { FeatureCards } from '@/components/sections/FeatureCards';
import { DashboardShowcase } from '@/components/sections/DashboardShowcase';
import { TrustSection } from '@/components/sections/TrustSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaSection } from '@/components/sections/CtaSection';

const jumpLinks = featureGroups.map((group) => ({ id: group.id, title: group.title }));

export function Features() {
  useSeo({
    title: 'POS Software Features - Billing, Inventory, CRM | NiteshPro',
    description:
      'NiteshPro POS Software Features - Billing, Inventory, GST Invoice, Barcode Billing, Khata, CRM, Multi-Store, Reports, Website Integration.',
    path: '/features',
  });

  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Every tool your counter and back office needs"
        description="Billing, inventory, customers, suppliers, expenses, reporting and permissions — designed to work together so you spend less time on admin and more time selling."
        actions={
          <>
            <Link to="/book-demo" className={buttonClasses({ variant: 'primary', size: 'lg' })}>
              Book a Demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/pricing" className={buttonClasses({ variant: 'outline', size: 'lg' })}>
              View Pricing
            </Link>
          </>
        }
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: ScanBarcode, title: 'Checkout in seconds', text: 'Barcode billing and quick keyboard workflows keep queues moving.' },
            { icon: Store, title: 'One view, many branches', text: 'Manage every store from a single dashboard with per-branch detail.' },
            { icon: ShieldCheck, title: 'Control who sees what', text: 'Role-based permissions for owners, managers and cashiers.' },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-electric-50 text-electric-600">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-navy-950">{item.title}</p>
                <p className="mt-1 text-sm text-navy-500">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <nav aria-label="Feature categories" className="mt-8 flex flex-wrap gap-2">
          {jumpLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-600 transition hover:border-electric-400 hover:text-electric-700"
            >
              {link.title}
            </a>
          ))}
        </nav>
      </Section>

      {featureGroups.map((group, index) => (
        <Section key={group.id} className={index % 2 === 1 ? 'bg-navy-50/40' : undefined}>
          <div id={group.id} className="scroll-mt-24">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">{group.title}</h2>
              <p className="mt-2 text-navy-500">{group.blurb}</p>
            </div>
            <Reveal className="mt-8">
              <FeatureCards items={group.items} />
            </Reveal>
          </div>
        </Section>
      ))}

      <Section>
        <DashboardShowcase
          eyebrow="See it working"
          title="Billing, inventory and analytics in one screen"
          description="Switch between the counter view and the back-office view without losing context. The dashboard is designed to answer your questions at a glance."
          bullets={[
            'Fast barcode checkout',
            'Bill-level discounts & returns',
            'GST summary per invoice',
            'Real-time stock position',
            'Low-stock reorder alerts',
            'Exportable sales reports',
          ]}
          reverse
        />
      </Section>

      <Section className="bg-navy-50/40">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric-600">Security & scale</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-navy-950">
            Grow from one counter to a nationwide chain
          </h2>
        </div>
        <TrustSection />
      </Section>

      <Section>
        <FaqSection />
      </Section>

      <CtaSection />
    </>
  );
}
