/**
 * Central site configuration.
 *
 * Everything a business owner needs to change lives here (or in a `.env` file).
 * Values that are still placeholders are clearly marked with `TODO`. Nothing in
 * this file should ever contain a private secret — only `VITE_*` environment
 * values are safe to expose to the browser.
 */

const env = import.meta.env;

/** Read an env value, falling back to a documented placeholder. */
function envValue(value: string | undefined, fallback: string): string {
  const trimmed = (value ?? '').trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export interface SocialLink {
  label: string;
  /** Leave empty until the real profile exists. Empty links render disabled. */
  url: string;
  /** Key used to pick an icon in the footer. */
  icon: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'github';
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  /** Monthly price in the base currency. Use `null` for "contact us". */
  monthly: number | null;
  /** Annual price per month (billed yearly). Use `null` for "contact us". */
  annualPerMonth: number | null;
  currency: string;
  highlight?: boolean;
  badge?: string;
  cta: { label: string; to: string };
  limitations?: string;
  features: string[];
}

export const site = {
  brand: {
    name: 'NiteshPro POS',
    shortName: 'NiteshPro',
    product: 'POS Software, Billing, Inventory & Business Management',
    company: 'NiteshPro Software Solutions',
    tagline: 'NiteshPro POS Software - Billing, Inventory, CRM, GST & Business Management',
    domain: envValue(env.VITE_SITE_URL, 'https://www.niteshpro.com'),
  },

  contact: {
    /** Human readable phone shown on the page. */
    phoneDisplay: envValue(env.VITE_CONTACT_PHONE, '+91 88107 51872'),
    /** Phone in E.164 format used for the `tel:` link. */
    phoneE164: envValue(env.VITE_CONTACT_PHONE, '+918810751872').replace(/[^\d+]/g, ''),
    /** Support / sales email. */
    email: envValue(env.VITE_CONTACT_EMAIL, 'nitesh@niteshpro.in'),
    /** WhatsApp number in full international format, digits only. */
    whatsappNumber: envValue(env.VITE_CONTACT_WHATSAPP, '918810751872').replace(/\D/g, ''),
    /** Prefilled WhatsApp message used by direct `wa.me` links. */
    whatsappMessage: envValue(
      env.VITE_WHATSAPP_MESSAGE,
      [
        'Hello NiteshPro POS team,',
        '',
        'I would like to know more about your NiteshPro POS Software.',
        '',
        'Please share:',
        '- Pricing and plans',
        '- A demo slot',
        '- Setup details for my business',
        '',
        'Thank you!',
      ].join('\n'),
    ),
    /**
     * Template used by the WhatsApp enquiry form. `{{placeholders}}` are
     * replaced with the values the visitor enters (name, mobile, etc.).
     */
    whatsappTemplate: envValue(
      env.VITE_WHATSAPP_TEMPLATE,
      [
        'New enquiry from the NiteshPro POS Website',
        '',
        'Name: {{name}}',
        'Mobile: {{mobile}}',
        'Business type: {{businessType}}',
        'Looking for: {{requirement}}',
        'City: {{city}}',
        'Message: {{message}}',
        '',
        'Please share pricing and a demo slot for me.',
      ].join('\n'),
    ),
    /** Office / registered address. */
    address: envValue(env.VITE_COMPANY_ADDRESS, 'Office Address, City, State, India'),
    /** Business hours. */
    hours: 'Mon - Sat, 10:00 AM - 07:00 PM (IST)',
  },

  /**
   * Social profiles. Empty `url` values are rendered as disabled placeholders so
   * the site never links to a page that does not exist yet.
   */
  social: [
    { label: 'LinkedIn', url: '', icon: 'linkedin' },
    { label: 'X (Twitter)', url: '', icon: 'twitter' },
    { label: 'Facebook', url: '', icon: 'facebook' },
    { label: 'Instagram', url: '', icon: 'instagram' },
    { label: 'YouTube', url: '', icon: 'youtube' },
  ] as SocialLink[],

  /**
   * Social proof. IMPORTANT: every value below is a PLACEHOLDER for you to
   * replace with your real figures and client names. The UI labels them as
   * placeholders so nothing fabricated is presented as fact.
   */
  socialProof: {
    stats: [
      { value: '500+', label: 'Businesses onboarded' },
      { value: '25+', label: 'Cities served' },
      { value: '2M+', label: 'Invoices processed' },
      { value: '4.9/5', label: 'Customer Rating' },
    ],
    /** Our Happy Clients */
    clients: [
      'Shri Ram Grocery Store',
      'Krishna General Store',
      'Royal Garments',
      'New Star Medical Store',
      'City Mart Supermarket',
      'Jain Electronics',
      'Green Valley Restaurant',
      'Mahaveer Wholesale',
      'Fashion Hub',
      'Aashirwad Bakery',
    ] as string[],
  },

  /**
   * Indicative pricing. TODO: confirm final commercial pricing with the team
   * before publishing. Prices are shown as examples, not a binding offer.
   */
  pricing: {
    currency: 'INR',
    currencySymbol: '₹',
    /** Also show USD equivalents in the pricing UI. */
    showUsdApprox: true,
    annualDiscountLabel: 'Save 2 months',
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        tagline: 'For a single shop getting organised.',
        monthly: 999,
        annualPerMonth: 832,
        currency: 'INR',
        cta: { label: 'Get Started', to: '/get-started' },
        features: [
          '1 store, 1 billing counter',
          'Barcode billing & receipt printing',
          'Product & stock management',
          'Customer records',
          'Daily sales & expense reports',
          'Email support',
        ],
      },
      {
        id: 'growth',
        name: 'Growth',
        tagline: 'For growing shops with a real team.',
        monthly: 2499,
        annualPerMonth: 2082,
        currency: 'INR',
        highlight: true,
        badge: 'Most popular',
        cta: { label: 'Get Started', to: '/get-started' },
        features: [
          'Up to 3 stores & unlimited staff logins',
          'GST-ready invoicing & returns',
          'Suppliers, purchase orders & low-stock alerts',
          'Staff roles & permissions',
          'Discounts, loyalty & WhatsApp receipts',
          'Priority chat support',
        ],
      },
      {
        id: 'business',
        name: 'Business',
        tagline: 'For multi-branch operations.',
        monthly: 5999,
        annualPerMonth: 4999,
        currency: 'INR',
        cta: { label: 'Get Started', to: '/get-started' },
        features: [
          'Unlimited stores & counters',
          'Multi-branch consolidated reporting',
          'Advanced analytics & exportable reports',
          'Warehouse / central stock transfers',
          'API access & priority onboarding',
          'Dedicated account manager',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        tagline: 'For chains with custom needs.',
        monthly: null,
        annualPerMonth: null,
        currency: 'INR',
        limitations: 'Custom scope, SLA and security review',
        cta: { label: 'Talk to Sales', to: '/contact' },
        features: [
          'Everything in Business',
          'Custom integrations & data migration',
          'On-premise / private cloud options',
          'Role-based SSO discussion',
          'Training & change management',
          'Custom SLA',
        ],
      },
    ] as PricingPlan[],
  },

  nav: [
    { label: 'Features', to: '/features' },
    { label: 'Solutions', to: '/solutions' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Integrations', to: '/integrations' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],

  footer: {
    product: [
      { label: 'Features', to: '/features' },
      { label: 'Solutions', to: '/solutions' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Integrations', to: '/integrations' },
      { label: 'Book a Demo', to: '/book-demo' },
    ],
    company: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Get Started', to: '/get-started' },
      { label: 'Login', to: '/login' },
    ],
    legal: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Security', to: '/security' },
    ],
  },
} as const;

/* ------------------------------- Link helpers ------------------------------ */

export function telHref(phone: string = site.contact.phoneE164): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function mailtoHref(
  email: string = site.contact.email,
  subject?: string,
  body?: string,
): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${email}${query ? `?${query}` : ''}`;
}

export function whatsappHref(
  message: string = site.contact.whatsappMessage,
  number: string = site.contact.whatsappNumber,
): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

export function isConfiguredUrl(url: string): boolean {
  return typeof url === 'string' && url.trim().length > 0 && url.trim() !== '#';
}

export type Site = typeof site;
