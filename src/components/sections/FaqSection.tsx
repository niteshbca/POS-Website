import { Link } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { faqs } from '@/data/content';
import { site, telHref } from '@/config/site';
import { Accordion } from '@/components/ui/Accordion';
import { buttonClasses } from '@/components/ui/button';
import { useWhatsAppModal } from '@/components/whatsapp/WhatsAppWidget';

export function FaqSection() {
  const { openModal } = useWhatsAppModal();

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
      <div className="lg:sticky lg:top-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric-600">FAQ</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950">
          Questions, answered
        </h2>
        <p className="mt-3 text-navy-500">
          Can’t find what you’re looking for? Our team is one message away.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={openModal}
            className={buttonClasses({ variant: 'whatsapp', size: 'md' })}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Chat on WhatsApp
          </button>
          <a href={telHref()} className={buttonClasses({ variant: 'outline', size: 'md' })}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.contact.phoneDisplay}
          </a>
          <Link to="/contact" className="link-underline text-sm">
            Send us a message
          </Link>
        </div>
      </div>

      <Accordion items={faqs} defaultOpenId="faq-setup" />
    </div>
  );
}
