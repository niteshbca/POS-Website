import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
}

export function Card({ children, className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cx(
        'rounded-2xl border border-navy-100 bg-white p-6 shadow-soft',
        interactive &&
          'transition duration-300 hover:-translate-y-1 hover:border-electric-200 hover:shadow-card',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
