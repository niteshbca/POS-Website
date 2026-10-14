const audiences = [
  'Retail Stores',
  'Supermarkets',
  'Grocery & Kirana',
  'Restaurants',
  'Cafes & Bakeries',
  'Pharmacies',
  'Clothing & Footwear',
  'Wholesalers',
  'Multi-branch Chains',
];

export function CapabilityTicker() {
  return (
    <div className="border-y border-navy-100 bg-navy-50/50 py-6">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-navy-400">
        Built for businesses like yours
      </p>
      <div className="relative overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee items-center gap-10">
          {[...audiences, ...audiences].map((audience, index) => (
            <span
              key={`${audience}-${index}`}
              className="flex items-center gap-3 text-sm font-semibold text-navy-500"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-electric-400" aria-hidden="true" />
              {audience}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
