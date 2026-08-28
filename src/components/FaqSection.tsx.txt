import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS, CAFE_INFO } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 md:py-28 bg-brand-cream/40 relative">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-brown font-semibold block">
            Pertanyaan Umum
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-brand-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light max-w-lg mx-auto">
            Informasi penting seputar kunjungan, reservasi meja, dan fasilitas eksklusif di Élysée Café & Bistro.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-brand-ivory rounded-2xl border border-brand-beige overflow-hidden shadow-2xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-brand-cream/40 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-brand-brown tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-serif-title text-base sm:text-lg font-bold text-brand-charcoal">
                      {item.question}
                    </h3>
                  </div>

                  <span
                    className={`w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center text-brand-charcoal shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-brand-charcoal text-brand-ivory' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 font-light leading-relaxed border-t border-brand-cream/60 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ask Barista Callout */}
        <div className="mt-10 p-6 rounded-2xl bg-brand-cream/80 border border-brand-beige text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <h4 className="font-serif-title text-base font-bold text-brand-charcoal">
              Masih memiliki pertanyaan lain seputar menu atau acara?
            </h4>
            <p className="text-xs text-gray-500 font-light mt-0.5">
              Tim barista dan concierge kami dengan senang hati membantu Anda kapan saja.
            </p>
          </div>
          <a
            href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Halo%20Élysée,%20saya%20ada%20pertanyaan`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-brand-charcoal text-brand-ivory text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors flex items-center gap-2 shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-brand-ivory" /> Tanya via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
