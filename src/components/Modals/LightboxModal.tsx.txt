import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryPhoto } from '../../types';

interface LightboxModalProps {
  photo: GalleryPhoto | null;
  allPhotos: GalleryPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: GalleryPhoto) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  allPhotos,
  onClose,
  onSelectPhoto,
}) => {
  if (!photo) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onSelectPhoto(allPhotos[currentIndex - 1]);
    } else {
      onSelectPhoto(allPhotos[allPhotos.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < allPhotos.length - 1) {
      onSelectPhoto(allPhotos[currentIndex + 1]);
    } else {
      onSelectPhoto(allPhotos[0]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const prevIdx = currentIndex > 0 ? currentIndex - 1 : allPhotos.length - 1;
        onSelectPhoto(allPhotos[prevIdx]);
      }
      if (e.key === 'ArrowRight') {
        const nextIdx = currentIndex < allPhotos.length - 1 ? currentIndex + 1 : 0;
        onSelectPhoto(allPhotos[nextIdx]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, allPhotos, onClose, onSelectPhoto]);

  return (
    <div
      id="lightbox"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
      role="dialog"
      aria-modal="true"
    >
      {/* Top action buttons */}
      <div className="absolute top-5 right-5 flex items-center gap-3 z-50">
        <span className="text-brand-cream/70 text-xs tracking-widest font-sans uppercase">
          {currentIndex + 1} / {allPhotos.length}
        </span>
        <button
          id="closeLightboxBtn"
          onClick={onClose}
          aria-label="Tutup Galeri"
          className="w-10 h-10 rounded-full bg-brand-cream/10 hover:bg-brand-cream/20 text-brand-cream flex items-center justify-center transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Foto Sebelumnya"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-cream/10 hover:bg-brand-cream/25 text-brand-cream flex items-center justify-center transition-all z-50 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        aria-label="Foto Selanjutnya"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-cream/10 hover:bg-brand-cream/25 text-brand-cream flex items-center justify-center transition-all z-50 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="relative max-h-[75vh] w-full flex items-center justify-center">
          <img
            id="lightboxImg"
            src={photo.url}
            alt={photo.title}
            className="max-h-[75vh] max-w-full rounded-xl shadow-2xl object-contain border border-brand-cream/15"
          />
        </div>
        <div className="mt-4 text-center">
          <p
            id="lightboxCaption"
            className="font-serif-title text-2xl font-light tracking-wide text-brand-cream"
          >
            {photo.title}
          </p>
          <span className="text-xs uppercase tracking-widest text-brand-cream/80 mt-1 inline-block">
            Élysée Café Ambience
          </span>
        </div>
      </div>
    </div>
  );
};
