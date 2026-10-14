import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Info } from 'lucide-react';
import { site } from '@/config/site';
import { cx } from '@/lib/cx';
import { buttonClasses } from '@/components/ui/button';

const INR_PER_USD = 83;

function formatPrice(amount: number | null, currency: string): string {
  if (amount === null) return 'Custom';
  const symbol = currency === 'INR' ? '₹' : '$';
  return `${symbol}${amount.toLocaleString('en-IN')}`;
}

export function PricingCards({ showNote = true }: { showNote?: boolean }) {
  const [annual, setAnnual] = useState(false);
  const { plans, currency, annualDiscountLabel, showUsdApprox } = site.pricing;

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex items-center rounded-full border border-navy-200 bg-white p-1 shadow-soft"
        >
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={cx(
              'rounded-full px-5 py-2 text-sm font-semibold transition',
              !annual ? 'bg-navy-950 text-white' : 'text-navy-600 hover:text-navy-900',
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={cx(
              'flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition',
              annual ? 'bg-navy-950 text-white' : 'text-navy-600 hover:text-navy-900',
            )}
          >
            Annual
            <span className={cx('rounded-full px-2 py-0.5 text-[10px] font-bold', annual ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-700')}>
              {annualDiscountLabel}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-4">
        {plans.map((plan) => {
          const amount = annual ? plan.annualPerMonth : plan.monthly;
          const usdApprox =
            showUsdApprox && amount !== null && plan.currency === 'INR'
              ? Math.round(amount / INR_PER_USD)
              : null;

          return (
            <div
              key={plan.id}
              className={cx(
                'relative flex flex-col rounded-2xl border bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card',
                plan.highlight ? 'border-electric-300 ring-1 ring-electric-200' : 'border-navy-100',
              )}
            >
              {plan.highlight && plan.badge ? (
                <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-electric-600 to-violet-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {plan.badge}
                </span>
              ) : null}

              <div>
                <h3 className="text-lg font-bold text-navy-950">{plan.name}</h3>
                <p className="mt-1 text-sm text-navy-500">{plan.tagline}</p>
              </div>

              <div className="mt-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-navy-950">
                    {formatPrice(amount, currency)}
                  </span>
                  {amount !== null ? <span className="text-sm text-navy-400">/mo</span> : null}
                </div>
                {usdApprox !== null ? (
                  <p className="mt-1 text-xs text-navy-400">≈ ${usdApprox}/mo (approx.)</p>
                ) : null}
                {plan.limitations ? <p className="mt-1 text-xs text-navy-400">{plan.limitations}</p> : null}
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-navy-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.cta.to}
                className={buttonClasses({
                  variant: plan.highlight ? 'primary' : 'outline',
                  size: 'md',
                  fullWidth: true,
                  className: 'mt-6',
                })}
              >
                {plan.cta.label}
              </Link>
            </div>
          );
        })}
      </div>

      {showNote ? (
        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-xl border border-navy-100 bg-navy-50/60 p-4 text-xs text-navy-500">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-electric-600" aria-hidden="true" />
          <p>
            Prices shown are indicative placeholder examples and are not a binding offer. Taxes may apply.
            Final pricing depends on your stores, counters and modules. Contact us for a formal quote.
          </p>
        </div>
      ) : null}
    </div>
  );
}
