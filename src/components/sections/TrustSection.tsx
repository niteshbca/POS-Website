import { Info } from 'lucide-react';
import { trustPoints } from '@/data/content';

export function TrustSection() {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trustPoints.map((point) => (
          <div
            key={point.title}
            className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-soft"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-950 text-white">
              <point.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base font-bold text-navy-950">{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-500">{point.description}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-xl border border-navy-100 bg-navy-50/60 p-4 text-xs text-navy-500">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-electric-600" aria-hidden="true" />
        <p>
          These points describe how the platform is designed. They are not certifications and no specific
          compliance guarantee is claimed here. For a security or compliance review tailored to your
          organisation, please contact our team.
        </p>
      </div>
    </div>
  );
}
