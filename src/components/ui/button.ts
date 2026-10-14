import { cx } from '@/lib/cx';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'subtle'
  | 'whatsapp'
  | 'white';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const base =
  'inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-electric-600 to-violet-600 text-white shadow-glow hover:from-electric-500 hover:to-violet-500 hover:-translate-y-0.5 active:translate-y-0',
  secondary: 'bg-navy-950 text-white hover:bg-navy-800 hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'border border-navy-200 bg-white text-navy-900 hover:border-electric-400 hover:text-electric-700 hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-navy-700 hover:bg-navy-50 hover:text-navy-950',
  subtle: 'bg-electric-50 text-electric-700 hover:bg-electric-100',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1ebe5a] hover:-translate-y-0.5 active:translate-y-0',
  white: 'bg-white text-navy-950 hover:bg-navy-50 hover:-translate-y-0.5 active:translate-y-0',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
  icon: 'h-11 w-11 p-0',
};

export interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: ButtonClassOptions = {}): string {
  return cx(base, variants[variant], sizes[size], fullWidth && 'w-full', className);
}
