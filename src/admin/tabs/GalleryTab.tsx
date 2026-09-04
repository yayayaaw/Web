// Taruh file ini di: src/admin/tabs/GalleryTab.tsx
//
// SATU koleksi foto (galleryPhotos) dipakai di 3 tempat web utama:
// - Home "Sudut-Sudut Ketenangan" -> 4 foto PERTAMA dari daftar ini
// - Home "Momen di Élysée" (grid bawah) -> 4 foto PERTAMA juga
// - Halaman Galeri penuh -> SEMUA foto di daftar ini
// Jumlah gak dipatok 8, bisa nambah/hapus bebas -- tapi minimal sebaiknya ada 4+
// biar section Sudut Ketenangan di Home tetap penuh.
//
// PATCH (fix "Élysée Moments ga ada di CMS"): ditambah section KEDUA di
// bawahnya, terpisah, untuk kelola `socialPosts` -- foto kotak-kotak kecil
// di section "#ElyseeMoments / Cerita Hangat dari Pengunjung Kami"
// (SocialShowcase.tsx, muncul di halaman Galeri & About). Sebelumnya foto
// ini (INSTAGRAM_POSTS) hardcode 100% di mockData.ts, gak ada CMS-nya sama
// sekali -- beda dari galleryPhotos (foto ruangan/suasana) di atas.

import React, { useState } from 'react';
import { getContent, setContent, GalleryPhotoItem, SocialPostItem } from '../../lib/contentStore';
import { ImagePicker } from '../components/ImagePicker';

export function GalleryTab() {
  // ===== Bagian 1: Galeri Foto Café (ruangan/suasana) -- TIDAK BERUBAH =====
  const [items, setItems] = useState<GalleryPhotoItem[]>(() => getContent().galleryPhotos);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [url, setUrl] = useState('');

  function persist(updated: GalleryPhotoItem[]) {
    setItems(updated);
    setContent('galleryPhotos', updated);
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!url) { alert('Pilih foto dulu.'); return; }
    persist([{ id: 'gal-' + Date.now(), title, category: category || 'umum', url }, ...items]);
    setTitle(''); setCategory(''); setUrl(''); setModalOpen(false);
  }

  function handleDelete(id: string) {
    if (!confirm('Hapus foto ini? Kalau ini salah satu dari 4 foto pertama, tampilan "Sudut Ketenangan" di Beranda juga ikut berubah.')) return;
    persist(items.filter(i => i.id !== id));
  }

  // ===== Bagian 2 (BARU): Foto Momen Pengunjung / #ElyseeMoments =====
  const [posts, setPosts] = useState<SocialPostItem[]>(() => getContent().socialPosts);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postImage, setPostImage] = useState('');
  const [postTag, setPostTag] = useState('');
  const [postLikes, setPostLikes] = useState('');

  function persistPosts(updated: SocialPostItem[]) {
    setPosts(updated);
    setContent('socialPosts', updated);
  }

  function handleAddPost(e: React.FormEvent) {
    e.preventDefault();
    if (!postImage) { alert('Pilih foto dulu.'); return; }
    persistPosts([{ id: 'ig-' + Date.now(), image: postImage, tag: postTag || '#ElyseeMoments', likes: postLikes || '0' }, ...posts]);
    setPostImage(''); setPostTag(''); setPostLikes(''); setPostModalOpen(false);
  }

  function handleDeletePost(id: string) {
    if (!confirm('Hapus foto ini dari section "Cerita Hangat dari Pengunjung Kami"?')) return;
    persistPosts(posts.filter(p => p.id !== id));
  }

  return (
    <section className="space-y-6">
      {/* ===== GALERI FOTO CAFÉ (ruangan/suasana) ===== */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#F4EFE6] shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Galeri Foto Café</h3>
          <p className="text-xs text-gray-500">
            <strong>4 foto pertama</strong> tampil di section "Sudut Ketenangan" Beranda.
            <strong> Semua foto</strong> tampil di halaman Galeri lengkap. Kategori bebas kamu tulis sendiri (mis: interior, garden, craft, malam).
          </p>
        </div>
        <button onClick={() => setModalOpen(true)} className="bg-[#1A1A1A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shrink-0">
          + Tambah Foto
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.length === 0 && <p className="col-span-full text-center text-gray-400 py-6">Belum ada foto.</p>}
        {items.map((item, idx) => (
          <div key={item.id} className="relative rounded-2xl overflow-hidden shadow-sm border border-[#F4EFE6] h-40">
            <img src={item.url} className="w-full h-full object-cover" />
            {idx < 4 && (
              <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Tampil di Beranda</span>
            )}
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 rounded-lg text-xs hover:bg-red-700 flex items-center justify-center shadow-md"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1.5">
              <span className="text-white text-[10px] font-medium block truncate">{item.title}</span>
              <span className="text-[9px] uppercase text-gray-300">{item.category}</span>
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
              <ImagePicker label="Foto *" value={url} onChange={setUrl} aspectRatio="4/3" />
              <div>
                <label className="block font-semibold mb-1">Judul Foto *</label>
                <input required className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Kategori (bebas, tulis sendiri)</label>
                <input className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" placeholder="mis: interior, garden, craft" value={category} onChange={e => setCategory(e.target.value)} />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="w-1/2 py-3 rounded-xl border font-bold">Batal</button>
                <button type="submit" className="w-1/2 py-3 rounded-xl bg-[#1A1A1A] text-white font-bold">Unggah Foto</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== FOTO MOMEN PENGUNJUNG / #ElyseeMoments (BARU) ===== */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#F4EFE6] shadow-sm mt-8">
        <div>
          <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Foto Momen Pengunjung (#ElyseeMoments)</h3>
          <p className="text-xs text-gray-500">
            Kotak-kotak kecil bergaya feed Instagram di section "Cerita Hangat dari Pengunjung Kami" -- muncul di halaman Galeri & Our Story.
            Tag & jumlah suka cuma tampilan, bebas diisi apa saja.
          </p>
        </div>
        <button onClick={() => setPostModalOpen(true)} className="bg-[#1A1A1A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shrink-0">
          + Tambah Foto
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {posts.length === 0 && <p className="col-span-full text-center text-gray-400 py-6">Belum ada foto momen pengunjung.</p>}
        {posts.map((post) => (
          <div key={post.id} className="relative rounded-2xl overflow-hidden shadow-sm border border-[#F4EFE6] aspect-square">
            <img src={post.image} className="w-full h-full object-cover" />
            <button
              onClick={() => handleDeletePost(post.id)}
              className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 rounded-lg text-xs hover:bg-red-700 flex items-center justify-center shadow-md"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1.5">
              <span className="text-white text-[10px] font-mono block truncate">{post.tag}</span>
              <span className="text-[9px] text-gray-300">❤ {post.likes}</span>
            </div>
          </div>
        ))}
      </div>

      {postModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative border border-[#E6DEC8]">
            <button onClick={() => setPostModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-[#1A1A1A]">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Tambah Foto Momen Pengunjung</h3>
            <form onSubmit={handleAddPost} className="space-y-4 text-xs">
              <ImagePicker label="Foto *" value={postImage} onChange={setPostImage} aspectRatio="1/1" />
              <div>
                <label className="block font-semibold mb-1">Tag / Caption (opsional)</label>
                <input className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" placeholder="mis: #MorningAtElysee" value={postTag} onChange={e => setPostTag(e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Jumlah Suka (opsional, cuma tampilan)</label>
                <input className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" placeholder="mis: 1.4k" value={postLikes} onChange={e => setPostLikes(e.target.value)} />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setPostModalOpen(false)} className="w-1/2 py-3 rounded-xl border font-bold">Batal</button>
                <button type="submit" className="w-1/2 py-3 rounded-xl bg-[#1A1A1A] text-white font-bold">Unggah Foto</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
