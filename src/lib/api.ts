import { mailtoHref, site, whatsappHref } from '@/config/site';

/**
 * Thrown when a form has no backend endpoint configured. The UI catches this and
 * offers an honest fallback (prefilled email / WhatsApp) instead of pretending
 * the submission succeeded.
 */
export class EndpointNotConfiguredError extends Error {
  constructor(public readonly formName: string) {
    super(`No backend endpoint is configured for the "${formName}" form.`);
    this.name = 'EndpointNotConfiguredError';
  }
}

export class SubmissionError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = 'SubmissionError';
  }
}

export type Json = Record<string, unknown>;

/**
 * Posts JSON to a configured endpoint with a timeout. Returns the parsed JSON
 * body when the server responds with one, otherwise `undefined`.
 */
export async function postJson<T extends Json>(
  endpoint: string,
  data: T,
  { timeoutMs = 15000 }: { timeoutMs?: number } = {},
): Promise<unknown> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    if (!response.ok) {
      let detail = '';
      try {
        const body = await response.json();
        detail = typeof body?.message === 'string' ? body.message : '';
      } catch {
        /* response had no JSON body */
      }
      throw new SubmissionError(
        detail || `The server responded with status ${response.status}.`,
        response.status,
      );
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      return response.json();
    }
    return undefined;
  } catch (error) {
    if (error instanceof SubmissionError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new SubmissionError('The request timed out. Please check your connection and try again.');
    }
    throw new SubmissionError(
      'We could not reach the server. Please check your connection and try again.',
    );
  } finally {
    window.clearTimeout(timer);
  }
}

/** Serialises form fields into a readable plain-text block for email/WhatsApp. */
export function fieldsToText(fields: Json): string {
  return Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
    .map(([key, value]) => `${prettifyKey(key)}: ${String(value)}`)
    .join('\n');
}

function prettifyKey(key: string): string {
  return key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^\w/, (c) => c.toUpperCase());
}

/** Builds a `mailto:` link prefilled with the given subject and form fields. */
export function fallbackMailto(subject: string, fields: Json): string {
  return mailtoHref(site.contact.email, subject, fieldsToText(fields));
}

/** Builds a `wa.me` link prefilled with the given intro and form fields. */
export function fallbackWhatsapp(intro: string, fields: Json): string {
  return whatsappHref(`${intro}\n\n${fieldsToText(fields)}`);
}
