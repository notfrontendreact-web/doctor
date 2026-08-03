export type PageRoute = 
  | 'home' 
  | 'search' 
  | 'shop'
  | 'doctor-branding' 
  | 'articles' 
  | 'contact' 
  | 'about' 
  | 'admin'
  | 'payment-receipt';

export interface Doctor {
  id: string;
  name: string;
  title: string; // e.g. متخصص پوست و مو و زیبایی
  specialtyId: string;
  specialtyName: string;
  medicalCouncilNumber: string; // کد نظام پزشکی
  avatar: string;
  city: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  consultationFee: number; // Toman
  isBranded: boolean; // آیا تحت پوشش برندسازی پزشک برتر است؟
  brandingPackage?: 'gold' | 'silver' | 'bronze';
  bio: string;
  experienceYears: number;
  availableSlots: string[]; // e.g. ['امروز ساعت ۱۷:۳۰', 'فردا ساعت ۱۰:۰۰']
  services: string[];
  clinicImages: string[];
}

export interface Specialty {
  id: string;
  name: string;
  iconName: string;
  doctorCount: number;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  category: string;
  imageUrl: string;
  date: string; // e.g. 1403/05/10
  readTimeMinutes: number;
  views: number;
  likes: number;
  tags: string[];
}

export interface ServiceProduct {
  id: string;
  title: string;
  subtitle: string;
  price: number; // in Toman
  originalPrice?: number;
  rating: number;
  image: string;
  description: string;
  badge?: string;
  features: string[];
  stockOrSlots: number;
}

export interface SubMenuCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  products: ServiceProduct[]; // Strictly 15 products/services per submenu
}

export interface MainMenuCategory {
  id: string;
  title: string;
  submenus: SubMenuCategory[];
}

export interface AppointmentOrder {
  id: string;
  trackingCode: string;
  patientName: string;
  patientPhone: string;
  patientNationalId: string;
  doctorId?: string;
  doctorName?: string;
  productTitle?: string;
  amount: number; // Toman
  date: string;
  timeSlot: string;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  createdAt: string;
  paymentRefId?: string;
  gateway?: 'zarinpal' | 'shetab';
}

export interface AppUser {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: 'user' | 'doctor' | 'admin';
  createdAt: string;
  status: 'active' | 'blocked';
  totalOrdersCount: number;
}

export interface BrandingPackage {
  id: string;
  name: string;
  title: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  color: string;
}

export interface AdminStats {
  totalRevenue: number;
  totalAppointments: number;
  totalDoctors: number;
  totalUsers: number;
  totalArticles: number;
  monthlyRevenueChart: { month: string; amount: number }[];
  recentOrders: AppointmentOrder[];
}
