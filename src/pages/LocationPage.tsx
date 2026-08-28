import React from 'react';
import { Clock, Car, Train } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { LocationSection } from '../components/LocationSection';
import { PageId } from '../types';

interface LocationPageProps {
  onNavigate: (page: PageId) => void;
}

export const LocationPage: React.FC<LocationPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        eyebrow="Location & Contact Information"
        title="Kunjungi Kami di Kawasan Asri Senopati"
        description="Terletak strategis di Jl. Senopati No. 88, Jakarta Selatan. Akses sangat mudah dengan area parkir mandiri luas serta layanan gratis valet parking."
        breadcrumbs={[{ label: 'Lokasi & Kontak' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Main Location Section */}
      <LocationSection />

      {/* Transportation & Access Guide */}
      <section className="py-16 bg-brand-cream border-t border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
          <h3 className="font-serif-title text-2xl font-bold text-brand-charcoal text-center mb-10">
            Panduan Akses Menuju Lokasi
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-brand-cream border border-brand-charcoal/15 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-charcoal text-brand-cream flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <h4 className="font-serif-title text-base font-bold text-brand-charcoal">
                Kendaraan Pribadi & Valet
              </h4>
              <p className="text-xs text-brand-charcoal/80 font-light leading-relaxed">
                Kami menyediakan drop-off point di lobi depan dan layanan valet gratis setiap hari demi kemudahan Anda tanpa perlu repot mencari parkir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-cream border border-brand-charcoal/15 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-charcoal text-brand-cream flex items-center justify-center">
                <Train className="w-5 h-5" />
              </div>
              <h4 className="font-serif-title text-base font-bold text-brand-charcoal">
                Moda Transportasi MRT
              </h4>
              <p className="text-xs text-brand-charcoal/80 font-light leading-relaxed">
                Turun di <strong>Stasiun MRT Blok M BCA</strong> atau <strong>Stasiun MRT Senayan</strong>, dilanjutkan perjalanan 5 menit dengan transportasi daring menuju Jl. Senopati No. 88.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-cream border border-brand-charcoal/15 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-charcoal text-brand-cream flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-serif-title text-base font-bold text-brand-charcoal">
                Waktu Kunjungan Terbaik
              </h4>
              <p className="text-xs text-brand-charcoal/80 font-light leading-relaxed">
                Pagi hari (08:00 – 11:30) sangat ideal untuk sarapan tenang & bekerja. Sore hingga malam (17:00 – 22:00) cocok untuk makan malam santai dan sesi kopi berdua.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
