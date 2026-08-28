import React from 'react';
import { Star, MessageSquarePlus, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onOpenReviewModal: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onOpenReviewModal,
}) => {
  return (
    <section id="reviews" className="py-20 md:py-32 bg-brand-cream/50 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-brown font-semibold block">
              Guest Experiences
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal">
              Kata Mereka Tentang Élysée
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-light max-w-xl">
              Kepuasan dan kenyamanan setiap tamu adalah inspirasi utama kami dalam meracik kopi dan menghadirkan ruang yang damai.
            </p>
          </div>

          <button
            onClick={onOpenReviewModal}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-full bg-brand-charcoal text-brand-ivory hover:bg-brand-brown transition-all shadow-sm shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" /> Tulis Ulasan Anda
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-brand-ivory rounded-3xl p-6 sm:p-7 border border-brand-beige shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {/* Rating stars & quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-brand-charcoal gap-0.5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-charcoal" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-brand-charcoal/20" />
                </div>

                <p className="text-xs text-gray-600 font-light leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-3 border-t border-brand-beige/60">
                <div className="w-10 h-10 rounded-full bg-brand-cream border border-brand-beige flex items-center justify-center font-serif-title font-bold text-sm text-brand-brown shrink-0">
                  {item.avatarText}
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif-title text-sm font-bold text-brand-charcoal truncate">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 truncate">
                    {item.role} {item.date && `• ${item.date}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
