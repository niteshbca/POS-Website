import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { solutions } from '@/data/content';
import { cx } from '@/lib/cx';
import { buttonClasses } from '@/components/ui/button';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { PageHero } from '@/components/sections/PageHero';
import { BusinessTypes } from '@/components/sections/BusinessTypes';
import { DashboardShowcase } from '@/components/sections/DashboardShowcase';
import { CtaSection } from '@/components/sections/CtaSection';

export function Solutions() {
  useSeo({
    title: 'Solutions',
    description:
      'NiteshPro POS Software Solutions - Best POS for Retail, Grocery, Pharmacy, Restaurant, Garments, Wholesale & Multi-Branch Businesses.',
    path: '/solutions',
  });

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="POS software shaped around your business"
        description="Whatever you sell and however many stores you run, NiteshPro POS adapts to your workflow — not the other way around."
        actions={
          <>
            <Link to="/book-demo" className={buttonClasses({ variant: 'primary', size: 'lg' })}>
              Book a Demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className={buttonClasses({ variant: 'outline', size: 'lg' })}>
              Talk to Sales
            </Link>
          </>
        }
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution) => (
            <a
              key={solution.id}
              href={`#${solution.id}`}
              className="flex items-center gap-3 rounded-xl border border-navy-100 bg-white p-4 text-sm font-semibold text-navy-700 shadow-soft transition hover:border-electric-300 hover:text-electric-700"
            >
              <solution.icon className="h-5 w-5 text-electric-600" aria-hidden="true" />
              {solution.name}
            </a>
          ))}
        </div>
      </Section>

      <Section className="bg-navy-50/40">
        <SectionHeading
          eyebrow="Who is it for"
          title="Which businesses use NiteshPro POS"
          description="From a single kirana counter to a multi-city chain — here is how businesses like yours benefit."
        />
        <Reveal className="mt-12">
          <BusinessTypes />
        </Reveal>
      </Section>

      {solutions.map((solution, index) => (
        <Section
          key={solution.id}
          id={solution.id}
          className={cx('scroll-mt-20', index % 2 === 1 ? 'bg-navy-50/40' : undefined)}
        >
          <div className={cx('grid items-center gap-10 lg:grid-cols-2', index % 2 === 1 && 'lg:[&>*:first-child]:order-2')}>
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-electric-600 to-violet-600 text-white shadow-glow">
                <solution.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
                {solution.name}
              </h2>
              <p className="mt-3 text-navy-500 sm:text-lg">{solution.summary}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {solution.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-navy-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric-600" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/book-demo" className={buttonClasses({ variant: 'primary', size: 'md' })}>
                  See it in a demo
                </Link>
                <Link to="/pricing" className={buttonClasses({ variant: 'ghost', size: 'md' })}>
                  View pricing
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                Typical setup
              </p>
              <ul className="mt-4 space-y-4">
                {solution.points.map((point, pointIndex) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-electric-50 text-[11px] font-bold text-electric-700">
                      {pointIndex + 1}
                    </span>
                    <span className="text-sm text-navy-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ))}

      <Section className="bg-navy-50/40">
        <Reveal>
          <DashboardShowcase
            title="One dashboard, tailored to your industry"
            description="The same powerful platform, configured for the way your business sells. Set up tax rules, categories, units and roles once — then roll it out to every counter."
            bullets={[
              'Configurable tax & invoice formats',
              'Category & unit setup',
              'Role-based staff access',
              'Store-specific pricing',
              'Consolidated head-office view',
              'Fast onboarding support',
            ]}
          />
        </Reveal>
      </Section>

      <CtaSection />
    </>
  );
}
