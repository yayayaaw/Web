import React from 'react';
import { Tag, Calendar, Music, Sparkles, Clock, Ticket, ArrowRight, Check } from 'lucide-react';
import { PROMO_DATA, EVENT_DATA } from '../data/mockData';
import { formatRupiah } from '../utils/formatters';

interface PromoEventsSectionProps {
  onOpenPromoModal: () => void;
  onOpenTicketModal: () => void;
}

export const PromoEventsSection: React.FC<PromoEventsSectionProps> = ({
  onOpenPromoModal,
  onOpenTicketModal,
}) => {
  return (
    <section id="promo" className="py-20 md:py-32 bg-brand-cream/60 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-brown font-semibold block">
            Special Experiences
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal">
            Penawaran & Acara Spesial
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light">
            Temukan momentum istimewa untuk menikmati kopi favorit Anda dengan harga hemat atau tenggelam dalam alunan musik jazz akhir pekan.
          </p>
        </div>

        {/* Two Featured Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Weekly Offer */}
          <div className="bg-brand-ivory rounded-3xl p-8 sm:p-10 border border-brand-beige shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                <span>Penawaran Terbatas</span>
                <span>Diskon 20%</span>
              </div>

              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-brand-charcoal group-hover:text-brand-brown transition-colors">
                {PROMO_DATA.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-brand-brown font-medium">
                <Calendar className="w-4 h-4" />
                <span>{PROMO_DATA.validDays}</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                {PROMO_DATA.description}
              </p>

              <div className="bg-brand-cream/80 p-4 rounded-2xl border border-brand-beige/70 space-y-2">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Kode Promo Digital:
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-brand-darkBrown">
                    {PROMO_DATA.discountCode}
                  </span>
                  <span className="text-[11px] text-brand-brown font-medium">
                    Hemat {PROMO_DATA.discountPercentage}%
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                id="claimPromoBtn"
                onClick={onOpenPromoModal}
                className="w-full bg-brand-charcoal hover:bg-brand-brown text-brand-ivory text-xs font-semibold uppercase tracking-widest py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Klaim Voucher Promo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Live Music Event */}
          <div className="bg-brand-charcoal text-brand-ivory rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-brand-brown/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between text-xs text-brand-beige/80 font-medium">
                <span>Akhir Pekan Eksklusif</span>
                <span>Seat Terbatas</span>
              </div>

              <div>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-brand-cream group-hover:text-brand-beige transition-colors">
                  {EVENT_DATA.title}
                </h3>
                <p className="text-xs text-brand-beige/80 tracking-wide mt-1">
                  {EVENT_DATA.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-beige" /> {EVENT_DATA.dateStr}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-beige" /> {EVENT_DATA.timeStr}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {EVENT_DATA.description}
              </p>

              {/* Price box */}
              <div className="bg-brand-cream/10 rounded-2xl p-4 border border-brand-cream/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Tiket Masuk & Seat</span>
                  <span className="font-serif-title text-2xl font-bold text-brand-beige">
                    {formatRupiah(EVENT_DATA.pricePerPax)}{' '}
                    <span className="text-xs font-normal text-gray-300 font-sans">/ orang</span>
                  </span>
                </div>
                <div className="text-right text-[11px] text-gray-300">
                  Free Signature Drink & Snack
                </div>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <button
                id="bookTicketBtn"
                onClick={onOpenTicketModal}
                className="w-full bg-brand-ivory hover:bg-brand-beige text-brand-charcoal text-xs font-semibold uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4 text-brand-brown" />
                <span>Beli Tiket & Reservasi Seat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
