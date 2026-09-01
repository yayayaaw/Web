// Taruh file ini di: src/admin/adminTypes.ts

export type AdminTabId =
  | 'content-pages'
  | 'sanctuary'
  | 'menu'
  | 'signature-menu'
  | 'philosophy'
  | 'reservations'
  | 'gallery'
  | 'event'
  | 'promo'
  | 'testimonials-faq'
  | 'settings'
  | 'careers'
  | 'analytics'
  | 'theme';

export interface AdminJobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export interface AdminMenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'non-coffee' | 'main' | 'snack' | 'dessert';
  price: number;
  img: string;
  badge?: string;
  status: string;
  description?: string;
}

export interface AdminGalleryItem {
  id: string;
  caption: string;
  url: string;
}

export interface AdminPromoItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  validUntil: string;
}

export interface AdminTestimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

export interface AdminFaq {
  id: string;
  question: string;
  answer: string;
}

export interface AdminHeroContent {
  brand: string;
  hoursLabel: string;
  title: string;
  subtitle: string;
  backgroundUrl: string;
  button1Text: string;
  button2Text: string;
}

export interface AdminAboutContent {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  quote: string;
  subQuote: string;
  imageUrl: string;
}

export interface AdminSettings {
  whatsapp: string;
  email: string;
  address: string;
  mapsEmbedUrl: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  metaTitle: string;
  metaDescription: string;
}

export interface AdminTheme {
  bg: string;
  accent: string;
  text: string;
}
