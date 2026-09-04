// Taruh file ini di: src/pages/AboutPage.tsx
//
// PATCH v3 (final): section "Filosofi Seduhan Presisi" / "Craftsmanship &
// Brewing Methodology" DIHAPUS TOTAL dari halaman ini -- isinya duplikat
// dengan section "Ketelitian dalam Tiap Seduhan" (philosophyCards) yang
// sudah ada di Home, jadi gak perlu ditampilkan dua kali dengan tema serupa.
//
// <SocialShowcase /> juga tetap dicabut dari halaman ini (sesuai patch
// sebelumnya) -- sekarang cuma tampil di halaman Galeri.

import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { AboutSection } from '../components/AboutSection';
import { PageId } from '../types';
import { useContent } from '../lib/contentStore';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const about = useContent('about');

  return (
    <div className="space-y-0">
      {/* Page Header -- narik dari CMS (tab Beranda & Our Story) */}
      <PageHeader
        eyebrow={about.pageEyebrow}
        title={about.pageTitle}
        description={about.pageDescription}
        breadcrumbs={[{ label: 'Our Story' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Main About Component -- cerita, quote, foto, dan highlight (paragraf) */}
      <AboutSection />
    </div>
  );
};
