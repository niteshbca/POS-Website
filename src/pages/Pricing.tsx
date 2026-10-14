import { Link } from 'react-router-dom';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { site } from '@/config/site';
import { cx } from '@/lib/cx';
import { buttonClasses } from '@/components/ui/button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/sections/PageHero';
import { PricingCards } from '@/components/sections/PricingCards';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaSection } from '@/components/sections/CtaSection';

interface ComparisonRow {
  label: string;
  values: (boolean | string)[];
}

const comparison: ComparisonRow[] = [
  { label: 'Stores included', values: ['1', 'Up to 3', 'Unlimited', 'Custom'] },
  { label: 'Billing counters', values: ['1', 'Unlimited', 'Unlimited', 'Custom'] },
  { label: 'Barcode billing', values: [true, true, true, true] },
  { label: 'GST-ready invoicing', values: ['Basic', true, true, true] },
  { label: 'Returns & exchanges', values: [false, true, true, true] },
  { label: 'Suppliers & purchase orders', values: [false, true, true, true] },
  { label: 'Low-stock alerts', values: [true, true, true, true] },
  { label: 'Staff roles & permissions', values: [false, 'Basic', 'Advanced', 'Advanced'] },
  { label: 'Multi-branch reporting', values: [false, 'Basic', 'Advanced', 'Advanced'] },
  { label: 'Warehouse & transfers', values: [false, false, true, true] },
  { label: 'API access', values: [false, false, true, true] },
  { label: 'Support', values: ['Email', 'Priority chat', 'Account manager', 'Custom SLA'] },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-grid h-5 w-5 place-items-center rounded-full bg-electric-50 text-electric-600">
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-grid h-5 w-5 place-items-center rounded-full bg-navy-50 text-navy-300">
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    );
  }
  return <span className="text-xs font-medium text-navy-600">{value}</span>;
}

export function Pricing() {
  useSeo({
    title: 'NiteshPro POS Software Pricing - Best Affordable POS India',
    description:
      'NiteshPro POS Software Pricing Plans - Starter, Growth, Business, Enterprise. Affordable for Retail, Grocery, Pharmacy, Restaurant.',
    path: '/pricing',
  });

  const planNames = site.pricing.plans.map((plan) => plan.name);

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pricing that scales with your business"
        description="Start small and add stores, counters and modules as you grow. All prices below are indicative placeholders — request a quote for your exact setup."
        align="center"
      />

      <Section>
        <PricingCards />
      </Section>

      <Section className="bg-navy-50/40">
        <SectionHeading
          eyebrow="Compare plans"
          title="Find the right plan for your operation"
          description="A high-level comparison. Tell us your workflow and we will recommend the best fit."
        />

        <div className="mt-10 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-soft">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <caption className="sr-only">Feature comparison across NiteshPro POS plans</caption>
            <thead>
              <tr className="border-b border-navy-100 bg-navy-50/60">
                <th scope="col" className="px-5 py-4 text-sm font-semibold text-navy-900">
                  Feature
                </th>
                {planNames.map((name) => (
                  <th key={name} scope="col" className="px-5 py-4 text-center text-sm font-semibold text-navy-900">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, index) => (
                <tr key={row.label} className={cx('border-b border-navy-100', index % 2 === 1 && 'bg-navy-50/30')}>
                  <th scope="row" className="px-5 py-3.5 text-sm font-medium text-navy-700">
                    {row.label}
                  </th>
                  {row.values.map((value, valueIndex) => (
                    <td key={valueIndex} className="px-5 py-3.5 text-center">
                      <Cell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-xs text-navy-400">
          The comparison above is indicative. Module availability can vary by plan and region — confirm
          the exact inclusions with our team.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Link to="/book-demo" className={buttonClasses({ variant: 'primary', size: 'lg' })}>
            Get a tailored quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/contact" className="link-underline text-sm">
            Have a question? Contact sales
          </Link>
        </div>
      </Section>

      <Section>
        <FaqSection />
      </Section>

      <CtaSection />
    </>
  );
}
