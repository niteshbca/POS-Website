import { Check } from 'lucide-react';
import { DashboardMock } from '@/components/mock/DashboardMock';
import { cx } from '@/lib/cx';

export interface DashboardShowcaseProps {
  eyebrow?: string;
  title: string;
  description: string;
  bullets: string[];
  reverse?: boolean;
  className?: string;
}

export function DashboardShowcase({
  eyebrow = 'Live product preview',
  title,
  description,
  bullets,
  reverse,
  className,
}: DashboardShowcaseProps) {
  return (
    <div className={cx('grid items-center gap-12 lg:grid-cols-2', className)}>
      <div className={cx(reverse && 'lg:order-2')}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric-600">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-relaxed text-navy-500 sm:text-lg">{description}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-sm text-navy-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric-600" aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      <div className={cx(reverse && 'lg:order-1')}>
        <DashboardMock />
      </div>
    </div>
  );
}
