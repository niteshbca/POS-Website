import { Clock, Headphones, MessageCircle, ShieldCheck } from 'lucide-react';
import { site } from '@/config/site';
import { WhatsAppForm } from '@/components/whatsapp/WhatsAppForm';

const perks = [
  { icon: Headphones, text: 'Talk to a real person, not a bot' },
  { icon: Clock, text: 'Quick replies during business hours' },
  { icon: ShieldCheck, text: 'Share your details only when you send' },
];

export function WhatsAppSection() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#128C7E]">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp us
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
          Prefer WhatsApp? Send us your requirement
        </h2>
        <p className="mt-4 text-navy-500 sm:text-lg">
          Fill in a few details and we’ll open WhatsApp with your message ready to send. Just tap send —
          our team will reply with pricing, a demo slot and setup guidance.
        </p>
        <ul className="mt-6 space-y-3">
          {perks.map((perk) => (
            <li key={perk.text} className="flex items-center gap-3 text-sm text-navy-600">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#25D366]/10 text-[#128C7E]">
                <perk.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              {perk.text}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-navy-400">
          You can also call us at{' '}
          <a href={`tel:${site.contact.phoneE164}`} className="font-semibold text-electric-600">
            {site.contact.phoneDisplay}
          </a>
          .
        </p>
      </div>

      <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <WhatsAppForm />
      </div>
    </div>
  );
}
