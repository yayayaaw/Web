import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ReservationSection } from '../components/ReservationSection';
import { ReservationData, PageId } from '../types';

interface ReservationPageProps {
  onNavigate: (page: PageId) => void;
  onReservationSuccess: (data: ReservationData) => void;
  recentReservation: ReservationData | null;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({
  onNavigate,
  onReservationSuccess,
  recentReservation,
}) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        eyebrow="Table & Room Reservation"
        title="Pesan Meja Favorit Anda di Senopati"
        description="Nikmati ketenangan berkunjung tanpa perlu mengantre. Pilih area duduk sesuai preferensi Anda: Main Dining Hall yang sejuk, Garden Patio yang asri, atau Mezzanine VIP untuk pertemuan privat."
        breadcrumbs={[{ label: 'Reservasi Meja' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Main Reservation Section */}
      <ReservationSection
        onReservationSuccess={onReservationSuccess}
        recentReservation={recentReservation}
      />

      {/* Reservation Guidelines & Etiquette */}
      <section className="py-16 bg-brand-cream border-t border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-brand-cream border border-brand-charcoal/15 shadow-xs space-y-2">
              <span className="font-serif-title text-base font-bold text-brand-charcoal block">
                Toleransi Keterlambatan
              </span>
              <p className="text-xs text-brand-charcoal/80 font-light leading-relaxed">
                Meja akan ditahan hingga 15 menit dari jam reservasi. Jika Anda mengalami kendala di perjalanan, silakan hubungi kami via WhatsApp.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-cream border border-brand-charcoal/15 shadow-xs space-y-2">
              <span className="font-serif-title text-base font-bold text-brand-charcoal block">
                Acara Privat & Rombongan
              </span>
              <p className="text-xs text-brand-charcoal/80 font-light leading-relaxed">
                Untuk reservasi lebih dari 12 orang atau sewa ruangan privat (VIP Mezzanine), tim concierge kami siap menyusun menu paket kustom.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-cream border border-brand-charcoal/15 shadow-xs space-y-2">
              <span className="font-serif-title text-base font-bold text-brand-charcoal block">
                Dress Code & Suasana
              </span>
              <p className="text-xs text-brand-charcoal/80 font-light leading-relaxed">
                Smart casual. Kami mengutamakan kenyamanan setiap pengunjung dengan suasana tenang dan alunan musik santai.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
