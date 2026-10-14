# NiteshPro POS — Website

Production-quality marketing website for **NiteshPro POS**, a modern Point of Sale and
business-management platform by **NiteshPro Software Solutions**.

Built with **React + TypeScript + Vite + Tailwind CSS**. Premium white / deep-navy design with
electric-blue and violet accents, real dashboard mockups, functional forms and full responsive
support.

---

## ✨ What's included

| Area | Details |
| --- | --- |
| Pages | Home, Features, Solutions, Pricing, Integrations, About, Contact, Book a Demo, Login, Get Started, Privacy, Terms, Security, 404 |
| Hero | "Run Your Business Smarter with NiteshPro POS" + primary/secondary CTAs |
| Product preview | Interactive-looking POS dashboard (Overview / Billing / Inventory / Analytics tabs) with sample data |
| Feature coverage | Barcode billing, GST-ready invoicing, inventory, low-stock alerts, customers, suppliers, purchase orders, expenses, returns, discounts, staff roles, multi-branch reporting, exportable reports |
| Contact | Click-to-call (`tel:`), email (`mailto:`), WhatsApp (`wa.me`), floating call/WhatsApp buttons, contact form |
| WhatsApp enquiry | Clicking any WhatsApp action opens a modal form (name, mobile, business type, requirement, city, message) that composes a **proper prefilled WhatsApp message** and opens `wa.me` — the visitor can review before sending |
| Mobile action bar | Sticky bottom Call / WhatsApp / Free Demo bar on phones (like most Indian business sites) |
| Social proof | "Trusted by" section with configurable stats + client-logo placeholders, clearly labelled as placeholders |
| Business fit | Plain-language "Who is it for" grid (kirana, garments/footwear/cosmetics, wholesale, electronics/mobile, pharmacy, fashion, restaurants, chains) — shows a client at a glance that the POS fits their shop and what they gain |
| Forms | Contact, Demo booking, Newsletter, Login, Sign-up — validation, loading, success/error feedback, accessible labels |
| Extras | FAQ accordion, trust/security section, integrations section, pricing cards with monthly/annual toggle, testimonials placeholders, newsletter, comprehensive footer, SEO + Open Graph, sitemap/robots |
| A11y & perf | Semantic HTML, keyboard support, skip link, focus rings, reduced-motion support, lazy-loaded routes, code-split bundles |

> **Honesty by design:** testimonials are clearly labelled placeholders, integration availability is
> described as "confirm with us", and no security **certification** is claimed. Every contact
> detail, price and social link is a configurable placeholder.

---

## 🚀 Quick start

**Prerequisites:** Node.js 18.18+ and npm.

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npm run dev        # or: npm start
```

Open **http://localhost:5173** in your browser. That is the local link — there is no hosted URL
until you deploy (see below).

### Other scripts

```bash
npm run build      # type-check + production build into /dist
npm run preview    # preview the production build (http://localhost:4173)
npm run typecheck  # TypeScript type-check only
```

---

## ⚙️ Configuration

Everything a business owner needs to change lives in **`src/config/site.ts`** and can also be driven
by a `.env` file.

### 1. Copy the env template

```bash
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env
```

Then edit `.env`:

```env
VITE_SITE_URL=https://www.niteshpro.com
VITE_CONTACT_PHONE=+91 90000 00000
VITE_CONTACT_EMAIL=hello@niteshpro.com
VITE_CONTACT_WHATSAPP=919000000000          # full international format, digits only
VITE_WHATSAPP_MESSAGE=Hi NiteshPro team, I'd like to know more about NiteshPro POS.
# Optional template for the WhatsApp enquiry form. Leave blank to use the default.
VITE_WHATSAPP_TEMPLATE=
VITE_COMPANY_ADDRESS=Your Business Address, City, State, Country

VITE_CONTACT_ENDPOINT=
VITE_DEMO_ENDPOINT=
VITE_NEWSLETTER_ENDPOINT=
VITE_AUTH_LOGIN_ENDPOINT=
VITE_AUTH_SIGNUP_ENDPOINT=
```

> Set the social links, pricing, plans and nav in `src/config/site.ts` (social URLs default to empty
> so the site never links to a profile that does not exist yet).
>
> **Social proof:** the "Trusted by" stats and client logos come from `site.socialProof` in
> `src/config/site.ts`. Every stat is marked *Placeholder* in the UI. Replace them with your real
> numbers and add `clients: [{ name, logo }]` only once you actually have those clients — never present
> fabricated numbers or logos as real.
>
> **"Who is it for" list:** the business types and their one-line benefits live in the `audiences`
> array in `src/data/content.ts`. Edit the names/benefits there to match the industries you serve.

### 2. WhatsApp / Call / Email behaviour

- **Call** → `tel:` link built from `VITE_CONTACT_PHONE`.
- **Email** → `mailto:` link built from `VITE_CONTACT_EMAIL`.
- **WhatsApp** → `https://wa.me/<number>?text=<prefilled message>` built from
  `VITE_CONTACT_WHATSAPP`.

### WhatsApp enquiry flow (the smart part)

Wherever a visitor clicks WhatsApp (floating button, hero, mobile bar, footer, FAQ, contact,
book-demo) a **modal opens with a short form**:

> Your name · Mobile number · Business type · What do you need? · City · Message

On submit, the app composes a clean message from your template and opens WhatsApp with it **ready to
send** — so you receive a proper enquiry with the visitor's details, not a blank chat.

Customise the message with `VITE_WHATSAPP_TEMPLATE` (or `site.contact.whatsappTemplate` in
`src/config/site.ts`). Supported placeholders:

```
{{name}} {{mobile}} {{businessType}} {{requirement}} {{city}} {{message}}
```

Future-proofing: if you later add a lead-capture backend, hook it into
`src/components/whatsapp/WhatsAppForm.tsx` (look for `handleSubmit`) to store the lead **before**
opening WhatsApp.

---

## 🔌 Forms & required API endpoints

Forms **never fake a success**. A form shows success only when a real endpoint accepts the data.
When the matching `VITE_*_ENDPOINT` is **empty**, the form instead offers an honest fallback: a
prefilled **email** or **WhatsApp** hand-off containing exactly the data the visitor entered.

To make forms submit to your backend, set the endpoints and implement these POST endpoints
(all receive `Content-Type: application/json` and should return `2xx` on success):

| Env variable | Form | Suggested endpoint |
| --- | --- | --- |
| `VITE_CONTACT_ENDPOINT` | Contact page | `POST /api/contact` |
| `VITE_DEMO_ENDPOINT` | Book a Demo | `POST /api/demo` |
| `VITE_NEWSLETTER_ENDPOINT` | Newsletter (footer) | `POST /api/newsletter` |
| `VITE_AUTH_LOGIN_ENDPOINT` | Login | `POST /api/auth/login` |
| `VITE_AUTH_SIGNUP_ENDPOINT` | Get Started | `POST /api/auth/signup` |

### Example payloads

**Contact** (`VITE_CONTACT_ENDPOINT`)

```json
{
  "fullName": "Priya Sharma",
  "email": "priya@example.com",
  "phone": "+91 90000 00000",
  "company": "Sharma Supermart",
  "businessType": "grocery",
  "message": "We run two grocery stores and need GST billing...",
  "consent": true,
  "source": "website-contact-form",
  "page": "/contact",
  "submittedAt": "2026-10-14T10:24:00.000Z"
}
```

**Demo** (`VITE_DEMO_ENDPOINT`)

```json
{
  "fullName": "Rahul Verma",
  "email": "rahul@example.com",
  "phone": "+91 90000 00000",
  "company": "Verma Mart",
  "businessType": "supermarket",
  "city": "Jaipur",
  "branches": "2-3",
  "preferredDate": "2026-10-20",
  "preferredTime": "afternoon",
  "message": "Interested in stock alerts and multi-store reports.",
  "consent": true,
  "source": "website-demo-request",
  "submittedAt": "2026-10-14T10:24:00.000Z"
}
```

**Sign-up** (`VITE_AUTH_SIGNUP_ENDPOINT`) — same shape plus `password`. The password is sent only to
this configured auth endpoint and is **stripped** from any email/WhatsApp fallback.

If your backend returns an error with a JSON body, include a `message` field — it is shown to the
user. Non-2xx responses surface an error; network failures and timeouts (15s) surface a retry
message. Basic spam protection is included via a hidden honeypot field.

---

## 🧱 Project structure

```
src/
├─ config/site.ts          # All placeholders: contact, social, pricing, nav, footer
├─ data/                   # Content: features, solutions, faqs, testimonials, trust, options
├─ lib/                    # api, validation, seo, cx, useFormSubmit, useValidatedForm
├─ hooks/                  # useReveal, useScrolled, useBodyScrollLock
├─ components/
│  ├─ layout/              # Header, MobileNav, Footer, FloatingActions, Layout, ScrollToTop
│  ├─ ui/                  # Button, Card, Container, Section, Badge, Accordion, FormControls…
│  ├─ mock/                # DashboardMock, AreaChart, Bars (real dashboard mockups)
│  ├─ sections/            # Hero, Pricing, Testimonials, Trust, Integrations, FAQ, CTA…
│  └─ forms/               # Contact, Demo, Newsletter, Login, Signup + feedback
└─ pages/                  # One file per route
```

---

## 🌍 Deployment

The build output is a static SPA in `dist/`. Any static host works — just make sure unknown routes
fall back to `index.html` (configs are already included: `vercel.json`, `netlify.toml`,
`public/_redirects`).

### Vercel

1. Push the repo to GitHub/GitLab.
2. Import it in Vercel. Framework preset **Vite** (auto-detected).
3. Build command `npm run build`, output directory `dist`.
4. Add the `VITE_*` environment variables in the Vercel dashboard.
5. Deploy — `vercel.json` handles SPA rewrites and caching.

### Netlify

1. Import the repo. `netlify.toml` sets build command, publish dir and SPA redirects.
2. Add the `VITE_*` environment variables in Site settings → Build & deploy → Environment.
3. Deploy.

### GitHub Pages

1. Set `base` in `vite.config.ts` to your repo path, e.g. `base: '/niteshpro-website/'`.
2. Build (`npm run build`) and publish `dist/` (e.g. via `gh-pages`).
3. For clean URLs, copy `dist/index.html` to `dist/404.html`.

### Manual / any static host

```bash
npm run build
# upload the contents of dist/ to your host
```

---

## 🔐 Security notes

- Only `VITE_*` values are bundled into the browser. **Never** put secrets or private API keys in
  `.env` or frontend code — proxy privileged calls through your own backend.
- `.env` is git-ignored; only `.env.example` is committed.
- Security headers are configured in `vercel.json` / `netlify.toml`.

---

## ✅ Before you launch (checklist)

- [ ] Replace contact phone, email, WhatsApp number and address in `.env` / `src/config/site.ts`.
- [ ] Add real social profile URLs (empty entries render as disabled placeholders).
- [ ] Confirm final pricing and plans.
- [ ] Replace placeholder testimonials with real, permission-based reviews.
- [ ] Review Privacy / Terms / Security pages with a qualified professional.
- [ ] Set the form endpoints and test each submission end-to-end.
- [ ] Update `public/robots.txt` and `public/sitemap.xml` with your real domain.
