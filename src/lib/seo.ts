import { useEffect } from 'react';
import { site } from '@/config/site';

export interface SeoOptions {
  title: string;
  description: string;
  /** Path beginning with `/`, used to build the canonical URL. */
  path: string;
  image?: string;
  noIndex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Keeps document metadata in sync with the active route. Intended to be called
 * from a layout/page component.
 */
export function useSeo({ title, description, path, image, noIndex }: SeoOptions): void {
  useEffect(() => {
    const base = site.brand.domain.replace(/\/$/, '');
    const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
    const ogImage = image ?? `${base}/og-image.svg`;
    const fullTitle = title.includes(site.brand.name) ? title : `${title} | ${site.brand.name}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    upsertLink('canonical', url);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', site.brand.name);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
  }, [title, description, path, image, noIndex]);
}
