import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cx } from '@/lib/cx';

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple panels open at once. */
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, defaultOpenId, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (allowMultiple) {
        return isOpen ? current.filter((value) => value !== id) : [...current, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={cx('divide-y divide-navy-100 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                id={`${item.id}-trigger`}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-navy-50/60 sm:px-6"
              >
                <span className="text-base font-semibold text-navy-900 sm:text-lg">{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cx(
                    'h-5 w-5 shrink-0 text-electric-600 transition-transform duration-300',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-trigger`}
              hidden={!isOpen}
              className="px-5 pb-5 text-sm leading-relaxed text-navy-500 sm:px-6 sm:text-base"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
