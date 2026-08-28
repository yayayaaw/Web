import React, { useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '../../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Testimonial) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmitReview }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const initials = name
      .trim()
      .split(' ')
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('');

    const newReview: Testimonial = {
      id: 'review-' + Date.now(),
      name: name.trim(),
      role: role.trim() || 'Visitor & Coffee Lover',
      rating,
      comment: comment.trim(),
      avatarText: initials || 'VI',
      date: 'Baru saja'
    };

    onSubmitReview(newReview);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setRole('');
      setComment('');
      setRating(5);
      onClose();
    }, 1200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-brand-cream rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 relative shadow-2xl border border-brand-charcoal/20 my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-5 right-5 text-brand-charcoal/60 hover:text-brand-charcoal w-9 h-9 rounded-full hover:bg-brand-charcoal/10 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 rounded-full bg-brand-cream text-brand-charcoal border border-brand-charcoal/20 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-title text-2xl font-bold text-brand-charcoal">
              Terima Kasih atas Ulasan Anda!
            </h3>
            <p className="text-xs text-brand-charcoal/70">
              Ulasan Anda sangat berarti bagi tim barista dan chef kami di Élysée.
            </p>
          </div>
        ) : (
          <>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal">
                Bagikan Pengalaman Anda
              </span>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-brand-charcoal">
                Tulis Ulasan Kunjungan
              </h3>
              <p className="text-xs text-brand-charcoal/70 mt-1">
                Ceritakan kenikmatan sajian, suasana, atau pelayanan yang Anda rasakan di Élysée.
              </p>
            </div>

            {/* Star Rating Select */}
            <div className="text-center py-2 bg-brand-cream rounded-2xl border border-brand-charcoal/15">
              <span className="text-[11px] font-semibold text-brand-charcoal/70 uppercase tracking-wider block mb-1">
                Beri Bintang Kepuasan
              </span>
              <div className="flex justify-center items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Beri ${star} bintang`}
                    className="p-1 text-2xl text-brand-charcoal focus:outline-none transition-transform hover:scale-115"
                  >
                    <Star
                      className={`w-7 h-7 ${(hoverRating || rating) >= star ? 'fill-brand-charcoal text-brand-charcoal' : 'text-brand-charcoal/20'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Rian Pratama"
                  className="w-full text-xs px-4 py-3 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal focus:ring-0 outline-none transition-colors text-brand-charcoal placeholder:text-brand-charcoal/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                  Profesi / Keterangan (Opsional)
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Contoh: Coffee Lover / Graphic Designer"
                  className="w-full text-xs px-4 py-3 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal focus:ring-0 outline-none transition-colors text-brand-charcoal placeholder:text-brand-charcoal/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                  Ulasan / Pesan Anda *
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tuliskan pengalaman Anda mengenai rasa kopi, makanan, atau suasana..."
                  className="w-full text-xs p-4 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal focus:ring-0 outline-none transition-colors text-brand-charcoal placeholder:text-brand-charcoal/40"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-charcoal text-brand-cream text-xs font-semibold uppercase tracking-widest py-3.5 rounded-xl hover:bg-black transition-colors shadow-sm"
              >
                Kirim Ulasan Sekarang
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
