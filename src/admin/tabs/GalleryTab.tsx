// Taruh file ini di: src/admin/tabs/GalleryTab.tsx
import React, { useState } from 'react';
import { AdminGalleryItem } from '../adminTypes';

const SEED_GALLERY: AdminGalleryItem[] = [
  { id: '1', caption: 'Interior Main Dining Area', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600' },
  { id: '2', caption: 'Barista Pouring Latte Art', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600' },
];

export function GalleryTab() {
  const [items, setItems] = useState<AdminGalleryItem[]>(SEED_GALLERY);
  const [modalOpen, setModalOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [url, setUrl] = useState('');

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setItems([{ id: Date.now().toString(), caption, url }, ...items]);
    setCaption(''); setUrl(''); setModalOpen(false);
  }

  function handleDelete(id: string) {
    if (confirm('Hapus foto ini?')) setItems(items.filter(i => i.id !== id));
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#F4EFE6] shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Kelola Galeri Foto</h3>
          <p className="text-xs text-gray-500">Tambah/hapus foto interior, makanan, suasana.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="bg-[#1A1A1A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl">
          + Tambah Foto
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.length === 0 && <p className="col-span-full text-center text-gray-400 py-6">Belum ada foto.</p>}
        {items.map(item => (
          <div key={item.id} className="relative rounded-2xl overflow-hidden shadow-sm border border-[#F4EFE6] group h-40">
            <img src={item.url} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white text-xs">
              <span className="font-medium">{item.caption}</span>
              <button onClick={() => handleDelete(item.id)} className="self-end bg-red-600 text-white p-2 rounded-lg text-xs hover:bg-red-700">
                <i className="fa-solid fa-trash"></i> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative border border-[#E6DEC8]">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-[#1A1A1A]">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Tambah Foto Galeri</h3>
            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Caption *</label>
                <input required className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={caption} onChange={e => setCaption(e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-1">URL Foto *</label>
                <input required className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="w-1/2 py-3 rounded-xl border font-bold">Batal</button>
                <button type="submit" className="w-1/2 py-3 rounded-xl bg-[#1A1A1A] text-white font-bold">Unggah Foto</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
