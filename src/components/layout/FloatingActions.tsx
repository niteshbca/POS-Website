import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle, Phone } from 'lucide-react';
import { site, telHref } from '@/config/site';
import { cx } from '@/lib/cx';
import { useWhatsAppModal } from '@/components/whatsapp/WhatsAppWidget';

/**
 * Desktop floating contact actions: WhatsApp (opens the enquiry form), a
 * quick call button and back-to-top. On phones the sticky MobileActionBar
 * handles call / WhatsApp / demo instead.
 */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const { openModal } = useWhatsAppModal();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 lg:flex">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        className={cx(
          'grid h-10 w-10 place-items-center rounded-full border border-navy-200 bg-white text-navy-700 shadow-soft transition hover:border-electric-400 hover:text-electric-600',
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
        )}
      >
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>

      <a
        href={telHref()}
        aria-label={`Call us at ${site.contact.phoneDisplay}`}
        title={`Call ${site.contact.phoneDisplay}`}
        className="group inline-flex items-center gap-2 rounded-full bg-navy-950 py-3 pl-3 pr-4 text-sm font-semibold text-white shadow-card transition hover:bg-navy-800"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[8rem] group-hover:opacity-100">
          Call now
        </span>
      </a>

      <button
        type="button"
        onClick={openModal}
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
        className="group relative inline-flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-sm font-semibold text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition hover:bg-[#1ebe5a]"
      >
        <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-[#25D366]/60" aria-hidden="true" />
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
}
