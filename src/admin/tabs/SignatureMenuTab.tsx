// Taruh file ini di: src/admin/tabs/SignatureMenuTab.tsx
import React, { useState } from 'react';
import { getContent, setContent, SignatureCardOverride } from '../../lib/contentStore';
import { ImagePicker } from '../components/ImagePicker';
import { PriceInput } from '../components/PriceInput';

const SIGNATURE_IDS_HINT = ['sig-1', 'sig-2', 'sig-3'];

export function SignatureMenuTab() {
  const [overrides, setOverrides] = useState<SignatureCardOverride[]>(() => getContent().signatureOverrides);

  function getOverride(id: string): SignatureCardOverride {
    return overrides.find(o => o.id === id) || { id };
  }

  function updateOverride(id: string, patch: Partial<SignatureCardOverride>) {
    setOverrides(prev => {
      const exists = prev.find(o => o.id === id);
      if (exists) return prev.map(o => (o.id === id ? { ...o, ...patch } : o));
      return [...prev, { id, ...patch }];
    });
  }

  function resetOverride(id: string) {
    if (!confirm('Kembalikan kartu ini ke data asli (hapus semua perubahan)? Ini langsung tersimpan.')) return;
    // Langsung persist ke localStorage juga -- sebelumnya cuma update state
    // form doang, jadi kalau ga sempat pencet "Simpan Semua" abis reset,
    // data lama (termasuk foto lama) tetap nyangkut & muncul lagi pas refresh.
    setOverrides(prev => {
      const updated = prev.filter(o => o.id !== id);
      setContent('signatureOverrides', updated);
      return updated;
    });
  }

  function handleSaveAll() {
    setContent('signatureOverrides', overrides);
    alert('Menu Unggulan (Cita Rasa Ikonik) berhasil disimpan!');
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#F4EFE6] shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Menu Unggulan (Cita Rasa Ikonik)
          </h3>
          <p className="text-xs text-gray-500">
            3 menu tetap yang tampil di homepage (bukan list bebas). Kosongkan field (pakai tombol ✕ di foto) = pakai data asli menu utama.
            "Reset ke Data Asli" langsung tersimpan, ga perlu pencet Simpan Semua lagi.
          </p>
        </div>
        <button onClick={handleSaveAll} className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-800 shrink-0">
          Simpan Semua
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SIGNATURE_IDS_HINT.map((id, idx) => {
          const ov = getOverride(id);
          const hasOverride = overrides.some(o => o.id === id && (o.name || o.price || o.image || o.description));
          return (
            <div key={id} className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6F4E37]">Menu Unggulan #{idx + 1}</span>
                {hasOverride && (
                  <button onClick={() => resetOverride(id)} className="text-[10px] text-red-500 hover:text-red-700 font-semibold">
                    <i className="fa-solid fa-rotate-left mr-1"></i> Reset ke Data Asli
                  </button>
                )}
              </div>
              <ImagePicker
                label="Foto (kosongkan = pakai foto asli)"
                value={ov.image || ''}
                onChange={url => updateOverride(id, { image: url })}
                aspectRatio="1/1"
              />
              <div>
                <label className="block font-semibold mb-1 text-xs">Nama Menu</label>
                <input
                  className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none text-xs"
                  placeholder="(pakai nama asli)"
                  value={ov.name || ''}
                  onChange={e => updateOverride(id, { name: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-xs">Harga (Rp)</label>
                <PriceInput
                  className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none text-xs"
                  placeholder="(pakai harga asli, mis: 48.000)"
                  value={ov.price ?? ''}
                  onChange={val => updateOverride(id, { price: val || undefined })}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-xs">Deskripsi</label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none text-xs"
                  placeholder="(pakai deskripsi asli)"
                  value={ov.description || ''}
                  onChange={e => updateOverride(id, { description: e.target.value })}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
