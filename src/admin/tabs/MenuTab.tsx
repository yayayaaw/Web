// Taruh file ini di: src/admin/tabs/MenuTab.tsx
import React, { useState, useMemo } from 'react';
import { AdminMenuItem } from '../adminTypes';
import { MenuModal } from '../modals/MenuModal';

const SEED_MENU: AdminMenuItem[] = [
  { id: '1', name: 'Espresso Single Origin', category: 'coffee', price: 28000, img: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=300', badge: 'Best Seller', status: 'Tersedia' },
  { id: '2', name: 'Élysée Velvet Latte', category: 'coffee', price: 48000, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300', badge: 'Signature', status: 'Tersedia' },
];

export function MenuTab() {
  const [items, setItems] = useState<AdminMenuItem[]>(SEED_MENU);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminMenuItem | null>(null);

  const filteredItems = useMemo(() => {
    return items
      .filter(i => categoryFilter === 'all' || i.category === categoryFilter)
      .filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  }, [items, search, categoryFilter]);

  function openAdd() { setEditingItem(null); setModalOpen(true); }
  function openEdit(item: AdminMenuItem) { setEditingItem(item); setModalOpen(true); }

  function handleSave(data: Omit<AdminMenuItem, 'id' | 'status'>) {
    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { ...i, ...data } : i));
    } else {
      setItems([{ id: Date.now().toString(), status: 'Tersedia', ...data }, ...items]);
    }
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    if (confirm('Hapus menu ini?')) setItems(items.filter(i => i.id !== id));
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#F4EFE6] shadow-sm">
        <div className="flex items-center gap-3">
          <input
            type="text" placeholder="Cari nama menu..." value={search} onChange={e => setSearch(e.target.value)}
            className="text-xs px-4 py-2.5 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] w-full sm:w-64 outline-none focus:border-[#6F4E37]"
          />
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="text-xs px-3 py-2.5 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none">
            <option value="all">Semua Kategori</option>
            <option value="coffee">Coffee</option>
            <option value="non-coffee">Non-Coffee</option>
            <option value="main">Main Course</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
        <button onClick={openAdd} className="bg-[#1A1A1A] hover:bg-[#6F4E37] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-2">
          <i className="fa-solid fa-plus"></i> Tambah Menu Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#F4EFE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F4EFE6]/60 border-b border-[#F4EFE6] text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                <th className="p-4">Foto</th><th className="p-4">Nama</th><th className="p-4">Kategori</th>
                <th className="p-4">Harga</th><th className="p-4">Badge</th><th className="p-4">Status</th><th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4EFE6] text-xs">
              {filteredItems.length === 0 && (
                <tr><td colSpan={7} className="p-6 text-center text-gray-400">Belum ada menu.</td></tr>
              )}
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-[#FDFBF7] transition-colors">
                  <td className="p-4"><img src={item.img} className="w-12 h-12 rounded-lg object-cover" /></td>
                  <td className="p-4 font-bold text-[#1A1A1A]">{item.name}</td>
                  <td className="p-4 uppercase text-[10px] font-semibold text-gray-500">{item.category}</td>
                  <td className="p-4 font-bold text-[#6F4E37]">Rp {item.price.toLocaleString('id-ID')}</td>
                  <td className="p-4">{item.badge ? <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded">{item.badge}</span> : '-'}</td>
                  <td className="p-4"><span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">{item.status}</span></td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => openEdit(item)} className="text-[#6F4E37] hover:text-[#1A1A1A] p-1"><i className="fa-solid fa-pen-to-square"></i></button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 p-1"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <MenuModal editingItem={editingItem} onClose={() => setModalOpen(false)} onSave={handleSave} />
      )}
    </section>
  );
}
