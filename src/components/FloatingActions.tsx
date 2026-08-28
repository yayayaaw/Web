import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp, ShoppingBag, X } from 'lucide-react';
import { CAFE_INFO } from '../data/mockData';
import { createWhatsAppUrl } from '../utils/formatters';

interface FloatingActionsProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ cartCount, onOpenCart }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWaTooltip, setShowWaTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWhatsApp = () => {
    const url = createWhatsAppUrl(`Halo ${CAFE_INFO.name} Café, saya ingin bertanya tentang menu & reservasi...`);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-5 sm:right-7 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Floating Cart Pill (Mobile/Tablet quick access) */}
      {cartCount > 0 && (
        <button
          onClick={onOpenCart}
          className="pointer-events-auto bg-brand-charcoal text-brand-ivory hover:bg-black p-3 sm:px-4 sm:py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-brand-cream/20 transition-all hover:scale-105 animate-in slide-in-from-bottom duration-300"
        >
          <ShoppingBag className="w-4 h-4 text-brand-ivory" />
          <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
            Baki Pesanan
          </span>
          <span className="bg-brand-ivory text-brand-charcoal text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {cartCount}
          </span>
        </button>
      )}

      {/* Floating WhatsApp with popup tooltip */}
      <div className="relative pointer-events-auto flex items-center">
        {showWaTooltip && (
          <div className="absolute right-14 bg-brand-charcoal text-brand-ivory py-1.5 px-3 rounded-xl shadow-lg border border-brand-cream/15 text-xs font-medium whitespace-nowrap animate-in fade-in slide-in-from-right duration-300 flex items-center gap-2">
            <span>Chat Barista Kami</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowWaTooltip(false);
              }}
              className="text-gray-400 hover:text-brand-cream p-0.5"
              aria-label="Tutup petunjuk"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <button
          onClick={handleOpenWhatsApp}
          aria-label="Hubungi WhatsApp Barista"
          className="w-12 h-12 rounded-full bg-brand-charcoal hover:bg-black text-brand-ivory border border-brand-cream/20 shadow-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-2xl focus:outline-none"
        >
          <MessageSquare className="w-5 h-5 fill-brand-ivory" />
        </button>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll ke atas"
          className="pointer-events-auto w-10 h-10 rounded-full bg-brand-ivory text-brand-charcoal hover:bg-brand-cream border border-brand-beige shadow-md flex items-center justify-center transition-all hover:scale-105 animate-in fade-in duration-300"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
