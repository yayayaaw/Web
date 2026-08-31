// Taruh file ini di: src/admin/tabs/SanctuaryTab.tsx
import React, { useState } from 'react';
import { getContent, setContent, SanctuaryCard } from '../../lib/contentStore';
import { ImagePicker } from '../components/ImagePicker';

export function SanctuaryTab() {
  const [cards, setCards] = useState<SanctuaryCard[]>(() => getContent().sanctuaryCards);

  function updateCard(id: string, patch: Partial<SanctuaryCard>) {
    setCards(prev => prev.map(c => (c.id === id ? { ...c, ...patch } : c)));
  }

  function handleSaveAll() {
    setContent('sanctuaryCards', cards);
    alert('4 kartu "Sudut Ketenangan" berhasil disimpan! Cek web utama, harusnya langsung berubah.');
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#F4EFE6] shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Sudut Ketenangan (Beranda)
          </h3>
          <p className="text-xs text-gray-500">4 kartu suasana di section "Sudut-Sudut Ketenangan" homepage. Jumlah kartu tetap 4, tapi isinya bisa diganti bebas.</p>
        </div>
        <button onClick={handleSaveAll} className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-800 shrink-0">
          Simpan Semua
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cards.map((card, idx) => (
          <div key={card.id} className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6F4E37]">Kartu #{idx + 1}</span>
            <ImagePicker
              label="Foto"
              value={card.image}
              onChange={url => updateCard(card.id, { image: url })}
              aspectRatio="4/3"
            />
            <div>
              <label className="block font-semibold mb-1 text-xs">Tag/Badge</label>
              <input
                className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none text-xs"
                value={card.tag}
                onChange={e => updateCard(card.id, { tag: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-xs">Judul</label>
              <input
                className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none text-xs"
                value={card.title}
                onChange={e => updateCard(card.id, { title: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-xs">Subjudul</label>
              <input
                className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none text-xs"
                value={card.subtitle}
                onChange={e => updateCard(card.id, { subtitle: e.target.value })}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
