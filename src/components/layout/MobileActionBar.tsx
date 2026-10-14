import { Link } from 'react-router-dom';
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { site, telHref } from '@/config/site';
import { useWhatsAppModal } from '@/components/whatsapp/WhatsAppWidget';

/**
 * Sticky bottom action bar shown on phones: call, WhatsApp (opens the enquiry
 * form) and book-a-demo. Common on Indian business websites.
 */
export function MobileActionBar() {
  const { openModal } = useWhatsAppModal();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-3 divide-x divide-navy-100">
        <a
          href={telHref()}
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-navy-700 transition active:bg-navy-50"
        >
          <Phone className="h-5 w-5 text-electric-600" aria-hidden="true" />
          Call
        </a>
        <button
          type="button"
          onClick={openModal}
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-navy-700 transition active:bg-navy-50"
        >
          <MessageCircle className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
          WhatsApp
        </button>
        <Link
          to="/book-demo"
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-navy-700 transition active:bg-navy-50"
        >
          <CalendarCheck className="h-5 w-5 text-violet-600" aria-hidden="true" />
          Free Demo
        </Link>
      </div>
      <span className="sr-only">{site.contact.phoneDisplay}</span>
    </div>
  );
}
