import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Copy, Check, Navigation, ExternalLink } from 'lucide-react';
import { CAFE_INFO } from '../data/mockData';
import { copyToClipboard } from '../utils/formatters';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    const ok = await copyToClipboard(CAFE_INFO.address);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="location" className="py-20 md:py-32 bg-brand-ivory relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-brand-brown font-semibold block mb-2">
                Visit & Contact
              </span>
              <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal leading-tight">
                Kunjungi Kami di Senopati
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-light mt-2">
                Berlokasi strategis di jantung Jakarta Selatan dengan akses mudah, suasana asri, dan fasilitas parkir luas.
              </p>
            </div>

            {/* Address & Quick Copy */}
            <div className="bg-brand-cream/80 p-5 rounded-2xl border border-brand-beige shadow-xs space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-cream text-brand-charcoal flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                    Alamat Lengkap
                  </p>
                  <p className="text-xs text-gray-600 font-light mt-0.5 leading-relaxed">
                    {CAFE_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-brand-cream">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="flex-1 bg-brand-ivory hover:bg-brand-cream text-brand-charcoal text-[11px] font-semibold py-2 px-3 rounded-lg border border-brand-beige transition-colors flex items-center justify-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-brand-charcoal" /> Alamat Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Salin Alamat
                    </>
                  )}
                </button>

                <a
                  href={CAFE_INFO.mapsDirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-brand-charcoal hover:bg-black text-brand-ivory text-[11px] font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" /> Petunjuk Arah
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-brand-cream/80 p-5 rounded-2xl border border-brand-beige shadow-xs space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-cream text-brand-charcoal flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                    Jam Operasional
                  </p>
                  <div className="mt-1 space-y-0.5 text-xs text-gray-600">
                    <p className="flex items-center justify-between gap-4">
                      <span className="text-gray-500">Senin – Jumat:</span>
                      <span className="font-semibold text-brand-charcoal">{CAFE_INFO.hoursWeekday}</span>
                    </p>
                    <p className="flex items-center justify-between gap-4">
                      <span className="text-gray-500">Sabtu & Minggu:</span>
                      <span className="font-semibold text-brand-charcoal">{CAFE_INFO.hoursWeekend}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone & Email contacts */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <a
                href={`tel:${CAFE_INFO.phone.replace(/[^0-9+]/g, '')}`}
                className="bg-brand-cream/60 hover:bg-brand-cream p-3.5 rounded-xl border border-brand-beige flex items-center gap-2.5 text-brand-charcoal transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-charcoal shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-gray-400 block uppercase">Telepon</span>
                  <span className="font-semibold truncate">{CAFE_INFO.phone}</span>
                </div>
              </a>

              <a
                href={`mailto:${CAFE_INFO.email}`}
                className="bg-brand-cream/60 hover:bg-brand-cream p-3.5 rounded-xl border border-brand-beige flex items-center gap-2.5 text-brand-charcoal transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-charcoal shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-gray-400 block uppercase">Email</span>
                  <span className="font-semibold truncate">{CAFE_INFO.email}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Map */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-brand-beige h-[420px] sm:h-[480px] relative bg-brand-cream">
              <iframe
                title="Élysée Café Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2736136531946!2d106.8082!3d-6.2276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMzkuNCJTIDEwNsKwNDgnMjkuNSJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Float Map Card */}
              <div className="absolute top-4 left-4 bg-brand-cream/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-brand-beige max-w-xs pointer-events-auto">
                <p className="font-serif-title text-sm font-bold text-brand-charcoal">
                  Élysée Café & Bistro
                </p>
                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                  Jl. Senopati No. 88, Kebayoran Baru
                </p>
                <a
                  href={CAFE_INFO.mapsDirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-charcoal mt-1.5 hover:underline"
                >
                  Buka di Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
