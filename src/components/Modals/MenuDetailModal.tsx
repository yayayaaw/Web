import React, { useState } from 'react';
import { X, Plus, Minus, MessageSquare, Check, Flame, Leaf } from 'lucide-react';
import { MenuItem } from '../../types';
import { formatRupiah, generateItemOrderWhatsApp } from '../../utils/formatters';

interface MenuDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, notes?: string) => void;
}

export const MenuDetailModal: React.FC<MenuDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(1);
  const [specialNote, setSpecialNote] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(item, quantity, specialNote.trim() || undefined);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  };

  const handleWhatsAppOrder = () => {
    const url = generateItemOrderWhatsApp(item.name, item.price);
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
        className="bg-brand-cream rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-brand-charcoal/20 my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-brand-charcoal">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <button
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-brand-cream flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-brand-cream">
            <span className="text-[10px] uppercase tracking-widest text-brand-cream/80 font-semibold">
              Kategori: {item.category.toUpperCase()}
            </span>
            <div className="flex justify-between items-end gap-3 mt-1">
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold">
                {item.name}
              </h3>
              <p className="font-serif-title text-2xl font-bold text-brand-cream shrink-0">
                {formatRupiah(item.price)}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Description */}
          <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light leading-relaxed">
            {item.description}
          </p>

          {/* Meta Info */}
          {(item.calories || item.isVegetarian) && (
            <div className="flex flex-wrap items-center gap-3 text-xs text-brand-charcoal/70 pt-1">
              {item.calories && (
                <span className="flex items-center gap-1.5 text-brand-charcoal">
                  <Flame className="w-3.5 h-3.5 text-brand-charcoal" /> {item.calories}
                </span>
              )}
              {item.isVegetarian && (
                <span className="flex items-center gap-1.5 text-brand-charcoal font-medium">
                  <Leaf className="w-3.5 h-3.5 text-brand-charcoal" /> Vegetarian Friendly
                </span>
              )}
            </div>
          )}

          {/* Tasting Notes */}
          {item.tastingNotes && item.tastingNotes.length > 0 && (
            <div className="bg-brand-cream rounded-2xl p-4 border border-brand-charcoal/15 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal">
                Tasting Notes / Profil Rasa:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-brand-cream text-brand-charcoal px-2.5 py-1 rounded-lg border border-brand-charcoal/20 shadow-xs font-medium"
                  >
                    • {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="space-y-1.5 text-xs text-brand-charcoal/70">
              <span className="font-semibold text-brand-charcoal uppercase tracking-wider text-[10px]">
                Komposisi Bahan Pilihan:
              </span>
              <p className="font-light italic text-brand-charcoal/80">
                {item.ingredients.join(', ')}
              </p>
            </div>
          )}

          {/* Custom Note input */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-charcoal">
              Catatan Khusus (Opsional)
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="Contoh: Less sugar, oat milk, tanpa es, saus dipisah..."
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal focus:ring-0 outline-none transition-colors text-brand-charcoal placeholder:text-brand-charcoal/40"
            />
          </div>

          {/* Quantity and Actions */}
          <div className="pt-4 border-t border-brand-charcoal/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-brand-cream px-3 py-1.5 rounded-full border border-brand-charcoal/20">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Kurangi"
                className="w-7 h-7 rounded-full bg-brand-cream text-brand-charcoal border border-brand-charcoal/20 flex items-center justify-center shadow-xs hover:bg-brand-charcoal/10 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-brand-charcoal">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Tambah"
                className="w-7 h-7 rounded-full bg-brand-cream text-brand-charcoal border border-brand-charcoal/20 flex items-center justify-center shadow-xs hover:bg-brand-charcoal/10 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 sm:flex-initial bg-brand-charcoal text-brand-cream hover:bg-black text-xs uppercase tracking-widest font-semibold px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-brand-cream" /> Berhasil Ditambah!
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Masukkan ke Baki ({formatRupiah(item.price * quantity)})
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                title="Pesan Langsung via WhatsApp"
                aria-label="Pesan Langsung via WhatsApp"
                className="p-3 bg-brand-charcoal hover:bg-black text-brand-cream rounded-xl border border-brand-cream/20 transition-colors shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
