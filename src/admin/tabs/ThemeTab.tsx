// Taruh file ini di: src/admin/tabs/ThemeTab.tsx
import React, { useState } from 'react';
import { AdminTheme } from '../adminTypes';

export function ThemeTab() {
  const [theme, setTheme] = useState<AdminTheme>({ bg: '#FDFBF7', accent: '#6F4E37', text: '#1A1A1A' });

  function applyPreset(bg: string, accent: string, text: string) {
    setTheme({ bg, accent, text });
  }

  function saveTheme() {
    console.log('Saving theme:', theme);
    alert('Tema warna disimpan (sementara di memory browser, belum ke database).');
  }

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-6">
          <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Kustomisasi Warna</h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FDFBF7] border border-[#F4EFE6]">
              <span className="font-semibold">Background</span>
              <input type="color" value={theme.bg} onChange={e => setTheme({ ...theme, bg: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FDFBF7] border border-[#F4EFE6]">
              <span className="font-semibold">Aksen Tombol</span>
              <input type="color" value={theme.accent} onChange={e => setTheme({ ...theme, accent: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FDFBF7] border border-[#F4EFE6]">
              <span className="font-semibold">Teks Utama</span>
              <input type="color" value={theme.text} onChange={e => setTheme({ ...theme, text: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#F4EFE6]">
            <label className="block text-xs font-semibold">Preset Siap Pakai:</label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button type="button" onClick={() => applyPreset('#FDFBF7', '#6F4E37', '#1A1A1A')} className="p-3 rounded-xl border border-[#F4EFE6] text-left hover:border-[#6F4E37] font-bold">
                Elegance Ivory
              </button>
              <button type="button" onClick={() => applyPreset('#121212', '#D4AF37', '#FFFFFF')} className="p-3 rounded-xl border border-[#F4EFE6] text-left hover:border-[#6F4E37] font-bold">
                Dark Gold Luxury
              </button>
            </div>
          </div>

          <button onClick={saveTheme} className="w-full bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-emerald-800">
            Simpan Tema
          </button>
        </div>

        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Live Preview</span>
          <div className="p-8 rounded-3xl shadow-xl space-y-6 border" style={{ backgroundColor: theme.bg, color: theme.text }}>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold uppercase tracking-wider" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Élysée</span>
              <button className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full text-white" style={{ backgroundColor: theme.accent }}>
                Reservasi
              </button>
            </div>
            <div className="space-y-2">
              <h4 className="text-3xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Rasakan Pengalaman Kopi Artisan</h4>
              <p className="text-xs opacity-75">Ruang tenang dalam setiap tegukan.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/40 border border-black/10 text-xs">
              <div className="flex justify-between font-bold">
                <span>Élysée Velvet Latte</span>
                <span style={{ color: theme.accent }}>Rp 48.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
