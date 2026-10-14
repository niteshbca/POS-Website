import { useCallback, useState } from 'react';
import { EndpointNotConfiguredError, postJson, SubmissionError, type Json } from './api';

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error' | 'needsFallback';

export interface FallbackLinks {
  mailto: string;
  whatsapp: string;
}

export interface UseFormSubmitOptions {
  /** Backend endpoint. When empty, submissions fall back to email / WhatsApp. */
  endpoint?: string;
  /** Human readable form name used in messages. */
  formName: string;
}

/**
 * Handles a single form submission. Never reports success unless a real
 * backend accepted the data; when no endpoint is configured it returns
 * `needsFallback` and the prefilled email / WhatsApp links to hand off.
 */
export function useFormSubmit<T extends Json>({ endpoint, formName }: UseFormSubmitOptions) {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState('');
  const [fallbackLinks, setFallbackLinks] = useState<FallbackLinks | null>(null);

  const submit = useCallback(
    async (data: T, buildFallback: (payload: T) => FallbackLinks): Promise<boolean> => {
      setFallbackLinks(null);
      setMessage('');
      setStatus('submitting');
      try {
        if (!endpoint) throw new EndpointNotConfiguredError(formName);
        await postJson(endpoint, data);
        setStatus('success');
        setMessage('Thank you. Your details were received and our team will get back to you shortly.');
        return true;
      } catch (error) {
        if (error instanceof EndpointNotConfiguredError) {
          setFallbackLinks(buildFallback(data));
          setStatus('needsFallback');
          setMessage(
            'This site is not connected to a form backend yet. Pick an option below to send your details directly to our team.',
          );
          return false;
        }
        setStatus('error');
        setMessage(
          error instanceof SubmissionError
            ? error.message
            : 'Something went wrong while submitting. Please try again.',
        );
        return false;
      }
    },
    [endpoint, formName],
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setMessage('');
    setFallbackLinks(null);
  }, []);

  return { status, message, fallbackLinks, submit, reset } as const;
}
