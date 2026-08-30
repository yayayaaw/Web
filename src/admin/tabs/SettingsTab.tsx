// Taruh file ini di: src/admin/tabs/SettingsTab.tsx
import React, { useState } from 'react';
import { AdminSettings } from '../adminTypes';

const inputClass = "w-full px-4 py-3 rounded-xl border border-[#F4EFE6] outline-none focus:border-[#6F4E37]";
const labelClass = "block font-semibold mb-1";

export function SettingsTab() {
  const [settings, setSettings] = useState<AdminSettings>({
    whatsapp: '6281234567890',
    email: 'info@elyseecafe.com',
    address: 'Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan, 12190',
    mapsEmbedUrl: 'https://maps.google.com',
    instagram: 'https://instagram.com/elysee',
    tiktok: 'https://tiktok.com/@elysee',
    facebook: 'https://facebook.com/elysee',
    metaTitle: 'Élysée Café & Bistro | Premium Coffee & Fine Comfort Food',
    metaDescription: 'Website resmi Élysée Café & Bistro. Nikmati racikan kopi artisan, hidangan lezat, dan suasana tenang eksklusif.',
  });

  function update<K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Saving settings:', settings);
    alert('Pengaturan kontak & SEO disimpan (sementara di memory browser, belum ke database).');
  }

  return (
    <section className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F4EFE6] shadow-sm max-w-3xl space-y-4 text-xs">
        <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Kontak, Maps & SEO</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nomor WhatsApp</label>
            <input className={inputClass} value={settings.whatsapp} onChange={e => update('whatsapp', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" className={inputClass} value={settings.email} onChange={e => update('email', e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Alamat</label>
          <textarea rows={2} className={inputClass} value={settings.address} onChange={e => update('address', e.target.value)} />
        </div>

        <div>
          <label className={labelClass}>Link Embed Google Maps</label>
          <input className={inputClass} value={settings.mapsEmbedUrl} onChange={e => update('mapsEmbedUrl', e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Instagram</label>
            <input className={inputClass} value={settings.instagram} onChange={e => update('instagram', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>TikTok</label>
            <input className={inputClass} value={settings.tiktok} onChange={e => update('tiktok', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Facebook</label>
            <input className={inputClass} value={settings.facebook} onChange={e => update('facebook', e.target.value)} />
          </div>
        </div>

        <div className="pt-4 border-t border-[#F4EFE6] space-y-3">
          <h4 className="font-bold text-sm text-[#1A1A1A]">SEO</h4>
          <div>
            <label className={labelClass}>Meta Title</label>
            <input className={inputClass} value={settings.metaTitle} onChange={e => update('metaTitle', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Meta Description</label>
            <textarea rows={2} className={inputClass} value={settings.metaDescription} onChange={e => update('metaDescription', e.target.value)} />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-[#1A1A1A] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-[#6F4E37] transition-colors">
            Simpan
          </button>
        </div>
      </form>
    </section>
  );
}
