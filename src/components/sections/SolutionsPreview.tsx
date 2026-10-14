import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { solutions } from '@/data/content';

export function SolutionsPreview() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {solutions.map((solution) => (
        <Link
          key={solution.id}
          to={`/solutions#${solution.id}`}
          className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-electric-200 hover:shadow-card"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-950 text-white transition group-hover:bg-gradient-to-br group-hover:from-electric-600 group-hover:to-violet-600">
            <solution.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-base font-bold text-navy-950">{solution.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-500">{solution.summary}</p>
          <ul className="mt-4 space-y-1.5">
            {solution.points.slice(0, 3).map((point) => (
              <li key={point} className="flex items-center gap-2 text-xs text-navy-600">
                <Check className="h-3.5 w-3.5 text-electric-600" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-electric-600">
            Learn more
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}
