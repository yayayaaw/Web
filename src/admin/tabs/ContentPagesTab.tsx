// Taruh file ini di: src/admin/tabs/ContentPagesTab.tsx
//
// PATCH v4: "Highlight Singkat" sekarang list DINAMIS -- bisa ditambah
// (tombol "+ Tambah Highlight") dan dihapus per-item (ikon tempat sampah),
// gak lagi terkunci 4 slot tetap. Kalau dihapus semua, section highlight
// di web otomatis kosong/gak tampil (AboutSection.tsx sudah .map() biasa,
// jadi aman untuk array kosong).
//
// PATCH v9: form "Nama di Header" sekarang juga punya kolom "Tagline"
// (teks kecil di sebelah nama brand, contoh "Café") -- sebelumnya field
// ini hardcode literal di Navbar.tsx, sekarang bisa diedit dari sini.

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

  function updateHighlight(idx: number, patch: Partial<AboutContent['highlights'][number]>) {
    const updated = [...about.highlights];
    updated[idx] = { ...updated[idx], ...patch };
    setAbout({ ...about, highlights: updated });
  }

  // PATCH v4: tambah highlight baru (kosong, admin isi sendiri)
  function addHighlight() {
    const newItem = { id: 'ah-' + Date.now(), title: '', description: '' };
    setAbout({ ...about, highlights: [...about.highlights, newItem] });
  }

  // PATCH v4: hapus highlight tertentu berdasarkan index
  function removeHighlight(idx: number) {
    if (!confirm('Hapus highlight ini dari Our Story? Perlu pencet "Simpan Story" untuk mengunci perubahan.')) return;
    setAbout({ ...about, highlights: about.highlights.filter((_, i) => i !== idx) });
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
            <p className="text-xs text-gray-500">Nama brand & tagline kecil yang tampil di navbar semua halaman.</p>
          </div>
          <button type="submit" className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-800">
            Simpan
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          <div>
            <label className={labelClass}>Nama Café</label>
            <input className={inputClass} value={header.brandName} onChange={e => setHeader({ ...header, brandName: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Tagline (teks kecil di sebelah nama)</label>
            <input className={inputClass} placeholder="Café" value={header.tagline} onChange={e => setHeader({ ...header, tagline: e.target.value })} />
          </div>
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
            <p className="text-xs text-gray-500">Banner atas halaman + narasi cerita, quote, foto editorial, dan highlight singkat di bawahnya.</p>
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

        {/* GRUP 3: Highlight -- SEKARANG DINAMIS (bisa tambah & hapus) */}
        <div className="pt-4 border-t border-[#F4EFE6] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-[#1A1A1A]">Highlight Singkat (paragraf di bawah cerita)</h4>
              <p className="text-[11px] text-gray-500">Tampil sebagai paragraf berurutan di web (bukan kartu). Bisa ditambah/dihapus bebas.</p>
            </div>
            <button
              type="button"
              onClick={addHighlight}
              className="text-xs bg-[#1A1A1A] text-white px-3 py-1.5 rounded-lg shrink-0 hover:bg-[#6F4E37]"
            >
              + Tambah Highlight
            </button>
          </div>
          {about.highlights.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-4 border border-dashed border-[#F4EFE6] rounded-xl">
              Belum ada highlight. Section ini akan kosong di halaman Our Story.
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {about.highlights.map((h, idx) => (
              <div key={h.id} className="p-3 border border-[#F4EFE6] rounded-xl space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6F4E37]">Highlight #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeHighlight(idx)}
                    title="Hapus highlight ini"
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
                <input
                  className={inputClass}
                  placeholder="Judul singkat"
                  value={h.title}
                  onChange={e => updateHighlight(idx, { title: e.target.value })}
                />
                <textarea
                  className={inputClass}
                  rows={2}
                  placeholder="Kalimat penjelas"
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
