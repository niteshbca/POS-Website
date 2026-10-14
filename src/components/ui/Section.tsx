import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Container } from './Container';

export interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Removes the standard vertical padding when you need full control. */
  bare?: boolean;
}

export function Section({ children, id, className, containerClassName, bare }: SectionProps) {
  return (
    <section id={id} className={cx(!bare && 'py-20 sm:py-28', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
