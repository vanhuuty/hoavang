import React, { useState } from 'react';
import { 
  X, 
  Star, 
  PawPrint, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  AlertCircle,
  Camera
} from 'lucide-react';
import { DOCTORS_DATA, SERVICES_DATA } from '../data/clinicData';
import { Review } from '../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingCode, setBookingCode] = useState('');
  const [location, setLocation] = useState('Hòa Phú, Hòa Vang');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<'Chó' | 'Mèo' | 'Khác'>('Chó');
  const [serviceUsed, setServiceUsed] = useState(SERVICES_DATA[0].title);
  const [doctorName, setDoctorName] = useState(DOCTORS_DATA[0].name);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [petPhotoUrl, setPetPhotoUrl] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const ratingDescriptions: Record<number, string> = {
    5: 'Tuyệt vời - Rất hài lòng với dịch vụ và bác sĩ',
    4: 'Hài lòng - Dịch vụ tốt, chăm sóc chu đáo',
    3: 'Bình thường - Đạt yêu cầu cơ bản',
    2: 'Cần cải thiện - Chưa thực sự như kỳ vọng',
    1: 'Chưa hài lòng - Cần khắc phục dịch vụ'
  };

  const samplePetPhotos = [
    { label: 'Cún cưng', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80' },
    { label: 'Mèo cưng', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80' },
    { label: 'Poodle', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    if (!customerName.trim()) errors.customerName = 'Vui lòng nhập họ tên của bạn';
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Vui lòng nhập số điện thoại để xác thực dịch vụ';
    } else if (!/^[0-9+ ]{9,12}$/.test(phoneNumber.replace(/\s+/g, ''))) {
      errors.phoneNumber = 'Số điện thoại không hợp lệ (9 - 11 chữ số)';
    }
    if (!petName.trim()) errors.petName = 'Vui lòng nhập tên bé cưng';
    if (!content.trim() || content.trim().length < 15) {
      errors.content = 'Vui lòng chia sẻ nhận xét chi tiết hơn (tối thiểu 15 ký tự)';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      bookingCode: bookingCode.trim() || undefined,
      location: location.trim(),
      petName: petName.trim(),
      petType,
      serviceUsed,
      doctorName,
      rating,
      title: title.trim() || `Đánh giá dịch vụ ${serviceUsed}`,
      content: content.trim(),
      petPhotoUrl: petPhotoUrl.trim() || undefined,
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'pending', // Pending approval by clinic admin
      helpfulCount: 0,
      verified: Boolean(bookingCode.trim())
    };

    onSubmitReview(newReview);
    setSubmittedSuccess(true);
  };

  const handleResetAndClose = () => {
    setSubmittedSuccess(false);
    setCustomerName('');
    setPhoneNumber('');
    setBookingCode('');
    setPetName('');
    setTitle('');
    setContent('');
    setPetPhotoUrl('');
    setFormErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-sky-900 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sky-200 text-xs font-semibold uppercase tracking-wider">
            <PawPrint className="w-4 h-4 fill-sky-200" />
            <span>Phòng Khám Thú Y Hòa Vang</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Gửi Đánh Giá & Nhận Xét Dịch Vụ
          </h3>

          <p className="text-xs text-sky-200/90 mt-1">
            Chia sẻ trải nghiệm khám chữa bệnh, spa hoặc tiêm phòng để giúp phòng khám nâng cao chất lượng phục vụ
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {submittedSuccess ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="text-xl font-black text-slate-900">
                  Gửi Đánh Giá Thành Công!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Cảm ơn bạn đã dành thời gian đóng góp ý kiến quý báu cho <strong>Phòng khám thú y Hòa Vang</strong>.
                </p>
                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 text-left space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-800">
                    <ShieldCheck className="w-4 h-4" />
                    Quy trình kiểm duyệt công khai:
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Đánh giá của bạn hiện đang ở trạng thái <strong>Chờ kiểm duyệt</strong> và sẽ được ban quản trị phòng khám xem xét, phê duyệt công khai trên website trong thời gian sớm nhất.
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Hoàn tất & Đóng
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Star Rating Selector */}
              <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100 space-y-2 text-center sm:text-left">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  1. Mức độ hài lòng của bạn <span className="text-rose-500">*</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 hover:scale-115 transition-transform cursor-pointer focus:outline-hidden"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= (hoverRating || rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <span className="text-xs font-bold text-sky-900">
                    {ratingDescriptions[hoverRating || rating]}
                  </span>
                </div>
              </div>

              {/* Customer & Pet Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Họ và tên của bạn <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Nguyễn Thị Lan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                  />
                  {formErrors.customerName && (
                    <p className="text-[11px] text-rose-500">{formErrors.customerName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Số điện thoại xác thực <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="VD: 0935 778 727"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                  />
                  {formErrors.phoneNumber && (
                    <p className="text-[11px] text-rose-500">{formErrors.phoneNumber}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Mã lịch hẹn đã khám (nếu có)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: HV-2026-9812"
                    value={bookingCode}
                    onChange={(e) => setBookingCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                  />
                  <span className="text-[10px] text-slate-400">Giúp nhận huy hiệu &ldquo;Đã xác thực lịch khám&rdquo;</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Khu vực sinh sống
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Xã Hòa Phú, Hòa Vang"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Pet & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Tên bé cưng <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Milo, Lu, Miu"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500"
                  />
                  {formErrors.petName && (
                    <p className="text-[11px] text-rose-500">{formErrors.petName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Loài thú cưng
                  </label>
                  <select
                    value={petType}
                    onChange={(e) => setPetType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500"
                  >
                    <option value="Chó">Chó 🐕</option>
                    <option value="Mèo">Mèo 🐈</option>
                    <option value="Khác">Khác 🐾</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Dịch vụ đã sử dụng
                  </label>
                  <select
                    value={serviceUsed}
                    onChange={(e) => setServiceUsed(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3 space-y-1 pt-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Bác sĩ phụ trách khám chữa cho bé (tùy chọn)
                  </label>
                  <select
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500"
                  >
                    {DOCTORS_DATA.map((d) => (
                      <option key={d.id} value={d.name}>{d.name} ({d.title})</option>
                    ))}
                    <option value="Ban Quản Trị / Bác Sĩ Trực">Bác sĩ phiên trực chung</option>
                  </select>
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Tiêu đề nhận xét ngắn gọn
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Bác sĩ rất tận tình, bé cưng hồi phục nhanh chóng!"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Nội dung nhận xét chi tiết <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Hãy chia sẻ trải nghiệm về thái độ bác sĩ, hiệu quả điều trị, sự sạch sẽ của phòng khám hoặc tình trạng của bé sau khi khám..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                  />
                  {formErrors.content && (
                    <p className="text-[11px] text-rose-500">{formErrors.content}</p>
                  )}
                </div>

                {/* Optional Photo Attachment */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-sky-600" />
                    <span>Hình ảnh bé cưng sau khi điều trị / làm đẹp (tùy chọn)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      placeholder="Dán liên kết ảnh hoặc chọn ảnh mẫu bên dưới..."
                      value={petPhotoUrl}
                      onChange={(e) => setPetPhotoUrl(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1 text-[11px]">
                    <span className="text-slate-400">Chọn ảnh mẫu nhanh:</span>
                    {samplePetPhotos.map((p, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setPetPhotoUrl(p.url)}
                        className="text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-2 py-0.5 rounded-md border border-sky-200 transition-colors cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                    {petPhotoUrl && (
                      <button
                        type="button"
                        onClick={() => setPetPhotoUrl('')}
                        className="text-rose-600 hover:text-rose-800 ml-1 cursor-pointer"
                      >
                        Xóa ảnh [✕]
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Moderation policy note */}
              <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-500 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Chính sách kiểm duyệt:</strong> Mọi đánh giá sẽ được đội ngũ phòng khám kiểm duyệt để đảm bảo ngôn từ lịch sự, không chứa thông tin quảng cáo rác trước khi đăng tải công khai trên website.
                </span>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-700/20 cursor-pointer transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi đánh giá để duyệt</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
