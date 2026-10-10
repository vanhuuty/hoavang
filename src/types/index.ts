export interface Doctor {
  id: string;
  name: string;
  title: string; // e.g. "Bác sĩ CKI / Trưởng phòng khám"
  degree: string; // "Thạc sĩ Thú y - Đại học Nông Lâm TP.HCM"
  specialties: string[];
  experienceYears: number;
  avatar: string;
  bio: string;
  schedule: string[];
  casesHandled: number;
  rating: number;
  reviewCount: number;
  status: 'active' | 'in_surgery' | 'off_duty';
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  category: 'kham' | 'tiemphong' | 'thuoc' | 'spa' | 'luutru' | 'phauthuat' | 'xetnghiem';
  fullDescription: string;
  priceRange: string;
  duration: string;
  features: string[];
  image: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string[];
  category: 'Chăm sóc thú cưng' | 'Tiêm phòng' | 'Dinh dưỡng' | 'Sức khỏe & Bệnh lý';
  publishDate: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  readTime: string;
  views: number;
  image: string;
  tags: string[];
  inlineImages?: { url: string; caption?: string; position?: number }[];
}

export interface Appointment {
  id: string;
  code: string; // e.g. "HV-2026-9812"
  ownerName: string;
  phoneNumber: string;
  email?: string;
  petName: string;
  petType: 'Chó' | 'Mèo' | 'Khác';
  petBreed?: string;
  petWeight?: string;
  serviceId: string;
  serviceName: string;
  doctorId: string; // or "any"
  doctorName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  ownerName: string;
  petInfo: string;
  avatar: string;
  comment: string;
  rating: number;
  serviceUsed: string;
  date: string;
}

export interface Review {
  id: string;
  customerName: string;
  phoneNumber?: string;
  bookingCode?: string;
  location?: string;
  petName: string;
  petType: 'Chó' | 'Mèo' | 'Khác';
  serviceUsed: string;
  doctorName?: string;
  rating: number;
  title?: string;
  content: string;
  petPhotoUrl?: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  clinicResponse?: {
    author: string;
    content: string;
    date: string;
  };
  helpfulCount: number;
  verified: boolean;
}
