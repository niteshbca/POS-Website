import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { cx } from '@/lib/cx';

export interface LogoProps {
  className?: string;
  tone?: 'light' | 'dark';
  withWordmark?: boolean;
}

export function Logo({ className, tone = 'light', withWordmark = true }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label={`${site.brand.name} home`}
      className={cx('group inline-flex items-center gap-2.5', className)}
    >
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-electric-600 to-violet-600 shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M6 19V5l12 14V5"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {withWordmark ? (
        <span className="flex flex-col leading-none">
          <span
            className={cx(
              'font-display text-lg font-extrabold tracking-tight',
              tone === 'dark' ? 'text-white' : 'text-navy-950',
            )}
          >
            NiteshPro
          </span>
          <span
            className={cx(
              'text-[10px] font-semibold uppercase tracking-[0.22em]',
              tone === 'dark' ? 'text-electric-300' : 'text-electric-600',
            )}
          >
            POS
          </span>
        </span>
      ) : null}
    </Link>
  );
}
