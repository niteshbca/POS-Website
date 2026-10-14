import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { FeatureItem } from '@/data/content';
import { cx } from '@/lib/cx';

export interface FeatureCardsProps {
  items: FeatureItem[];
  columns?: 2 | 3;
  className?: string;
}

export function FeatureCards({ items, columns = 3, className }: FeatureCardsProps) {
  return (
    <div
      className={cx(
        'grid gap-5 sm:grid-cols-2',
        columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2',
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-electric-200 hover:shadow-card"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-electric-50 to-violet-50 text-electric-600 ring-1 ring-inset ring-electric-100 transition group-hover:from-electric-600 group-hover:to-violet-600 group-hover:text-white">
            <item.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-base font-bold text-navy-950">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-500">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function FeatureGroupHeader({
  id,
  title,
  blurb,
  action,
}: {
  id: string;
  title: string;
  blurb: string;
  action?: { label: string; to: string };
}) {
  return (
    <div id={id} className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">{title}</h2>
        <p className="mt-2 text-navy-500">{blurb}</p>
      </div>
      {action ? (
        <Link to={action.to} className="link-underline shrink-0 text-sm">
          {action.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
