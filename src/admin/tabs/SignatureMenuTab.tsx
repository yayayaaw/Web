// Taruh file ini di: src/admin/tabs/SignatureMenuTab.tsx
import React, { useState } from 'react';
import { getContent, setContent, SignatureCardOverride } from '../../lib/contentStore';
import { ImagePicker } from '../components/ImagePicker';

// NOTE: id di sini HARUS sama dengan id di SIGNATURE_ITEMS pada src/data/mockData.ts
// (sig-1, sig-2, sig-3, dst) supaya override-nya nempel ke item yang benar.
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
            3 menu yang tampil di homepage. Ganti nama/harga/foto/deskripsi di sini —
            kosongkan field kalau mau tetap pakai data asli dari menu utama.
          </p>
        </div>
        <button onClick={handleSaveAll} className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-800 shrink-0">
          Simpan Semua
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SIGNATURE_IDS_HINT.map((id, idx) => {
          const ov = getOverride(id);
          return (
            <div key={id} className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6F4E37]">Menu Unggulan #{idx + 1}</span>
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
                <input
                  type="number"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none text-xs"
                  placeholder="(pakai harga asli)"
                  value={ov.price ?? ''}
                  onChange={e => updateOverride(id, { price: e.target.value ? Number(e.target.value) : undefined })}
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
