import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Heart, Lightbulb, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { site } from '@/config/site';
import { buttonClasses } from '@/components/ui/button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { PageHero } from '@/components/sections/PageHero';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { CtaSection } from '@/components/sections/CtaSection';

const values = [
  { icon: Target, title: 'Built for real shops', text: 'Every feature starts from a problem a counter or back office actually faces.' },
  { icon: Heart, title: 'Customer first', text: 'We measure success by how much easier your day becomes, not by feature counts.' },
  { icon: ShieldCheck, title: 'Honest by default', text: 'We do not overstate certifications, integrations or guarantees. We confirm.' },
  { icon: Lightbulb, title: 'Simple over clever', text: 'Powerful software should still feel obvious to a new cashier on day one.' },
  { icon: Sparkles, title: 'Always improving', text: 'Regular releases driven by feedback from the businesses we serve.' },
  { icon: Compass, title: 'Ready to scale', text: 'From a single counter to a nationwide chain without changing systems.' },
];

export function About() {
  useSeo({
    title: 'About NiteshPro POS Software | NiteshPro Software Solutions',
    description:
      'NiteshPro Software Solutions - Leading POS Software Company in India. NiteshPro POS for Billing, Inventory, CRM & Business Growth.',
    path: '/about',
  });

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Software that helps businesses run smarter"
        description={`${site.brand.name} is built by ${site.brand.company} with one goal: give everyday businesses the same operational clarity that large chains enjoy.`}
      />

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              Our mission
            </h2>
            <p className="mt-4 leading-relaxed text-navy-500">
              Running a store involves a hundred small decisions every day — what to reorder, which
              price to change, which customer deserves a follow-up, which branch is falling behind.
              We build NiteshPro POS so those answers are always a glance away.
            </p>
            <p className="mt-4 leading-relaxed text-navy-500">
              Instead of forcing a rigid workflow, we focus on flexibility: configurable taxes and
              invoices, industry-friendly stock handling, and reporting that makes sense to owners and
              accountants alike.
            </p>
            <div className="mt-6 rounded-2xl border border-navy-100 bg-navy-50/60 p-5 text-sm text-navy-500">
              <p className="font-semibold text-navy-800">A note on transparency</p>
              <p className="mt-1.5">
                Company details, milestones and team information on this page are placeholders for you
                to replace. We publish real facts only — no invented statistics, awards or
                certifications.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-soft">
            <h3 className="text-lg font-bold text-navy-950">What we build</h3>
            <ul className="mt-5 space-y-4 text-sm text-navy-600">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-500" />
                A full point-of-sale experience for fast, accurate billing.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-500" />
                Inventory and purchasing tools that keep stock and costs in check.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-500" />
                Customer and supplier management with a complete history.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-500" />
                Analytics and reporting built for owners and multi-branch operators.
              </li>
            </ul>
            <Link to="/features" className={buttonClasses({ variant: 'outline', size: 'md', className: 'mt-7' })}>
              See all features
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-navy-50/40">
        <Reveal>
          <StatsStrip />
        </Reveal>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Our values"
          title="How we think about our product"
          description="Principles that guide what we build and how we support the businesses that rely on us."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-electric-50 to-violet-50 text-electric-600 ring-1 ring-inset ring-electric-100">
                <value.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-950">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">{value.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
