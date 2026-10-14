import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { cx } from '@/lib/cx';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
