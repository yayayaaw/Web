import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useContent } from '../lib/contentStore';

interface HeroProps {
  onExploreMenu?: () => void;
  onOpenReservation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenReservation }) => {
  const hero = useContent('hero');

  return (
    <header
      id="home"
      className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center text-center bg-brand-softBlack overflow-hidden pt-20 pb-16"
    >
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundUrl}
          alt="Élysée Café & Bistro Atmosphere"
          className="w-full h-full object-cover object-center scale-100 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-softBlack via-brand-softBlack/70 to-black/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,18,18,0.85)_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 md:px-8 space-y-6 sm:space-y-8">
        {/* Hours Badge */}
        {hero.hoursLabel && (
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-beige/90 font-medium border border-brand-cream/20 rounded-full px-4 py-1.5">
            {hero.hoursLabel}
          </span>
        )}

        {/* Main Headline */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-brand-beige/80 font-medium">
            Artisan Roastery & Fine Bistro
          </p>
          <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-ivory font-light leading-[1.08] tracking-tight">
            {hero.title}
          </h1>
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-300 font-light leading-relaxed tracking-wide">
          {hero.subtitle}
        </p>

        {/* CTA Buttons */}
        {(hero.button1Text || hero.button2Text) && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            {hero.button1Text && (
              <button
                onClick={onExploreMenu}
                className="px-6 py-3 rounded-xl bg-brand-cream text-brand-charcoal text-xs font-semibold uppercase tracking-widest hover:bg-brand-charcoal hover:text-brand-cream transition-colors"
              >
                {hero.button1Text}
              </button>
            )}
            {hero.button2Text && (
              <button
                onClick={onOpenReservation}
                className="px-6 py-3 rounded-xl border border-brand-cream/30 text-brand-cream text-xs font-semibold uppercase tracking-widest hover:bg-brand-cream/10 transition-colors"
              >
                {hero.button2Text}
              </button>
            )}
          </div>
        )}

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
