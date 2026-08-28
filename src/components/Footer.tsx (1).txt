import React, { useState } from 'react';
import { Instagram, Mail, Phone, MapPin, ArrowUp, Send, CheckCircle2, Heart } from 'lucide-react';
import { CAFE_INFO } from '../data/mockData';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: PageId) => {
    onNavigate(page);
  };

  return (
    <footer className="bg-brand-charcoal text-brand-ivory pt-16 pb-12 border-t border-brand-cream/15 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-brand-cream/15">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('home')}
                className="text-left font-serif-title text-3xl font-bold tracking-wider uppercase text-brand-cream hover:text-brand-beige transition-colors"
              >
                {CAFE_INFO.name}
              </button>
              <span className="text-xs tracking-[0.3em] font-sans font-light uppercase border-l border-brand-cream/30 pl-2 text-brand-beige">
                Café & Bistro
              </span>
            </div>

            <p className="text-xs text-gray-300 font-light leading-relaxed max-w-sm">
              Tempat berteduh yang tenang dan elegan di Senopati. Menghadirkan kopi artisan single-origin, hidangan lezat, dan ruang hangat untuk setiap momen berharga Anda.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://instagram.com/${CAFE_INFO.instagram}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Élysée"
                className="w-9 h-9 rounded-full bg-brand-cream/10 hover:bg-brand-brown text-brand-cream flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${CAFE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Élysée"
                className="w-9 h-9 rounded-full bg-brand-cream/10 hover:bg-brand-cream/20 text-brand-cream flex items-center justify-center transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${CAFE_INFO.email}`}
                aria-label="Email Élysée"
                className="w-9 h-9 rounded-full bg-brand-cream/10 hover:bg-brand-brown text-brand-cream flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-beige">
              Halaman Khusus
            </h3>
            <ul className="space-y-2 text-xs text-gray-300 font-light">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-brand-beige transition-colors text-left"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-brand-beige transition-colors text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-brand-beige transition-colors text-left"
                >
                  Menu Digital
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('reservasi')}
                  className="hover:text-brand-beige transition-colors text-left"
                >
                  Reservasi Meja
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('galeri')}
                  className="hover:text-brand-beige transition-colors text-left"
                >
                  Galeri Foto
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('promo')}
                  className="hover:text-brand-beige transition-colors text-left"
                >
                  Promo & Acara
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('ulasan')}
                  className="hover:text-brand-beige transition-colors text-left"
                >
                  Ulasan & FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('kontak')}
                  className="hover:text-brand-beige transition-colors text-left"
                >
                  Lokasi & Kontak
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('karir')}
                  className="text-brand-beige font-medium hover:underline transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Karir & Lowongan</span>
                  <span className="text-[10px] bg-brand-cream/15 text-brand-ivory px-1.5 py-0.5 rounded-sm">Hiring</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-beige">
              Jam Buka & Fasilitas
            </h3>
            <div className="space-y-2 text-xs text-gray-300 font-light">
              <div>
                <p className="text-brand-cream font-medium">Senin – Jumat</p>
                <p className="text-gray-400">{CAFE_INFO.hoursWeekday}</p>
              </div>
              <div>
                <p className="text-brand-cream font-medium">Sabtu & Minggu</p>
                <p className="text-gray-400">{CAFE_INFO.hoursWeekend}</p>
              </div>
              <div className="pt-2">
                <p className="text-brand-cream font-medium">Layanan Parkir</p>
                <p className="text-brand-beige">Gratis Valet setiap hari</p>
              </div>
              <div className="pt-1">
                <button
                  onClick={() => handleNav('kontak')}
                  className="text-xs text-brand-beige hover:underline"
                >
                  Petunjuk Arah & Peta Senopati →
                </button>
              </div>
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-beige">
              Newsletter & Rewards
            </h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Daftarkan email Anda untuk info event jazz rahasia dan diskon 10% di kunjungan berikutnya.
            </p>

            {subscribed ? (
              <div className="p-3 bg-brand-cream/10 border border-brand-cream/20 rounded-xl text-xs text-brand-ivory flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-beige shrink-0" />
                <span>Terima kasih! Kode kupon <strong>ELYSEE10</strong> telah aktif untuk Anda.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Masukkan email Anda..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/10 border border-brand-cream/15 focus:border-brand-beige text-brand-cream placeholder:text-gray-400 outline-none pr-9"
                  />
                  <button
                    type="submit"
                    aria-label="Kirim Langganan"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-beige hover:text-brand-cream p-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Élysée Café & Bistro. Seluruh Hak Cipta Dilindungi.</p>

          <div className="flex items-center gap-6">
            <span>Senopati, Jakarta Selatan</span>
            <button
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="flex items-center gap-1.5 text-brand-beige hover:text-brand-cream transition-colors"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
