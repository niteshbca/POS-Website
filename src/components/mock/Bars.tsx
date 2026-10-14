import { cx } from '@/lib/cx';

export interface BarDatum {
  label: string;
  value: number;
  highlight?: boolean;
}

export function Bars({ data, className }: { data: BarDatum[]; className?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cx('flex h-full items-end gap-2 sm:gap-3', className)}>
      {data.map((datum, index) => {
        const heightPct = Math.max(6, Math.round((datum.value / max) * 100));
        return (
          <div key={datum.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div className="relative flex h-full w-full items-end">
              <div
                className={cx(
                  'w-full origin-bottom animate-grow-bar rounded-t-md',
                  datum.highlight
                    ? 'bg-gradient-to-t from-electric-600 to-violet-500'
                    : 'bg-gradient-to-t from-navy-200 to-navy-100',
                )}
                style={{ height: `${heightPct}%`, animationDelay: `${index * 70}ms` }}
                role="presentation"
              />
            </div>
            <span className="text-[10px] font-medium text-navy-400">{datum.label}</span>
          </div>
        );
      })}
    </div>
  );
}
