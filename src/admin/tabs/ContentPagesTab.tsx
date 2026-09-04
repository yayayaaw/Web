// Taruh file ini di: src/admin/tabs/ContentPagesTab.tsx
//
// PATCH: tambah editor untuk about.highlights (4 kartu "Biji Kopi Terpilih",
// "Bahan Segar & Alami", dst) di bawah form Our Story. Sebelumnya field ini
// gak ada sama sekali di CMS -- dan memang belum ada tempat nyimpennya di
// contentStore (lihat patch di lib/contentStore.ts).

import React, { useState } from 'react';
import { getContent, setContent, HeaderContent, HeroContent, WelcomeContent, AboutContent, AboutHighlightIcon } from '../../lib/contentStore';
import { ImagePicker } from '../components/ImagePicker';

const inputClass = "w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none focus:border-[#6F4E37]";
const labelClass = "block font-semibold mb-1";

const ICON_OPTIONS: { value: AboutHighlightIcon; label: string }[] = [
  { value: 'coffee', label: 'Cangkir Kopi' },
  { value: 'utensils', label: 'Sendok & Garpu' },
  { value: 'armchair', label: 'Kursi / Sofa' },
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'heart', label: 'Hati' },
  { value: 'sparkles', label: 'Kilauan' },
  { value: 'shield-check', label: 'Perisai Centang' },
  { value: 'clock', label: 'Jam' },
  { value: 'map-pin', label: 'Pin Lokasi' },
  { value: 'star', label: 'Bintang' },
];

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

  function updateHighlight(idx: number, patch: Partial<AboutContent['highlights'][number]>) {
    const updated = [...about.highlights];
    updated[idx] = { ...updated[idx], ...patch };
    setAbout({ ...about, highlights: updated });
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
            <p className="text-xs text-gray-500">Judul utama, tagline, dan foto latar. Sesuai persis dengan elemen yang ada di desain asli.</p>
          </div>
          <button type="submit" className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-800">
            Simpan Hero
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Label Kecil (Eyebrow)</label>
              <input className={inputClass} value={hero.eyebrow} onChange={e => setHero({ ...hero, eyebrow: e.target.value })} />
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

          <div className="flex flex-col items-center justify-start">
            <ImagePicker
              label="Foto Latar Hero (9:16, sesuai mobile asli)"
              value={hero.backgroundUrl}
              onChange={url => setHero({ ...hero, backgroundUrl: url })}
              aspectRatio="9/16"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#F4EFE6] space-y-3">
          <h4 className="font-bold text-sm text-[#1A1A1A]">4 Kartu Fitur (di bawah tagline)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hero.features.map((feature, idx) => (
              <div key={idx} className="p-3 border border-[#F4EFE6] rounded-xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6F4E37]">Kartu #{idx + 1}</span>
                <input
                  className={inputClass}
                  placeholder="Judul"
                  value={feature.title}
                  onChange={e => {
                    const updated = [...hero.features];
                    updated[idx] = { ...updated[idx], title: e.target.value };
                    setHero({ ...hero, features: updated });
                  }}
                />
                <input
                  className={inputClass}
                  placeholder="Subjudul"
                  value={feature.subtitle}
                  onChange={e => {
                    const updated = [...hero.features];
                    updated[idx] = { ...updated[idx], subtitle: e.target.value };
                    setHero({ ...hero, features: updated });
                  }}
                />
              </div>
            ))}
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
            <p className="text-xs text-gray-500">Banner atas halaman + narasi filosofi, cerita, quote, foto editorial, dan 4 kartu highlight di bawahnya.</p>
          </div>
          <button type="submit" className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-800">
            Simpan Story
          </button>
        </div>

        {/* GRUP 1: Banner paling atas halaman #about */}
        <div className="space-y-3 text-xs p-4 rounded-xl bg-[#FDFBF7] border border-[#F4EFE6]">
          <h4 className="font-bold text-sm text-[#1A1A1A]">Banner Atas Halaman</h4>
          <p className="text-[11px] text-gray-500 -mt-2">Bagian paling atas pas buka halaman "Our Story", background gelap.</p>
          <div>
            <label className={labelClass}>Label Kecil (Eyebrow)</label>
            <input className={inputClass} value={about.pageEyebrow} onChange={e => setAbout({ ...about, pageEyebrow: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Judul Banner</label>
            <textarea className={inputClass} rows={2} value={about.pageTitle} onChange={e => setAbout({ ...about, pageTitle: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Deskripsi Banner</label>
            <textarea className={inputClass} rows={2} value={about.pageDescription} onChange={e => setAbout({ ...about, pageDescription: e.target.value })} />
          </div>
        </div>

        {/* GRUP 2: Isi cerita di bawah banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs pt-2">
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-[#1A1A1A]">Isi Cerita</h4>
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

        {/* GRUP 3 (BARU): 4 Kartu Highlight -- SEBELUMNYA HARDCODE, SEKARANG BISA DIEDIT */}
        <div className="pt-4 border-t border-[#F4EFE6] space-y-3">
          <h4 className="font-bold text-sm text-[#1A1A1A]">4 Kartu Highlight (di bawah paragraf cerita)</h4>
          <p className="text-[11px] text-gray-500 -mt-1">Kartu kecil seperti "Biji Kopi Terpilih", "Wi-Fi 100 Mbps", dst. Pilih ikon, lalu isi judul & deskripsi.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {about.highlights.map((h, idx) => (
              <div key={h.id} className="p-3 border border-[#F4EFE6] rounded-xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6F4E37]">Highlight #{idx + 1}</span>
                <div>
                  <label className="block text-[10px] font-semibold mb-1 text-gray-500">Ikon</label>
                  <select
                    className={inputClass}
                    value={h.icon}
                    onChange={e => updateHighlight(idx, { icon: e.target.value as AboutHighlightIcon })}
                  >
                    {ICON_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <input
                  className={inputClass}
                  placeholder="Judul"
                  value={h.title}
                  onChange={e => updateHighlight(idx, { title: e.target.value })}
                />
                <textarea
                  className={inputClass}
                  rows={2}
                  placeholder="Deskripsi"
                  value={h.description}
                  onChange={e => updateHighlight(idx, { description: e.target.value })}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </section>
  );
}
