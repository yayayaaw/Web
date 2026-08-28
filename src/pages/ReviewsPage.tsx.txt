import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FaqSection } from '../components/FaqSection';
import { Testimonial, PageId } from '../types';

interface ReviewsPageProps {
  onNavigate: (page: PageId) => void;
  testimonials: Testimonial[];
  onOpenReviewModal: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  onNavigate,
  testimonials,
  onOpenReviewModal,
}) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        eyebrow="Guest Feedback & FAQ"
        title="Ulasan Pengunjung & Tanya Jawab"
        description="Kejujuran dan kepuasan Anda adalah barometer utama kami. Baca cerita dari para tamu setia kami atau temukan jawaban atas pertanyaan seputar kunjungan Anda."
        breadcrumbs={[{ label: 'Ulasan & FAQ' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Main Testimonials Section */}
      <TestimonialsSection
        testimonials={testimonials}
        onOpenReviewModal={onOpenReviewModal}
      />

      {/* Main FAQ Section */}
      <FaqSection />
    </div>
  );
};
