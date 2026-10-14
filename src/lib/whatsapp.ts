import { site } from '@/config/site';

export type WhatsappFields = Record<string, string>;

/**
 * Fills a WhatsApp message template. `{{key}}` tokens are replaced with the
 * matching field value; missing or empty values become an em dash so the
 * message stays clean and never shows raw placeholders.
 */
export function buildWhatsappMessage(template: string, fields: WhatsappFields): string {
  return template
    .replace(/\{\{(\w+)\}\}/g, (_match, key: string) => {
      const value = fields[key];
      return value && value.trim().length > 0 ? value.trim() : '—';
    })
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

/** Builds a `wa.me` URL for an already-composed message. */
export function whatsappUrlForMessage(
  message: string,
  number: string = site.contact.whatsappNumber,
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp in a new tab. Returns false if the popup was blocked. */
export function openWhatsapp(message: string, number?: string): boolean {
  const url = whatsappUrlForMessage(message, number);
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  return win !== null;
}
