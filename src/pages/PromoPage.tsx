import React from 'react';
import { Gift } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PromoEventsSection } from '../components/PromoEventsSection';
import { PageId } from '../types';

interface PromoPageProps {
  onNavigate: (page: PageId) => void;
  onOpenPromoModal: () => void;
  onOpenTicketModal: () => void;
}

export const PromoPage: React.FC<PromoPageProps> = ({
  onNavigate,
  onOpenPromoModal,
  onOpenTicketModal,
}) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        eyebrow="Special Offers & Events"
        title="Promo Spesial & Acara Akhir Pekan"
        description="Nikmati penawaran eksklusif untuk perpaduan kopi dan kuliner kami, serta pesan tiket untuk sesi musik jazz akustik intim yang rutin diadakan di Élysée."
        breadcrumbs={[{ label: 'Promo & Acara' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Main Promo & Events Section */}
      <PromoEventsSection
        onOpenPromoModal={onOpenPromoModal}
        onOpenTicketModal={onOpenTicketModal}
      />

      {/* Member Club & Loyalty Teaser */}
      <section className="py-16 bg-brand-charcoal text-brand-cream border-t border-brand-cream/10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-cream/70 font-semibold block">
            Élysée Society Privileges
          </span>
          <h3 className="font-serif-title text-2xl sm:text-3xl font-light text-brand-cream">
            Keuntungan Menjadi Pengunjung Setia
          </h3>
          <p className="text-xs sm:text-sm text-brand-cream/80 font-light max-w-xl mx-auto leading-relaxed">
            Dapatkan prioritas meja di akhir pekan, undangan rahasia untuk tasting menu kopi varietas langka (*geisha & anaerobic process*), dan diskon khusus di setiap hari ulang tahun Anda.
          </p>

          <div className="pt-2">
            <a
              href="https://wa.me/6281289001920?text=Halo%20Élysée,%20saya%20tertarik%20bergabung%20dengan%20Élysée%20Society"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full bg-brand-cream text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-cream border border-brand-cream transition-colors"
            >
              <span>Daftar via WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
