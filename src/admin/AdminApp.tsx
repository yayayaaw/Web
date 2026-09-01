// Taruh file ini di: src/admin/AdminApp.tsx
import React, { useState } from 'react';
import { AdminTabId } from './adminTypes';
import { ContentPagesTab } from './tabs/ContentPagesTab';
import { SanctuaryTab } from './tabs/SanctuaryTab';
import { MenuTab } from './tabs/MenuTab';
import { SignatureMenuTab } from './tabs/SignatureMenuTab';
import { PhilosophyTab } from './tabs/PhilosophyTab';
import { ReservationsTab } from './tabs/ReservationsTab';
import { GalleryTab } from './tabs/GalleryTab';
import { EventTab } from './tabs/EventTab';
import { PromoTab } from './tabs/PromoTab';
import { TestimonialsFaqTab } from './tabs/TestimonialsFaqTab';
import { SettingsTab } from './tabs/SettingsTab';
import { CareersTab } from './tabs/CareersTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { ThemeTab } from './tabs/ThemeTab';

// Urutan ini disamakan persis dengan alur scroll di homepage web utama:
// Hero+Sambutan -> Sudut Ketenangan -> Menu -> Menu Unggulan -> Filosofi ->
// Reservasi -> Galeri -> Event -> Promo -> Ulasan&FAQ -> Lokasi -> Karir
// Analitik & Tema ditaruh di paling bawah karena bukan representasi section, tapi alat bantu.
const NAV_ITEMS: { id: AdminTabId; label: string; icon: string }[] = [
  { id: 'content-pages', label: 'Beranda & Our Story', icon: 'fa-pen-to-square' },
  { id: 'sanctuary', label: 'Sudut Ketenangan', icon: 'fa-couch' },
  { id: 'menu', label: 'Menu Digital', icon: 'fa-utensils' },
  { id: 'signature-menu', label: 'Menu Unggulan', icon: 'fa-star' },
  { id: 'philosophy', label: 'Filosofi Kami', icon: 'fa-mug-hot' },
  { id: 'reservations', label: 'Reservasi', icon: 'fa-calendar-check' },
  { id: 'gallery', label: 'Galeri (Momen Élysée)', icon: 'fa-images' },
  { id: 'event', label: 'Event Akhir Pekan', icon: 'fa-music' },
  { id: 'promo', label: 'Promo', icon: 'fa-ticket' },
  { id: 'testimonials-faq', label: 'Ulasan & FAQ', icon: 'fa-comments' },
  { id: 'settings', label: 'Lokasi & Kontak', icon: 'fa-sliders' },
  { id: 'careers', label: 'Karir', icon: 'fa-briefcase' },
  { id: 'analytics', label: 'Analitik Pengunjung', icon: 'fa-chart-pie' },
  { id: 'theme', label: 'Tema & Warna', icon: 'fa-palette' },
];

const TAB_TITLES: Record<AdminTabId, string> = {
  'content-pages': 'Kelola Beranda & Our Story',
  'sanctuary': 'Kelola Sudut Ketenangan',
  'menu': 'Kelola Menu Digital',
  'signature-menu': 'Kelola Menu Unggulan',
  'philosophy': 'Kelola Filosofi Kami',
  'reservations': 'Kelola Reservasi',
  'gallery': 'Kelola Galeri',
  'event': 'Kelola Event Akhir Pekan',
  'promo': 'Kelola Promo & Event',
  'testimonials-faq': 'Kelola Ulasan & FAQ',
  'settings': 'Kelola Lokasi & Kontak',
  'careers': 'Kelola Lowongan Karir',
  'analytics': 'Analitik Pengunjung',
  'theme': 'Tema & Warna Website',
};

export function AdminApp() {
  const [activeTab, setActiveTab] = useState<AdminTabId>('content-pages');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-[#F4EFE6] text-[#1A1A1A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* SIDEBAR */}
      <aside
        className={`w-64 bg-[#1A1A1A] text-white flex flex-col justify-between transition-transform duration-300 z-30 fixed inset-y-0 left-0 lg:static
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="overflow-y-auto">
          <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#1A1A1A] z-10">
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

        <div className="p-4 border-t border-white/10 flex items-center justify-between shrink-0">
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
              <p className="text-[11px] text-gray-500">Perubahan tersimpan ke browser & langsung tampil di web utama saat direfresh.</p>
            </div>
          </div>
        </header>

        <main className="p-6 max-w-7xl w-full mx-auto space-y-8 flex-1">
          {activeTab === 'content-pages' && <ContentPagesTab />}
          {activeTab === 'sanctuary' && <SanctuaryTab />}
          {activeTab === 'menu' && <MenuTab />}
          {activeTab === 'signature-menu' && <SignatureMenuTab />}
          {activeTab === 'philosophy' && <PhilosophyTab />}
          {activeTab === 'reservations' && <ReservationsTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'event' && <EventTab />}
          {activeTab === 'promo' && <PromoTab />}
          {activeTab === 'testimonials-faq' && <TestimonialsFaqTab />}
          {activeTab === 'settings' && <SettingsTab />}
          {activeTab === 'careers' && <CareersTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'theme' && <ThemeTab />}
        </main>
      </div>
    </div>
  );
}
