import React from 'react';
import { X, CheckCircle2, Calendar, Clock, Users, MapPin, MessageSquare, Copy, Check } from 'lucide-react';
import { ReservationData } from '../../types';
import { generateReservationWhatsApp, copyToClipboard } from '../../utils/formatters';

interface ReservationSuccessModalProps {
  reservation: ReservationData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  reservation,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !reservation) return null;

  const [copied, setCopied] = React.useState(false);

  const handleCopySummary = async () => {
    const summary = `RESERVASI ÉLYSÉE CAFÉ\nNama: ${reservation.name}\nWhatsApp: ${reservation.phone}\nTanggal: ${reservation.date}\nJam: ${reservation.time} WIB\nTamu: ${reservation.guests}\nArea: ${reservation.area}\nCatatan: ${reservation.notes || '-'}`;
    const ok = await copyToClipboard(summary);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenWhatsApp = () => {
    const url = generateReservationWhatsApp(reservation);
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-brand-cream rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-brand-charcoal/20 animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-5 right-5 text-brand-charcoal/60 hover:text-brand-charcoal w-9 h-9 rounded-full hover:bg-brand-charcoal/10 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-16 h-16 rounded-full bg-brand-cream text-brand-charcoal border border-brand-charcoal/20 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal">
            Permintaan Reservasi Tercatat
          </span>
          <h3 className="font-serif-title text-3xl font-bold text-brand-charcoal">
            Terima Kasih, {reservation.name.split(' ')[0]}!
          </h3>
          <p className="text-xs text-brand-charcoal/70 max-w-xs mx-auto">
            Reservasi meja Anda telah dibuat. Konfirmasi detail dapat langsung diverifikasi melalui WhatsApp tim reservasi kami.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-brand-cream rounded-2xl p-5 border border-brand-charcoal/20 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-brand-charcoal/15">
            <span className="text-xs font-semibold text-brand-charcoal">Élysée Café & Bistro</span>
            <span className="text-[10px] bg-brand-cream text-brand-charcoal font-bold px-2 py-0.5 rounded border border-brand-charcoal/20">
              Pending Confirmation
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-brand-charcoal/60 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-brand-charcoal" /> Tanggal
              </span>
              <p className="font-semibold text-brand-charcoal">{reservation.date}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-brand-charcoal/60 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3 text-brand-charcoal" /> Jam Kedatangan
              </span>
              <p className="font-semibold text-brand-charcoal">{reservation.time} WIB</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-brand-charcoal/60 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3 h-3 text-brand-charcoal" /> Jumlah Tamu
              </span>
              <p className="font-semibold text-brand-charcoal">{reservation.guests}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-brand-charcoal/60 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-charcoal" /> Pilihan Area
              </span>
              <p className="font-semibold text-brand-charcoal text-[11px] leading-tight">
                {reservation.area}
              </p>
            </div>
          </div>

          {reservation.notes && (
            <div className="pt-2 border-t border-brand-charcoal/10 text-[11px] text-brand-charcoal/70">
              <span className="font-medium text-brand-charcoal">Catatan:</span> {reservation.notes}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleOpenWhatsApp}
            className="w-full bg-brand-charcoal text-brand-cream text-xs font-semibold uppercase tracking-widest py-3.5 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-brand-cream" /> Buka WhatsApp & Kirim Detail
          </button>

          <button
            onClick={handleCopySummary}
            className="w-full bg-brand-cream text-brand-charcoal hover:bg-brand-charcoal/10 text-xs font-medium uppercase tracking-wider py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-brand-charcoal/20"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand-charcoal" /> Tersalin ke Clipboard
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Salin Ringkasan Reservasi
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full text-center text-xs text-brand-charcoal/60 hover:text-brand-charcoal py-1.5"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
