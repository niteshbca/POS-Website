import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cx(
            'mb-3 text-xs font-semibold uppercase tracking-[0.18em]',
            tone === 'dark' ? 'text-electric-300' : 'text-electric-600',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cx(
          'text-3xl font-bold tracking-tight sm:text-4xl',
          tone === 'dark' ? 'text-white' : 'text-navy-950',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cx(
            'mt-4 text-base leading-relaxed sm:text-lg',
            tone === 'dark' ? 'text-navy-200' : 'text-navy-500',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
