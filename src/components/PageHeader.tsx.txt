import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageId } from '../types';

interface BreadcrumbItem {
  label: string;
  page?: PageId;
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  bgImage?: string;
  onNavigate: (page: PageId) => void;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  breadcrumbs,
  bgImage = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1920',
  onNavigate,
  children,
}) => {
  return (
    <header className="relative pt-32 pb-14 md:pt-36 md:pb-16 bg-brand-softBlack text-brand-cream overflow-hidden border-b border-brand-cream/10">
      {/* Ambient background with vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover object-center opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-softBlack via-brand-softBlack/85 to-black/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-brand-beige transition-colors flex items-center gap-1.5 focus:outline-none"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </button>

          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-gray-500 shrink-0" />
              {crumb.page ? (
                <button
                  onClick={() => onNavigate(crumb.page!)}
                  className="hover:text-brand-beige transition-colors focus:outline-none"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-brand-beige font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Header content */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-beige font-semibold block">
            {eyebrow}
          </span>

          <h1 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-light text-brand-ivory tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-2xl">
            {description}
          </p>

          {children && <div className="pt-2">{children}</div>}
        </div>
      </div>
    </header>
  );
};
