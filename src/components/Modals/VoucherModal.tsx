import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, MessageSquare, Percent } from 'lucide-react';
import { PromoItem } from '../../types';
import { copyToClipboard, createWhatsAppUrl } from '../../utils/formatters';

interface VoucherModalProps {
  promo: PromoItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ promo, isOpen, onClose }) => {
  if (!isOpen || !promo) return null;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(promo.discountCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClaimViaWhatsApp = () => {
    const text = `Halo Élysée Café & Bistro,\n\nSaya ingin mengklaim Voucher Promo:\n*Kode Voucher:* ${promo.discountCode}\n*Promo:* ${promo.title} (Diskon ${promo.discountPercentage}%)\n\nMohon bantuannya saat saya berkunjung nanti. Terima kasih!`;
    window.open(createWhatsAppUrl(text), '_blank');
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

        {/* Voucher Top */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-brand-cream text-brand-charcoal mx-auto flex items-center justify-center border border-brand-charcoal/20">
            <Percent className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal">
            Klaim Voucher Digital
          </span>
          <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-brand-charcoal">
            {promo.title}
          </h3>
          <p className="text-xs text-brand-charcoal/70">
            {promo.validDays}
          </p>
        </div>

        {/* Voucher Coupon Box */}
        <div className="relative bg-brand-cream p-5 rounded-2xl border-2 border-dashed border-brand-charcoal/30 text-center space-y-2 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-brand-charcoal/70 tracking-widest">
            KODE VOUCHER ANDA
          </span>
          <div className="flex items-center justify-center gap-2">
            <span className="font-mono text-xl sm:text-2xl font-bold text-brand-charcoal tracking-wider bg-brand-cream px-4 py-1.5 rounded-lg border border-brand-charcoal/25 select-all">
              {promo.discountCode}
            </span>
            <button
              onClick={handleCopy}
              className="p-2.5 bg-brand-charcoal hover:bg-black text-brand-cream rounded-lg transition-colors shadow-sm"
              title="Salin Kode"
              aria-label="Salin Kode"
            >
              {copied ? <Check className="w-4 h-4 text-brand-cream" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          {copied && (
            <p className="text-[11px] text-brand-charcoal font-semibold flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5" /> Berhasil disalin ke clipboard!
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="bg-brand-cream rounded-xl p-4 border border-brand-charcoal/15 text-xs text-brand-charcoal/80 space-y-1.5">
          <p className="font-semibold text-brand-charcoal text-[11px] uppercase tracking-wider">
            Syarat & Ketentuan:
          </p>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-brand-charcoal/70">
            {promo.terms.map((term, i) => (
              <li key={i}>{term}</li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={handleClaimViaWhatsApp}
            className="w-full bg-brand-charcoal text-brand-cream text-xs font-semibold uppercase tracking-widest py-3.5 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-brand-cream" /> Simpan & Klaim via WhatsApp
          </button>
          <button
            onClick={onClose}
            className="w-full text-center text-xs text-brand-charcoal/70 hover:text-brand-charcoal py-2 font-medium"
          >
            Tutup & Kembali
          </button>
        </div>
      </div>
    </div>
  );
};
