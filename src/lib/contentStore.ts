// Taruh file ini di: src/lib/contentStore.ts
//
// SATU SUMBER DATA untuk CMS (#admin) dan Web Utama (#home).
// Keduanya jalan di domain yang sama, jadi localStorage otomatis "kebagi".
// CMS nulis lewat setContent(), web utama baca lewat getContent()/useContent().
//
// Kalau localStorage kosong (pertama kali buka / browser beda), otomatis
// fallback ke DEFAULT_CONTENT di bawah -- jadi web tetap tampil normal
// walau belum pernah diedit dari CMS sama sekali.

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'elysee_site_content';

// ---------- TIPE DATA ----------

export interface HeaderContent {
  brandName: string;
}

export interface HeroFeature {
  title: string;
  subtitle: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  backgroundUrl: string;
  features: HeroFeature[];
}

export interface WelcomeContent {
  eyebrow: string;
  title: string;
  paragraph: string;
}

export interface GalleryPhotoItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface MenuItemCard {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  badge?: string;
}

export interface SignatureCardOverride {
  id: string;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
}

export interface PhilosophyCard {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface EventContent {
  title: string;
  description: string;
  dateStr: string;
  timeStr: string;
  image: string;
  badgeLabel: string;
}

export interface AboutContent {
  // Banner/header paling atas di halaman #about (PageHeader)
  pageEyebrow: string;
  pageTitle: string;
  pageDescription: string;
  // Konten Our Story di bawahnya (AboutSection)
  heading: string;
  paragraph1: string;
  paragraph2: string;
  quote: string;
  subQuote: string;
  imageUrl: string;
}

export interface ContactSettings {
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

export interface ThemeSettings {
  bg: string;
  accent: string;
  text: string;
}

export interface SiteContent {
  header: HeaderContent;
  hero: HeroContent;
  welcome: WelcomeContent;
  galleryPhotos: GalleryPhotoItem[];
  menuItems: MenuItemCard[];
  signatureOverrides: SignatureCardOverride[];
  philosophyCards: PhilosophyCard[];
  event: EventContent;
  about: AboutContent;
  contact: ContactSettings;
  theme: ThemeSettings;
}

// ---------- DEFAULT (persis sama dengan yang hardcode sekarang) ----------

export const DEFAULT_CONTENT: SiteContent = {
  header: {
    brandName: 'Élysée',
  },
  hero: {
    eyebrow: 'Artisan Roastery & Fine Bistro',
    title: 'Tempat Berteduh yang Tenang & Elegan',
    subtitle: 'Nikmati racikan kopi artisan dengan biji pilihan terbaik, sajian hidangan hangat penuh cita rasa, dan suasana tenang yang dirancang khusus untuk kenyamanan Anda.',
    backgroundUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1920',
    features: [
      { title: 'Artisan Coffee', subtitle: 'Grade 1 Specialty' },
      { title: 'Fine Comfort Food', subtitle: 'Fresh Farm-to-Table' },
      { title: 'Quiet & Intimate', subtitle: 'Ergonomic Seating' },
      { title: 'Senopati Sanctuary', subtitle: 'Jakarta Selatan' },
    ],
  },
  welcome: {
    eyebrow: 'Welcome to Élysée',
    title: 'Selamat datang di rumah kedua untuk secangkir ketenangan',
    paragraph: 'Kami membuka pintu setiap hari untuk siapa pun yang mencari jeda dari rutinitas — ditemani kopi pilihan dan suasana yang dirancang untuk membuat Anda betah berlama-lama.',
  },
  galleryPhotos: [
    { id: 'gal-1', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200', title: 'Interior Main Dining Area', category: 'interior' },
    { id: 'gal-2', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200', title: 'Barista Pouring Artisanal Latte Art', category: 'craft' },
    { id: 'gal-3', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200', title: 'Outdoor Garden & Flora Terrace', category: 'garden' },
    { id: 'gal-4', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200', title: 'Coffee & Dessert Spread in Afternoon Sun', category: 'dessert' },
    { id: 'gal-5', url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=1200', title: 'Cozy Library Nook & Private Meeting Corner', category: 'interior' },
    { id: 'gal-6', url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=1200', title: 'Warm Candlelit Evening Atmosphere', category: 'night' },
    { id: 'gal-7', url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1200', title: 'Manual Pour-Over Brew Station', category: 'craft' },
    { id: 'gal-8', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200', title: 'Private Gathering & Communal Table', category: 'interior' },
  ],
  menuItems: [
    { id: 'sig-1', name: 'Élysée Velvet Latte', category: 'coffee', price: 48000, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600', description: 'Espresso ganda dengan gula aren organik, infusion vanila Madagaskar, dan cold silky foam.', badge: 'Signature' },
    { id: 'sig-2', name: 'Truffle Mushroom Risotto', category: 'main', price: 85000, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=600', description: 'Risotto arborio creamy dengan jamur porcini & truffle oil premium.', badge: 'Signature' },
    { id: 'sig-3', name: 'Basque Burnt Cheesecake', category: 'dessert', price: 55000, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600', description: 'Cheesecake gaya Basque dengan permukaan karamelisasi sempurna.', badge: 'Signature' },
    { id: 'm-1', name: 'Espresso Single Origin', category: 'coffee', price: 28000, image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=600', description: 'Ekstraksi biji kopi Arabika pilihan roaster ternama dengan cita rasa notes buah plum, citrus halus & aroma kacang sangrai.', badge: 'Best Seller' },
    { id: 'm-2', name: 'Flat White Classic', category: 'coffee', price: 38000, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=600', description: 'Ristretto ganda presisi disiram dengan microfoam susu segar hangat bertabur aroma manis karamel alami.' },
    { id: 'm-3', name: 'Matcha Oat Latte', category: 'non-coffee', price: 45000, image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&q=80&w=600', description: 'Matcha grade seremonial asli Uji, Kyoto dipadukan susu oat creamy tanpa tambahan gula berlebih.', badge: 'Recommended' },
    { id: 'm-4', name: 'Chamomile Bloom', category: 'tea', price: 35000, image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600', description: 'Seduhan kuncup bunga chamomile organik utuh dengan aksen kelopak lavender dan sentuhan madu hutan liar.' },
    { id: 'm-5', name: 'Salmon Teriyaki Bowl', category: 'main', price: 92000, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600', description: 'Fillet salmon Norwegia pan-seared dengan saus glaze teriyaki artisan, disajikan di atas nasi hangat, edamame & onsen egg.', badge: 'Best Seller' },
    { id: 'm-6', name: 'Truffle Parm Fries', category: 'snack', price: 42000, image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=600', description: 'Kentang potong tebal digoreng garing keemasan, disiram minyak truffle murni dan limpahan serutan keju parmesan Grana Padano.' },
    { id: 'm-7', name: 'Élysée Tiramisu', category: 'dessert', price: 48000, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600', description: 'Resep autentik Italia dengan keju mascarpone lembut, savoiardi terendam espresso segar, dan taburan cokelat Valrhona pahit.', badge: 'Guest Favorite' },
    { id: 'm-8', name: 'Sourdough Margherita', category: 'main', price: 78000, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600', description: 'Adonan sourdough yang difermentasi lambat 48 jam, dipanggang oven batu dengan saus tomat San Marzano, fior di latte & basil segar.' },
    { id: 'm-9', name: 'Cold Brew Citrus Tonic', category: 'coffee', price: 42000, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=600', description: 'Konsentrat seduh dingin 18 jam disajikan bersama Indian tonic water effervescent dan irisan jeruk sunkist bakar.' },
    { id: 'm-10', name: 'Almond Butter Croissant', category: 'snack', price: 38000, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600', description: 'Pastry Prancis berlapis mentega Elle & Vire dengan isian pasta almond kaya rasa dan taburan kacang almond panggang.' },
    { id: 'm-11', name: 'Earl Grey Lavender Tea', category: 'tea', price: 36000, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600', description: 'Teh hitam Ceylon dengan wangi minyak bergamot Italia dan bunga lavender Prancis yang menenangkan pikiran.' },
    { id: 'm-12', name: 'Dark Chocolate Lava Cake', category: 'dessert', price: 52000, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', description: 'Kue cokelat Belgia hangat dengan lelehan cokelat murni di bagian dalam, disandingkan es krim vanila bourbon.', badge: 'Popular' },
  ],
  signatureOverrides: [],
  philosophyCards: [
    { id: 'pc-1', title: 'Specialty Single-Origin', description: 'Biji kopi pilihan Nusantara dipanggang mandiri dengan profil aroma seimbang.', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800', tag: 'Grade 1 Coffee' },
    { id: 'pc-2', title: 'Fresh French Boulangerie', description: 'Pastry mentega Prancis autentik dipanggang segar setiap pagi hari.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', tag: 'Freshly Baked' },
    { id: 'pc-3', title: 'Suasana Tenang & Hangat', description: 'Tata ruang intim dengan akustik lembut untuk kenyamanan perbincangan Anda.', image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=800', tag: 'Relaxing Ambiance' },
  ],
  event: {
    title: 'Acoustic Jazz Night Session',
    description: 'Alunan jazz akustik menemani secangkir seduhan hangat di bawah pencahayaan temaram yang menyejukkan hati.',
    dateStr: 'Jumat Ini, 20:00 – 22:30 WIB',
    timeStr: '19:30 WIB (Pintu Buka)',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1600',
    badgeLabel: 'Momen Akhir Pekan',
  },
  about: {
    pageEyebrow: 'Our Story & Philosophy',
    pageTitle: 'Kisah di Balik Setiap Cangkir Élysée',
    pageDescription: 'Lahir dari kecintaan mendalam terhadap ritual seduhan kopi autentik dan kehangatan ruang temu bergaya bistro klasik di Senopati.',
    heading: 'Dedikasi untuk Rasa, Kenyamanan, dan Suasana',
    paragraph1: 'Élysée didirikan sebagai tempat berteduh dari hiruk-pikuk perkotaan.',
    paragraph2: 'Dengan desain interior minimalis hangat, Élysée adalah ruang ideal untuk bekerja santai.',
    quote: 'Crafted with Passion',
    subQuote: 'Setiap biji kopi dipilih khusus dari petani lokal berkelanjutan.',
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1000',
  },
  contact: {
    whatsapp: '6281234567890',
    email: 'bonjour@elyseecafe.com',
    address: 'Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan, 12190',
    mapsEmbedUrl: 'https://maps.google.com/?q=Senopati+Kebayoran+Baru+Jakarta+Selatan',
    instagram: 'https://instagram.com/elysee.bistro',
    tiktok: 'https://tiktok.com/@elysee',
    facebook: 'https://facebook.com/elysee',
    metaTitle: 'Élysée Café & Bistro | Premium Coffee & Fine Comfort Food',
    metaDescription: 'Website resmi Élysée Café & Bistro. Nikmati racikan kopi artisan, hidangan lezat, dan suasana tenang eksklusif.',
  },
  theme: {
    bg: '#FDFBF7',
    accent: '#6F4E37',
    text: '#1A1A1A',
  },
};

// ---------- BACA & TULIS ----------

export function getContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    const parsed = JSON.parse(raw);
    return {
      header: { ...DEFAULT_CONTENT.header, ...parsed.header },
      hero: { ...DEFAULT_CONTENT.hero, ...parsed.hero },
      welcome: { ...DEFAULT_CONTENT.welcome, ...parsed.welcome },
      galleryPhotos: parsed.galleryPhotos ?? DEFAULT_CONTENT.galleryPhotos,
      menuItems: parsed.menuItems ?? DEFAULT_CONTENT.menuItems,
      signatureOverrides: parsed.signatureOverrides ?? DEFAULT_CONTENT.signatureOverrides,
      philosophyCards: parsed.philosophyCards ?? DEFAULT_CONTENT.philosophyCards,
      event: { ...DEFAULT_CONTENT.event, ...parsed.event },
      about: { ...DEFAULT_CONTENT.about, ...parsed.about },
      contact: { ...DEFAULT_CONTENT.contact, ...parsed.contact },
      theme: { ...DEFAULT_CONTENT.theme, ...parsed.theme },
    };
  } catch {
    return DEFAULT_CONTENT;
  }
}

export function setContent<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
  const current = getContent();
  const updated = { ...current, [key]: value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('elysee-content-updated'));
}

export function useContent<K extends keyof SiteContent>(key: K): SiteContent[K] {
  const [value, setValue] = useState<SiteContent[K]>(() => getContent()[key]);

  useEffect(() => {
    const refresh = () => setValue(getContent()[key]);
    window.addEventListener('elysee-content-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('elysee-content-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [key]);

  return value;
    }
