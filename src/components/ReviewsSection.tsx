import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  ThumbsUp, 
  Filter, 
  Plus, 
  ShieldAlert, 
  Clock, 
  CornerDownRight, 
  Check, 
  X,
  PawPrint
} from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onOpenWriteReview: () => void;
  onApproveReview: (reviewId: string) => void;
  onRejectReview: (reviewId: string, reason?: string) => void;
  onReplyReview: (reviewId: string, replyText: string, authorName: string) => void;
  onLikeReview: (reviewId: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onOpenWriteReview,
  onApproveReview,
  onRejectReview,
  onReplyReview,
  onLikeReview
}) => {
  // Navigation inside reviews: 'public' or 'admin'
  const [activeSubTab, setActiveSubTab] = useState<'public' | 'admin'>('public');

  // Filter & sort for public reviews
  const [selectedStar, setSelectedStar] = useState<number | 'all'>('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'highest'>('newest');

  // Admin filter
  const [adminStatusFilter, setAdminStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  const [replyAuthor, setReplyAuthor] = useState<string>('BS. CKI. Nguyễn Văn Hùng');

  // Calculations for approved reviews
  const approvedReviews = reviews.filter(r => r.status === 'approved');
  const pendingReviews = reviews.filter(r => r.status === 'pending');
  const rejectedReviews = reviews.filter(r => r.status === 'rejected');

  const totalApproved = approvedReviews.length;
  const avgRating = totalApproved > 0
    ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / totalApproved).toFixed(1)
    : '5.0';

  const starCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  approvedReviews.forEach(r => {
    if (starCounts[r.rating] !== undefined) starCounts[r.rating]++;
  });

  // Filtered public reviews
  const filteredPublicReviews = approvedReviews
    .filter(r => {
      if (selectedStar !== 'all' && r.rating !== selectedStar) return false;
      if (selectedService !== 'all' && !r.serviceUsed.toLowerCase().includes(selectedService.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'highest') return b.rating - a.rating;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  // Filtered admin reviews
  const filteredAdminReviews = reviews.filter(r => {
    if (adminStatusFilter === 'all') return true;
    return r.status === adminStatusFilter;
  });

  const handleSendReply = (reviewId: string) => {
    if (!replyContent.trim()) return;
    onReplyReview(reviewId, replyContent.trim(), replyAuthor);
    setReplyContent('');
    setReplyingReviewId(null);
  };

  return (
    <section id="reviews" className="py-10 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header & Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-full">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Tiếng nói từ cộng đồng chủ nuôi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Đánh Giá & Nhận Xét Dịch Vụ
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              100% đánh giá thực tế từ các chủ nuôi đã đưa thú cưng đến khám chữa bệnh, spa hoặc lưu trú tại Phòng khám thú y Hòa Vang.
            </p>
          </div>

          {/* Action and Admin Switcher buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenWriteReview}
              className="flex items-center gap-2 px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-700/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Viết đánh giá của bạn</span>
            </button>

            {/* Admin Moderation Button with Badge */}
            <div className="flex p-1 bg-white border border-slate-200 rounded-xl">
              <button
                onClick={() => setActiveSubTab('public')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeSubTab === 'public'
                    ? 'bg-sky-50 text-sky-800'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Công khai ({totalApproved})
              </button>
              <button
                onClick={() => setActiveSubTab('admin')}
                className={`relative px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeSubTab === 'admin'
                    ? 'bg-amber-100 text-amber-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Duyệt đánh giá</span>
                {pendingReviews.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                    {pendingReviews.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MODE 1: PUBLIC APPROVED REVIEWS */}
        {activeSubTab === 'public' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Rating Stats Summary Banner */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Score Column */}
                <div className="lg:col-span-4 text-center lg:text-left space-y-2 lg:border-r border-slate-100 lg:pr-8">
                  <div className="text-4xl sm:text-5xl font-black text-sky-950 font-sans tracking-tight">
                    {avgRating} <span className="text-2xl text-slate-400 font-normal">/ 5.0</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">
                    Dựa trên <strong>{totalApproved} đánh giá đã được kiểm duyệt</strong> của khách hàng tại Hòa Vang.
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      99% Khách hàng sẵn sàng giới thiệu
                    </span>
                  </div>
                </div>

                {/* Rating Distribution Column */}
                <div className="lg:col-span-8 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = starCounts[stars] || 0;
                    const percent = totalApproved > 0 ? (count / totalApproved) * 100 : 0;
                    return (
                      <div key={stars} className="flex items-center gap-3 text-xs">
                        <span className="w-12 font-bold text-slate-700 flex items-center gap-1 shrink-0">
                          {stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        </span>
                        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="w-10 text-right text-slate-400 font-mono shrink-0">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 mr-1 font-semibold flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Lọc:
                </span>
                
                {/* Star filters */}
                {[
                  { label: 'Tất cả sao', value: 'all' },
                  { label: '5 sao ★', value: 5 },
                  { label: '4 sao ★', value: 4 },
                ].map((item) => (
                  <button
                    key={String(item.value)}
                    onClick={() => setSelectedStar(item.value as any)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      selectedStar === item.value
                        ? 'bg-sky-700 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                <span className="text-slate-300 mx-1">|</span>

                {/* Service filters */}
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-hidden"
                >
                  <option value="all">Tất cả dịch vụ</option>
                  <option value="Khám">Khám & Điều trị</option>
                  <option value="Tiêm">Tiêm phòng Vaccine</option>
                  <option value="Phẫu thuật">Phẫu thuật & Triệt sản</option>
                  <option value="Spa">Spa & Làm đẹp</option>
                  <option value="Lưu trú">Lưu trú nội trú</option>
                </select>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Sắp xếp:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-hidden"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="highest">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            {/* Reviews Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPublicReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  {/* Review Top Meta */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-base shrink-0 shadow-2xs">
                          {review.customerName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900 leading-tight">
                            {review.customerName}
                          </h4>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {review.location || 'Huyện Hòa Vang, Đà Nẵng'}
                          </div>
                        </div>
                      </div>

                      {/* Stars and Date */}
                      <div className="text-right">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {review.date}
                        </span>
                      </div>
                    </div>

                    {/* Verified & Service Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Đã sử dụng dịch vụ tại phòng khám
                      </span>
                      <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        Bé: <strong>{review.petName}</strong> ({review.petType})
                      </span>
                      <span className="text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md font-medium">
                        {review.serviceUsed}
                      </span>
                      {review.doctorName && (
                        <span className="text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md">
                          Bác sĩ: {review.doctorName}
                        </span>
                      )}
                    </div>

                    {/* Review Title & Content */}
                    <div className="space-y-1.5 pt-1">
                      {review.title && (
                        <h5 className="text-sm font-bold text-slate-900 leading-snug">
                          {review.title}
                        </h5>
                      )}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        &ldquo;{review.content}&rdquo;
                      </p>
                    </div>

                    {/* Pet photo if attached */}
                    {review.petPhotoUrl && (
                      <div className="pt-2">
                        <img
                          src={review.petPhotoUrl}
                          alt={`Bé ${review.petName} tại phòng khám thú y Hòa Vang`}
                          className="w-full h-44 object-cover rounded-2xl border border-slate-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Clinic Official Response (If any) */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    {review.clinicResponse && (
                      <div className="bg-sky-50/70 p-3.5 rounded-2xl border border-sky-100 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-sky-900 font-bold">
                          <span className="flex items-center gap-1.5">
                            <PawPrint className="w-3.5 h-3.5 text-sky-600" />
                            Phản hồi từ {review.clinicResponse.author}
                          </span>
                          <span className="text-[10px] text-sky-600/70 font-normal">
                            {review.clinicResponse.date}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-[11px]">
                          {review.clinicResponse.content}
                        </p>
                      </div>
                    )}

                    {/* Helpful counter button */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        onClick={() => onLikeReview(review.id)}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-sky-700 font-semibold px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-sky-600" />
                        <span>Hữu ích ({review.helpfulCount})</span>
                      </button>

                      <span className="text-[11px] text-slate-400">
                        {review.bookingCode ? `Mã hẹn: ${review.bookingCode}` : 'Khách vãng lai'}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {filteredPublicReviews.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 space-y-3">
                <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500">
                  Chưa có đánh giá nào phù hợp với bộ lọc đã chọn.
                </p>
                <button
                  onClick={onOpenWriteReview}
                  className="px-4 py-2 bg-sky-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Hãy là người đầu tiên đánh giá dịch vụ này
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: ADMIN MODERATION PANEL (KIỂM DUYỆT ĐÁNH GIÁ) */}
        {activeSubTab === 'admin' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-black text-slate-900">
                    Bảng Quản Trị & Kiểm Duyệt Đánh Giá
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kiểm tra tính chân thực, phê duyệt hiển thị công khai hoặc gửi phản hồi chính thức từ Bác sĩ.
                </p>
              </div>

              {/* Status filter tabs */}
              <div className="flex p-1 bg-slate-100 rounded-xl text-xs">
                <button
                  onClick={() => setAdminStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    adminStatusFilter === 'pending'
                      ? 'bg-amber-400 text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Chờ duyệt ({pendingReviews.length})</span>
                </button>
                <button
                  onClick={() => setAdminStatusFilter('approved')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    adminStatusFilter === 'approved'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã duyệt ({approvedReviews.length})</span>
                </button>
                <button
                  onClick={() => setAdminStatusFilter('rejected')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    adminStatusFilter === 'rejected'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Đã từ chối ({rejectedReviews.length})</span>
                </button>
                <button
                  onClick={() => setAdminStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    adminStatusFilter === 'all'
                      ? 'bg-sky-700 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả ({reviews.length})
                </button>
              </div>
            </div>

            {/* Moderation List */}
            <div className="space-y-4">
              {filteredAdminReviews.map((item) => (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    item.status === 'pending'
                      ? 'bg-amber-50/50 border-amber-200'
                      : item.status === 'approved'
                      ? 'bg-emerald-50/20 border-emerald-200'
                      : 'bg-rose-50/20 border-rose-200 opacity-75'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* User and review body */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-slate-900">
                          {item.customerName}
                        </span>
                        <span className="text-xs text-slate-500">
                          SĐT: <strong>{item.phoneNumber || 'Chưa cung cấp'}</strong>
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">
                          {item.location}
                        </span>
                        {item.bookingCode && (
                          <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md font-bold">
                            Mã: {item.bookingCode}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex text-amber-400">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-700 font-medium">Bé: <strong>{item.petName}</strong> ({item.petType})</span>
                        <span className="text-slate-400">|</span>
                        <span className="text-sky-800 font-semibold">{item.serviceUsed}</span>
                        {item.doctorName && <span className="text-slate-500">({item.doctorName})</span>}
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-400">{item.date}</span>
                      </div>

                      <div className="pt-1">
                        {item.title && <div className="text-xs font-bold text-slate-800">{item.title}</div>}
                        <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
                          {item.content}
                        </p>
                      </div>

                      {item.petPhotoUrl && (
                        <div className="pt-1">
                          <img
                            src={item.petPhotoUrl}
                            alt="Ảnh đính kèm"
                            className="w-24 h-24 object-cover rounded-xl border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {/* Attached response if exists */}
                      {item.clinicResponse && (
                        <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                          <div className="font-bold text-sky-800">
                            Phản hồi đã lưu ({item.clinicResponse.author} - {item.clinicResponse.date}):
                          </div>
                          <p className="text-slate-600">{item.clinicResponse.content}</p>
                        </div>
                      )}
                    </div>

                    {/* Moderation Action Buttons */}
                    <div className="flex flex-col gap-2 shrink-0 sm:min-w-[160px]">
                      {item.status === 'pending' && (
                        <>
                          <button
                            onClick={() => onApproveReview(item.id)}
                            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                            <span>Duyệt công khai</span>
                          </button>
                          <button
                            onClick={() => onRejectReview(item.id)}
                            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-semibold border border-rose-200 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                            <span>Từ chối</span>
                          </button>
                        </>
                      )}

                      {item.status === 'approved' && (
                        <div className="flex items-center justify-center gap-1 text-emerald-700 font-bold text-xs bg-emerald-100/70 py-1.5 px-3 rounded-xl">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Đang hiển thị web</span>
                        </div>
                      )}

                      {item.status === 'rejected' && (
                        <div className="flex items-center justify-center gap-1 text-rose-700 font-bold text-xs bg-rose-100/70 py-1.5 px-3 rounded-xl">
                          <X className="w-4 h-4" />
                          <span>Đã từ chối</span>
                        </div>
                      )}

                      {/* Reply button */}
                      <button
                        onClick={() => {
                          setReplyingReviewId(replyingReviewId === item.id ? null : item.id);
                        }}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        <CornerDownRight className="w-3.5 h-3.5" />
                        <span>{item.clinicResponse ? 'Sửa phản hồi' : 'Viết phản hồi'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Inline Reply Form */}
                  {replyingReviewId === item.id && (
                    <div className="mt-4 pt-3 border-t border-slate-200 space-y-2 animate-in fade-in duration-100">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <select
                          value={replyAuthor}
                          onChange={(e) => setReplyAuthor(e.target.value)}
                          className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-800"
                        >
                          <option value="BS. CKI. Nguyễn Văn Hùng">BS. CKI. Nguyễn Văn Hùng (Trưởng phòng khám)</option>
                          <option value="BS. ThS. Trần Thu Hà">BS. ThS. Trần Thu Hà (Phó Trưởng phòng khám)</option>
                          <option value="BS. Lê Minh Trí">BS. Lê Minh Trí (Bác sĩ điều trị)</option>
                          <option value="Ban Quản Trị Phòng Khám Hòa Vang">Ban Quản Trị Phòng Khám</option>
                        </select>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Nhập nội dung phản hồi từ phía phòng khám..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500"
                        />
                        <button
                          onClick={() => handleSendReply(item.id)}
                          className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Gửi
                        </button>
                        <button
                          onClick={() => setReplyingReviewId(null)}
                          className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs cursor-pointer"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {filteredAdminReviews.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">
                  Không có đánh giá nào trong danh mục này.
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
