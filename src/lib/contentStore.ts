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

export interface SanctuaryCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

export interface SignatureCardOverride {
  id: string; // cocok dengan id di SIGNATURE_ITEMS mockData
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
  sanctuaryCards: SanctuaryCard[];
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
  sanctuaryCards: [
    { id: 'sc-1', title: 'Main Dining Hall', subtitle: 'Arsitektur klasik, chandelier temaram & sofa lembut', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=85&w=1200', tag: 'Indoor Sanctuary' },
    { id: 'sc-2', title: 'Zen Garden Patio', subtitle: 'Udara sejuk berkanopi dedaunan hijau alami', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=85&w=1200', tag: 'Outdoor Terrace' },
    { id: 'sc-3', title: 'Specialty Espresso Bar', subtitle: 'Seduhan manual brew presisi & aroma biji sangrai segar', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=85&w=1200', tag: 'Artisan Brew' },
    { id: 'sc-4', title: 'VIP Mezzanine Lounge', subtitle: 'Kenyamanan privat untuk diskusi, rapat & temu akrab', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=85&w=1200', tag: 'Private Room' },
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

/** Ambil seluruh konten. Aman dipanggil di mana saja (CMS maupun web utama). */
export function getContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    const parsed = JSON.parse(raw);
    // Merge dangkal per section, biar field baru yang belum pernah disimpan tetap ada defaultnya
    return {
      header: { ...DEFAULT_CONTENT.header, ...parsed.header },
      hero: { ...DEFAULT_CONTENT.hero, ...parsed.hero },
      welcome: { ...DEFAULT_CONTENT.welcome, ...parsed.welcome },
      sanctuaryCards: parsed.sanctuaryCards ?? DEFAULT_CONTENT.sanctuaryCards,
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

/** Update sebagian section konten, lalu simpan & broadcast perubahan. */
export function setContent<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
  const current = getContent();
  const updated = { ...current, [key]: value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  // Broadcast biar tab/komponen lain yang sedang buka langsung ikut update tanpa refresh manual
  window.dispatchEvent(new CustomEvent('elysee-content-updated'));
}

/**
 * Hook React: baca satu section konten, otomatis re-render kalau ada
 * perubahan dari CMS (baik di tab yang sama maupun tab/browser lain).
 */
export function useContent<K extends keyof SiteContent>(key: K): SiteContent[K] {
  const [value, setValue] = useState<SiteContent[K]>(() => getContent()[key]);

  useEffect(() => {
    const refresh = () => setValue(getContent()[key]);
    window.addEventListener('elysee-content-updated', refresh);
    window.addEventListener('storage', refresh); // perubahan dari tab browser lain
    return () => {
      window.removeEventListener('elysee-content-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [key]);

  return value;
}
