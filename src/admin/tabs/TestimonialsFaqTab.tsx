// Taruh file ini di: src/admin/tabs/TestimonialsFaqTab.tsx
import React, { useState } from 'react';
import { AdminTestimonial, AdminFaq } from '../adminTypes';

const SEED_TESTIMONIALS: AdminTestimonial[] = [
  { id: '1', name: 'Anindya Respati', rating: 5, comment: 'Suasana di Élysée benar-benar tenang dan hangat.' },
  { id: '2', name: 'Davin Kusuma', rating: 5, comment: 'Pelayanan yang sangat ramah dan berkelas.' },
];

const SEED_FAQS: AdminFaq[] = [
  { id: '1', question: 'Apakah perlu reservasi sebelum datang?', answer: 'Tidak diwajibkan, walk-in dipersilakan.' },
  { id: '2', question: 'Apakah tersedia tempat parkir?', answer: 'Ya, kami menyediakan area parkir luas & valet gratis.' },
];

export function TestimonialsFaqTab() {
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>(SEED_TESTIMONIALS);
  const [faqs, setFaqs] = useState<AdminFaq[]>(SEED_FAQS);

  const [testimonialModal, setTestimonialModal] = useState(false);
  const [tName, setTName] = useState('');
  const [tRating, setTRating] = useState('5');
  const [tComment, setTComment] = useState('');

  const [faqModal, setFaqModal] = useState(false);
  const [fQuestion, setFQuestion] = useState('');
  const [fAnswer, setFAnswer] = useState('');

  function addTestimonial(e: React.FormEvent) {
    e.preventDefault();
    setTestimonials([{ id: Date.now().toString(), name: tName, rating: Number(tRating), comment: tComment }, ...testimonials]);
    setTName(''); setTRating('5'); setTComment(''); setTestimonialModal(false);
  }

  function addFaq(e: React.FormEvent) {
    e.preventDefault();
    setFaqs([{ id: Date.now().toString(), question: fQuestion, answer: fAnswer }, ...faqs]);
    setFQuestion(''); setFAnswer(''); setFaqModal(false);
  }

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TESTIMONIALS */}
        <div className="bg-white p-6 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-[#F4EFE6] pb-3">
            <h3 className="text-xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Ulasan / Testimoni</h3>
            <button onClick={() => setTestimonialModal(true)} className="text-xs bg-[#1A1A1A] text-white px-3 py-1.5 rounded-lg">+ Tambah</button>
          </div>
          <div className="space-y-3 text-xs">
            {testimonials.length === 0 && <p className="text-gray-400 text-center py-4">Belum ada ulasan.</p>}
            {testimonials.map(t => (
              <div key={t.id} className="p-3 border border-[#F4EFE6] rounded-xl space-y-1">
                <div className="flex justify-between font-bold">
                  <span>{t.name}</span>
                  <span className="text-amber-500"><i className="fa-solid fa-star"></i> {t.rating}.0</span>
                </div>
                <p className="text-gray-500 italic">"{t.comment}"</p>
                <button onClick={() => setTestimonials(testimonials.filter(x => x.id !== t.id))} className="text-[10px] text-red-500 hover:text-red-700">Hapus</button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white p-6 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-[#F4EFE6] pb-3">
            <h3 className="text-xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>FAQ</h3>
            <button onClick={() => setFaqModal(true)} className="text-xs bg-[#1A1A1A] text-white px-3 py-1.5 rounded-lg">+ Tambah</button>
          </div>
          <div className="space-y-3 text-xs">
            {faqs.length === 0 && <p className="text-gray-400 text-center py-4">Belum ada FAQ.</p>}
            {faqs.map(f => (
              <div key={f.id} className="p-3 border border-[#F4EFE6] rounded-xl space-y-1">
                <span className="font-bold text-[#1A1A1A]">Q: {f.question}</span>
                <p className="text-gray-500">A: {f.answer}</p>
                <button onClick={() => setFaqs(faqs.filter(x => x.id !== f.id))} className="text-[10px] text-red-500 hover:text-red-700">Hapus</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL: TAMBAH TESTIMONIAL */}
      {testimonialModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative border border-[#E6DEC8]">
            <button onClick={() => setTestimonialModal(false)} className="absolute top-4 right-4 text-gray-400"><i className="fa-solid fa-xmark text-xl"></i></button>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Tambah Ulasan</h3>
            <form onSubmit={addTestimonial} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Nama *</label>
                <input required className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={tName} onChange={e => setTName(e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Rating (1-5) *</label>
                <input required type="number" min={1} max={5} className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={tRating} onChange={e => setTRating(e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Komentar *</label>
                <textarea required rows={2} className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={tComment} onChange={e => setTComment(e.target.value)} />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setTestimonialModal(false)} className="w-1/2 py-3 rounded-xl border font-bold">Batal</button>
                <button type="submit" className="w-1/2 py-3 rounded-xl bg-[#1A1A1A] text-white font-bold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH FAQ */}
      {faqModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative border border-[#E6DEC8]">
            <button onClick={() => setFaqModal(false)} className="absolute top-4 right-4 text-gray-400"><i className="fa-solid fa-xmark text-xl"></i></button>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Tambah FAQ</h3>
            <form onSubmit={addFaq} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Pertanyaan *</label>
                <input required className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={fQuestion} onChange={e => setFQuestion(e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Jawaban *</label>
                <textarea required rows={2} className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={fAnswer} onChange={e => setFAnswer(e.target.value)} />
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
