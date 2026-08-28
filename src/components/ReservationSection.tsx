import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, MessageSquare, CheckCircle, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { ReservationData } from '../types';
import { CAFE_INFO } from '../data/mockData';

interface ReservationSectionProps {
  onReservationSuccess: (res: ReservationData) => void;
  recentReservation: ReservationData | null;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationSuccess,
  recentReservation,
}) => {
  // Tomorrow date default for convenience
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    email: '',
    date: defaultDate,
    time: '18:30',
    guests: '2 Orang',
    area: 'Indoor Main Hall (Non-Smoking)',
    notes: '',
  });

  const areas = [
    {
      id: 'Indoor Main Hall (Non-Smoking)',
      title: 'Indoor Hall',
      subtitle: 'AC dingin, musik tenang & sofa ergonomis',
    },
    {
      id: 'Outdoor Garden Patio (Smoking Friendly)',
      title: 'Garden Patio',
      subtitle: 'Udara terbuka, tanaman hijau & semi-covered',
    },
    {
      id: 'VIP Mezzanine Lounge (Lantai 2)',
      title: 'VIP Mezzanine',
      subtitle: 'Privat, tenang, cocok untuk meeting / gathering',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    onReservationSuccess(formData);
  };

  return (
    <section id="reservation" className="py-20 md:py-32 bg-brand-ivory relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-brand-cream/80 p-7 sm:p-10 rounded-3xl border border-brand-beige shadow-sm">
            <div className="mb-8 space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-brown font-semibold block">
                Table Booking
              </span>
              <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-brand-charcoal">
                Reservasi Meja Anda
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-light">
                Amankan tempat terbaik Anda untuk menikmati momen santai, jamuan bisnis, maupun perayaan hangat bersama orang terdekat.
              </p>
            </div>

            {/* If user already has recent reservation */}
            {recentReservation && (
              <div className="mb-6 p-4 rounded-2xl bg-brand-cream border border-brand-charcoal/20 text-xs text-brand-charcoal flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold flex items-center gap-1.5 text-brand-charcoal">
                    <CheckCircle className="w-4 h-4 text-brand-charcoal" /> Reservasi Anda Tercatat
                  </p>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    {recentReservation.date} pukul {recentReservation.time} WIB ({recentReservation.guests}) di {recentReservation.area}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onReservationSuccess(recentReservation)}
                  className="text-[11px] font-bold text-brand-charcoal underline shrink-0 hover:opacity-75"
                >
                  Lihat Tiket &rarr;
                </button>
              </div>
            )}

            <form id="reservationForm" onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                    Nama Pemesan *
                  </label>
                  <input
                    type="text"
                    id="resName"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs px-4 py-3 rounded-xl bg-brand-ivory border border-brand-cream focus:border-brand-brown focus:ring-0 outline-none transition-colors"
                    placeholder="Contoh: Maya Putri"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    id="resPhone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-4 py-3 rounded-xl bg-brand-ivory border border-brand-cream focus:border-brand-brown focus:ring-0 outline-none transition-colors"
                    placeholder="0812-xxxx-xxxx"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                    Tanggal Kunjungan *
                  </label>
                  <input
                    type="date"
                    id="resDate"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 rounded-xl bg-brand-ivory border border-brand-cream focus:border-brand-brown focus:ring-0 outline-none transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                    Waktu / Jam *
                  </label>
                  <select
                    id="resTime"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 rounded-xl bg-brand-ivory border border-brand-cream focus:border-brand-brown focus:ring-0 outline-none transition-colors font-medium"
                  >
                    <option value="09:00">09:00 WIB (Morning Coffee)</option>
                    <option value="11:30">11:30 WIB (Lunch Hour)</option>
                    <option value="13:00">13:00 WIB (Afternoon Session)</option>
                    <option value="15:30">15:30 WIB (Golden Afternoon Tea)</option>
                    <option value="17:00">17:00 WIB (Sunset Chill)</option>
                    <option value="18:30">18:30 WIB (Dinner Session)</option>
                    <option value="20:00">20:00 WIB (Evening Bistro)</option>
                    <option value="21:30">21:30 WIB (Night Owl)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                    Jumlah Tamu *
                  </label>
                  <select
                    id="resGuests"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 rounded-xl bg-brand-ivory border border-brand-cream focus:border-brand-brown focus:ring-0 outline-none transition-colors font-medium"
                  >
                    <option value="1 Orang">1 Orang (Solo Work / Quiet Time)</option>
                    <option value="2 Orang">2 Orang (Pasangan / Teman)</option>
                    <option value="3-4 Orang">3 - 4 Orang (Keluarga / Sahabat)</option>
                    <option value="5-8 Orang">5 - 8 Orang (Rombongan Meja Panjang)</option>
                    <option value="> 8 Orang">&gt; 8 Orang (Private Gathering)</option>
                  </select>
                </div>
              </div>

              {/* Seating Area Selection Cards */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-2">
                  Pilih Suasana & Area Duduk *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {areas.map((area) => {
                    const isSelected = formData.area === area.id;
                    return (
                      <div
                        key={area.id}
                        onClick={() => setFormData({ ...formData, area: area.id })}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-brand-brown bg-brand-cream/70 shadow-xs'
                            : 'border-brand-cream bg-brand-ivory/50 hover:bg-brand-cream/30'
                        }`}
                      >
                        <div className="mb-1">
                          <span className="font-serif-title font-bold text-sm text-brand-charcoal">
                            {area.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-light leading-tight">
                          {area.subtitle}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                  Permintaan Khusus (Opsional)
                </label>
                <textarea
                  id="resNotes"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Contoh: Mohon meja dekat stopkontak, ada perayaan ulang tahun kecil, baby chair..."
                  className="w-full text-xs p-3.5 rounded-xl bg-brand-ivory border border-brand-cream focus:border-brand-brown focus:ring-0 outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-charcoal text-brand-cream text-xs font-semibold uppercase tracking-widest py-4 rounded-xl hover:bg-brand-brown transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Konfirmasi Reservasi Meja</span>
              </button>
            </form>
          </div>

          {/* Right Column: Why Reserve & Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-cream/60 rounded-3xl p-8 border border-brand-beige space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-brand-brown font-semibold block">
                  Keuntungan Reservasi
                </span>
                <h3 className="font-serif-title text-2xl font-bold text-brand-charcoal">
                  Pengalaman Berkunjung yang Tanpa Hambatan
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-brown text-brand-cream flex items-center justify-center shrink-0 shadow-xs">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                      Meja Terbaik Dijamin Tersedia
                    </h4>
                    <p className="text-xs text-gray-500 font-light leading-relaxed mt-0.5">
                      Meja favorit Anda disterilkan dan disiapkan secara khusus sebelum jam kedatangan Anda.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-brown text-brand-cream flex items-center justify-center shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                      Pelayanan Prioritas
                    </h4>
                    <p className="text-xs text-gray-500 font-light leading-relaxed mt-0.5">
                      Disambut langsung oleh staf dan barista kami tanpa perlu mengantre di jam-jam sibuk.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-brown text-brand-cream flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                      Toleransi Waktu 15 Menit
                    </h4>
                    <p className="text-xs text-gray-500 font-light leading-relaxed mt-0.5">
                      Kami menjaga meja Anda hingga 15 menit dari jam yang telah ditentukan apabila terjadi kendala di jalan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-brand-beige">
                <p className="text-xs text-gray-600 mb-3">
                  Butuh bantuan cepat atau reservasi rombongan khusus di atas 10 orang?
                </p>
                <a
                  href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Halo%20Élysée,%20saya%20ingin%20tanya%20mengenai%20reservasi%20meja`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-brand-charcoal bg-brand-cream hover:bg-brand-beige px-4 py-2.5 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-brand-charcoal" /> Chat Tim Concierge via WhatsApp
                </a>
              </div>
            </div>

            {/* Ambiance guarantee */}
            <div className="bg-brand-charcoal text-brand-ivory p-6 rounded-3xl space-y-2">
              <p className="text-brand-beige text-[11px] uppercase tracking-widest font-semibold">
                Privasi & Ketenangan Terjamin
              </p>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Tata letak meja diatur berjarak dengan akustik lembut untuk memastikan setiap perbincangan pribadi maupun pertemuan Anda berlangsung khidmat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
