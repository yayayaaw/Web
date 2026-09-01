import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Copy, Check, Navigation, ExternalLink } from 'lucide-react';
import { copyToClipboard } from '../utils/formatters';
import { useContent } from '../lib/contentStore';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const contact = useContent('contact');

  const handleCopyAddress = async () => {
    const ok = await copyToClipboard(contact.address);
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
                Kunjungi Kami
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-light mt-2">
                Berlokasi strategis dengan akses mudah, suasana asri, dan fasilitas parkir luas.
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
                    {contact.address}
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
                  href={contact.mapsEmbedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-brand-charcoal hover:bg-black text-brand-ivory text-[11px] font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" /> Petunjuk Arah
                </a>
              </div>
            </div>

            {/* Phone & Email contacts */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="bg-brand-cream/60 hover:bg-brand-cream p-3.5 rounded-xl border border-brand-beige flex items-center gap-2.5 text-brand-charcoal transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-charcoal shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-gray-400 block uppercase">WhatsApp</span>
                  <span className="font-semibold truncate">{contact.whatsapp}</span>
                </div>
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="bg-brand-cream/60 hover:bg-brand-cream p-3.5 rounded-xl border border-brand-beige flex items-center gap-2.5 text-brand-charcoal transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-charcoal shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-gray-400 block uppercase">Email</span>
                  <span className="font-semibold truncate">{contact.email}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Map */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-brand-beige h-[420px] sm:h-[480px] relative bg-brand-cream">
              <iframe
                title="Élysée Café Location"
                src={contact.mapsEmbedUrl}
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
                  {contact.address}
                </p>
                <a
                  href={contact.mapsEmbedUrl}
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
