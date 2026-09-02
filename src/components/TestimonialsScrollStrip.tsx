// Taruh file ini di: src/components/TestimonialsScrollStrip.tsx
import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import { Testimonial } from '../types';

const REVIEWS_KEY = 'elysee_reviews';

// Baca dari key yang sama dipakai CMS (TestimonialsFaqTab). Kalau CMS belum
// pernah disentuh / semua ulasan default belum pernah "disimpan ulang",
// fallback ke TESTIMONIALS bawaan (mockData) -- sama persis polanya kayak FaqSection.
function loadReviews(): Testimonial[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return TESTIMONIALS;
}

export const TestimonialsScrollStrip: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(loadReviews);

  useEffect(() => {
    const refresh = () => setTestimonials(loadReviews());
    window.addEventListener('storage', refresh);
    window.addEventListener('elysee-reviews-updated', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('elysee-reviews-updated', refresh);
    };
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-brand-cream border-b border-brand-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-brand-charcoal/70 font-semibold block">
            Guest Experiences
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-light text-brand-charcoal">
            Kata Mereka Tentang Élysée
          </h2>
        </div>

        <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[260px] sm:w-[300px] bg-brand-ivory rounded-2xl p-5 sm:p-6 border border-brand-beige shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-brand-charcoal gap-0.5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-charcoal" />
                    ))}
                  </div>
                  <Quote className="w-4 h-4 text-brand-charcoal/20" />
                </div>
                <p className="text-xs text-gray-600 font-light leading-relaxed italic line-clamp-4">
                  "{item.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-brand-beige/60">
                <div className="w-9 h-9 rounded-full bg-brand-cream border border-brand-beige flex items-center justify-center font-serif-title font-bold text-xs text-brand-brown shrink-0">
                  {item.avatarText}
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif-title text-xs font-bold text-brand-charcoal truncate">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 truncate">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
