import React from 'react';
import { Plus, Eye, MessageSquare } from 'lucide-react';
import { SIGNATURE_ITEMS } from '../data/mockData';
import { MenuItem } from '../types';
import { formatRupiah, generateItemOrderWhatsApp } from '../utils/formatters';

interface SignatureSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  onSelectItem,
  onAddToCart,
}) => {
  return (
    <section className="py-20 md:py-28 bg-brand-ivory relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-brand-charcoal/70 font-semibold block">
            Signature Creations
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-light text-brand-charcoal">
            Cita Rasa Ikonik
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light">
            Kreasi paling dicintai dari roastery & dapur kami.
          </p>
        </div>

        {/* 3 Signature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SIGNATURE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-brand-cream/80 rounded-3xl overflow-hidden border border-brand-beige shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-brand-cream">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Price tag on image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-brand-cream">
                  <span className="text-[11px] uppercase tracking-wider text-brand-beige font-medium">
                    {item.category === 'coffee' ? 'Espresso Bar' : item.category === 'main' ? 'Kitchen Special' : 'Boulangerie'}
                  </span>
                  <span className="font-serif-title text-2xl font-bold text-brand-cream">
                    {formatRupiah(item.price)}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3
                    onClick={() => onSelectItem(item)}
                    className="font-serif-title text-2xl font-bold text-brand-charcoal group-hover:text-black transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Tasting notes chips */}
                {item.tastingNotes && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tastingNotes.slice(0, 2).map((note, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-brand-cream text-brand-charcoal px-2.5 py-0.5 rounded-md font-medium border border-brand-beige"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                )}

                {/* Card Actions */}
                <div className="pt-3 border-t border-brand-cream flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="flex-1 bg-brand-charcoal hover:bg-black text-brand-ivory text-xs uppercase tracking-wider font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Pesan
                  </button>

                  <button
                    onClick={() => onSelectItem(item)}
                    aria-label="Lihat Detail"
                    title="Lihat Detail Menu"
                    className="p-2.5 bg-brand-cream hover:bg-brand-beige text-brand-charcoal rounded-xl transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      const url = generateItemOrderWhatsApp(item.name, item.price);
                      window.open(url, '_blank');
                    }}
                    aria-label="Order via WhatsApp"
                    title="Order via WhatsApp"
                    className="p-2.5 bg-brand-cream hover:bg-brand-beige text-brand-charcoal rounded-xl transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
