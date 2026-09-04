// Taruh file ini di: src/admin/tabs/TestimonialsFaqTab.tsx
//
// PATCH (fix "CMS FAQ ga sesuai data web utama"):
// SEBELUMNYA loadFaqs() di file ini punya default fallback SENDIRI, cuma 2
// item pendek ("Apakah perlu reservasi", "Apakah tersedia parkir") yang
// kalimatnya beda dan datanya jauh lebih sedikit dari yang tayang di web
// utama (FaqSection.tsx pakai FAQ_ITEMS dari mockData.ts -- 5 FAQ detail
// dengan kategori: Reservasi, Parkir, Sewa Tempat, Pembayaran, Menu&Diet).
//
// Akibatnya: begitu admin nambah/edit/hapus FAQ apapun di CMS lalu
// tersimpan, localStorage 'elysee_faqs' jadi keisi cuma 2 item versi CMS
// itu -- 3 FAQ resmi lainnya HILANG dari web utama.
//
// Sekarang default fallback CMS disamakan persis dengan FAQ_ITEMS yang
// dipakai web utama, termasuk field kategori-nya.
//
// CATATAN soal Ulasan (tidak berubah, sudah benar):
// Ulasan dibaca dari key localStorage 'elysee_reviews' -- key yang SAMA
// dipakai web utama (TestimonialsScrollStrip). Kalau key ini belum pernah
// diisi (misal belum ada ulasan yang dihapus/diedit sama sekali), CMS
// fallback nampilin ulasan default (TESTIMONIALS) -- SAMA PERSIS dengan yang
// tayang di web -- supaya admin bisa moderasi (hapus) ulasan bawaan itu juga,
// bukan cuma ulasan baru dari pengunjung. Sekali disimpan/dihapus, hasilnya
// ditulis balik ke localStorage dan itu yang jadi sumber kebenaran seterusnya.

import React, { useState } from 'react';
import { TESTIMONIALS, FAQ_ITEMS } from '../../data/mockData';

interface StoredTestimonial {
  id: string;
  name: string;
  role?: string;
  avatarText?: string;
  rating: number;
  comment: string;
  date?: string;
}

interface StoredFaq {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const REVIEWS_KEY = 'elysee_reviews';
const FAQS_KEY = 'elysee_faqs';
const REVIEWS_UPDATED_EVENT = 'elysee-reviews-updated';

function loadReviews(): StoredTestimonial[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  // Belum pernah diedit sama sekali -> pakai ulasan default yang sama
  // dengan yang tayang di web utama, supaya admin bisa lihat & moderasi juga.
  return TESTIMONIALS as unknown as StoredTestimonial[];
}

function saveReviews(items: StoredTestimonial[]) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(REVIEWS_UPDATED_EVENT));
}

function loadFaqs(): StoredFaq[] {
  try {
    const raw = localStorage.getItem(FAQS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  // PATCH: fallback sekarang SAMA PERSIS dengan FAQ_ITEMS yang dipakai
  // FaqSection.tsx di web utama -- bukan default pendek versi CMS lagi.
  return FAQ_ITEMS.map(f => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
  }));
}

function saveFaqs(items: StoredFaq[]) {
  localStorage.setItem(FAQS_KEY, JSON.stringify(items));
}

export function TestimonialsFaqTab() {
  const [reviews, setReviews] = useState<StoredTestimonial[]>(loadReviews);
  const [faqs, setFaqs] = useState<StoredFaq[]>(loadFaqs);

  const [faqModal, setFaqModal] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [fCategory, setFCategory] = useState('');
  const [fQuestion, setFQuestion] = useState('');
  const [fAnswer, setFAnswer] = useState('');

  function handleDeleteReview(id: string) {
    if (!confirm('Hapus ulasan ini? Tindakan ini permanen.')) return;
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    saveReviews(updated);
  }

  function openAddFaq() {
    setEditingFaqId(null);
    setFCategory('');
    setFQuestion('');
    setFAnswer('');
    setFaqModal(true);
  }

  function openEditFaq(faq: StoredFaq) {
    setEditingFaqId(faq.id);
    setFCategory(faq.category || '');
    setFQuestion(faq.question);
    setFAnswer(faq.answer);
    setFaqModal(true);
  }

  function handleSaveFaq(e: React.FormEvent) {
    e.preventDefault();
    let updated: StoredFaq[];
    if (editingFaqId) {
      updated = faqs.map(f => (f.id === editingFaqId ? { ...f, category: fCategory, question: fQuestion, answer: fAnswer } : f));
    } else {
      updated = [{ id: Date.now().toString(), category: fCategory, question: fQuestion, answer: fAnswer }, ...faqs];
    }
    setFaqs(updated);
    saveFaqs(updated);
    setFaqModal(false);
  }

  function handleDeleteFaq(id: string) {
    if (!confirm('Hapus FAQ ini?')) return;
    const updated = faqs.filter(f => f.id !== id);
    setFaqs(updated);
    saveFaqs(updated);
  }

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ULASAN - VIEW + HAPUS DOANG */}
        <div className="bg-white p-6 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-4">
          <div className="border-b border-[#F4EFE6] pb-3">
            <h3 className="text-xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Ulasan Pengunjung</h3>
            <p className="text-[11px] text-gray-400 mt-1">
              Termasuk ulasan bawaan yang tayang di web + ulasan baru dari tombol "Tulis Ulasan". Hanya bisa dilihat & dihapus (moderasi), tidak bisa ditambah/diedit manual.
            </p>
          </div>
          <div className="space-y-3 text-xs max-h-[480px] overflow-y-auto pr-1">
            {reviews.length === 0 && (
              <p className="text-gray-400 text-center py-6">Belum ada ulasan masuk dari pengunjung.</p>
            )}
            {reviews.map(item => (
              <div key={item.id} className="p-3 border border-[#F4EFE6] rounded-xl space-y-1">
                <div className="flex justify-between font-bold">
                  <span>{item.name}</span>
                  <span className="text-amber-500">
                    {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                  </span>
                </div>
                <p className="text-gray-500 italic">"{item.comment}"</p>
                <button onClick={() => handleDeleteReview(item.id)} className="text-[10px] text-red-500 hover:text-red-700 font-semibold">
                  <i className="fa-solid fa-trash mr-1"></i> Hapus Ulasan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ - CRUD PENUH */}
        <div className="bg-white p-6 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-[#F4EFE6] pb-3">
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>FAQ</h3>
              <p className="text-[11px] text-gray-400 mt-1">Konten resmi café, bebas ditambah/diedit/dihapus.</p>
            </div>
            <button onClick={openAddFaq} className="text-xs bg-[#1A1A1A] text-white px-3 py-1.5 rounded-lg shrink-0">+ Tambah</button>
          </div>
          <div className="space-y-3 text-xs max-h-[480px] overflow-y-auto pr-1">
            {faqs.length === 0 && <p className="text-gray-400 text-center py-6">Belum ada FAQ.</p>}
            {faqs.map(f => (
              <div key={f.id} className="p-3 border border-[#F4EFE6] rounded-xl space-y-1">
                {f.category && (
                  <span className="text-[9px] uppercase font-bold tracking-wider text-[#6F4E37] block">{f.category}</span>
                )}
                <span className="font-bold text-[#1A1A1A]">Q: {f.question}</span>
                <p className="text-gray-500">A: {f.answer}</p>
                <div className="flex gap-3 pt-1">
                  <button onClick={() => openEditFaq(f)} className="text-[10px] text-[#6F4E37] hover:text-[#1A1A1A] font-semibold">
                    <i className="fa-solid fa-pen-to-square mr-1"></i> Edit
                  </button>
                  <button onClick={() => handleDeleteFaq(f.id)} className="text-[10px] text-red-500 hover:text-red-700 font-semibold">
                    <i className="fa-solid fa-trash mr-1"></i> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL FAQ */}
      {faqModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative border border-[#E6DEC8]">
            <button onClick={() => setFaqModal(false)} className="absolute top-4 right-4 text-gray-400"><i className="fa-solid fa-xmark text-xl"></i></button>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {editingFaqId ? 'Edit FAQ' : 'Tambah FAQ'}
            </h3>
            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Kategori</label>
                <input className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" placeholder="mis: Reservasi & Kunjungan" value={fCategory} onChange={e => setFCategory(e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Pertanyaan *</label>
                <input required className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={fQuestion} onChange={e => setFQuestion(e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Jawaban *</label>
                <textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={fAnswer} onChange={e => setFAnswer(e.target.value)} />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setFaqModal(false)} className="w-1/2 py-3 rounded-xl border font-bold">Batal</button>
                <button type="submit" className="w-1/2 py-3 rounded-xl bg-[#1A1A1A] text-white font-bold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
