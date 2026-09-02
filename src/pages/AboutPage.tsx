// Taruh file ini di: src/pages/AboutPage.tsx
import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { AboutSection } from '../components/AboutSection';
import { SocialShowcase } from '../components/SocialShowcase';
import { PageId } from '../types';
import { useContent } from '../lib/contentStore';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const about = useContent('about');

  return (
    <div className="space-y-0">
      {/* Page Header -- sekarang narik dari CMS (tab Beranda & Our Story) */}
      <PageHeader
        eyebrow={about.pageEyebrow}
        title={about.pageTitle}
        description={about.pageDescription}
        breadcrumbs={[{ label: 'Our Story' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Main About Component */}
      <AboutSection />

      {/* Craftsmanship & Brewing Methodology -- section statis by design, belum ada di CMS */}
      <section className="py-20 md:py-28 bg-brand-charcoal text-brand-cream border-t border-brand-cream/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-cream/70 font-semibold block">
              Metode & Keahlian
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-light text-brand-cream">
              Filosofi Seduhan Presisi
            </h2>
            <p className="text-xs sm:text-sm text-brand-cream/70 font-light">
              Setiap cangkir kopi di Élysée diolah dengan standar ketat rasio air, suhu, dan ukuran gilingan demi mengekstraksi cita rasa maksimal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-brand-cream/5 border border-brand-cream/15 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-brand-cream/10 text-brand-cream flex items-center justify-center font-bold">01</div>
              <h3 className="font-serif-title text-lg font-bold text-brand-cream">Pour-Over V60</h3>
              <p className="text-xs text-brand-cream/70 font-light leading-relaxed">
                Mengekstrak keasaman sitrus dan aroma floral yang cerah dari biji single-origin Gayo & Toraja.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-brand-cream/5 border border-brand-cream/15 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-brand-cream/10 text-brand-cream flex items-center justify-center font-bold">02</div>
              <h3 className="font-serif-title text-lg font-bold text-brand-cream">Kyoto Cold Drip</h3>
              <p className="text-xs text-brand-cream/70 font-light leading-relaxed">
                Ekstraksi tetes demi tetes selama 12 jam menghasilkan tekstur selembut sutra dengan sentuhan cokelat gelap.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-brand-cream/5 border border-brand-cream/15 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-brand-cream/10 text-brand-cream flex items-center justify-center font-bold">03</div>
              <h3 className="font-serif-title text-lg font-bold text-brand-cream">Italian Dual-Boiler Espresso</h3>
              <p className="text-xs text-brand-cream/70 font-light leading-relaxed">
                Tekanan stabil 9 bar dengan crema tebal keemasan sebagai fondasi seluruh racikan berbasis susu kami.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-brand-cream/5 border border-brand-cream/15 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-brand-cream/10 text-brand-cream flex items-center justify-center font-bold">04</div>
              <h3 className="font-serif-title text-lg font-bold text-brand-cream">Aeropress Fine Extraction</h3>
              <p className="text-xs text-brand-cream/70 font-light leading-relaxed">
                Kombinasi perendaman menyeluruh dan tekanan manual menghasilkan body kopi yang bulat dan manis alami.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SocialShowcase />
    </div>
  );
};
