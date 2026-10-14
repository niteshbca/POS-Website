import { Building2, Star, Users } from 'lucide-react';
import { site } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';

const placeholderClients = [
  'Your Client',
  'Your Client',
  'Your Client',
  'Your Client',
  'Your Client',
  'Your Client',
];

export function TrustedBy() {
  const { stats, clients } = site.socialProof;
  const logos = clients.length > 0 ? clients : placeholderClients;

  return (
    <div>
      <SectionHeading
        eyebrow="Trusted worldwide"
        title="Businesses trust NiteshPro POS to run their counters"
        description="Retailers, restaurants, pharmacies and multi-branch chains rely on NiteshPro POS every day. Replace the figures and names below with your real numbers."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-6 text-center shadow-soft"
          >
            <span className="absolute right-3 top-3 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700">
              Placeholder
            </span>
            <p className="text-3xl font-extrabold text-navy-950 sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-navy-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-navy-100 bg-navy-50/40 p-6 sm:p-8">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-navy-400">
          <Building2 className="h-4 w-4 text-electric-600" aria-hidden="true" />
          Trusted by teams like yours
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {logos.map((client, index) => (
            <div
              key={`${client}-${index}`}
              className="grid h-14 place-items-center rounded-xl border border-dashed border-navy-200 bg-white text-[11px] font-semibold text-navy-300"
            >
              {client}
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-navy-400">
          Add your real client logos (with permission) in the site config, or leave them as placeholders.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-navy-500">
        <span className="inline-flex items-center gap-2">
          <Users className="h-4 w-4 text-electric-600" aria-hidden="true" />
          Single-store to multi-branch
        </span>
        <span className="inline-flex items-center gap-2">
          <Star className="h-4 w-4 text-electric-600" aria-hidden="true" />
          Retail, hospitality &amp; healthcare
        </span>
      </div>
    </div>
  );
}
