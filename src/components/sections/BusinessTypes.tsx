import { audiences } from '@/data/content';

export function BusinessTypes() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {audiences.map((audience) => (
        <div
          key={audience.name}
          className="group rounded-2xl border border-navy-100 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-electric-200 hover:shadow-card"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-electric-600 to-violet-600 text-white transition group-hover:scale-105">
            <audience.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-sm font-bold text-navy-950">{audience.name}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-navy-500">{audience.benefit}</p>
        </div>
      ))}
    </div>
  );
}
