import { BarChart3, Boxes, ScanBarcode, Store } from 'lucide-react';

const items = [
  { icon: ScanBarcode, title: 'Fast checkout', description: 'Scan-to-bill billing built for busy counters.' },
  { icon: Boxes, title: 'Accurate stock', description: 'Real-time inventory across every store.' },
  { icon: BarChart3, title: 'Clear reports', description: 'Export sales and stock to CSV / Excel.' },
  { icon: Store, title: 'Any scale', description: 'From one counter to a nationwide chain.' },
];

export function StatsStrip() {
  return (
    <div className="grid divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white shadow-soft sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
      {items.map((item) => (
        <div key={item.title} className="flex items-start gap-4 p-6">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-950 text-white">
            <item.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold text-navy-950">{item.title}</p>
            <p className="mt-1 text-sm text-navy-500">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
