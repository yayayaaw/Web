import React, { useState } from 'react';
import { X, Calendar, Clock, Ticket, User, Phone, CheckCircle2, MessageSquare } from 'lucide-react';
import { EventItem } from '../../types';
import { formatRupiah, generateTicketWhatsApp } from '../../utils/formatters';

interface TicketModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(2);
  const [seatArea, setSeatArea] = useState('Front Stage (Intimate View)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const totalPrice = event.pricePerPax * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const waUrl = generateTicketWhatsApp(event.title, name, phone, quantity, totalPrice);
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setQuantity(2);
    onClose();
  };

  return (
    <div
      id="ticketModal"
      onClick={handleResetAndClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-brand-cream rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-brand-charcoal/20 my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          id="closeTicketModalBtn"
          onClick={handleResetAndClose}
          aria-label="Tutup Modal"
          className="absolute top-5 right-5 text-brand-charcoal/60 hover:text-brand-charcoal w-9 h-9 rounded-full hover:bg-brand-charcoal/10 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-cream text-brand-charcoal border border-brand-charcoal/20 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-serif-title text-3xl font-bold text-brand-charcoal">
              Pesanan Tiket Dikirim!
            </h3>
            <p className="text-xs text-brand-charcoal/80 leading-relaxed max-w-sm mx-auto">
              Permintaan tiket untuk <strong>{name}</strong> ({quantity} pax) telah diarahkan ke WhatsApp staf kami. Kami akan mengirimkan detail e-ticket & kode pembayaran segera.
            </p>
            <div className="bg-brand-cream rounded-2xl p-4 text-left text-xs space-y-1.5 border border-brand-charcoal/15">
              <div className="flex justify-between">
                <span className="text-brand-charcoal/60">Acara:</span>
                <span className="font-medium text-brand-charcoal">{event.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-charcoal/60">Jadwal:</span>
                <span className="font-medium text-brand-charcoal">{event.dateStr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-charcoal/60">Area Meja:</span>
                <span className="font-medium text-brand-charcoal">{seatArea}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-brand-charcoal/10 text-sm font-bold text-brand-charcoal">
                <span>Total Biaya:</span>
                <span>{formatRupiah(totalPrice)}</span>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="w-full bg-brand-charcoal text-brand-cream text-xs font-semibold uppercase tracking-widest py-3.5 rounded-xl hover:bg-black transition-colors"
            >
              Selesai & Tutup
            </button>
          </div>
        ) : (
          <>
            {/* Header info */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal inline-flex items-center gap-1.5 mb-1">
                <Ticket className="w-3.5 h-3.5" /> Pesan Tiket Eksklusif
              </span>
              <h3 id="modalEventTitle" className="font-serif-title text-2xl sm:text-3xl font-bold text-brand-charcoal">
                {event.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-brand-charcoal/70 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-charcoal" /> {event.dateStr}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-charcoal" /> {event.timeStr}
                </span>
              </div>
            </div>

            {/* Price badge */}
            <div className="bg-brand-cream rounded-2xl p-4 border border-brand-charcoal/15 flex items-center justify-between">
              <div>
                <p className="text-xs text-brand-charcoal/60">Harga Tiket per Orang</p>
                <p id="modalEventPrice" className="text-xl font-bold text-brand-charcoal font-serif-title">
                  {formatRupiah(event.pricePerPax)} <span className="text-xs font-normal text-brand-charcoal/70 font-sans">/ pax</span>
                </p>
              </div>
              <div className="text-right text-[11px] text-brand-charcoal/70">
                Termasuk Welcome Drink & Snack
              </div>
            </div>

            {/* Form */}
            <form id="ticketForm" className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                  Nama Lengkap *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-brand-charcoal/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="ticketName"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-3 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal focus:ring-0 outline-none transition-colors text-brand-charcoal placeholder:text-brand-charcoal/40"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                  Nomor WhatsApp Aktif *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-brand-charcoal/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    id="ticketPhone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-3 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal focus:ring-0 outline-none transition-colors text-brand-charcoal placeholder:text-brand-charcoal/40"
                    placeholder="0812-3456-7890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                    Jumlah Tiket
                  </label>
                  <select
                    id="ticketQty"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full text-xs px-3 py-3 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal focus:ring-0 outline-none transition-colors font-medium text-brand-charcoal"
                  >
                    <option value={1}>1 Orang ({formatRupiah(event.pricePerPax * 1)})</option>
                    <option value={2}>2 Orang ({formatRupiah(event.pricePerPax * 2)})</option>
                    <option value={3}>3 Orang ({formatRupiah(event.pricePerPax * 3)})</option>
                    <option value={4}>4 Orang ({formatRupiah(event.pricePerPax * 4)})</option>
                    <option value={5}>5 Orang ({formatRupiah(event.pricePerPax * 5)})</option>
                    <option value={6}>6 Orang ({formatRupiah(event.pricePerPax * 6)})</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                    Pilihan Posisi Duduk
                  </label>
                  <select
                    value={seatArea}
                    onChange={(e) => setSeatArea(e.target.value)}
                    className="w-full text-xs px-3 py-3 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal focus:ring-0 outline-none transition-colors text-brand-charcoal"
                  >
                    <option value="Front Stage (Dekat Musik)">Front Stage (Dekat Musik)</option>
                    <option value="Center Bistro Hall">Center Bistro Hall</option>
                    <option value="Mezzanine VIP (Balkon)">Mezzanine VIP (Balkon)</option>
                    <option value="Semi-Outdoor Terrace">Semi-Outdoor Terrace</option>
                  </select>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-2 border-t border-brand-charcoal/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-brand-charcoal/60 uppercase tracking-wider">Total Pembayaran</span>
                  <p className="text-xl font-bold text-brand-charcoal font-serif-title">
                    {formatRupiah(totalPrice)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[10px] bg-brand-cream text-brand-charcoal font-semibold px-2.5 py-1 rounded-full border border-brand-charcoal/20">
                    {quantity} Tiket Termasuk Minum
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-charcoal text-brand-cream text-xs font-semibold uppercase tracking-widest py-3.5 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <MessageSquare className="w-4 h-4 text-brand-cream" /> Konfirmasi via WhatsApp
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
