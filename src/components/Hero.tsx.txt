import React from 'react';
import { ArrowDown } from 'lucide-react';
import { CAFE_INFO } from '../data/mockData';

interface HeroProps {
  onExploreMenu?: () => void;
  onOpenReservation?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <header
      id="home"
      className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center text-center bg-brand-softBlack overflow-hidden pt-20 pb-16"
    >
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1920"
          alt="Élysée Café & Bistro Atmosphere"
          className="w-full h-full object-cover object-center scale-100 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-softBlack via-brand-softBlack/70 to-black/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,18,18,0.85)_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 md:px-8 space-y-6 sm:space-y-8">
        {/* Main Headline */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-brand-beige/80 font-medium">
            Artisan Roastery & Fine Bistro
          </p>
          <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-ivory font-light leading-[1.08] tracking-tight">
            Tempat Berteduh yang <br className="hidden sm:inline" />
            <span className="italic font-normal text-brand-cream underline decoration-brand-brown/40 decoration-1 underline-offset-8">
              Tenang & Elegan
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-300 font-light leading-relaxed tracking-wide">
          Nikmati racikan kopi artisan dengan biji pilihan terbaik, sajian hidangan hangat penuh cita rasa, dan suasana tenang yang dirancang khusus untuk kenyamanan Anda.
        </p>

        {/* Key Feature Highlights */}
        <div className="pt-6 sm:pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center border-t border-brand-cream/15 max-w-3xl mx-auto">
          <div className="p-2">
            <p className="text-brand-cream text-xs sm:text-sm font-serif-title font-medium">Artisan Coffee</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Grade 1 Specialty</p>
          </div>
          <div className="p-2">
            <p className="text-brand-cream text-xs sm:text-sm font-serif-title font-medium">Fine Comfort Food</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Fresh Farm-to-Table</p>
          </div>
          <div className="p-2">
            <p className="text-brand-cream text-xs sm:text-sm font-serif-title font-medium">Quiet & Intimate</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Ergonomic Seating</p>
          </div>
          <div className="p-2">
            <p className="text-brand-cream text-xs sm:text-sm font-serif-title font-medium">Senopati Sanctuary</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Jakarta Selatan</p>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <a
        href="#about"
        aria-label="Scroll ke Cerita Kami"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-brand-cream/50 hover:text-brand-cream transition-colors animate-bounce p-2"
      >
        <ArrowDown className="w-5 h-5" />
      </a>
    </header>
  );
};
