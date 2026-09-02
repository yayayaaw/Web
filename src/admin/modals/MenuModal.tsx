// Taruh file ini di: src/admin/modals/MenuModal.tsx
import React, { useState, useEffect } from 'react';
import { MenuItemCard } from '../../lib/contentStore';
import { ImagePicker } from '../components/ImagePicker';

interface MenuModalProps {
  editingItem: MenuItemCard | null;
  existingCategories: string[];
  onClose: () => void;
  onSave: (item: Omit<MenuItemCard, 'id'>) => void;
}

const inputClass = "w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none";
const labelClass = "block font-semibold mb-1";

export function MenuModal({ editingItem, existingCategories, onClose, onSave }: MenuModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('');

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setCategory(editingItem.category);
      setPrice(String(editingItem.price));
      setImg(editingItem.image);
      setDescription(editingItem.description || '');
      setBadge(editingItem.badge || '');
    } else {
      setName(''); setCategory(''); setPrice(''); setImg(''); setDescription(''); setBadge('');
    }
  }, [editingItem]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!img) { alert('Pilih foto produk dulu.'); return; }
    if (!category.trim()) { alert('Isi kategori dulu (bebas, ketik apa saja).'); return; }
    onSave({ name, category: category.trim(), price: Number(price), image: img, description, badge: badge || undefined });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative border border-[#E6DEC8] max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#1A1A1A]">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
        <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <ImagePicker label="Foto Produk *" value={img} onChange={setImg} aspectRatio="1/1" />

          <div>
            <label className={labelClass}>Nama Produk *</label>
            <input required className={inputClass} value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Kategori * (ketik bebas)</label>
              <input
                required
                list="menu-category-suggestions"
                className={inputClass}
                placeholder="mis: coffee, dessert, main"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
              <datalist id="menu-category-suggestions">
                {existingCategories.map(c => <option key={c} value={c} />)}
              </datalist>
              <p className="text-[10px] text-gray-400 mt-1">Ketik kategori baru kapan saja, otomatis kebuat -- gak perlu koding.</p>
            </div>
            <div>
              <label className={labelClass}>Harga (Rp) *</label>
              <input required type="number" className={inputClass} value={price} onChange={e => setPrice(e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Deskripsi</label>
            <textarea className={inputClass} rows={2} value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Badge (opsional, ketik bebas)</label>
            <input className={inputClass} placeholder="mis: Best Seller, Recommended" value={badge} onChange={e => setBadge(e.target.value)} />
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="w-1/2 py-3 rounded-xl border border-[#F4EFE6] font-bold">Batal</button>
            <button type="submit" className="w-1/2 py-3 rounded-xl bg-[#1A1A1A] text-white font-bold hover:bg-[#6F4E37]">Simpan Menu</button>
          </div>
        </form>
      </div>
    </div>
  );
}
