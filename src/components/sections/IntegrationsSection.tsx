import { Info, Plug } from 'lucide-react';
import { integrationGroups } from '@/data/content';

export function IntegrationsSection() {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {integrationGroups.map((group) => (
          <div key={group.category} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-electric-50 text-electric-600">
                <Plug className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="text-sm font-bold text-navy-950">{group.category}</h3>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-navy-100 bg-navy-50/60 px-3 py-1.5 text-xs font-medium text-navy-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-xl border border-navy-100 bg-navy-50/60 p-4 text-xs text-navy-500">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-electric-600" aria-hidden="true" />
        <p>
          The items above are integration categories we can support, not confirmed partnerships.
          Availability depends on your plan, region and the third-party provider. Mention the tools and
          hardware you use and our team will confirm compatibility.
        </p>
      </div>
    </div>
  );
}
