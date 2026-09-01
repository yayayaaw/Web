// Taruh file ini di: src/admin/tabs/TestimonialsFaqTab.tsx
//
// CATATAN PENTING soal Ulasan:
// Ulasan TIDAK disimpan lewat contentStore biasa, tapi baca langsung dari key
// localStorage 'elysee_reviews' -- key yang SAMA PERSIS dipakai App.tsx di web
// utama waktu pengunjung submit lewat tombol "Tulis Ulasan". Makanya di CMS
// ini ulasan cuma bisa DILIHAT dan DIHAPUS (moderasi), tidak bisa
// ditambah/diedit manual -- supaya datanya selalu representasi suara asli
// pengunjung, bukan review palsu buatan admin.
//
// FAQ beda cerita: itu konten resmi milik café, jadi tetap CRUD penuh,
// disimpan di key 'elysee_faqs'.

import React, { useState } from 'react';

interface StoredTestimonial {
  id: string;
  name: string;
  role?: string;
  avatarText?: string;
  rating: number;
  comment: string;
}

interface StoredFaq {
  id: string;
  question: string;
  answer: string;
}

const REVIEWS_KEY = 'elysee_reviews';
const FAQS_KEY = 'elysee_faqs';

function loadReviews(): StoredTestimonial[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveReviews(items: StoredTestimonial[]) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(items));
}

function loadFaqs(): StoredFaq[] {
  try {
    const raw = localStorage.getItem(FAQS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  // Default awal kalau CMS belum pernah dipakai edit FAQ
  return [
    { id: 'faq-1', question: 'Apakah perlu reservasi sebelum datang?', answer: 'Tidak diwajibkan, walk-in dipersilakan.' },
    { id: 'faq-2', question: 'Apakah tersedia tempat parkir?', answer: 'Ya, kami menyediakan area parkir luas & valet gratis.' },
  ];
}

function saveFaqs(items: StoredFaq[]) {
  localStorage.setItem(FAQS_KEY, JSON.stringify(items));
}

export function TestimonialsFaqTab() {
  const [reviews, setReviews] = useState<StoredTestimonial[]>(loadReviews);
  const [faqs, setFaqs] = useState<StoredFaq[]>(loadFaqs);

  const [faqModal, setFaqModal] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
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
    setFQuestion('');
    setFAnswer('');
    setFaqModal(true);
  }

  function openEditFaq(faq: StoredFaq) {
    setEditingFaqId(faq.id);
    setFQuestion(faq.question);
    setFAnswer(faq.answer);
    setFaqModal(true);
  }

  function handleSaveFaq(e: React.FormEvent) {
    e.preventDefault();
    let updated: StoredFaq[];
    if (editingFaqId) {
      updated = faqs.map(f => (f.id === editingFaqId ? { ...f, question: fQuestion, answer: fAnswer } : f));
    } else {
      updated = [{ id: Date.now().toString(), question: fQuestion, answer: fAnswer }, ...faqs];
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
              Suara asli pengunjung dari tombol "Tulis Ulasan" di web. Hanya bisa dilihat & dihapus (moderasi), tidak bisa ditambah/diedit manual.
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
