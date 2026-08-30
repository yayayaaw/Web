// Taruh file ini di: src/admin/AdminApp.tsx
import React, { useState } from 'react';
import { AdminTabId } from './adminTypes';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { ContentPagesTab } from './tabs/ContentPagesTab';
import { MenuTab } from './tabs/MenuTab';
import { GalleryTab } from './tabs/GalleryTab';
import { PromoTab } from './tabs/PromoTab';
import { ReservationsTab } from './tabs/ReservationsTab';
import { TestimonialsFaqTab } from './tabs/TestimonialsFaqTab';
import { SettingsTab } from './tabs/SettingsTab';
import { ThemeTab } from './tabs/ThemeTab';

const NAV_ITEMS: { id: AdminTabId; label: string; icon: string }[] = [
  { id: 'analytics', label: 'Analitik Pengunjung', icon: 'fa-chart-pie' },
  { id: 'content-pages', label: 'Kelola Teks & Gambar Web', icon: 'fa-pen-to-square' },
  { id: 'menu', label: 'Kelola Menu & Produk', icon: 'fa-utensils' },
  { id: 'gallery', label: 'Galeri Foto Suasana', icon: 'fa-images' },
  { id: 'promo', label: 'Promo & Event Tiket', icon: 'fa-ticket' },
  { id: 'reservations', label: 'Reservasi Meja', icon: 'fa-calendar-check' },
  { id: 'testimonials-faq', label: 'Ulasan & FAQ', icon: 'fa-comments' },
  { id: 'settings', label: 'Kontak, Maps & SEO', icon: 'fa-sliders' },
  { id: 'theme', label: 'Tema & Warna Website', icon: 'fa-palette' },
];

const TAB_TITLES: Record<AdminTabId, string> = {
  'analytics': 'Analitik Pengunjung',
  'content-pages': 'Kelola Teks & Gambar Website Utama',
  'menu': 'Kelola Menu & Produk Café',
  'gallery': 'Kelola Galeri Suasana Café',
  'promo': 'Kelola Promo & Event Tiket',
  'reservations': 'Reservasi Meja Pengunjung',
  'testimonials-faq': 'Kelola Testimoni & Pertanyaan FAQ',
  'settings': 'Pengaturan Kontak, SEO & Maps',
  'theme': 'Kustomisasi Warna Website',
};

export function AdminApp() {
  const [activeTab, setActiveTab] = useState<AdminTabId>('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-[#F4EFE6] text-[#1A1A1A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* SIDEBAR */}
      <aside
        className={`w-64 bg-[#1A1A1A] text-white flex flex-col justify-between transition-transform duration-300 z-30 fixed inset-y-0 left-0 lg:static
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#E6DEC8] tracking-wider" style={{ fontFamily: "'Cormorant Garamond', serif" }}>ÉLYSÉE</h1>
              <p className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">Full Control CMS Center</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <nav className="p-4 space-y-1.5">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors text-left
                  ${activeTab === item.id ? 'bg-[#3D2817] text-[#FDFBF7]' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
              >
                <i className={`fa-solid ${item.icon} text-base w-5 text-center`}></i> {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#6F4E37] flex items-center justify-center font-bold text-xs text-white flex-shrink-0">OW</div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white">Owner / Manager</h4>
              <p className="text-[10px] text-gray-400 truncate">admin@elyseecafe.com</p>
            </div>
          </div>
          <a href="/" title="Buka Website" className="text-gray-400 hover:text-[#E6DEC8] p-2 flex-shrink-0">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-[#FDFBF7] border-b border-[#E6DEC8]/60 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#1A1A1A] text-xl p-1">
              <i className="fa-solid fa-bars"></i>
            </button>
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{TAB_TITLES[activeTab]}</h2>
              <p className="text-[11px] text-gray-500">Kelola seluruh konten website Élysée Café dari satu tempat.</p>
            </div>
          </div>
        </header>

        <main className="p-6 max-w-7xl w-full mx-auto space-y-8 flex-1">
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'content-pages' && <ContentPagesTab />}
          {activeTab === 'menu' && <MenuTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'promo' && <PromoTab />}
          {activeTab === 'reservations' && <ReservationsTab />}
          {activeTab === 'testimonials-faq' && <TestimonialsFaqTab />}
          {activeTab === 'settings' && <SettingsTab />}
          {activeTab === 'theme' && <ThemeTab />}
        </main>
      </div>
    </div>
  );
}
