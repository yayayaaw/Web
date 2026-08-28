import React from 'react';
import { Camera, Instagram, Sparkles, MapPin } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { GallerySection } from '../components/GallerySection';
import { SocialShowcase } from '../components/SocialShowcase';
import { GalleryPhoto, PageId } from '../types';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
  onOpenLightbox: (photo: GalleryPhoto) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigate,
  onOpenLightbox,
}) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        eyebrow="Visual Ambiance & Architecture"
        title="Galeri Sudut Estetik & Kehangatan Élysée"
        description="Telusuri keindahan arsitektur bernuansa bistro klasik, pencahayaan alami di sudut perpustakaan, dedaunan hijau di taman outdoor, dan kepiawaian barista kami meracik kopi."
        breadcrumbs={[{ label: 'Galeri Foto' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Main Gallery Component */}
      <GallerySection onOpenLightbox={onOpenLightbox} />

      {/* Social / Instagram Showcase */}
      <SocialShowcase />
    </div>
  );
};
