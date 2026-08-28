export type PageId =
  | 'home'
  | 'about'
  | 'menu'
  | 'reservasi'
  | 'galeri'
  | 'promo'
  | 'ulasan'
  | 'kontak'
  | 'karir';

export type MenuCategory = 
  | 'all' 
  | 'coffee' 
  | 'non-coffee' 
  | 'tea' 
  | 'main' 
  | 'snack' 
  | 'dessert';

export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'non-coffee' | 'tea' | 'main' | 'snack' | 'dessert';
  price: number;
  description: string;
  image: string;
  badge?: string;
  badgeColor?: 'amber' | 'emerald' | 'rose' | 'brown';
  isSignature?: boolean;
  calories?: string;
  ingredients?: string[];
  tastingNotes?: string[];
  isVegetarian?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  dateStr: string;
  timeStr: string;
  pricePerPax: number;
  description: string;
  includes: string[];
  badge: string;
  iconName?: string;
}

export interface PromoItem {
  id: string;
  title: string;
  badge: string;
  validDays: string;
  description: string;
  discountCode: string;
  discountPercentage: number;
  terms: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatarText: string;
  avatarBg?: string;
  date?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: 'interior' | 'craft' | 'garden' | 'night' | 'dessert';
  spanClass?: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: string;
  area: string;
  notes?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface JobPosition {
  id: string;
  title: string;
  department: 'barista' | 'kitchen' | 'floor' | 'creative';
  type: 'Full-Time' | 'Part-Time' | 'Internship';
  location: string;
  salaryRange: string;
  experience: string;
  urgent?: boolean;
  shortDescription: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export interface JobApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  positionId: string;
  positionTitle: string;
  jobType: string;
  experienceYears: string;
  currentStatus: string;
  portfolioLink?: string;
  fileName?: string;
  fileSize?: string;
  coverNote?: string;
  submittedAt: string;
  status: 'review' | 'shortlisted' | 'interview';
}
