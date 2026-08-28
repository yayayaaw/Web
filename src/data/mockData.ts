import { MenuItem, EventItem, PromoItem, Testimonial, GalleryPhoto, FaqItem, JobPosition } from '../types';

export const CAFE_INFO = {
  name: 'Élysée',
  tagline: 'Café & Bistro',
  subheadline: 'Premium Coffee & Fine Comfort Food',
  address: 'Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan, 12190',
  phone: '+62 812-3456-7890',
  whatsappNumber: '6281234567890',
  email: 'bonjour@elyseecafe.com',
  instagram: 'elysee.bistro',
  hoursWeekday: '08:00 – 23:00 WIB',
  hoursWeekend: '08:00 – 24:00 WIB',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2736136531946!2d106.8082!3d-6.2276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMzkuNCJTIDEwNsKwNDgnMjkuNSJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid',
  mapsDirectUrl: 'https://maps.google.com/?q=Senopati+Kebayoran+Baru+Jakarta+Selatan',
  wifiSpeed: '100 Mbps Fiber Optic',
  features: [
    { title: 'Premium Coffee', desc: 'Beans Grade 1 dipanggang presisi oleh Q-Grader' },
    { title: 'Fresh Ingredients', desc: 'Bahan segar organik dari suplier lokal terpercaya' },
    { title: 'Cozy Atmosphere', desc: 'Kursi ergonomis, musik santai & pencahayaan hangat' },
    { title: 'High-Speed Wi-Fi', desc: 'Koneksi ultra stabil 100Mbps dengan stopkontak di tiap meja' },
  ]
};

export const SIGNATURE_ITEMS: MenuItem[] = [
  {
    id: 'sig-1',
    name: 'Élysée Velvet Latte',
    category: 'coffee',
    price: 48000,
    description: 'Double shot Arabika Gayo dengan sirup gula aren organik, infusion vanila Madagaskar, dan cold silky foam.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    badge: 'Signature Coffee',
    badgeColor: 'brown',
    isSignature: true,
    calories: '185 kcal',
    tastingNotes: ['Velvety Sweetness', 'Warm Vanilla', 'Rich Nutty Aftertaste'],
    ingredients: ['Double Espresso Gayo', 'Fresh Steamed Milk', 'Madagascar Vanilla Pod', 'Organic Palm Sugar Nectar'],
  },
  {
    id: 'sig-2',
    name: 'Truffle Cream Pasta',
    category: 'main',
    price: 85000,
    description: 'Fettuccine segar al dente berlumur saus krim jamur truffle hitam alami, topped parmesan panggang & garlic crostini.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    badge: 'Chef Special',
    badgeColor: 'amber',
    isSignature: true,
    calories: '540 kcal',
    tastingNotes: ['Earthy Truffle Aroma', 'Rich Silky Sauce', 'Crisp Savory Crunch'],
    ingredients: ['Handmade Fresh Fettuccine', 'Black Truffle Oil', 'Portobello & Champignon Mushrooms', 'Parmigiano Reggiano 24 Mo'],
  },
  {
    id: 'sig-3',
    name: 'Berry Bliss Brioche',
    category: 'dessert',
    price: 55000,
    description: 'Roti brioche tebal panggang mentega Normandia dengan kompot buah beri liar segar, gelato vanila, dan siraman sirup maple murni.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    badge: 'Best Dessert',
    badgeColor: 'rose',
    isSignature: true,
    calories: '420 kcal',
    tastingNotes: ['Buttery Fluffy Crumb', 'Tart Fresh Berries', 'Sweet Vanilla Melt'],
    ingredients: ['Artisan Brioche Toast', 'Normandy Butter', 'Wild Strawberry & Blueberry Compote', 'Organic Pure Maple Syrup'],
  }
];

export const MENU_ITEMS: MenuItem[] = [
  ...SIGNATURE_ITEMS,
  {
    id: 'm-1',
    name: 'Espresso Single Origin',
    category: 'coffee',
    price: 28000,
    description: 'Ekstraksi biji kopi Arabika pilihan roaster ternama dengan cita rasa notes buah plum, citrus halus & aroma kacang sangrai.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=600',
    badge: 'Best Seller',
    badgeColor: 'amber',
    calories: '5 kcal',
    tastingNotes: ['Dark Cocoa', 'Plum Acidity', 'Roasted Almond'],
    ingredients: ['100% Specialty Arabica Beans (Flores Bajawa / Aceh Gayo)'],
  },
  {
    id: 'm-2',
    name: 'Flat White Classic',
    category: 'coffee',
    price: 38000,
    description: 'Ristretto ganda presisi disiram dengan microfoam susu segar hangat bertabur aroma manis karamel alami.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=600',
    calories: '130 kcal',
    tastingNotes: ['Intense Coffee Body', 'Creamy Microfoam', 'Brown Sugar'],
    ingredients: ['Double Ristretto', 'Whole Dairy Milk (Oat Milk available)'],
  },
  {
    id: 'm-3',
    name: 'Matcha Oat Latte',
    category: 'non-coffee',
    price: 45000,
    description: 'Matcha grade seremonial asli Uji, Kyoto dipadukan susu oat creamy tanpa tambahan gula berlebih.',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&q=80&w=600',
    badge: 'Recommended',
    badgeColor: 'emerald',
    isVegetarian: true,
    calories: '160 kcal',
    tastingNotes: ['Earthy Umami', 'Subtle Vegetal Sweetness', 'Silky Creamy Texture'],
    ingredients: ['Ceremonial Grade Uji Matcha', 'Barista Edition Oat Milk'],
  },
  {
    id: 'm-4',
    name: 'Chamomile Bloom',
    category: 'tea',
    price: 35000,
    description: 'Seduhan kuncup bunga chamomile organik utuh dengan aksen kelopak lavender dan sentuhan madu hutan liar.',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600',
    calories: '10 kcal',
    isVegetarian: true,
    tastingNotes: ['Soothing Floral', 'Sweet Honey Accent', 'Herbal Comfort'],
    ingredients: ['Whole Organic Chamomile Flowers', 'Dried Lavender Buds', 'Wild Forest Honey'],
  },
  {
    id: 'm-5',
    name: 'Salmon Teriyaki Bowl',
    category: 'main',
    price: 92000,
    description: 'Fillet salmon Norwegia pan-seared dengan saus glaze teriyaki artisan, disajikan di atas nasi hangat, edamame & onsen egg.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600',
    badge: 'Best Seller',
    badgeColor: 'amber',
    calories: '580 kcal',
    tastingNotes: ['Savory-Sweet Teriyaki', 'Crisp Skin Salmon', 'Creamy Onsen Egg'],
    ingredients: ['Norwegian Fresh Salmon', 'Japanese Steamed Rice', 'Organic Edamame', 'Homemade Sweet Teriyaki Sauce'],
  },
  {
    id: 'm-6',
    name: 'Truffle Parm Fries',
    category: 'snack',
    price: 42000,
    description: 'Kentang potong tebal digoreng garing keemasan, disiram minyak truffle murni dan limpahan serutan keju parmesan Grana Padano.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=600',
    calories: '340 kcal',
    isVegetarian: true,
    tastingNotes: ['Crispy Golden Crunch', 'Aromatic Truffle', 'Salty Aged Cheese'],
    ingredients: ['Skin-on Russet Potatoes', 'Italian White Truffle Essence', 'Grated Grana Padano', 'Herb Aioli Dip'],
  },
  {
    id: 'm-7',
    name: 'Élysée Tiramisu',
    category: 'dessert',
    price: 48000,
    description: 'Resep autentik Italia dengan keju mascarpone lembut, savoiardi terendam espresso segar, dan taburan cokelat Valrhona pahit.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600',
    badge: 'Guest Favorite',
    badgeColor: 'brown',
    calories: '360 kcal',
    tastingNotes: ['Airy Sweet Mascarpone', 'Deep Espresso Punch', 'Dark Cocoa Finish'],
    ingredients: ['Italian Mascarpone Cheese', 'Artisan Ladyfingers', 'Fresh Gayo Espresso', 'Valrhona Cocoa Powder'],
  },
  {
    id: 'm-8',
    name: 'Sourdough Margherita',
    category: 'main',
    price: 78000,
    description: 'Adonan sourdough yang difermentasi lambat 48 jam, dipanggang oven batu dengan saus tomat San Marzano, fior di latte & basil segar.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600',
    isVegetarian: true,
    calories: '610 kcal',
    tastingNotes: ['Smoky Crust Char', 'Bright Tangy Tomato', 'Creamy Melty Mozzarella'],
    ingredients: ['48h Slow-Ferment Dough', 'San Marzano DOP Tomatoes', 'Fresh Fior di Latte', 'Organic Genovese Basil'],
  },
  {
    id: 'm-9',
    name: 'Cold Brew Citrus Tonic',
    category: 'coffee',
    price: 42000,
    description: 'Konsentrat seduh dingin 18 jam disajikan bersama Indian tonic water effervescent dan irisan jeruk sunkist bakar.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=600',
    calories: '65 kcal',
    tastingNotes: ['Crisp Bubbly Refreshment', 'Zesty Citrus', 'Clean Winey Coffee'],
    ingredients: ['18h Cold Brew Concentrate', 'Premium Botanical Tonic Water', 'Torched Sunkist Orange'],
  },
  {
    id: 'm-10',
    name: 'Almond Butter Croissant',
    category: 'snack',
    price: 38000,
    description: 'Pastry Prancis berlapis mentega Elle & Vire dengan isian pasta almond kaya rasa dan taburan kacang almond panggang.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    calories: '310 kcal',
    isVegetarian: true,
    tastingNotes: ['Flaky Crisp Layers', 'Nutty Sweet Frangipane', 'Toasted Crunch'],
    ingredients: ['French Laminated Dough', 'Pure Butter', 'Homemade Almond Paste', 'Roasted Flaked Almonds'],
  },
  {
    id: 'm-11',
    name: 'Earl Grey Lavender Tea',
    category: 'tea',
    price: 36000,
    description: 'Teh hitam Ceylon dengan wangi minyak bergamot Italia dan bunga lavender Prancis yang menenangkan pikiran.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
    calories: '5 kcal',
    isVegetarian: true,
    tastingNotes: ['Bergamot Citrus', 'Calming Floral Tone', 'Clean Tannic Crispness'],
    ingredients: ['Ceylon Black Tea Leaves', 'Natural Bergamot Essential Oil', 'French Lavender Buds'],
  },
  {
    id: 'm-12',
    name: 'Dark Chocolate Lava Cake',
    category: 'dessert',
    price: 52000,
    description: 'Kue cokelat Belgia hangat dengan lelehan cokelat murni di bagian dalam, disandingkan es krim vanila bourbon.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    badge: 'Popular',
    badgeColor: 'rose',
    calories: '490 kcal',
    tastingNotes: ['Warm Decadent Molten Core', '70% Dark Bittersweet', 'Cooling Vanilla'],
    ingredients: ['Cacao Barry 70% Dark Chocolate', 'Bourbon Vanilla Bean Gelato', 'Sea Salt Dusting'],
  }
];

export const PROMO_DATA: PromoItem = {
  id: 'promo-weekend',
  title: 'Weekend Brew & Pastry Pairing',
  badge: 'Weekly Offer',
  validDays: 'Setiap Sabtu & Minggu (10:00 – 15:00 WIB)',
  description: 'Dapatkan potongan 20% untuk setiap pembelian kopi artisanal varian apa saja yang dipadukan dengan Pastry atau Dessert pilihan Anda.',
  discountCode: 'ELYSEE-WEEKEND20',
  discountPercentage: 20,
  terms: [
    'Berlaku untuk dine-in di hari Sabtu & Minggu pukul 10:00 - 15:00 WIB',
    'Minimal pembelian 1 kopi artisanal + 1 pastry/dessert',
    'Tunjukkan kode voucher digital ini saat pemesanan di kasir atau via WhatsApp',
    'Tidak dapat digabung dengan promo paket lainnya'
  ]
};

export const EVENT_DATA: EventItem = {
  id: 'event-jazz',
  title: 'Acoustic Jazz Night Session',
  subtitle: 'Live Performance by Trio Quarta',
  dateStr: 'Jumat Ini, 20:00 – 22:30 WIB',
  timeStr: '19:30 WIB (Pintu Buka)',
  pricePerPax: 75000,
  description: 'Nikmati alunan musik jazz akustik lembut persembahan Trio Quarta sambil menikmati santap malam eksklusif dan racikan kopi hangat di ruang indoor bernuansa temaram.',
  includes: [
    '1 Seat reservasi meja prioritas',
    '1 Welcome Artisanal Drink (Hot/Iced Signature)',
    '1 Light Snack Platter (Truffle Fries / Mini Croissant)',
    'Acoustic Live Jazz Session 2.5 jam'
  ],
  badge: 'Exclusive Event'
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200',
    title: 'Interior Main Dining Area',
    category: 'interior',
  },
  {
    id: 'gal-2',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200',
    title: 'Barista Pouring Artisanal Latte Art',
    category: 'craft',
  },
  {
    id: 'gal-3',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200',
    title: 'Outdoor Garden & Flora Terrace',
    category: 'garden',
    spanClass: 'md:col-span-2'
  },
  {
    id: 'gal-4',
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200',
    title: 'Coffee & Dessert Spread in Afternoon Sun',
    category: 'dessert',
    spanClass: 'md:col-span-2'
  },
  {
    id: 'gal-5',
    url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=1200',
    title: 'Cozy Library Nook & Private Meeting Corner',
    category: 'interior',
  },
  {
    id: 'gal-6',
    url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=1200',
    title: 'Warm Candlelit Evening Atmosphere',
    category: 'night',
  },
  {
    id: 'gal-7',
    url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1200',
    title: 'Manual Pour-Over Brew Station',
    category: 'craft',
  },
  {
    id: 'gal-8',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
    title: 'Private Gathering & Communal Table',
    category: 'interior',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Anindya Respati',
    role: 'Architect & Coffee Enthusiast',
    comment: 'Suasana di Élysée benar-benar tenang dan hangat. Tempat terbaik untuk kerja remote atau sekadar ngobrol santai sore hari. Velvet Latte-nya wajib dicoba, tekstur krimnya sangat sutra!',
    rating: 5,
    avatarText: 'AR',
    date: '2 hari lalu'
  },
  {
    id: 't-2',
    name: 'Davin Kusuma',
    role: 'Creative Director',
    comment: 'Pelayanan yang sangat ramah dan berkelas. Truffle Cream Pasta-nya rasanya otentik sekali dengan aroma truffle asli. Ambience café ini luar biasa berkelas namun tetap hangat dan bersahabat.',
    rating: 5,
    avatarText: 'DK',
    date: '1 minggu lalu'
  },
  {
    id: 't-3',
    name: 'Siti Larasati',
    role: 'Food & Lifestyle Vlogger',
    comment: 'Acara Live Music Jazz di hari Jumat benar-benar berkesan! Makanan enak, musik menyejukkan hati, dan valet gratis sangat membantu. Pasti akan kembali lagi membawa teman-teman.',
    rating: 5,
    avatarText: 'SL',
    date: '2 minggu lalu'
  },
  {
    id: 't-4',
    name: 'Reza Mahendra',
    role: 'Startup Founder',
    comment: 'Pojok VIP Mezzanine sangat cocok untuk meeting klien penting. Wi-Fi kencang 100Mbps tanpa lag, stopkontak melimpah di setiap sudut, dan baristanya sangat memahami taste profile kopi.',
    rating: 5,
    avatarText: 'RM',
    date: '3 minggu lalu'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=500',
    likes: '1.4k',
    tag: '#MorningAtElysee'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&q=80&w=500',
    likes: '890',
    tag: '#ArtisanCoffee'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&q=80&w=500',
    likes: '2.1k',
    tag: '#BistroVibes'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=500',
    likes: '1.1k',
    tag: '#CoffeeMoments'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1507138451611-3001135909fa?auto=format&fit=crop&q=80&w=500',
    likes: '1.7k',
    tag: '#ElyseeJazzNight'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Reservasi & Kunjungan',
    question: 'Apakah perlu melakukan reservasi sebelum datang?',
    answer: 'Reservasi tidak diwajibkan (walk-in sangat dipersilakan kapan pun). Namun untuk jam sibuk seperti jam makan siang, akhir pekan, atau untuk rombongan lebih dari 4 orang, kami sangat menyarankan reservasi terlebih dahulu agar tempat terbaik Anda terjamin.'
  },
  {
    id: 'faq-2',
    category: 'Fasilitas & Parkir',
    question: 'Apakah tersedia tempat parkir yang memadai?',
    answer: 'Ya, kami menyediakan area parkir luas yang aman untuk kendaraan roda empat dan roda dua. Tersedia juga layanan valet parking gratis khusus pada hari Jumat sore hingga akhir pekan.'
  },
  {
    id: 'faq-3',
    category: 'Acara & Sewa Tempat',
    question: 'Apakah bisa menyewa area café untuk private event atau photoshoot?',
    answer: 'Tentu. Kami melayani private booking untuk acara ulang tahun, peluncuran produk, intimate wedding, gathering kantor, hingga photoshoot profesional. Silakan hubungi tim kami via WhatsApp untuk paket dan penawaran khusus.'
  },
  {
    id: 'faq-4',
    category: 'Pembayaran',
    question: 'Metode pembayaran apa saja yang diterima di Élysée?',
    answer: 'Kami menerima berbagai metode pembayaran: Tunai, Kartu Debit & Kredit (Visa, Mastercard, JCB), serta pembayaran digital instan melalui QRIS (GoPay, OVO, ShopeePay, DANA, dan Mobile Banking).'
  },
  {
    id: 'faq-5',
    category: 'Menu & Diet',
    question: 'Apakah ada menu vegetarian, vegan, atau pilihan susu nabati?',
    answer: 'Ya! Kami menyediakan pilihan susu nabati seperti Oat Milk (Oatly) dan Almond Milk untuk semua minuman berbahan susu. Selain itu, kami juga memiliki pilihan pasta vegetarian, artisan salad, sourdough pizza, dan pastry ramah vegan.'
  }
];

export const CAREER_PERKS = [
  {
    title: 'Specialty Coffee Sepuasnya',
    desc: 'Nikmati seduhan kopi single-origin dan menu racikan barista gratis selama shift kerja Anda.',
    icon: 'Coffee',
  },
  {
    title: 'Sertifikasi & Pelatihan SCA',
    desc: 'Program beasiswa sertifikasi barista (SCA/BNSP) dan kelas kuliner pastry yang didanai 100% oleh manajemen.',
    icon: 'GraduationCap',
  },
  {
    title: 'Service Charge & Bonus Bulanan',
    desc: 'Pembagian pool service charge yang transparan serta bonus performa tim yang dibagikan secara adil.',
    icon: 'Award',
  },
  {
    title: 'Meal Allowance & Chef Meals',
    desc: 'Makanan bergizi hangat yang disiapkan langsung oleh tim dapur khusus untuk staf setiap shift.',
    icon: 'Utensils',
  },
  {
    title: 'BPJS Kesehatan & Ketenagakerjaan',
    desc: 'Perlindungan kesehatan, jaminan hari tua, dan jaminan kecelakaan kerja penuh setelah masa probation.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Work-Life Balance Teratur',
    desc: 'Jadwal shift 5 hari kerja per minggu (8 jam/hari) dengan rotasi libur terencana dan kompensasi lembur resmi.',
    icon: 'Heart',
  },
];

export const JOB_POSITIONS: JobPosition[] = [
  {
    id: 'job-1',
    title: 'Senior Specialty Barista (Espresso & Manual Brew Specialist)',
    department: 'barista',
    type: 'Full-Time',
    location: 'Senopati, Jakarta Selatan',
    salaryRange: 'Rp 5.500.000 – Rp 7.500.000 + Tips & Service Charge',
    experience: 'Min. 2 tahun di Specialty Coffee Shop',
    urgent: true,
    shortDescription: 'Memimpin bar kopi Élysée, menjaga kalibrasi dial-in espresso harian, dan mengeksekusi seduhan manual brew single-origin dengan standar SCA tertinggi.',
    responsibilities: [
      'Melakukan dial-in kalibrasi grinder espresso setiap pagi untuk memastikan ekstraksi rasa optimal (rasio, yield, TDS).',
      'Meracik seluruh minuman espresso-based dengan standar latte art yang konsisten dan rapi.',
      'Mengeksekusi manual brew (V60, Kyoto Cold Drip, Aeropress) serta memberikan tasting notes interaktif kepada tamu bar.',
      'Mengelola penyimpanan dan rotasi batch sangrai biji kopi specialty (single-origin Gayo, Flores, Ethiopia).',
      'Menjaga kebersihan dan perawatan preventif mesin espresso La Marzocco dan grinder Mahlkönig.',
      'Membimbing junior barista mengenai teknik seduhan, hospitality, dan etiket pelayanan meja.',
    ],
    requirements: [
      'Pria/Wanita, usia maksimal 28 tahun dengan passion kuat pada industri specialty coffee.',
      'Pengalaman kerja minimal 2 tahun sebagai barista di specialty coffee shop atau café ternama.',
      'Memahami konsep sensorik rasa kopi (acidity, body, sweetness, cupping score).',
      'Mampu membuat latte art tingkat lanjut (rosetta, tulip, swan) dengan tekstur microfoam sempurna.',
      'Memiliki sertifikasi barista (SCA / BNSP) menjadi nilai tambah yang sangat diutamakan.',
      'Komunikatif, ramah, berpenampilan bersih & rapi, serta mampu bekerja dinamis di akhir pekan.',
    ],
    benefits: [
      'Gaji pokok kompetitif + Tips harian + Service charge bulanan.',
      'Akses kopi specialty gratis tanpa batas setiap shift.',
      'BPJS Kesehatan & BPJS Ketenagakerjaan.',
      'Dukungan penuh untuk mengikuti kompetisi barista nasional (ILAC/IBC).',
      'Makan siang/malam disiapkan chef dapur.',
      'Diskon karyawan 40% untuk seluruh menu F&B Élysée.',
    ],
  },
  {
    id: 'job-2',
    title: 'Head Pastry & Bakery Chef (Pâtissier)',
    department: 'kitchen',
    type: 'Full-Time',
    location: 'Senopati, Jakarta Selatan',
    salaryRange: 'Rp 6.500.000 – Rp 9.000.000 + Service Charge',
    experience: 'Min. 2-3 tahun di Bakery / Bistro / Hotel',
    urgent: true,
    shortDescription: 'Bertanggung jawab memimpin lini produksi viennoiserie, croissant mentega Prancis, sourdough, dan cake artisan khas Élysée.',
    responsibilities: [
      'Memproduksi pastry segar setiap pagi: laminated croissant, pain au chocolat, kouign-amann, dan brioche.',
      'Membuat dessert display andalan: Basque Burnt Cheesecake, Lemon Meringue Tart, dan Éclair.',
      'Mengembangkan inovasi menu seasonal dessert baru sesuai tren kuliner terkini.',
      'Mengontrol kualitas bahan baku mentega Normandia, tepung premium, dan buah-buahan segar.',
      'Menjaga standar ketat HACCP, kebersihan ruang pastry, dan pengelolaan food cost.',
      'Mengatur jadwal tim commis pastry dan mengawasi konsistensi rasa serta estetika plating.',
    ],
    requirements: [
      'Pendidikan minimal Diploma/SMK Perhotelan atau Tata Boga (Culinary/Pastry Arts).',
      'Pengalaman minimal 2-3 tahun sebagai Pastry Chef atau Demi Chef Pastry di kafe artisan atau hotel.',
      'Keahlian mumpuni dalam teknik laminasi adonan croissant (laminated dough) dan baking presisi.',
      'Memiliki pemahaman mendalam tentang fermentasi sourdough dan kontrol suhu adonan.',
      'Kreatif, disiplin waktu kerja pagi (early morning bake), dan berorientasi pada detail estetika.',
      'Mampu menghitung estimasi kebutuhan bahan baku dan meminimalkan waste produksi.',
    ],
    benefits: [
      'Gaji menarik berdasarkan portofolio & pengalaman + Service charge.',
      'Dapur pastry ber-AC dengan peralatan modern (deck oven, dough sheeter, blast chiller).',
      'BPJS Ketenagakerjaan & Kesehatan lengkap.',
      'Ruang kreasi bebas untuk meluncurkan menu pastry inovatif.',
      'Staff meals harian dan diskon belanja produk kafe.',
    ],
  },
  {
    id: 'job-3',
    title: 'Commis / Line Cook (Hot Kitchen Bistro)',
    department: 'kitchen',
    type: 'Full-Time',
    location: 'Senopati, Jakarta Selatan',
    salaryRange: 'Rp 4.800.000 – Rp 6.500.000 + Meal & Tips',
    experience: 'Min. 1 tahun di Western / Casual Dining Kitchen',
    urgent: false,
    shortDescription: 'Menyiapkan mise-en-place dan mengeksekusi hidangan savory bistro: pasta segar, artisan brunch, steak sandwich, dan salad gourmet.',
    responsibilities: [
      'Menyiapkan mise-en-place bahan baku makanan sesuai standar resep dan porsi yang ditentukan.',
      'Memasak hidangan savory pada stasiun pasta, sauté, atau grill dengan kecepatan dan konsistensi tinggi.',
      'Memastikan standar suhu penyajian makanan, higienitas piring, dan kebersihan stasiun kerja.',
      'Menerima dan memeriksa kesegaran pasokan sayuran organik, daging, dan bumbu dapur harian.',
      'Menerapkan prinsip FIFO (First In First Out) dan sanitasi dapur standar resto.',
    ],
    requirements: [
      'Pendidikan SMK Tata Boga atau pengalaman setara di industri kuliner.',
      'Pengalaman kerja minimal 1 tahun di dapur restoran Western, café, atau bistro.',
      'Terbiasa bekerja cepat, teliti, dan tenang di bawah tekanan jam makan siang/malam.',
      'Mampu bekerja sama dalam tim dapur dengan koordinasi komunikasi yang baik.',
      'Bersedia bekerja sistem shift, akhir pekan, dan hari libur nasional.',
    ],
    benefits: [
      'Gaji pokok + Lembur resmi + Pembagian tips harian.',
      'Makan harian bergizi disiapkan chef.',
      'BPJS Ketenagakerjaan & Kesehatan.',
      'Pelatihan teknik memasak Western & plating langsung dari Head Chef.',
      'Jenjang karir ke posisi Demi Chef / Chef de Partie.',
    ],
  },
  {
    id: 'job-4',
    title: 'Floor Supervisor & Guest Concierge',
    department: 'floor',
    type: 'Full-Time',
    location: 'Senopati, Jakarta Selatan',
    salaryRange: 'Rp 5.500.000 – Rp 7.500.000 + Service Charge',
    experience: 'Min. 2 tahun di Hospitality / Restoran Premium',
    urgent: false,
    shortDescription: 'Memimpin operasional ruang makan, mengoordinasikan reservasi VIP, dan memastikan setiap tamu merasakan keramahan bintang lima khas Élysée.',
    responsibilities: [
      'Memimpin briefing harian tim server & greeter, memastikan kesiapan layout meja dan kebersihan area makan.',
      'Menyambut tamu di lobi, mengelola sistem reservasi meja, dan menangani alokasi seating VIP Mezzanine.',
      'Menangani pertanyaan, preferensi khusus tamu (dietary/alergi), serta menyelesaikan komplain dengan empati tinggi.',
      'Melakukan upselling menu seasonal dan merekomendasikan pairing kopi-makanan kepada pengunjung.',
      'Berkoordinasi aktif dengan barista bar dan dapur agar waktu penyajian pesanan tetap presisi.',
    ],
    requirements: [
      'Pria/Wanita dengan kepribadian ramah, energik, dan tutur kata sopan.',
      'Pengalaman minimal 2 tahun sebagai Captain/Supervisor di industri F&B atau perhotelan.',
      'Memiliki kemampuan komunikasi interpersonal yang sangat baik (bahasa Indonesia & bahasa Inggris fungsional).',
      'Mampu berpikir cepat dan solutif dalam menangani situasi tak terduga.',
      'Berpenampilan rapi, bersih, dan berstandar grooming hospitality tinggi.',
    ],
    benefits: [
      'Gaji pokok kompetitif + Pembagian service charge bulanan.',
      'Tunjangan penampilan & seragam kerja berdesain elegan.',
      'BPJS Kesehatan & Ketenagakerjaan.',
      'Akses program kepemimpinan dan manajemen hospitality.',
      'Diskon staf 40% & makanan shift harian.',
    ],
  },
  {
    id: 'job-5',
    title: 'Junior Barista & Service Crew (Part-Time / Full-Time)',
    department: 'barista',
    type: 'Part-Time',
    location: 'Senopati, Jakarta Selatan',
    salaryRange: 'Rp 3.800.000 – Rp 4.800.000 (Pro-rata) + Pelatihan',
    experience: 'Terbuka untuk Fresh Graduate & Mahasiswa',
    urgent: false,
    shortDescription: 'Mendukung operasional bar, melayani pemesanan di kasir POS, menyajikan hidangan ke meja tamu, dan belajar teknik seduhan kopi artisan.',
    responsibilities: [
      'Menyambut tamu di meja kasir dengan senyuman hangat, ramah, dan informatif.',
      'Mengoperasikan sistem kasir POS, mengelola transaksi pembayaran tunai/QRIS/kartu secara akurat.',
      'Membantu persiapan bahan minuman (sirup organik, perasan buah, susu segar, es kristal).',
      'Mengantarkan pesanan makanan dan minuman ke meja tamu sesuai nomor pesanan.',
      'Menjaga kerapian ruang makan, membersihkan meja (bussing), dan mencuci perlengkapan saji.',
    ],
    requirements: [
      'Usia 18 – 24 tahun, terbuka untuk mahasiswa aktif (jadwal fleksibel) atau lulusan baru SMA/SMK/Diploma.',
      'Memiliki ketertarikan tinggi untuk belajar dunia kopi dan pelayanan hospitality.',
      'Jujur, disiplin waktu, inisiatif tinggi, dan gemar berinteraksi dengan orang baru.',
      'Mampu bekerja minimal 3-4 hari dalam seminggu untuk opsi Part-Time (termasuk weekend).',
      'Tidak memerlukan pengalaman sebelumnya — pelatihan barista dasar akan diberikan secara intensif.',
    ],
    benefits: [
      'Upah jam/bulanan yang jelas + Uang transport & makan per shift.',
      'Pelatihan gratis teknik dasar espresso dan latte art langsung dari Senior Barista.',
      'Sertifikat pengalaman kerja resmi dari Élysée Café & Bistro.',
      'Jatah kopi gratis harian dan lingkungan kerja kekeluargaan yang positif.',
    ],
  },
  {
    id: 'job-6',
    title: 'Visual Content Creator & Social Media Specialist',
    department: 'creative',
    type: 'Full-Time',
    location: 'Senopati, Jakarta Selatan',
    salaryRange: 'Rp 5.000.000 – Rp 7.000.000 + Creative Perks',
    experience: 'Min. 1 tahun mengelola konten F&B / Lifestyle',
    urgent: false,
    shortDescription: 'Membuat konten video estetik (Reels, TikTok) dan foto profesional yang menangkap keindahan arsitektur, racikan kopi, dan suasana hangat Élysée.',
    responsibilities: [
      'Merencanakan editorial content calendar mingguan untuk akun Instagram @elysee.bistro dan TikTok.',
      'Mengambil footage video & foto berkualitas tinggi di kafe (kopi pour-over, latte art, hidangan bistro, arsitektur).',
      'Mengedit video pendek dinamis dengan audio tren, transisi halus, dan narasi yang elegan.',
      'Membangun interaksi aktif dengan audiens media sosial melalui DM, komentar, dan story polls.',
      'Meliput acara khusus seperti Acoustic Jazz Night dan peluncuran menu musiman.',
    ],
    requirements: [
      'Pria/Wanita dengan portofolio konten video pendek (Instagram Reels/TikTok) bertema kafe/makanan/lifestyle.',
      'Mahir mengoperasikan kamera mirrorless/smartphone modern dan software editing (CapCut, Premiere, Lightroom).',
      'Memiliki rasa estetika visual (eye for aesthetic), komposisi warna, dan ritme musik yang kuat.',
      'Up-to-date dengan tren media sosial terkini dan algoritma konten viral berkelas.',
      'Mampu berkomunikasi hangat, proaktif, dan bekerja fleksibel saat event berlangsung.',
    ],
    benefits: [
      'Gaji pokok + Bonus KPI performa konten yang viral/mencapai target reach.',
      'Budget santap dan mencoba menu baru untuk keperluan shooting konten setiap minggu.',
      'Fleksibilitas kerja hibrida (konten di Senopati + editing fleksibel).',
      'Perangkat penunjang shooting (lighting, mic wireless, stabilizer) disediakan.',
      'Kopi specialty gratis sepuasnya selama jam kerja.',
    ],
  },
];

