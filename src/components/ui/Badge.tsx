import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

export interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: 'light' | 'dark' | 'violet';
}

export function Badge({ children, className, tone = 'light' }: BadgeProps) {
  const tones = {
    light: 'border-electric-100 bg-electric-50 text-electric-700',
    violet: 'border-violet-100 bg-violet-50 text-violet-700',
    dark: 'border-white/15 bg-white/10 text-white/90',
  } as const;

  return (
    <span
      className={cx(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
