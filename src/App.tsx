import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OrderTrayDrawer } from './components/OrderTrayDrawer';
import { FloatingActions } from './components/FloatingActions';

// Dedicated Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MenuPage } from './pages/MenuPage';
import { ReservationPage } from './pages/ReservationPage';
import { GalleryPage } from './pages/GalleryPage';
import { PromoPage } from './pages/PromoPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { LocationPage } from './pages/LocationPage';
import { CareersPage } from './pages/CareersPage';

// Modals
import { LightboxModal } from './components/Modals/LightboxModal';
import { TicketModal } from './components/Modals/TicketModal';
import { VoucherModal } from './components/Modals/VoucherModal';
import { MenuDetailModal } from './components/Modals/MenuDetailModal';
import { ReviewModal } from './components/Modals/ReviewModal';
import { ReservationSuccessModal } from './components/Modals/ReservationSuccessModal';
import { ApplyJobModal } from './components/Modals/ApplyJobModal';

// Data & Types
import { MenuItem, CartItem, GalleryPhoto, ReservationData, Testimonial, PageId, JobPosition, JobApplication } from './types';
import { PROMO_DATA, EVENT_DATA, TESTIMONIALS, JOB_POSITIONS } from './data/mockData';

// PATCH (fix bug lightbox prev/next nyasar untuk foto yang ditambah lewat CMS):
// Sebelumnya `allPhotos` di LightboxModal pakai GALLERY_PHOTOS dari mockData.ts
// (data statis, gak pernah berubah). Padahal GalleryTab di CMS nulis fotonya
// ke contentStore ('galleryPhotos' key). Kalau admin tambah/hapus foto lewat
// CMS, lightbox jadi nyari currentIndex di array yang salah (gak ketemu,
// atau ketemu foto lain) -- makanya sebelumnya kerasa "gak nyambung".
// Sekarang pakai useContent('galleryPhotos') supaya satu sumber data yang sama
// dipakai baik untuk grid galeri maupun untuk lightbox-nya.
import { useContent } from './lib/contentStore';

// Key sama dipakai AnalyticsTab.tsx di CMS untuk hitung pengunjung per hari/bulan
const VISITS_KEY = 'elysee_visits';

export function App() {
  // Page Routing State
  const [activePage, setActivePage] = useState<PageId>(() => {
    try {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'about',
        'menu',
        'reservasi',
        'galeri',
        'promo',
        'ulasan',
        'kontak',
        'karir',
      ];
      if (validPages.includes(hash)) return hash;
    } catch {
      // ignore
    }
    return 'home';
  });

  // Cart / Order Tray State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('elysee_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals state
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isMenuDetailOpen, setIsMenuDetailOpen] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Career Application Modal state
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobPosition | null>(null);
  const [isApplyJobModalOpen, setIsApplyJobModalOpen] = useState(false);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    try {
      const saved = localStorage.getItem('elysee_applications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reservation state
  const [recentReservation, setRecentReservation] = useState<ReservationData | null>(() => {
    try {
      const saved = localStorage.getItem('elysee_recent_reservation');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [reservationModalData, setReservationModalData] = useState<ReservationData | null>(null);

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('elysee_reviews');
      return saved ? JSON.parse(saved) : TESTIMONIALS;
    } catch {
      return TESTIMONIALS;
    }
  });

  // PATCH: sumber galeri untuk lightbox sekarang dari CMS, bukan mockData.
  const galleryPhotos = useContent('galleryPhotos');

  // Catat kunjungan untuk Analitik Pengunjung di CMS (localStorage saja, ringan).
  // Cukup jalan sekali tiap kali web utama dibuka/direfresh.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(VISITS_KEY);
      const visits: string[] = raw ? JSON.parse(raw) : [];
      visits.push(new Date().toISOString());
      // Simpan maksimal 1000 entri terakhir biar localStorage gak membengkak
      const trimmed = visits.slice(-1000);
      localStorage.setItem(VISITS_KEY, JSON.stringify(trimmed));
    } catch {
      // ignore
    }
  }, []);

  // Listen to browser hash changes (for back/forward navigation or direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'about',
        'menu',
        'reservasi',
        'galeri',
        'promo',
        'ulasan',
        'kontak',
        'karir',
      ];
      if (validPages.includes(hash)) {
        setActivePage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persist job applications
  useEffect(() => {
    try {
      localStorage.setItem('elysee_applications', JSON.stringify(jobApplications));
    } catch {
      // ignore
    }
  }, [jobApplications]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('elysee_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Page navigation handler
  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    try {
      window.location.hash = page;
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem, quantity: number = 1, notes?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.item.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (notes) updated[existingIndex].notes = notes;
        return updated;
      }
      return [...prev, { item, quantity, notes }];
    });
  };

  const handleUpdateCartQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.item.id === itemId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Menu detail modal triggers
  const handleOpenMenuDetail = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setIsMenuDetailOpen(true);
  };

  // Lightbox triggers
  const handleOpenLightbox = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
    setIsLightboxOpen(true);
  };

  // Reservation Success
  const handleReservationSuccess = (resData: ReservationData) => {
    setRecentReservation(resData);
    setReservationModalData(resData);
    try {
      localStorage.setItem('elysee_recent_reservation', JSON.stringify(resData));
    } catch {
      // ignore
    }
  };

  // Review submission
  const handleAddReview = (newReview: Testimonial) => {
    const updated = [newReview, ...testimonials];
    setTestimonials(updated);
    try {
      localStorage.setItem('elysee_reviews', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Career Application Modal handlers
  const handleOpenApplyModal = (job: JobPosition) => {
    setSelectedJobForApply(job);
    setIsApplyJobModalOpen(true);
  };

  const handleSubmitJobApplication = (newApp: JobApplication) => {
    setJobApplications((prev) => [newApp, ...prev]);
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-cream font-sans selection:bg-brand-charcoal selection:text-brand-cream flex flex-col justify-between">
      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => handleNavigate('reservasi')}
      />

      {/* Dedicated Page Content */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectItem={handleOpenMenuDetail}
            onAddToCart={handleAddToCart}
            onOpenReviewModal={() => setIsReviewModalOpen(true)}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {activePage === 'menu' && (
          <MenuPage
            onNavigate={handleNavigate}
            onSelectItem={handleOpenMenuDetail}
            onAddToCart={handleAddToCart}
            cartCount={cartCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {activePage === 'reservasi' && (
          <ReservationPage
            onNavigate={handleNavigate}
            onReservationSuccess={handleReservationSuccess}
            recentReservation={recentReservation}
          />
        )}

        {activePage === 'galeri' && (
          <GalleryPage
            onNavigate={handleNavigate}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activePage === 'promo' && (
          <PromoPage
            onNavigate={handleNavigate}
            onOpenPromoModal={() => setIsPromoModalOpen(true)}
            onOpenTicketModal={() => setIsTicketModalOpen(true)}
          />
        )}

        {activePage === 'ulasan' && (
          <ReviewsPage
            onNavigate={handleNavigate}
            testimonials={testimonials}
            onOpenReviewModal={() => setIsReviewModalOpen(true)}
          />
        )}

        {activePage === 'kontak' && (
          <LocationPage onNavigate={handleNavigate} />
        )}

        {activePage === 'karir' && (
          <CareersPage
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenApplyModal}
            applications={jobApplications}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Buttons */}
      <FloatingActions
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart / Order Tray Side Drawer */}
      <OrderTrayDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Lightbox Modal -- PATCH: allPhotos sekarang dari CMS (galleryPhotos), bukan mockData */}
      <LightboxModal
        photo={selectedPhoto}
        allPhotos={galleryPhotos as unknown as GalleryPhoto[]}
        onClose={() => {
          setIsLightboxOpen(false);
          setSelectedPhoto(null);
        }}
        onSelectPhoto={setSelectedPhoto}
      />

      {/* Ticket Modal for Acoustic Jazz Night */}
      <TicketModal
        event={EVENT_DATA}
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />

      {/* Voucher Modal for Promos */}
      <VoucherModal
        promo={PROMO_DATA}
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
      />

      {/* Menu Detail Modal */}
      <MenuDetailModal
        item={selectedMenuItem}
        isOpen={isMenuDetailOpen}
        onClose={() => {
          setIsMenuDetailOpen(false);
          setSelectedMenuItem(null);
        }}
        onAddToCart={handleAddToCart}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />

      {/* Reservation Confirmation Modal */}
      <ReservationSuccessModal
        reservation={reservationModalData}
        isOpen={Boolean(reservationModalData)}
        onClose={() => setReservationModalData(null)}
      />

      {/* Apply Job Modal */}
      <ApplyJobModal
        job={selectedJobForApply}
        allJobs={JOB_POSITIONS}
        isOpen={isApplyJobModalOpen}
        onClose={() => {
          setIsApplyJobModalOpen(false);
          setSelectedJobForApply(null);
        }}
        onSubmitApplication={handleSubmitJobApplication}
      />
    </div>
  );

}

export default App;
