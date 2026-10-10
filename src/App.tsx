import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickServicesBar } from './components/QuickServicesBar';
import { AboutSection } from './components/AboutSection';
import { DoctorsSection } from './components/DoctorsSection';
import { ServicesSection } from './components/ServicesSection';
import { NewsSection } from './components/NewsSection';
import { ContactSidebar } from './components/ContactSidebar';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

// Modals
import { BookingModal } from './components/BookingModal';
import { DoctorDetailModal } from './components/DoctorDetailModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ArticleModal } from './components/ArticleModal';
import { AppointmentLookupModal } from './components/AppointmentLookupModal';
import { MapModal } from './components/MapModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { WriteArticleModal } from './components/WriteArticleModal';

import { CLINIC_INFO, DOCTORS_DATA, SERVICES_DATA, ARTICLES_DATA, INITIAL_REVIEWS_DATA } from './data/clinicData';
import { Doctor, ServiceItem, Article, Appointment, Review } from './types';
import { 
  PhoneCall, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  FileText,
  Search,
  X,
  PenTool,
  MessageSquare
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Preselected IDs for booking
  const [bookingPreServiceId, setBookingPreServiceId] = useState<string | undefined>(undefined);
  const [bookingPreDoctorId, setBookingPreDoctorId] = useState<string | undefined>(undefined);

  // Reviews & Moderation State
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem('hoavang_vet_reviews');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REVIEWS_DATA;
  });
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Articles & Authoring State
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem('hoavang_vet_articles');
      if (stored) {
        const parsed: Article[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Normalize any old local dev image paths stored in localStorage
          return parsed.map(art => ({
            ...art,
            image: art.image?.includes('hero_vet_clinic_animals') ? CLINIC_INFO.images.hero :
                   art.image?.includes('vet_doctor_male') ? CLINIC_INFO.images.doctorMale :
                   art.image?.includes('vet_doctor_female') ? CLINIC_INFO.images.doctorFemale :
                   art.image?.includes('clinic_storefront') ? CLINIC_INFO.images.storefront :
                   art.image || CLINIC_INFO.images.hero,
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
    return ARTICLES_DATA;
  });
  const [isWriteArticleOpen, setIsWriteArticleOpen] = useState(false);

  const handleCreateArticle = (newArticle: Article) => {
    const updated = [newArticle, ...articles];
    setArticles(updated);
    try {
      localStorage.setItem('hoavang_vet_articles', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(`Đã xuất bản bài viết "${newArticle.title}" thành công!`);
  };

  // Toast notification for user actions
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleCreateReview = (newReview: Review) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('hoavang_vet_reviews', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('Đánh giá của bạn đã được gửi và đang chờ ban quản trị kiểm duyệt công khai. Cảm ơn bạn!');
  };

  const handleApproveReview = (reviewId: string) => {
    const updated = reviews.map(r => r.id === reviewId ? { ...r, status: 'approved' as const } : r);
    setReviews(updated);
    try {
      localStorage.setItem('hoavang_vet_reviews', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('Đã phê duyệt đánh giá công khai trên website!');
  };

  const handleRejectReview = (reviewId: string, reason?: string) => {
    const updated = reviews.map(r => r.id === reviewId ? { ...r, status: 'rejected' as const, rejectionReason: reason } : r);
    setReviews(updated);
    try {
      localStorage.setItem('hoavang_vet_reviews', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('Đã từ chối hiển thị đánh giá.');
  };

  const handleReplyReview = (reviewId: string, replyText: string, authorName: string) => {
    const updated = reviews.map(r => {
      if (r.id === reviewId) {
        return {
          ...r,
          clinicResponse: {
            author: authorName,
            content: replyText,
            date: new Date().toLocaleDateString('vi-VN')
          }
        };
      }
      return r;
    });
    setReviews(updated);
    try {
      localStorage.setItem('hoavang_vet_reviews', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('Đã lưu và hiển thị phản hồi chính thức từ phòng khám!');
  };

  const handleLikeReview = (reviewId: string) => {
    const updated = reviews.map(r => r.id === reviewId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r);
    setReviews(updated);
    try {
      localStorage.setItem('hoavang_vet_reviews', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenBooking = (serviceId?: string, doctorId?: string) => {
    setBookingPreServiceId(serviceId);
    setBookingPreDoctorId(doctorId);
    setIsBookingOpen(true);
  };

  const handleBookWithDoctor = (doctor: Doctor) => {
    setSelectedDoctor(null);
    handleOpenBooking(undefined, doctor.id);
  };

  const handleBookService = (service: ServiceItem) => {
    setSelectedService(null);
    handleOpenBooking(service.id, undefined);
  };

  // Search results matching search query
  const searchResults = searchQuery.trim()
    ? {
        articles: articles.filter(a => 
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.summary.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        doctors: DOCTORS_DATA.filter(d => 
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
        services: SERVICES_DATA.filter(s => 
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-sky-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-sky-700 text-xs flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-sky-300 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Emergency Hotline Button for quick access */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center">
        <a
          href={`tel:${CLINIC_INFO.hotline.replace(/\s+/g, '')}`}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg shadow-rose-600/30 transition-transform hover:scale-105 font-bold text-xs"
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
          <span>Cấp cứu thú y 24/7: {CLINIC_INFO.hotline}</span>
        </a>
      </div>

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        onOpenLookup={() => setIsLookupOpen(true)}
        onOpenWriteArticle={() => setIsWriteArticleOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Global Search Results Dropdown Overlay */}
      {searchResults && (
        <div className="bg-sky-50 border-b border-sky-200 py-6 px-4">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-sky-950 flex items-center gap-2">
                <Search className="w-4 h-4 text-sky-600" />
                Kết quả tìm kiếm cho: &ldquo;{searchQuery}&rdquo;
              </h3>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Xóa tìm kiếm [✕]
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Doctor Matches */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                  Bác sĩ ({searchResults.doctors.length})
                </h4>
                {searchResults.doctors.length === 0 ? (
                  <p className="text-xs text-slate-400">Không có bác sĩ phù hợp</p>
                ) : (
                  searchResults.doctors.map(d => (
                    <div 
                      key={d.id} 
                      onClick={() => { setSelectedDoctor(d); setSearchQuery(''); }}
                      className="text-xs p-2 rounded-lg hover:bg-sky-50 cursor-pointer flex items-center gap-2"
                    >
                      <img src={d.avatar} alt={d.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-slate-800">{d.name}</div>
                        <div className="text-[10px] text-slate-500">{d.title}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Service Matches */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                  Dịch vụ ({searchResults.services.length})
                </h4>
                {searchResults.services.length === 0 ? (
                  <p className="text-xs text-slate-400">Không có dịch vụ phù hợp</p>
                ) : (
                  searchResults.services.map(s => (
                    <div 
                      key={s.id} 
                      onClick={() => { setSelectedService(s); setSearchQuery(''); }}
                      className="text-xs p-2 rounded-lg hover:bg-sky-50 cursor-pointer"
                    >
                      <div className="font-bold text-slate-800">{s.title}</div>
                      <div className="text-[10px] text-sky-700 font-semibold">{s.priceRange}</div>
                    </div>
                  ))
                )}
              </div>

              {/* Article Matches */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                  Tin tức & Cẩm nang ({searchResults.articles.length})
                </h4>
                {searchResults.articles.length === 0 ? (
                  <p className="text-xs text-slate-400">Không có bài viết phù hợp</p>
                ) : (
                  searchResults.articles.map(a => (
                    <div 
                      key={a.id} 
                      onClick={() => { setSelectedArticle(a); setSearchQuery(''); }}
                      className="text-xs p-2 rounded-lg hover:bg-sky-50 cursor-pointer"
                    >
                      <div className="font-bold text-slate-800 line-clamp-1">{a.title}</div>
                      <div className="text-[10px] text-slate-500">{a.category} · {a.publishDate}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Page Routing */}
      <main className="flex-1">
        {/* VIEW 1: TRANG CHỦ (HOME - EXACT FAITHFUL COMPOSITION FROM USER IMAGE) */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onExploreMore={() => {
                const el = document.getElementById('about-anchor');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Quick 5 Services Bar */}
            <QuickServicesBar
              onSelectService={(serviceId) => {
                const found = SERVICES_DATA.find(s => s.id === serviceId);
                if (found) setSelectedService(found);
              }}
              onBookService={(serviceId) => handleOpenBooking(serviceId)}
            />

            {/* Core 2-Column Portal Layout Matching Mockup */}
            <div id="about-anchor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left 8 Columns (Main Feed) */}
                <div className="lg:col-span-8 space-y-8">
                  {/* 1. About Clinic Card with Stats */}
                  <AboutSection
                    onLearnMore={() => setActiveTab('about')}
                    onOpenBooking={() => handleOpenBooking()}
                  />

                  {/* 2. Featured Services Row */}
                  <ServicesSection
                    onSelectService={(service) => setSelectedService(service)}
                    onBookService={(service) => handleBookService(service)}
                  />

                  {/* 3. Featured Doctors Showcase (User explicitly requested doctor profile showcase) */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-sky-900">
                        <span className="text-xl font-black text-slate-900">
                          Đội ngũ Bác sĩ Thú y Hòa Vang
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveTab('doctors')}
                        className="text-xs font-bold text-sky-700 hover:text-sky-800 cursor-pointer"
                      >
                        Xem tất cả hồ sơ →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {DOCTORS_DATA.slice(0, 2).map((doc) => (
                        <div
                          key={doc.id}
                          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-sky-300 transition-all flex items-start gap-3.5 group cursor-pointer"
                          onClick={() => setSelectedDoctor(doc)}
                        >
                          <img
                            src={doc.avatar}
                            alt={doc.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 space-y-1 flex-1">
                            <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                              {doc.title}
                            </span>
                            <h4 className="text-sm font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                              {doc.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {doc.degree}
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                              <span className="text-[11px] text-amber-600 font-bold">★ {doc.rating}</span>
                              <span className="text-slate-300">·</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookWithDoctor(doc);
                                }}
                                className="text-[11px] font-bold text-sky-700 hover:text-sky-800 underline"
                              >
                                Đặt lịch khám
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Featured News List matching Mockup */}
                  <NewsSection
                    articles={articles}
                    onSelectArticle={(article) => setSelectedArticle(article)}
                    onOpenWriteArticle={() => setIsWriteArticleOpen(true)}
                    isFullPage={false}
                  />

                  {/* 5. Testimonial Quote Card matching Mockup */}
                  <TestimonialsSection
                    approvedReviews={reviews.filter(r => r.status === 'approved')}
                    onOpenWriteReview={() => setIsWriteReviewOpen(true)}
                    onViewAllReviews={() => {
                      setActiveTab('reviews');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>

                {/* Right 4 Columns (Contact Sidebar matching Mockup) */}
                <div className="lg:col-span-4">
                  <ContactSidebar
                    onOpenBooking={() => handleOpenBooking()}
                    onOpenMap={() => setIsMapOpen(true)}
                  />
                </div>

              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: GIỚI THIỆU PHÒNG KHÁM (ABOUT) */}
        {activeTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            {/* Header intro */}
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Hơn 10 năm đồng hành cùng thú cưng
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Giới Thiệu Phòng Khám Thú Y Hòa Vang
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Được thành lập từ tình yêu thương động vật và tâm huyết y đức, Phòng khám thú y Hòa Vang là điểm tựa y tế tin cậy cho hàng ngàn gia đình nuôi thú cưng tại huyện Hòa Vang và các khu vực lân cận của TP. Đà Nẵng.
              </p>
            </div>

            {/* Facade & Facilities Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
              <div className="space-y-4">
                <h3 className="text-xl font-black text-sky-950">
                  Cơ sở vật chất & Trang thiết bị y khoa hiện đại
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Chúng tôi đầu tư đồng bộ hệ thống máy chẩn đoán cận lâm sàng chuẩn quốc tế nhằm phát hiện bệnh sớm, giảm thiểu thời gian chờ đợi và nâng cao hiệu quả cứu chữa:
                </p>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Máy siêu âm màu đa tần số:</strong> Kiểm tra thai, phát hiện sỏi bàng quang, u bướu nội tạng.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Máy xét nghiệm huyết học tự động 18 thông số:</strong> Cho kết quả sau 5 phút.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Máy gây mê hô hấp Isoflurane:</strong> Đảm bảo an toàn tối đa cho các ca phẫu thuật phức tạp.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Khu lưu trú vô trùng:</strong> Tách biệt khu chó và mèo, đèn UV diệt khuẩn định kỳ.</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src={CLINIC_INFO.images.storefront}
                  alt="Không gian phòng khám thú y Hòa Vang"
                  className="w-full h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Doctors list preview inside about */}
            <DoctorsSection
              onSelectDoctor={(doc) => setSelectedDoctor(doc)}
              onBookDoctor={(doc) => handleBookWithDoctor(doc)}
            />
          </div>
        )}

        {/* VIEW 3: DỊCH VỤ & BẢNG GIÁ (SERVICES) */}
        {activeTab === 'services' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Chăm sóc toàn diện từ A - Z
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Danh Mục Dịch Vụ Thú Y
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Khám bệnh, tiêm phòng vaccine, phẫu thuật ngoại khoa, siêu âm xét nghiệm, spa làm đẹp và lưu trú nội trú an toàn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES_DATA.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-sky-900/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {service.priceRange}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-black text-slate-900">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {service.shortDesc}
                      </p>
                      <div className="space-y-1.5 pt-2">
                        {service.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="text-xs font-semibold text-slate-700 hover:text-sky-700 cursor-pointer"
                      >
                        Chi tiết dịch vụ →
                      </button>
                      <button
                        onClick={() => handleBookService(service)}
                        className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                      >
                        Đặt lịch
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing table component */}
            <PricingSection onOpenBooking={() => handleOpenBooking()} />
          </div>
        )}

        {/* VIEW 4: HỒ SƠ BÁC SĨ (DOCTORS FULL PAGE) */}
        {activeTab === 'doctors' && (
          <div className="py-10">
            <DoctorsSection
              onSelectDoctor={(doc) => setSelectedDoctor(doc)}
              onBookDoctor={(doc) => handleBookWithDoctor(doc)}
            />
          </div>
        )}

        {/* VIEW 5: TIN TỨC & CẨM NANG (NEWS FULL PORTAL) */}
        {activeTab === 'news' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Kiến thức thú y & Kinh nghiệm nuôi thú cưng
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Tin Tức & Cẩm Nang Sức Khỏe Thú Cưng
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tổng hợp các bài viết chuyên môn từ các bác sĩ thú y Hòa Vang về cách chăm sóc mùa nóng, lịch tiêm phòng, dinh dưỡng hợp lý và cách sơ cứu khẩn cấp.
              </p>
            </div>

            <NewsSection
              articles={articles}
              onSelectArticle={(article) => setSelectedArticle(article)}
              onOpenWriteArticle={() => setIsWriteArticleOpen(true)}
              isFullPage={true}
            />
          </div>
        )}

        {/* VIEW: BẢNG GIÁ (PRICING) */}
        {activeTab === 'pricing' && (
          <PricingSection onOpenBooking={() => handleOpenBooking()} />
        )}

        {/* VIEW: ĐÁNH GIÁ & NHẬN XÉT (REVIEWS & MODERATION) */}
        {activeTab === 'reviews' && (
          <ReviewsSection
            reviews={reviews}
            onOpenWriteReview={() => setIsWriteReviewOpen(true)}
            onApproveReview={handleApproveReview}
            onRejectReview={handleRejectReview}
            onReplyReview={handleReplyReview}
            onLikeReview={handleLikeReview}
          />
        )}

        {/* VIEW 7: LIÊN HỆ & BẢN ĐỒ (CONTACT) */}
        {activeTab === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Kết nối cùng chúng tôi
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Liên Hệ Phòng Khám Thú Y Hòa Vang
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Chúng tôi luôn sẵn sàng lắng nghe, giải đáp thắc mắc và tiếp nhận các ca khám chữa bệnh cho thú cưng 7 ngày trong tuần.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Direct Info & Message Box */}
              <div className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
                <h3 className="text-lg font-black text-slate-900">
                  Gửi lời nhắn hoặc yêu cầu tư vấn
                </h3>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    showToast('Cảm ơn bạn! Phòng khám thú y Hòa Vang sẽ liên hệ tư vấn trong ít phút.');
                    (e.target as HTMLFormElement).reset();
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Họ và tên của bạn</label>
                      <input 
                        required
                        type="text" 
                        placeholder="VD: Trần Văn Minh"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Số điện thoại liên hệ</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="VD: 0935 77 87 27"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Nội dung câu hỏi / Tình trạng của bé</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Mô tả triệu chứng của thú cưng hoặc dịch vụ bạn muốn tìm hiểu..."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-all"
                  >
                    Gửi yêu cầu tư vấn miễn phí
                  </button>
                </form>

                {/* Direct quick cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
                  <div className="p-3 rounded-xl bg-sky-50 text-sky-900 space-y-1">
                    <span className="font-bold block">Hotline & Zalo:</span>
                    <a href={`tel:${CLINIC_INFO.hotline.replace(/\s+/g, '')}`} className="font-extrabold text-sm text-sky-700">
                      {CLINIC_INFO.hotline}
                    </a>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 space-y-1">
                    <span className="font-bold block">Giờ mở cửa:</span>
                    <span className="font-semibold text-emerald-800">7:00 - 19:00 hàng ngày</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Embedded Map */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Vị trí phòng khám trên bản đồ
                  </h4>
                  <div className="relative h-72 rounded-2xl overflow-hidden border border-slate-200">
                    <iframe
                      title="Bản đồ Phòng khám thú y Hòa Vang"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.4852906471847!2d108.08489957582539!3d15.987707441584988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421e42e1261d7b%3A0x6b4efd8c119c3b88!2zSMOyYSBQaMO6LCBIw7JhIFZhbmcsIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    📍 {CLINIC_INFO.address}
                  </p>
                  <button
                    onClick={() => setIsMapOpen(true)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Xem chỉ đường chi tiết →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Sticky Quick Action Bar (Tối ưu hóa điều hướng & thao tác nhanh trên điện thoại) */}
      <aside aria-label="Điều hướng nhanh điện thoại" className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg flex items-center justify-around gap-1 safe-area-pb">
        <a 
          href={`tel:${CLINIC_INFO.hotline.replace(/\s+/g, '')}`}
          className="flex flex-col items-center justify-center py-1 px-2 text-sky-700 hover:text-sky-900 transition-colors"
        >
          <PhoneCall className="w-5 h-5 text-sky-600 animate-pulse" />
          <span className="text-[10px] font-bold mt-0.5">Gọi Hotline</span>
        </a>

        <button
          onClick={() => handleOpenBooking()}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-sky-700 active:bg-sky-800 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-700/25 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>Đặt khám</span>
        </button>

        <button
          onClick={() => setIsWriteArticleOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-700 hover:text-sky-700 transition-colors cursor-pointer"
          title="Viết bài mới"
        >
          <PenTool className="w-5 h-5 text-sky-600" />
          <span className="text-[10px] font-bold mt-0.5">Viết bài</span>
        </button>

        <button
          onClick={() => setIsMapOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-700 hover:text-sky-700 transition-colors cursor-pointer"
          title="Chỉ đường"
        >
          <MapPin className="w-5 h-5 text-amber-600" />
          <span className="text-[10px] font-bold mt-0.5">Chỉ đường</span>
        </button>
      </aside>

      {/* Footer */}
      <Footer onNavClick={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* MODALS */}
      {/* 1. Online Appointment Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={bookingPreServiceId}
        initialDoctorId={bookingPreDoctorId}
        onBookingSuccess={(appt) => {
          showToast(`Đặt lịch hẹn thành công mã ${appt.code}! Vui lòng đưa bé đến đúng giờ hẹn.`);
        }}
      />

      {/* 2. Doctor Profile Detail Modal */}
      <DoctorDetailModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBookWithDoctor={handleBookWithDoctor}
      />

      {/* 3. Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={handleBookService}
      />

      {/* 4. Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 5. Appointment Lookup Modal */}
      <AppointmentLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
        onOpenBooking={() => {
          setIsLookupOpen(false);
          handleOpenBooking();
        }}
      />

      {/* 6. Map Modal */}
      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />

      {/* 7. Write Customer Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={handleCreateReview}
      />

      {/* 8. Write & Publish News Article Module */}
      <WriteArticleModal
        isOpen={isWriteArticleOpen}
        onClose={() => setIsWriteArticleOpen(false)}
        onSubmitArticle={handleCreateArticle}
      />

    </div>
  );
}
