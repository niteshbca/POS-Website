import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Mail, MessageCircle, Phone, X } from 'lucide-react';
import { mailtoHref, site, telHref } from '@/config/site';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { WhatsAppForm } from './WhatsAppForm';

interface WhatsAppModalContextValue {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const WhatsAppModalContext = createContext<WhatsAppModalContextValue | null>(null);

/** Access the WhatsApp enquiry modal from anywhere inside the provider. */
export function useWhatsAppModal(): WhatsAppModalContextValue {
  const context = useContext(WhatsAppModalContext);
  if (!context) {
    throw new Error('useWhatsAppModal must be used within a <WhatsAppProvider>.');
  }
  return context;
}

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openModal, closeModal }),
    [open, openModal, closeModal],
  );

  return (
    <WhatsAppModalContext.Provider value={value}>
      {children}
      <WhatsAppModal open={open} onClose={closeModal} />
    </WhatsAppModalContext.Provider>
  );
}

function WhatsAppModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-modal-title"
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white shadow-card sm:rounded-3xl"
      >
        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-[#128C7E] to-[#25D366] px-6 py-5 text-white">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20">
              <MessageCircle className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 id="whatsapp-modal-title" className="text-lg font-bold text-white">
                Chat with us on WhatsApp
              </h2>
              <p className="text-sm text-white/90">
                Fill in your details — we’ll open WhatsApp with your message ready to send.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <WhatsAppForm compact />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-navy-100 pt-5 text-sm">
            <a href={telHref()} className="inline-flex items-center gap-2 font-semibold text-navy-700 transition hover:text-electric-600">
              <Phone className="h-4 w-4 text-electric-600" aria-hidden="true" />
              {site.contact.phoneDisplay}
            </a>
            <a href={mailtoHref()} className="inline-flex items-center gap-2 font-semibold text-navy-700 transition hover:text-electric-600">
              <Mail className="h-4 w-4 text-electric-600" aria-hidden="true" />
              Email us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
