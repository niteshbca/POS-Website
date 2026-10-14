import type { ElementType, ReactNode } from 'react';
import { cx } from '@/lib/cx';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cx('mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8', className)}>{children}</Tag>
  );
}
