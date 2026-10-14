import { Link } from 'react-router-dom';
import {
  Clock,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { isConfiguredUrl, mailtoHref, site, telHref } from '@/config/site';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { Logo } from '@/components/ui/Logo';
import { useWhatsAppModal } from '@/components/whatsapp/WhatsAppWidget';

const socialIcons: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  github: Github,
};

export function Footer() {
  const year = new Date().getFullYear();
  const { openModal } = useWhatsAppModal();

  return (
    <footer className="border-t border-navy-100 bg-navy-950 text-navy-200">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-300">
              {site.brand.name} is a modern Point of Sale and business management platform by{' '}
              {site.brand.company} for retail, hospitality and multi-branch businesses.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a href={telHref()} className="flex items-center gap-3 text-navy-200 transition hover:text-white">
                <Phone className="h-4 w-4 text-electric-400" aria-hidden="true" />
                {site.contact.phoneDisplay}
              </a>
              <a href={mailtoHref()} className="flex items-center gap-3 text-navy-200 transition hover:text-white">
                <Mail className="h-4 w-4 text-electric-400" aria-hidden="true" />
                {site.contact.email}
              </a>
              <button
                type="button"
                onClick={openModal}
                className="flex items-center gap-3 text-navy-200 transition hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                Chat on WhatsApp
              </button>
              <p className="flex items-start gap-3 text-navy-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric-400" aria-hidden="true" />
                {site.contact.address}
              </p>
              <p className="flex items-center gap-3 text-navy-300">
                <Clock className="h-4 w-4 text-electric-400" aria-hidden="true" />
                {site.contact.hours}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <FooterColumn title="Product" links={site.footer.product} />
            <FooterColumn title="Company" links={site.footer.company} />
            <FooterColumn title="Legal" links={site.footer.legal} />
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white">Product updates</h3>
            <p className="mt-3 text-sm text-navy-300">
              Get updates on NiteshPro POS Software - Billing, Inventory &amp; Business Tips.
            </p>
            <NewsletterForm className="mt-4" />

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-white">Follow us</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.social.map((social) => {
                  const Icon = socialIcons[social.icon] ?? MessageCircle;
                  const configured = isConfiguredUrl(social.url);
                  return (
                    <li key={social.label}>
                      {configured ? (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-navy-200 transition hover:border-electric-400 hover:text-white"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </a>
                      ) : (
                        <span
                          title={`${social.label} link not configured yet`}
                          aria-label={`${social.label} (link not configured)`}
                          className="grid h-9 w-9 cursor-not-allowed place-items-center rounded-full border border-white/10 text-navy-500"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3 text-xs text-navy-500">
                Social links are placeholders until you add real profile URLs in the site config.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-navy-400">
            &copy; {year} {site.brand.company}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-navy-400">
            <Link to="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition hover:text-white">
              Terms of Service
            </Link>
            <Link to="/security" className="transition hover:text-white">
              Security
            </Link>
            <Link to="/contact" className="transition hover:text-white">
              Support
            </Link>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-navy-500">
          Company details, pricing, contact information and social profiles on this site are configurable
          placeholders. Replace them with your real business information before launch. Integration
          availability, product capabilities and pricing are indicative and should be confirmed with the
          {` ${site.brand.company} `}team.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; to: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-navy-300 transition hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
