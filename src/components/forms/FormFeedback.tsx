import { CheckCircle2, Info, Mail, MessageCircle, XCircle } from 'lucide-react';
import { buttonClasses } from '@/components/ui/button';
import type { FallbackLinks, SubmitStatus } from '@/lib/useFormSubmit';
import { cx } from '@/lib/cx';

export interface FormFeedbackProps {
  status: SubmitStatus;
  message: string;
  fallbackLinks: FallbackLinks | null;
  /** Name of the env variable that enables server-side submission. */
  endpointEnvKey: string;
  className?: string;
}

export function FormFeedback({
  status,
  message,
  fallbackLinks,
  endpointEnvKey,
  className,
}: FormFeedbackProps) {
  if (status === 'idle' || status === 'submitting') return null;

  if (status === 'success') {
    return (
      <div
        role="status"
        className={cx(
          'flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800',
          className,
        )}
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p>{message}</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        role="alert"
        className={cx(
          'flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800',
          className,
        )}
      >
        <XCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p>{message}</p>
      </div>
    );
  }

  // needsFallback
  return (
    <div
      role="status"
      className={cx('rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900', className)}
    >
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div className="space-y-3">
          <p>{message}</p>
          <div className="flex flex-wrap gap-2">
            {fallbackLinks ? (
              <>
                <a href={fallbackLinks.whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant: 'whatsapp', size: 'sm' })}>
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Send on WhatsApp
                </a>
                <a href={fallbackLinks.mailto} className={buttonClasses({ variant: 'outline', size: 'sm' })}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Send by email
                </a>
              </>
            ) : null}
          </div>
          <p className="text-xs text-amber-800/80">
            Developer note: set <code className="rounded bg-amber-100 px-1 py-0.5 font-mono">{endpointEnvKey}</code>{' '}
            to POST submissions to your backend.
          </p>
        </div>
      </div>
    </div>
  );
}
