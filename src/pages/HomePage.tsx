import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Music,
  Camera,
  Coffee,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { WelcomeSection } from '../components/WelcomeSection';
import { SignatureSection } from '../components/SignatureSection';
import { TestimonialsScrollStrip } from '../components/TestimonialsScrollStrip';
import { MenuItem, PageId } from '../types';

import { useContent } from '../lib/contentStore';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem, quantity?: number, notes?: string) => void;
  onOpenReviewModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectItem,
  onAddToCart,
  onOpenReviewModal,
}) => {
  // Sekarang dibaca dari CMS (contentStore), bukan hardcode lagi.
  const galleryPhotos = useContent('galleryPhotos');
  const sanctuaryCards = galleryPhotos.slice(0, 4);
  const philosophyCards = useContent('philosophyCards');
  const event = useContent('event');

  return (
    <div className="space-y-0 bg-brand-cream">
      {/* Hero Section */}
      <Hero
        onExploreMenu={() => onNavigate('menu')}
        onOpenReservation={() => onNavigate('reservasi')}
      />

      {/* Welcome / Sambutan Section */}
      <WelcomeSection />

      {/* Majestic Visual Spaces Bento - "Sudut Ketenangan" (dari CMS) */}
      <section className="py-16 sm:py-24 md:py-28 bg-brand-cream border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-brand-charcoal/70 font-semibold block">
                Atmosphere & Spaces
              </span>
              <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-light text-brand-charcoal">
                Sudut-Sudut Ketenangan
              </h2>
            </div>
            <button
              onClick={() => onNavigate('galeri')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-charcoal hover:text-black border-b border-brand-charcoal/40 pb-1 transition-colors self-start sm:self-auto"
            >
              <span>Jelajahi Galeri</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Majestic Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {sanctuaryCards.map((space) => (
              <div
                key={space.id}
                onClick={() => onNavigate('galeri')}
                className="group relative h-72 sm:h-84 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={space.url}
                  alt={space.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-brand-cream bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-brand-cream/20">
                    {space.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-brand-cream space-y-1">
                  <h3 className="font-serif-title text-xl sm:text-2xl md:text-3xl font-light text-brand-cream">
                    {space.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Section - "Menu Unggulan" */}
      <section className="border-b border-brand-charcoal/10">
        <SignatureSection
          onSelectItem={onSelectItem}
          onAddToCart={onAddToCart}
        />
      </section>

      {/* Sensory & Craft Visual Strip - "Filosofi Kami" (dari CMS) */}
      <section className="py-16 sm:py-24 bg-brand-cream border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-brand-charcoal/70 font-semibold block">
              Craft & Philosophy
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-light text-brand-charcoal">
              Ketelitian dalam Tiap Seduhan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philosophyCards.map((craft) => (
              <div
                key={craft.id}
                className="bg-brand-cream rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-charcoal/15 shadow-xs flex flex-col group"
              >
                <div className="h-48 sm:h-52 overflow-hidden relative">
                  <img
                    src={craft.image}
                    alt={craft.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-medium uppercase tracking-wider bg-brand-charcoal/80 text-brand-cream backdrop-blur-sm px-2.5 py-0.5 rounded-md">
                      {craft.tag}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-title text-lg sm:text-xl font-bold text-brand-charcoal">
                      {craft.title}
                    </h3>
                    <p className="text-xs text-brand-charcoal/70 font-light mt-1 leading-relaxed">
                      {craft.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekend Highlight - Event (dari CMS) */}
      <section className="py-16 sm:py-20 bg-brand-cream border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-charcoal text-brand-cream shadow-xl">
            <div className="absolute inset-0 z-0">
              <img
                src={event.image}
                alt="Live Event"
                loading="lazy"
                className="w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cream/10 border border-brand-cream/20 text-brand-cream text-xs">
                <Music className="w-3.5 h-3.5" />
                <span className="uppercase tracking-widest text-[10px] font-semibold">
                  {event.badgeLabel}
                </span>
              </div>

              <h2 className="font-serif-title text-2xl sm:text-4xl md:text-5xl font-light text-brand-cream leading-tight">
                {event.title}
              </h2>

              <p className="text-xs sm:text-sm text-brand-cream/80 font-light leading-relaxed">
                {event.description}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs text-brand-cream/70">
                <span>{event.dateStr}</span>
                <span>•</span>
                <span>{event.timeStr}</span>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('promo')}
                  className="px-6 py-3 rounded-xl bg-brand-cream text-brand-charcoal text-xs font-semibold uppercase tracking-widest hover:bg-brand-charcoal hover:text-brand-cream transition-colors"
                >
                  Lihat Tiket & Jadwal
                </button>
                <button
                  onClick={() => onNavigate('reservasi')}
                  className="px-6 py-3 rounded-xl border border-brand-cream/30 text-brand-cream text-xs font-semibold uppercase tracking-widest hover:bg-brand-cream/10 transition-colors"
                >
                  Pesan Meja
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Scroll Strip - ulasan yang bisa digeser ke kiri/kanan */}
      <TestimonialsScrollStrip onOpenReviewModal={onOpenReviewModal} />

      {/* Visual Gallery Grid Snapshot */}
      <section className="py-16 sm:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.3em] text-brand-charcoal/70 font-semibold block">
                Visual Stories
              </span>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-light text-brand-charcoal">
                Momen di Élysée
              </h2>
            </div>
            <button
              onClick={() => onNavigate('galeri')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-charcoal hover:text-black border-b border-brand-charcoal/40 pb-1 transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lihat Semua Foto</span>
              <span className="sm:hidden">Semua</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {galleryPhotos.slice(0, 4).map((photo) => (
              <div
                key={photo.id}
                onClick={() => onNavigate('galeri')}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-xs"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4">
                  <p className="text-[11px] sm:text-xs text-brand-cream font-medium line-clamp-1">
                    {photo.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
