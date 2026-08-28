import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { DigitalMenuSection } from '../components/DigitalMenuSection';
import { MenuItem, PageId } from '../types';

interface MenuPageProps {
  onNavigate: (page: PageId) => void;
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem, quantity?: number, notes?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  onNavigate,
  onSelectItem,
  onAddToCart,
  cartCount,
  onOpenCart,
}) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        eyebrow="Digital Menu & Bistro Catalog"
        title="Pilihan Kopi Spesialti & Kuliner Kurasi"
        description="Jelajahi seluruh racikan kopi artisan in-house, mocktail segar, teh herbal pilihan, serta hidangan santai hangat yang dibuat dari bahan baku segar berkualitas tinggi."
        breadcrumbs={[{ label: 'Menu Digital' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Main Digital Menu Section */}
      <DigitalMenuSection
        onSelectItem={onSelectItem}
        onAddToCart={onAddToCart}
      />

      {/* Chef & Barista Pairing Guide */}
      <section className="py-16 bg-brand-cream border-t border-brand-charcoal/10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-brand-cream border border-brand-charcoal/15 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-brand-charcoal text-xs uppercase font-bold tracking-widest">
              <Sparkles className="w-4 h-4" /> Barista Pairing Guide
            </div>
            <h3 className="font-serif-title text-2xl font-bold text-brand-charcoal">
              Rekomendasi Kombinasi Sempurna Kami
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light leading-relaxed">
              Coba padukan <strong>Crème Brûlée Latte</strong> dengan <strong>Smoked Beef Truffle Toast</strong> untuk sarapan akhir pekan yang mengenyangkan, atau nikmati <strong>Kyoto Cold Drip</strong> bersama <strong>Basque Burnt Cheesecake</strong> untuk kesegaran sore yang seimbang.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-brand-charcoal font-medium">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-brand-charcoal" /> Biji kopi single-origin pilihan
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-brand-charcoal" /> Bebas pengawet sintetis
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
