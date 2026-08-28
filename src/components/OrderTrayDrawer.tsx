import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, UtensilsCrossed, Clock } from 'lucide-react';
import { CartItem } from '../types';
import { formatRupiah, generateCartWhatsApp } from '../utils/formatters';

interface OrderTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const OrderTrayDrawer: React.FC<OrderTrayDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableOrTime, setTableOrTime] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  if (!isOpen) return null;

  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;
    const url = generateCartWhatsApp(items, orderType, tableOrTime, additionalNotes);
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-brand-ivory h-full shadow-2xl flex flex-col justify-between border-l border-brand-beige overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-brand-cream bg-brand-cream flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-brown">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl font-bold text-brand-charcoal">
                Baki Pesanan Anda
              </h3>
              <p className="text-xs text-gray-500">
                {totalItems} item dipilih
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup Baki"
            className="w-9 h-9 rounded-full hover:bg-brand-cream flex items-center justify-center text-gray-400 hover:text-brand-charcoal transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-brand-cream/60 flex items-center justify-center text-brand-brown/50">
                <UtensilsCrossed className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif-title text-xl font-medium text-brand-charcoal">
                  Baki Pesanan Kosong
                </h4>
                <p className="text-xs text-gray-500 max-w-xs mt-1">
                  Jelajahi sajian kopi artisan, hidangan lezat, dan dessert di menu kami untuk menambahkan pesanan.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-xs uppercase tracking-wider font-semibold text-brand-brown hover:text-brand-darkBrown border-b border-brand-brown pb-0.5"
              >
                Lihat Menu Sekarang &rarr;
              </button>
            </div>
          ) : (
            <>
              {/* Order items list */}
              <div className="space-y-3">
                {items.map(({ item, quantity, notes }) => (
                  <div
                    key={item.id}
                    className="bg-brand-cream/80 p-3.5 rounded-2xl border border-brand-cream shadow-xs flex items-center gap-3.5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-brand-charcoal truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="Hapus item"
                          className="text-gray-400 hover:text-brand-charcoal p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-brand-brown">
                        {formatRupiah(item.price)}
                      </p>
                      {notes && (
                        <p className="text-[10px] text-gray-500 italic truncate mt-0.5">
                          "{notes}"
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2 pt-1">
                        <div className="flex items-center gap-2 bg-brand-cream/60 px-2 py-0.5 rounded-full border border-brand-beige/50">
                          <button
                            onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                            className="w-5 h-5 rounded-full bg-brand-cream text-gray-700 flex items-center justify-center hover:bg-brand-beige"
                            aria-label="Kurangi"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-brand-charcoal min-w-3 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                            className="w-5 h-5 rounded-full bg-brand-cream text-gray-700 flex items-center justify-center hover:bg-brand-beige"
                            aria-label="Tambah"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-brand-charcoal">
                          {formatRupiah(item.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options */}
              <div className="bg-brand-cream/80 p-4 rounded-2xl border border-brand-cream space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal">
                  Tipe Pemesanan
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                      orderType === 'dine-in'
                        ? 'bg-brand-charcoal text-brand-cream shadow-xs'
                        : 'bg-brand-cream text-brand-charcoal hover:bg-brand-beige'
                    }`}
                  >
                    Dine-In (Di Tempat)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                      orderType === 'takeaway'
                        ? 'bg-brand-charcoal text-brand-cream shadow-xs'
                        : 'bg-brand-cream text-brand-charcoal hover:bg-brand-beige'
                    }`}
                  >
                    Takeaway (Bungkus)
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-500 font-medium mb-1">
                    {orderType === 'dine-in' ? 'Nomor Meja Anda' : 'Estimasi Jam Pengambilan'}
                  </label>
                  <input
                    type="text"
                    value={tableOrTime}
                    onChange={(e) => setTableOrTime(e.target.value)}
                    placeholder={orderType === 'dine-in' ? 'Contoh: Meja 12 atau Mezanin' : 'Contoh: Pukul 14:30'}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-brand-ivory border border-brand-cream focus:border-brand-brown focus:ring-0 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-500 font-medium mb-1">
                    Catatan Pesanan Keseluruhan
                  </label>
                  <input
                    type="text"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Contoh: Tolong disajikan bersamaan..."
                    className="w-full text-xs px-3 py-2 rounded-xl bg-brand-ivory border border-brand-cream focus:border-brand-brown focus:ring-0 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-[11px] text-gray-400 hover:text-brand-charcoal transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Kosongkan Baki
                </button>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-brand-cream bg-brand-cream space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-gray-500">Estimasi Total</span>
                <p className="font-serif-title text-2xl font-bold text-brand-charcoal">
                  {formatRupiah(subtotal)}
                </p>
              </div>
              <span className="text-[11px] text-gray-400">Harga sudah termasuk pajak</span>
            </div>

            <button
              onClick={handleSendWhatsApp}
              className="w-full bg-brand-charcoal hover:bg-black text-brand-ivory text-xs font-semibold uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <MessageSquare className="w-4 h-4 text-brand-ivory" /> Kirim Pesanan via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
