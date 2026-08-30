// Taruh file ini di: src/admin/tabs/PromoTab.tsx
import React, { useState } from 'react';
import { AdminPromoItem } from '../adminTypes';

const SEED_PROMO: AdminPromoItem[] = [
  { id: '1', title: 'Weekend Brew Pairing', badge: 'Voucher Diskon', description: 'Diskon 20% pembelian kopi + dessert setiap Sabtu & Minggu.', validUntil: '31 Des 2026' },
];

export function PromoTab() {
  const [items, setItems] = useState<AdminPromoItem[]>(SEED_PROMO);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', badge: '', description: '', validUntil: '' });

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setItems([{ id: Date.now().toString(), ...form }, ...items]);
    setForm({ title: '', badge: '', description: '', validUntil: '' });
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    if (confirm('Hapus promo ini?')) setItems(items.filter(i => i.id !== id));
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Promo & Event</h3>
          <p className="text-xs text-gray-500">Atur diskon atau event tiket.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="bg-[#1A1A1A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl">
          + Buat Promo Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.length === 0 && <p className="col-span-full text-center text-gray-400 py-6">Belum ada promo/event.</p>}
        {items.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-4">
            <div>
              <span className="bg-amber-100 text-amber-800 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full">{item.badge}</span>
              <h4 className="text-2xl font-bold text-[#1A1A1A] mt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.title}</h4>
            </div>
            <p className="text-xs text-gray-500">{item.description}</p>
            <div className="flex justify-between items-center text-xs pt-4 border-t border-[#F4EFE6] text-gray-400">
              <span>Berlaku s/d: {item.validUntil}</span>
              <button onClick={() => handleDelete(item.id)} className="hover:text-red-600"><i className="fa-solid fa-trash"></i> Hapus</button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative border border-[#E6DEC8]">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400"><i className="fa-solid fa-xmark text-xl"></i></button>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Buat Promo / Event</h3>
            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Judul *</label>
                <input required className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Badge (mis: Voucher Diskon / Event Tiket)</label>
                <input className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Deskripsi</label>
                <textarea className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Berlaku Sampai</label>
                <input className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" placeholder="31 Des 2026" value={form.validUntil} onChange={e => setForm({ ...form, validUntil: e.target.value })} />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="w-1/2 py-3 rounded-xl border font-bold">Batal</button>
                <button type="submit" className="w-1/2 py-3 rounded-xl bg-[#1A1A1A] text-white font-bold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
