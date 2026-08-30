// Taruh file ini di: src/admin/tabs/ContentPagesTab.tsx
import React, { useState } from 'react';
import { AdminHeroContent, AdminAboutContent } from '../adminTypes';

const inputClass = "w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none focus:border-[#6F4E37]";
const labelClass = "block font-semibold mb-1";

export function ContentPagesTab() {
  const [hero, setHero] = useState<AdminHeroContent>({
    brand: 'Élysée Café & Bistro',
    hoursLabel: 'Open Daily • 08:00 – 23:00',
    title: 'Ruang Tenang dalam Setiap Tegukan & Rasa',
    subtitle: 'Menyajikan seduhan kopi artisan pilihan dan kelezatan hidangan comfort food dalam suasana eksklusif yang tenang, hangat, dan menginspirasi.',
    backgroundUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000',
    button1Text: 'Jelajahi Menu',
    button2Text: 'Reservasi WhatsApp',
  });

  const [about, setAbout] = useState<AdminAboutContent>({
    heading: 'Dedikasi untuk Rasa, Kenyamanan, dan Suasana',
    paragraph1: 'Élysée didirikan sebagai tempat berteduh dari hiruk-pikuk perkotaan.',
    paragraph2: 'Dengan desain interior minimalis hangat, Élysée adalah ruang ideal untuk bekerja santai.',
    quote: 'Crafted with Passion',
    subQuote: 'Setiap biji kopi dipilih khusus dari petani lokal berkelanjutan.',
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1000',
  });

  function saveHero(e: React.FormEvent) {
    e.preventDefault();
    // TODO: kirim `hero` ke backend/database pilihan kamu
    console.log('Saving hero:', hero);
    alert('Hero section disimpan (sementara di memory browser, belum ke database).');
  }

  function saveAbout(e: React.FormEvent) {
    e.preventDefault();
    // TODO: kirim `about` ke backend/database pilihan kamu
    console.log('Saving about:', about);
    alert('Story/About disimpan (sementara di memory browser, belum ke database).');
  }

  return (
    <section className="space-y-6">
      {/* HERO FORM */}
      <form onSubmit={saveHero} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-4">
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <i className="fa-solid fa-desktop mr-2 text-[#6F4E37]"></i> Hero Section
            </h3>
            <p className="text-xs text-gray-500">Judul utama, tagline, jam, dan foto latar depan website.</p>
          </div>
          <button type="submit" className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-800">
            Simpan Hero
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Nama Café</label>
              <input className={inputClass} value={hero.brand} onChange={e => setHero({ ...hero, brand: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Jam Operasional (Badge)</label>
              <input className={inputClass} value={hero.hoursLabel} onChange={e => setHero({ ...hero, hoursLabel: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Judul Utama</label>
              <textarea className={inputClass} rows={2} value={hero.title} onChange={e => setHero({ ...hero, title: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <textarea className={inputClass} rows={3} value={hero.subtitle} onChange={e => setHero({ ...hero, subtitle: e.target.value })} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>URL Foto Hero</label>
              <input className={inputClass} value={hero.backgroundUrl} onChange={e => setHero({ ...hero, backgroundUrl: e.target.value })} />
            </div>
            <div className="border border-[#F4EFE6] rounded-2xl p-4 bg-[#FDFBF7] text-center">
              <span className="block text-[11px] font-semibold text-gray-500 mb-2">Preview:</span>
              <img src={hero.backgroundUrl} alt="Preview Hero" className="w-full h-40 object-cover rounded-xl border" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Tombol Kiri</label>
                <input className={inputClass} value={hero.button1Text} onChange={e => setHero({ ...hero, button1Text: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Tombol Kanan</label>
                <input className={inputClass} value={hero.button2Text} onChange={e => setHero({ ...hero, button2Text: e.target.value })} />
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* ABOUT FORM */}
      <form onSubmit={saveAbout} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-4">
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <i className="fa-solid fa-book-open mr-2 text-[#6F4E37]"></i> Our Story (About)
            </h3>
            <p className="text-xs text-gray-500">Narasi filosofi, cerita, quote, dan foto editorial.</p>
          </div>
          <button type="submit" className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-800">
            Simpan Story
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Judul Seksi</label>
              <input className={inputClass} value={about.heading} onChange={e => setAbout({ ...about, heading: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Paragraf 1</label>
              <textarea className={inputClass} rows={3} value={about.paragraph1} onChange={e => setAbout({ ...about, paragraph1: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Paragraf 2</label>
              <textarea className={inputClass} rows={3} value={about.paragraph2} onChange={e => setAbout({ ...about, paragraph2: e.target.value })} />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Quote Filosofi</label>
              <input className={inputClass} value={about.quote} onChange={e => setAbout({ ...about, quote: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Sub-Quote</label>
              <input className={inputClass} value={about.subQuote} onChange={e => setAbout({ ...about, subQuote: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>URL Foto Editorial</label>
              <input className={inputClass} value={about.imageUrl} onChange={e => setAbout({ ...about, imageUrl: e.target.value })} />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
