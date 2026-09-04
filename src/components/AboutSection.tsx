import React from 'react';
import { Coffee, Utensils, Armchair, Wifi, Heart, Sparkles, ShieldCheck, Clock, MapPin, Star, LucideIcon } from 'lucide-react';
import { useContent, AboutHighlightIcon } from '../lib/contentStore';

// PATCH: pemetaan key ikon (disimpan sbg string di CMS/localStorage) -> komponen Lucide asli.
// Kalau admin nambah pilihan ikon baru di ContentPagesTab, tambahkan juga entrinya di sini.
const ICON_MAP: Record<AboutHighlightIcon, LucideIcon> = {
  coffee: Coffee,
  utensils: Utensils,
  armchair: Armchair,
  wifi: Wifi,
  heart: Heart,
  sparkles: Sparkles,
  'shield-check': ShieldCheck,
  clock: Clock,
  'map-pin': MapPin,
  star: Star,
};

export const AboutSection: React.FC = () => {
  const about = useContent('about');

  // PATCH: sebelumnya ini array hardcoded terpisah dari CMS -- sekarang
  // dibaca langsung dari about.highlights (bisa diedit di tab "Beranda & Our Story").
  const highlights = about.highlights;

  return (
    <section id="about" className="py-20 md:py-32 bg-brand-cream/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image composition with Floating Quote Badge */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-ivory">
              <img
                src={about.imageUrl}
                alt="Élysée Café Interior"
                className="w-full h-[420px] sm:h-[500px] object-cover hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              {/* Floating quote card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs bg-brand-ivory/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-brand-beige">
                <p className="font-serif-title text-lg font-bold text-brand-charcoal italic">"{about.quote}"</p>
                <p className="text-[11px] text-gray-500 font-light mt-1">{about.subQuote}</p>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-6 order-1 lg:order-2">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-brand-brown font-semibold block mb-2">
                Our Story & Philosophy
              </span>
              <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal leading-[1.18]">
                {about.heading}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              {about.paragraph1}
            </p>

            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              {about.paragraph2}
            </p>

            {/* Highlight Items Grid -- sekarang dari CMS */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item) => {
                const Icon = ICON_MAP[item.icon] || Coffee;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-brand-ivory/80 border border-brand-beige/60 shadow-xs hover:shadow-md hover:bg-brand-ivory transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-brand-cream text-brand-charcoal group-hover:bg-brand-charcoal group-hover:text-brand-ivory flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif-title text-base font-bold text-brand-charcoal">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
