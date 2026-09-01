// Taruh file ini di: src/admin/tabs/ContentPagesTab.tsx
import React, { useState } from 'react';
import { getContent, setContent, HeaderContent, HeroContent, WelcomeContent, AboutContent } from '../../lib/contentStore';
import { ImagePicker } from '../components/ImagePicker';

const inputClass = "w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none focus:border-[#6F4E37]";
const labelClass = "block font-semibold mb-1";

export function ContentPagesTab() {
  const initial = getContent();
  const [header, setHeader] = useState<HeaderContent>(initial.header);
  const [hero, setHero] = useState<HeroContent>(initial.hero);
  const [welcome, setWelcome] = useState<WelcomeContent>(initial.welcome);
  const [about, setAbout] = useState<AboutContent>(initial.about);

  function saveHeader(e: React.FormEvent) {
    e.preventDefault();
    setContent('header', header);
    alert('Nama header berhasil disimpan!');
  }

  function saveHero(e: React.FormEvent) {
    e.preventDefault();
    setContent('hero', hero);
    alert('Hero section berhasil disimpan! Cek web utama, harusnya langsung berubah.');
  }

  function saveWelcome(e: React.FormEvent) {
    e.preventDefault();
    setContent('welcome', welcome);
    alert('Section sambutan berhasil disimpan!');
  }

  function saveAbout(e: React.FormEvent) {
    e.preventDefault();
    setContent('about', about);
    alert('Story/About disimpan!');
  }

  return (
    <section className="space-y-6">
      {/* HEADER / NAMA BRAND */}
      <form onSubmit={saveHeader} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-4">
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <i className="fa-solid fa-heading mr-2 text-[#6F4E37]"></i> Nama di Header
            </h3>
            <p className="text-xs text-gray-500">Nama brand yang tampil di navbar semua halaman.</p>
          </div>
          <button type="submit" className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-800">
            Simpan
          </button>
        </div>
        <div className="max-w-sm">
          <label className={labelClass}>Nama Café</label>
          <input className={inputClass} value={header.brandName} onChange={e => setHeader({ ...header, brandName: e.target.value })} />
        </div>
      </form>

      {/* HERO FORM */}
      <form onSubmit={saveHero} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-4">
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <i className="fa-solid fa-desktop mr-2 text-[#6F4E37]"></i> Hero (Halaman Beranda)
            </h3>
            <p className="text-xs text-gray-500">Judul utama, tagline, jam, dan foto latar. Preview 9:16 sesuai tampilan mobile asli.</p>
          </div>
          <button type="submit" className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-800">
            Simpan Hero
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
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

          <div className="flex flex-col items-center justify-start">
            <ImagePicker
              label="Foto Latar Hero (9:16, sesuai mobile asli)"
              value={hero.backgroundUrl}
              onChange={url => setHero({ ...hero, backgroundUrl: url })}
              aspectRatio="9/16"
            />
          </div>
        </div>
      </form>

      {/* WELCOME / SAMBUTAN */}
      <form onSubmit={saveWelcome} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-4">
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <i className="fa-solid fa-hand-holding-heart mr-2 text-[#6F4E37]"></i> Sambutan / Welcome
            </h3>
            <p className="text-xs text-gray-500">Section singkat tepat di bawah Hero.</p>
          </div>
          <button type="submit" className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-800">
            Simpan
          </button>
        </div>
        <div className="space-y-3 text-xs">
          <div>
            <label className={labelClass}>Label Kecil (Eyebrow)</label>
            <input className={inputClass} value={welcome.eyebrow} onChange={e => setWelcome({ ...welcome, eyebrow: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Judul</label>
            <input className={inputClass} value={welcome.title} onChange={e => setWelcome({ ...welcome, title: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Paragraf</label>
            <textarea rows={3} className={inputClass} value={welcome.paragraph} onChange={e => setWelcome({ ...welcome, paragraph: e.target.value })} />
          </div>
        </div>
      </form>

      {/* ABOUT FORM */}
      <form onSubmit={saveAbout} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-4">
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <i className="fa-solid fa-book-open mr-2 text-[#6F4E37]"></i> Our Story (Halaman About)
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
            <div>
              <label className={labelClass}>Quote Filosofi</label>
              <input className={inputClass} value={about.quote} onChange={e => setAbout({ ...about, quote: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Sub-Quote</label>
              <input className={inputClass} value={about.subQuote} onChange={e => setAbout({ ...about, subQuote: e.target.value })} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <ImagePicker
              label="Foto Editorial About"
              value={about.imageUrl}
              onChange={url => setAbout({ ...about, imageUrl: url })}
              aspectRatio="4/3"
            />
          </div>
        </div>
      </form>
    </section>
  );
}
