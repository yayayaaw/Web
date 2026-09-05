// Taruh file ini di: src/lib/contentStore.ts
//
// SATU SUMBER DATA untuk CMS (#admin) dan Web Utama (#home).
// Keduanya jalan di domain yang sama, jadi localStorage otomatis "kebagi".
// CMS nulis lewat setContent(), web utama baca lewat getContent()/useContent().
//
// Kalau localStorage kosong (pertama kali buka / browser beda), otomatis
// fallback ke DEFAULT_CONTENT di bawah -- jadi web tetap tampil normal
// walau belum pernah diedit dari CMS sama sekali.
//
// PATCH v9 (fix "analytics jangan manual, mau dummy otomatis"):
// Analytics TIDAK LAGI diisi lewat form manual. Sekarang ada
// generateDummyAnalytics() yang bikin angka dummy secara otomatis
// (pseudo-random tapi masuk akal), dipanggil otomatis kalau data belum
// pernah ada atau sudah beda hari, dan bisa dipanggil ulang kapan saja
// lewat tombol "Refresh Data" di CMS. Semua tetap localStorage murni,
// belum pakai Firebase/GA -- itu nanti kalau memang mau dihubungkan beneran.

import { useEffect, useState } from 'react';
import { JobPosition } from '../types';
import { JOB_POSITIONS } from '../data/mockData';

const STORAGE_KEY = 'elysee_site_content';

// ---------- TIPE DATA ----------

export interface HeaderContent {
  brandName: string;
  tagline: string;
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

export interface SocialPostItem {
  id: string;
  image: string;
  tag: string;
  likes: string;
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

export interface AboutHighlight {
  id: string;
  title: string;
  description: string;
}

export interface AboutContent {
  pageEyebrow: string;
  pageTitle: string;
  pageDescription: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  quote: string;
  subQuote: string;
  imageUrl: string;
  highlights: AboutHighlight[];
}

export interface CareersHeaderContent {
  pageEyebrow: string;
  pageTitle: string;
  pageDescription: string;
}

export type CareerPerkIcon = 'Coffee' | 'GraduationCap' | 'Award' | 'Utensils' | 'ShieldCheck' | 'Heart';

export interface CareerPerkItem {
  id: string;
  icon: CareerPerkIcon;
  title: string;
  desc: string;
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

// ---------- PATCH v9: ANALYTICS (dummy, auto-generate) ----------

export interface AnalyticsTrendPoint {
  id: string;
  label: string;
  value: number;
}

export interface AnalyticsSectionStat {
  id: string;
  name: string;
  views: number;
  percent: number;
}

export interface AnalyticsDeviceDistribution {
  mobile: number;
  desktop: number;
  tablet: number;
}

export interface AnalyticsPeakHour {
  id: string;
  range: string;
  label: string;
  percent: number;
}

export interface AnalyticsData {
  lastGeneratedDate: string; // format YYYY-MM-DD, dipakai buat tau kapan harus auto-regenerate
  totalVisitors: number;
  totalVisitorsGrowthLabel: string;
  todayVisitors: number;
  todayVisitorsLabel: string;
  weekVisitors: number;
  weekGrowthLabel: string;
  monthVisitors: number;
  monthLabel: string;
  totalPageViews: number;
  avgViewsLabel: string;
  trend7Days: AnalyticsTrendPoint[];
  topSections: AnalyticsSectionStat[];
  deviceDistribution: AnalyticsDeviceDistribution;
  peakHours: AnalyticsPeakHour[];
}

// Random int inklusif [min, max]
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

const DAY_LABELS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const MONTH_LABELS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const SECTION_NAMES = [
  'Signature Menu',
  'Galeri & Sudut Ruang',
  'Reservasi Meja',
  'Lokasi & Kontak',
  'Ulasan Pelanggan',
  'Tentang Élysée',
];

const PEAK_SLOTS: { range: string; label: string }[] = [
  { range: '08:00 – 11:00', label: 'Morning Coffee & Pastry' },
  { range: '12:00 – 14:00', label: 'Lunch & Pour Over Break' },
  { range: '15:00 – 18:00', label: 'Afternoon Work & Meetings' },
  { range: '19:00 – 22:00', label: 'Evening Gathering & Chill' },
];

// PATCH v9: generator utama -- bikin satu set data dummy yang saling
// masuk akal (total kira-kira = jumlah section views, dst), dipanggil
// otomatis saat data kosong/basi, atau manual lewat tombol "Refresh Data".
export function generateDummyAnalytics(): AnalyticsData {
  const now = new Date();
  const monthLabel = `${MONTH_LABELS_ID[now.getMonth()]} ${now.getFullYear()}`;

  const trend7Days: AnalyticsTrendPoint[] = DAY_LABELS.map((label, i) => ({
    id: `t-${i + 1}`,
    label,
    value: randInt(35, 160),
  }));
  const weekVisitors = trend7Days.reduce((sum, p) => sum + p.value, 0);

  const totalVisitors = randInt(1800, 4200);
  const todayVisitors = randInt(15, 140);
  const monthVisitors = randInt(weekVisitors * 3, weekVisitors * 5);
  const totalPageViews = Math.round(totalVisitors * (2.2 + Math.random() * 1.6));

  // Bikin persentase section acak tapi total mendekati 100%
  const rawWeights = SECTION_NAMES.slice(0, 4 + randInt(0, 2)).map(() => randInt(8, 40));
  const weightSum = rawWeights.reduce((a, b) => a + b, 0);
  const topSections: AnalyticsSectionStat[] = rawWeights.map((w, i) => {
    const percent = Math.round((w / weightSum) * 100);
    return {
      id: `sec-${i + 1}`,
      name: SECTION_NAMES[i],
      views: Math.round((percent / 100) * totalPageViews),
      percent,
    };
  }).sort((a, b) => b.percent - a.percent);

  const mobile = randInt(60, 78);
  const desktop = randInt(15, 30);
  const tablet = Math.max(1, 100 - mobile - desktop);

  const peakHours: AnalyticsPeakHour[] = PEAK_SLOTS.map((slot, i) => ({
    id: `ph-${i + 1}`,
    range: slot.range,
    label: slot.label,
    percent: randInt(35, 95),
  }));

  return {
    lastGeneratedDate: todayStr(),
    totalVisitors,
    totalVisitorsGrowthLabel: `+${(Math.random() * 15 + 2).toFixed(1)}% bln ini`,
    todayVisitors,
    todayVisitorsLabel: 'Aktif sesi terkini',
    weekVisitors,
    weekGrowthLabel: `+${(Math.random() * 12 + 1).toFixed(1)}% vs lalu`,
    monthVisitors,
    monthLabel,
    totalPageViews,
    avgViewsLabel: `Rata-rata ${(totalPageViews / totalVisitors).toFixed(1)} view/tamu`,
    trend7Days,
    topSections,
    deviceDistribution: { mobile, desktop, tablet },
    peakHours,
  };
}

export interface SiteContent {
  header: HeaderContent;
  hero: HeroContent;
  welcome: WelcomeContent;
  galleryPhotos: GalleryPhotoItem[];
  socialPosts: SocialPostItem[];
  menuItems: MenuItemCard[];
  signatureOverrides: SignatureCardOverride[];
  philosophyCards: PhilosophyCard[];
  jobPositions: JobPosition[];
  careersHeader: CareersHeaderContent;
  careerPerks: CareerPerkItem[];
  analytics: AnalyticsData;
  event: EventContent;
  about: AboutContent;
  contact: ContactSettings;
  theme: ThemeSettings;
}

// ---------- DEFAULT ----------

export const DEFAULT_CONTENT: SiteContent = {
  header: {
    brandName: 'Élysée',
    tagline: 'Café',
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
  socialPosts: [
    { id: 'ig-1', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=500', likes: '1.4k', tag: '#MorningAtElysee' },
    { id: 'ig-2', image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&q=80&w=500', likes: '890', tag: '#ArtisanCoffee' },
    { id: 'ig-3', image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&q=80&w=500', likes: '2.1k', tag: '#BistroVibes' },
    { id: 'ig-4', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=500', likes: '1.1k', tag: '#CoffeeMoments' },
    { id: 'ig-5', image: 'https://images.unsplash.com/photo-1507138451611-3001135909fa?auto=format&fit=crop&q=80&w=500', likes: '1.7k', tag: '#ElyseeJazzNight' },
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
  jobPositions: JOB_POSITIONS,
  careersHeader: {
    pageEyebrow: 'Careers & Opportunities',
    pageTitle: 'Tumbuh & Berkarya Bersama Keluarga Élysée',
    pageDescription: 'Kami selalu membuka pintu bagi talenta berdedikasi yang memiliki gairah pada seni kopi spesialti, kehangatan kuliner bistro, dan standar pelayanan prima di Senopati.',
  },
  careerPerks: [
    { id: 'perk-1', icon: 'Coffee', title: 'Specialty Coffee Sepuasnya', desc: 'Nikmati seduhan kopi single-origin dan menu racikan barista gratis selama shift kerja Anda.' },
    { id: 'perk-2', icon: 'GraduationCap', title: 'Sertifikasi & Pelatihan SCA', desc: 'Program beasiswa sertifikasi barista (SCA/BNSP) dan kelas kuliner pastry yang didanai 100% oleh manajemen.' },
    { id: 'perk-3', icon: 'Award', title: 'Service Charge & Bonus Bulanan', desc: 'Pembagian pool service charge yang transparan serta bonus performa tim yang dibagikan secara adil.' },
    { id: 'perk-4', icon: 'Utensils', title: 'Meal Allowance & Chef Meals', desc: 'Makanan bergizi hangat yang disiapkan langsung oleh tim dapur khusus untuk staf setiap shift.' },
    { id: 'perk-5', icon: 'ShieldCheck', title: 'BPJS Kesehatan & Ketenagakerjaan', desc: 'Perlindungan kesehatan, jaminan hari tua, dan jaminan kecelakaan kerja penuh setelah masa probation.' },
    { id: 'perk-6', icon: 'Heart', title: 'Work-Life Balance Teratur', desc: 'Jadwal shift 5 hari kerja per minggu (8 jam/hari) dengan rotasi libur terencana dan kompensasi lembur resmi.' },
  ],
  analytics: generateDummyAnalytics(), // PATCH v9: dummy otomatis, bukan manual
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
    highlights: [
      { id: 'ah-1', title: 'Biji Kopi Terpilih', description: 'Biji kopi Arabika single-origin yang dipanggang secara presisi oleh roaster berpengalaman.' },
      { id: 'ah-2', title: 'Bahan Segar & Alami', description: 'Setiap hidangan dimasak fresh dengan sayuran segar dan bahan organik suplier lokal.' },
      { id: 'ah-3', title: 'Ruang Hangat & Nyaman', description: 'Tata letak ergonomis, pencahayaan temaram hangat, serta alunan musik santai akustik.' },
      { id: 'ah-4', title: 'Koneksi Wi-Fi 100 Mbps', description: 'Dukungan internet cepat dan ketersediaan stopkontak di setiap sudut meja untuk produktivitas Anda.' },
    ],
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

    // PATCH v9: kalau data analytics belum ada sama sekali, atau
    // "lastGeneratedDate"-nya bukan hari ini, auto-generate ulang tanpa
    // perlu admin buka tab Analytics dulu.
    const existingAnalytics = parsed.analytics;
    const needsFreshAnalytics = !existingAnalytics || existingAnalytics.lastGeneratedDate !== todayStr();
    const analytics = needsFreshAnalytics ? generateDummyAnalytics() : existingAnalytics;

    return {
      header: { ...DEFAULT_CONTENT.header, ...parsed.header },
      hero: { ...DEFAULT_CONTENT.hero, ...parsed.hero },
      welcome: { ...DEFAULT_CONTENT.welcome, ...parsed.welcome },
      galleryPhotos: parsed.galleryPhotos ?? DEFAULT_CONTENT.galleryPhotos,
      socialPosts: parsed.socialPosts ?? DEFAULT_CONTENT.socialPosts,
      menuItems: parsed.menuItems ?? DEFAULT_CONTENT.menuItems,
      signatureOverrides: parsed.signatureOverrides ?? DEFAULT_CONTENT.signatureOverrides,
      philosophyCards: parsed.philosophyCards ?? DEFAULT_CONTENT.philosophyCards,
      jobPositions: parsed.jobPositions ?? DEFAULT_CONTENT.jobPositions,
      careersHeader: { ...DEFAULT_CONTENT.careersHeader, ...parsed.careersHeader },
      careerPerks: parsed.careerPerks ?? DEFAULT_CONTENT.careerPerks,
      analytics,
      event: { ...DEFAULT_CONTENT.event, ...parsed.event },
      about: {
        ...DEFAULT_CONTENT.about,
        ...parsed.about,
        highlights: parsed.about?.highlights ?? DEFAULT_CONTENT.about.highlights,
      },
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
