import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ShoppingBag,
  Calendar,
  Home,
  BookOpen,
  Utensils,
  Camera,
  Sparkles,
  Star,
  MapPin,
  MessageSquare,
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import { PageId } from '../types';
import { CAFE_INFO } from '../data/mockData';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenReservation: _onOpenReservation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Passive, throttled scroll handler for buttery smooth performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 25);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile drawer is open to prevent touch lag & jumpiness
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'about', label: 'Our Story', icon: BookOpen },
    { id: 'menu', label: 'Menu Digital', icon: Utensils },
    { id: 'reservasi', label: 'Reservasi', icon: Calendar },
    { id: 'galeri', label: 'Galeri', icon: Camera },
    { id: 'promo', label: 'Promo & Event', icon: Sparkles },
    { id: 'ulasan', label: 'Ulasan & FAQ', icon: Star },
    { id: 'kontak', label: 'Lokasi', icon: MapPin },
    { id: 'karir', label: 'Karir', icon: Briefcase },
  ];

  const handleLinkClick = (pageId: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-colors duration-200 ${
          isScrolled
            ? 'bg-brand-cream/95 backdrop-blur-md shadow-xs border-b border-brand-charcoal/15 py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 group focus:outline-none text-left"
          >
            <span
              className={`font-serif-title text-xl sm:text-2xl font-bold tracking-wider uppercase transition-colors ${
                isScrolled ? 'text-brand-charcoal' : 'text-brand-cream'
              }`}
            >
              {CAFE_INFO.name}
            </span>
            <span
              className={`text-[10px] sm:text-xs tracking-[0.25em] font-sans font-light uppercase border-l pl-2 transition-colors ${
                isScrolled
                  ? 'text-brand-charcoal/70 border-brand-charcoal/30'
                  : 'text-brand-cream/70 border-brand-cream/30'
              }`}
            >
              Café
            </span>
          </button>

          {/* Desktop Navigation Links (Visible on XL screens) */}
          <div className="hidden xl:flex items-center space-x-1 2xl:space-x-2 text-xs font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`py-2 px-3 rounded-lg transition-colors relative ${
                    isScrolled
                      ? isActive
                        ? 'text-brand-charcoal font-bold bg-brand-cream'
                        : 'text-brand-charcoal hover:text-black hover:bg-brand-cream/50'
                      : isActive
                      ? 'text-brand-cream font-bold bg-brand-cream/20'
                      : 'text-brand-cream/90 hover:text-brand-cream hover:bg-brand-cream/10'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full ${
                        isScrolled ? 'bg-brand-charcoal' : 'bg-brand-cream'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              aria-label="Buka Baki Pesanan"
              className={`relative p-2.5 rounded-full transition-colors flex items-center justify-center min-w-[40px] min-h-[40px] ${
                isScrolled
                  ? 'bg-brand-cream text-brand-charcoal hover:bg-brand-charcoal/10 border border-brand-charcoal/20'
                  : 'bg-brand-cream/15 text-brand-cream hover:bg-brand-cream/25'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-charcoal text-brand-cream text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Fast & Responsive Hamburger Toggle with 2 lines (Visible on screens below XL) */}
            <button
              id="mobileMenuBtn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              aria-expanded={mobileMenuOpen}
              className={`xl:hidden p-2.5 rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                isScrolled
                  ? 'text-brand-charcoal hover:bg-brand-cream'
                  : 'text-brand-cream hover:bg-brand-cream/15'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <div className="w-5 h-3 flex flex-col justify-between items-end" aria-hidden="true">
                  <span className="w-5 h-[2px] bg-current rounded-full transition-all" />
                  <span className="w-5 h-[2px] bg-current rounded-full transition-all" />
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Compact Top Dropdown Mobile Menu ("Dari Atas Aja", Tidak Memanjang ke Bawah) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop overlay covering the rest of the screen */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Top Dropdown Card - Floating directly below the top bar */}
          <aside
            id="mobileMenu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu Navigasi"
            className="fixed top-16 sm:top-20 right-3 left-3 sm:left-auto sm:right-6 sm:w-84 bg-brand-cream text-brand-charcoal shadow-2xl rounded-2xl border border-brand-charcoal/20 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-brand-charcoal/10 flex items-center justify-between bg-brand-cream">
              <div className="min-w-0">
                <span className="font-serif-title text-sm font-bold tracking-wide uppercase text-brand-charcoal block truncate">
                  {CAFE_INFO.name}
                </span>
                <p className="text-[10px] text-brand-charcoal/60 font-sans">
                  Pilihan Halaman
                </p>
              </div>
              <button
                id="closeMobileMenuBtn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Tutup Menu Navigasi"
                className="p-1.5 text-brand-charcoal/70 hover:text-brand-charcoal hover:bg-brand-charcoal/10 rounded-lg transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Grid (2 Columns - Rapi, Ringkas, Dari Atas) */}
            <div className="p-2.5 grid grid-cols-2 gap-1.5 bg-brand-cream">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    id={`drawer-link-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-colors text-xs font-medium ${
                      isActive
                        ? 'bg-brand-charcoal text-brand-cream shadow-xs'
                        : 'text-brand-charcoal bg-brand-cream hover:bg-brand-charcoal/10 hover:text-black border border-brand-charcoal/15'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-black text-brand-cream'
                          : 'bg-brand-cream text-brand-charcoal border border-brand-charcoal/15'
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Compact Actions */}
            <div className="px-3 py-2.5 border-t border-brand-charcoal/10 bg-brand-cream flex items-center gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('reservasi');
                }}
                className="flex-1 text-center text-xs font-semibold py-2 px-3 bg-brand-charcoal hover:bg-black text-brand-cream rounded-xl transition-colors"
              >
                Reservasi Meja
              </button>
              <a
                href={`https://wa.me/${CAFE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat WhatsApp"
                className="p-2 text-brand-charcoal bg-brand-cream hover:bg-brand-charcoal/10 border border-brand-charcoal/20 rounded-xl flex items-center justify-center transition-colors shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
