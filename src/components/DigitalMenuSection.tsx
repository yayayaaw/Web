import React, { useState, useMemo } from 'react';
import { Search, X, Filter, Plus, Eye, Download, Sparkles, MessageSquare, Coffee } from 'lucide-react';
import { MenuItem } from '../types';
import { formatRupiah, generateItemOrderWhatsApp } from '../utils/formatters';
import { useContent } from '../lib/contentStore';

interface DigitalMenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

export const DigitalMenuSection: React.FC<DigitalMenuSectionProps> = ({
  onSelectItem,
  onAddToCart,
}) => {
  const menuItems = useContent('menuItems');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular'>('all');

  // Kategori dibuat OTOMATIS dari data CMS -- owner tambah kategori baru
  // tinggal ketik di form Menu, tidak perlu koding, chip ini otomatis muncul.
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(menuItems.map(i => i.category)));
    return [
      { id: 'all', label: 'Semua Menu' },
      ...uniqueCats.map(cat => ({ id: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) })),
    ];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = (item.description || '').toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) {
          return false;
        }
      }
      if (activeFilter === 'popular' && !item.badge?.toLowerCase().includes('best') && !item.badge?.toLowerCase().includes('popular')) {
        return false;
      }
      return true;
    });
  }, [menuItems, selectedCategory, searchQuery, activeFilter]);

  const handlePrintMenu = () => {
    window.print();
  };

  function toMenuItem(item: typeof menuItems[number]): MenuItem {
    return {
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description || '',
      image: item.image,
      badge: item.badge,
    };
  }

  return (
    <section id="menu" className="py-20 md:py-32 bg-brand-cream/40 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-charcoal/70 font-semibold block">
              Curated Culinary Selection
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal">
              Buku Menu Digital
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-light max-w-xl">
              Dipilih dari biji kopi arabika single-origin, bahan baku organik terpilih, dan sentuhan kuliner kontemporer.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintMenu}
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-charcoal hover:text-black px-4 py-2.5 rounded-full bg-brand-cream hover:bg-brand-beige border border-brand-beige shadow-2xs hover:shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5 text-brand-charcoal" /> Cetak
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-brand-cream/70 p-4 sm:p-5 rounded-2xl border border-brand-beige/80 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kopi, pasta, dessert, atau profil rasa..."
                className="w-full text-xs pl-10 pr-9 py-2.5 rounded-xl bg-brand-ivory border border-brand-cream focus:border-brand-charcoal focus:ring-0 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Bersihkan pencarian"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-charcoal"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              <span className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all shrink-0 ${
                  activeFilter === 'all'
                    ? 'bg-brand-charcoal text-brand-cream'
                    : 'bg-brand-cream text-brand-charcoal hover:bg-brand-beige'
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('popular')}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all shrink-0 flex items-center gap-1 ${
                  activeFilter === 'popular'
                    ? 'bg-brand-charcoal text-brand-cream'
                    : 'bg-brand-cream text-brand-charcoal hover:bg-brand-beige'
                }`}
              >
                <Sparkles className="w-3 h-3 text-brand-charcoal" /> Best Seller
              </button>
            </div>
          </div>

          {/* Category Tabs (otomatis dari CMS) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-brand-cream">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-all shrink-0 ${
                    isSelected
                      ? 'bg-brand-charcoal text-brand-cream shadow-xs'
                      : 'bg-brand-ivory text-brand-charcoal hover:bg-brand-cream border border-brand-cream'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-brand-cream/70 rounded-3xl p-12 text-center border border-brand-beige space-y-4 max-w-md mx-auto my-8">
            <div className="w-14 h-14 rounded-full bg-brand-cream mx-auto flex items-center justify-center text-brand-charcoal">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl font-bold text-brand-charcoal">
                Tidak ada menu ditemukan
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Silakan coba ubah kata kunci pencarian atau kategori filter Anda.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setActiveFilter('all');
              }}
              className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal hover:underline"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-brand-cream/70 rounded-2xl overflow-hidden border border-brand-beige/80 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div
                  onClick={() => onSelectItem(toMenuItem(item))}
                  className="relative h-48 overflow-hidden bg-brand-cream cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  <span className="absolute bottom-3 right-3 bg-black/60 text-brand-cream text-[11px] font-serif-title font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {formatRupiah(item.price)}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3
                      onClick={() => onSelectItem(toMenuItem(item))}
                      className="font-serif-title text-lg font-bold text-brand-charcoal group-hover:text-black transition-colors cursor-pointer leading-snug"
                    >
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-brand-cream flex items-center justify-between gap-2">
                    <button
                      onClick={() => onAddToCart(toMenuItem(item))}
                      className="flex-1 bg-brand-cream hover:bg-brand-beige text-brand-charcoal text-[11px] font-semibold uppercase tracking-wider py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5 text-brand-charcoal" /> + Pesan
                    </button>

                    <button
                      onClick={() => onSelectItem(toMenuItem(item))}
                      aria-label="Lihat Detail"
                      title="Lihat Detail"
                      className="p-2 text-gray-400 hover:text-brand-charcoal hover:bg-brand-cream rounded-xl transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        const url = generateItemOrderWhatsApp(item.name, item.price);
                        window.open(url, '_blank');
                      }}
                      aria-label="Pesan via WhatsApp"
                      title="Pesan via WhatsApp"
                      className="p-2 text-brand-charcoal hover:bg-brand-cream rounded-xl transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
