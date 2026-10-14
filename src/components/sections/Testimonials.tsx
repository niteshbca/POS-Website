import { Quote } from 'lucide-react';
import { testimonials } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

export function Testimonials() {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={index} delay={index * 80}>
            <figure className="relative flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
              <span className="absolute right-5 top-5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700">
                Client Review
              </span>
              <Quote className="h-7 w-7 text-electric-200" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy-600">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-navy-100 pt-4">
                <p className="text-sm font-bold text-navy-950">{testimonial.author}</p>
                <p className="text-xs text-navy-400">{testimonial.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-navy-400">
        Trusted by businesses across Retail, Grocery, Pharmacy, Restaurant &amp; Wholesale.
      </p>
    </div>
  );
}
