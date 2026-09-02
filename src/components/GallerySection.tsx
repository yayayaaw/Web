import React, { useState, useMemo } from 'react';
import { Camera, ZoomIn } from 'lucide-react';
import { GalleryPhoto } from '../types';
import { useContent } from '../lib/contentStore';

interface GallerySectionProps {
  onOpenLightbox: (photo: GalleryPhoto) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenLightbox }) => {
  const photos = useContent('galleryPhotos');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Kategori filter dibuat OTOMATIS dari data yang ada di CMS -- bukan daftar tetap.
  // Owner nambah kategori baru di CMS, chip filter di sini otomatis ikut muncul.
  const filterTabs = useMemo(() => {
    const uniqueCategories = Array.from(new Set(photos.map(p => p.category)));
    return [
      { id: 'all', label: 'Semua Sudut' },
      ...uniqueCategories.map(cat => ({ id: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) })),
    ];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (selectedFilter === 'all') return photos;
    return photos.filter((p) => p.category === selectedFilter);
  }, [selectedFilter, photos]);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-brand-ivory relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-charcoal/70 font-semibold block">
            Visual & Atmosphere
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal">
            Suasana & Keindahan Ruang
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light">
            Setiap sudut Élysée dirancang untuk memberikan kedamaian visual, pencahayaan lembut, dan kenyamanan bercengkerama.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-brand-charcoal text-brand-cream shadow-xs'
                    : 'bg-brand-cream text-brand-charcoal hover:bg-brand-beige'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Masonry/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(photo as GalleryPhoto)}
              className="relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

              {/* Hover overlay content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                  <span className="w-10 h-10 rounded-full bg-brand-cream/20 backdrop-blur-md text-brand-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-2 group-hover:translate-y-0 duration-300">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-brand-cream font-serif-title text-xl font-bold">
                    {photo.title}
                  </p>
                  <p className="text-brand-beige text-xs uppercase tracking-widest mt-1 opacity-90">
                    Élysée Ambience
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
