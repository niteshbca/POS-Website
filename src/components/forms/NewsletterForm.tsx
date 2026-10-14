import { useRef, type FormEvent } from 'react';
import { Mail, Send } from 'lucide-react';
import { fallbackMailto, fallbackWhatsapp } from '@/lib/api';
import { useFormSubmit } from '@/lib/useFormSubmit';
import { useValidatedForm } from '@/lib/useValidatedForm';
import { email as emailRule, required } from '@/lib/validation';
import { buttonClasses } from '@/components/ui/button';
import { cx } from '@/lib/cx';

const ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT;

type NewsletterFields = { email: string };
const initialValues: NewsletterFields = { email: '' };

export function NewsletterForm({ className }: { className?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useValidatedForm(initialValues, {
    email: [required('Email'), emailRule()],
  });
  const { status, message, fallbackLinks, submit } = useFormSubmit<Record<string, unknown>>({
    endpoint: ENDPOINT,
    formName: 'newsletter',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.validateAll()) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }
    const data = { ...form.values, source: 'website-newsletter', submittedAt: new Date().toISOString() };
    await submit(data, (value) => ({
      mailto: fallbackMailto('Newsletter signup - NiteshPro POS', value),
      whatsapp: fallbackWhatsapp('Newsletter signup:', value),
    }));
  };

  const submitting = status === 'submitting';
  const success = status === 'success';

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" aria-hidden="true" />
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            ref={inputRef}
            id="newsletter-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.values.email}
            onChange={(e) => form.setField('email', e.target.value)}
            onBlur={() => form.handleBlur('email')}
            aria-invalid={form.errors.email ? true : undefined}
            aria-describedby={form.errors.email ? 'newsletter-email-error' : undefined}
            className={cx(
              'h-12 w-full rounded-full border bg-white pl-11 pr-4 text-sm text-navy-900 shadow-sm transition placeholder:text-navy-300 focus:outline-none focus:ring-4',
              form.errors.email
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                : 'border-navy-200 focus:border-electric-400 focus:ring-electric-100',
            )}
          />
        </div>
        <button
          type="submit"
          disabled={submitting || success}
          className={buttonClasses({ variant: 'primary', size: 'md', className: 'h-12 shrink-0 px-6' })}
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              Subscribing...
            </>
          ) : success ? (
            'Subscribed'
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Subscribe
            </>
          )}
        </button>
      </form>

      {form.errors.email ? (
        <p id="newsletter-email-error" role="alert" className="mt-2 text-xs font-medium text-red-600">
          {form.errors.email}
        </p>
      ) : null}

      {status === 'success' ? (
        <p role="status" className="mt-2 text-xs font-medium text-emerald-700">
          {message}
        </p>
      ) : null}

      {status === 'error' ? (
        <p role="alert" className="mt-2 text-xs font-medium text-red-600">
          {message}
        </p>
      ) : null}

      {status === 'needsFallback' && fallbackLinks ? (
        <p className="mt-2 text-xs text-navy-500">
          No newsletter backend configured.{' '}
          <a href={fallbackLinks.mailto} className="font-semibold text-electric-600 underline">
            Subscribe by email
          </a>{' '}
          or{' '}
          <a href={fallbackLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-electric-600 underline">
            WhatsApp us
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
