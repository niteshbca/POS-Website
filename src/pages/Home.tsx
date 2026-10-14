import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { highlightFeatures } from '@/data/content';
import { buttonClasses } from '@/components/ui/button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Hero } from '@/components/sections/Hero';
import { CapabilityTicker } from '@/components/sections/CapabilityTicker';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { BusinessTypes } from '@/components/sections/BusinessTypes';
import { WhatsAppSection } from '@/components/sections/WhatsAppSection';
import { FeatureCards } from '@/components/sections/FeatureCards';
import { DashboardShowcase } from '@/components/sections/DashboardShowcase';
import { SolutionsPreview } from '@/components/sections/SolutionsPreview';
import { Testimonials } from '@/components/sections/Testimonials';
import { TrustSection } from '@/components/sections/TrustSection';
import { IntegrationsSection } from '@/components/sections/IntegrationsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaSection } from '@/components/sections/CtaSection';

export function Home() {
  useSeo({
    title: 'NiteshPro POS Software - Billing, Inventory, CRM, GST Software India',
    description:
      'Best POS Software in India for Retail, Grocery, Pharmacy, Restaurant, Garments, Wholesale. NiteshPro POS - Billing, Inventory, GST Invoice, Khata, CRM, Website, Multi-Store & Reports.',
    path: '/',
  });

  return (
    <>
      <Hero />
      <CapabilityTicker />

      <Section>
        <Reveal>
          <StatsStrip />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <TrustedBy />
        </Reveal>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Who is it for"
          title="POS software for your kind of shop"
          description="Kirana store, garment showroom, pharmacy or wholesale godown — if you sell products, NiteshPro POS helps you bill faster, control stock and grow profit."
        />
        <Reveal className="mt-12">
          <BusinessTypes />
        </Reveal>
        <p className="mt-8 text-center text-sm text-navy-500">
          Not in the list? NiteshPro POS adapts to most retail and service businesses —{' '}
          <Link to="/contact" className="font-semibold text-electric-600 hover:text-electric-700">
            ask our team
          </Link>
          .
        </p>
      </Section>

      <Section className="bg-navy-50/40">
        <SectionHeading
          eyebrow="Everything you need"
          title="One platform to run sales, stock and staff"
          description="From the first scan at the counter to the consolidated report for head office — NiteshPro POS connects the moving parts of your business."
        />
        <Reveal className="mt-12">
          <FeatureCards items={highlightFeatures} />
        </Reveal>
        <div className="mt-10 text-center">
          <Link to="/features" className={buttonClasses({ variant: 'outline', size: 'lg' })}>
            Explore all features
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      <Section>
        <DashboardShowcase
          title="A live dashboard for the whole business"
          description="See today’s sales, orders, low-stock alerts and trends the moment you open NiteshPro POS — and drill into any branch from the same screen."
          bullets={[
            'Daily sales & order KPIs',
            'Payment-method breakdown',
            'Low-stock alerts',
            'Multi-branch analytics',
            'Exportable report data',
            'GST-ready invoice preview',
          ]}
        />
      </Section>

      <Section className="bg-navy-50/40">
        <SectionHeading
          eyebrow="Solutions"
          title="Shaped around your kind of business"
          description="Different businesses handle stock, pricing and customers differently. NiteshPro POS adapts to the way you already work."
        />
        <Reveal className="mt-12">
          <SolutionsPreview />
        </Reveal>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Testimonials"
          title="What customers are saying"
          description="We would rather show you real, verified customer voices — so the cards below are clearly marked placeholders for you to replace."
        />
        <div className="mt-12">
          <Testimonials />
        </div>
      </Section>

      <Section className="bg-navy-50/40">
        <SectionHeading
          eyebrow="Security & trust"
          title="Built to protect your business data"
          description="NiteshPro POS is designed with data protection and control in mind."
        />
        <Reveal className="mt-12">
          <TrustSection />
        </Reveal>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Integrations"
          title="Connects with the tools you already use"
          description="Payments, accounting exports, hardware and more — confirm compatibility for your exact setup."
        />
        <Reveal className="mt-12">
          <IntegrationsSection />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <WhatsAppSection />
        </Reveal>
      </Section>

      <Section className="bg-navy-50/40">
        <FaqSection />
      </Section>

      <CtaSection />
    </>
  );
}
