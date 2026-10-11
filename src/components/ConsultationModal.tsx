import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  CheckCircle2, 
  User, 
  Phone, 
  Stethoscope, 
  MessageSquare, 
  AlertCircle,
  ExternalLink,
  Sparkles,
  PawPrint
} from 'lucide-react';
import { DOCTORS_DATA } from '../data/clinicData';
import { 
  sendConsultationRequest, 
  TARGET_CONSULTATION_EMAIL,
  SendConsultationResult 
} from '../services/consultationService';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoctorName?: string;
  initialServiceInterest?: string;
  onSuccess?: (msg: string) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialDoctorName,
  initialServiceInterest,
  onSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<'Chó' | 'Mèo' | 'Khác'>('Chó');
  const [doctorName, setDoctorName] = useState(
    initialDoctorName || 'BS. Hữu Tỵ (Ngoại khoa & Cấp cứu)'
  );
  const [serviceInterest, setServiceInterest] = useState(
    initialServiceInterest || 'Khám bệnh & Chẩn đoán'
  );
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [sendResult, setSendResult] = useState<SendConsultationResult | null>(null);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; message?: string }>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { fullName?: string; phone?: string; message?: string } = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên của bạn';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại để bác sĩ liên hệ';
    } else if (!/^[0-9+.\s()-]{8,15}$/.test(phone.trim())) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (!message.trim()) {
      newErrors.message = 'Vui lòng mô tả triệu chứng hoặc nội dung câu hỏi';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await sendConsultationRequest({
        fullName,
        phone,
        email: email.trim() || undefined,
        petName: petName.trim() || undefined,
        petType,
        doctorName,
        serviceInterest,
        message,
      });

      setSendResult(result);
      if (onSuccess) {
        onSuccess(`Đã gửi yêu cầu tư vấn đến hộp thư ${TARGET_CONSULTATION_EMAIL}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSendResult(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setPetName('');
    setMessage('');
    setErrors({});
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-800 to-sky-700 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sky-200 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-4 h-4 text-sky-300" />
            <span>Gửi Yêu Cầu Tư Vấn Qua Email</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Tư Vấn Trực Tuyến Cùng Bác Sĩ
          </h3>

          <p className="text-xs sm:text-sm text-sky-100 mt-1">
            Yêu cầu sẽ được chuyển trực tiếp đến hộp thư Bác sĩ:{' '}
            <strong className="underline decoration-amber-300 font-bold text-amber-300">
              {TARGET_CONSULTATION_EMAIL}
            </strong>
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {sendResult ? (
            /* SUCCESS VIEW */
            <div className="space-y-5 py-2 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-900">
                  Gửi Yêu Cầu Tư Vấn Thành Công!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Toàn bộ thông tin và câu hỏi của bạn đã được chuyển đến hòm thư:{' '}
                  <span className="font-bold text-sky-700">{TARGET_CONSULTATION_EMAIL}</span>
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Khách hàng:</span>
                  <span className="font-bold text-slate-800">{sendResult.record.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Số điện thoại:</span>
                  <span className="font-bold text-slate-800">{sendResult.record.phone}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Hòm thư nhận:</span>
                  <span className="font-bold text-sky-700">{TARGET_CONSULTATION_EMAIL}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Bác sĩ phụ trách:</span>
                  <span className="font-bold text-slate-800">
                    {sendResult.record.doctorName || 'Bác sĩ trực'}
                  </span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500 block mb-1">Nội dung câu hỏi:</span>
                  <p className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 italic">
                    &ldquo;{sendResult.record.message}&rdquo;
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 text-[11px] text-sky-900 leading-relaxed text-left max-w-md mx-auto flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Thời gian phản hồi:</p>
                  <p>
                    Bác sĩ Hữu Tỵ hoặc Bác sĩ Sương Mai sẽ kiểm tra email và gọi điện hoặc phản hồi lại cho bạn trong vòng 15 - 30 phút.
                  </p>
                </div>
              </div>

              {/* Secondary mail quick links */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
                <a
                  href={sendResult.mailtoUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Mở ứng dụng Mail của máy</span>
                </a>

                <a
                  href={sendResult.gmailWebUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mở bằng Gmail Web</span>
                </a>
              </div>
            </div>
          ) : (
            /* FORM VIEW */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Doctor target notice */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-sky-50/80 border border-sky-100 text-xs">
                <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-slate-700">
                  <p className="font-bold text-sky-900">Gửi trực tiếp đến hòm thư phòng khám:</p>
                  <p className="text-sky-700 font-extrabold">{TARGET_CONSULTATION_EMAIL}</p>
                </div>
              </div>

              {/* Row 1: Họ tên + SĐT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Họ và tên của bạn</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="VD: Nguyễn Văn An"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border focus:bg-white focus:outline-hidden transition-all ${
                      errors.fullName
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-slate-200 focus:border-sky-500'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Số điện thoại liên hệ</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="VD: 0935 77 87 27"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border focus:bg-white focus:outline-hidden transition-all ${
                      errors.phone
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-slate-200 focus:border-sky-500'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Email của bạn (để nhận phản hồi thư) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email của bạn (tùy chọn - nhận trả lời qua mail)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="VD: ban@gmail.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-hidden focus:border-sky-500 transition-all"
                />
              </div>

              {/* Row 3: Thú cưng + Loài */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <PawPrint className="w-3.5 h-3.5 text-slate-400" />
                    <span>Tên thú cưng (nếu có)</span>
                  </label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="VD: Bé Miu, Cún Lu"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-hidden focus:border-sky-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Loài thú cưng</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['Chó', 'Mèo', 'Khác'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPetType(type)}
                        className={`py-2 text-xs rounded-xl font-bold cursor-pointer transition-all ${
                          petType === type
                            ? 'bg-sky-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Bác sĩ mong muốn tư vấn & Vấn đề quan tâm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
                    <span>Bác sĩ chỉ định</span>
                  </label>
                  <select
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-hidden focus:border-sky-500 font-medium"
                  >
                    <option value="BS. Hữu Tỵ (Ngoại khoa & Cấp cứu)">
                      BS. Hữu Tỵ (Ngoại khoa & Cấp cứu)
                    </option>
                    <option value="BS. Sương Mai (Nội khoa & Da liễu)">
                      BS. Sương Mai (Nội khoa & Da liễu)
                    </option>
                    <option value="Cả 2 Bác sĩ / Phiên trực gần nhất">
                      Cả 2 Bác sĩ / Phiên trực gần nhất
                    </option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Chuyên mục cần tư vấn</label>
                  <select
                    value={serviceInterest}
                    onChange={(e) => setServiceInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-hidden focus:border-sky-500 font-medium"
                  >
                    <option value="Khám bệnh & Chẩn đoán triệu chứng">Khám bệnh & Triệu chứng bất thường</option>
                    <option value="Tiêm vaccine & Sổ giun">Tiêm vaccine & Sổ giun phòng bệnh</option>
                    <option value="Phẫu thuật ngoại khoa & Triệt sản">Phẫu thuật ngoại khoa & Triệt sản</option>
                    <option value="Điều trị da liễu & Nấm ngứa">Điều trị da liễu, nấm, ghẻ</option>
                    <option value="Cấp cứu khẩn cấp">Cấp cứu & Nguy kịch</option>
                    <option value="Tư vấn dinh dưỡng & Thuốc thú y">Tư vấn dinh dưỡng & Thuốc thú y</option>
                    <option value="Vấn đề khác">Khác</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Nội dung câu hỏi */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Nội dung câu hỏi / Tình trạng của bé</span>
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mô tả cụ thể biểu hiện của bé (bỏ ăn, nôn, sốt, rụng lông...) hoặc dịch vụ bạn muốn tìm hiểu kỹ..."
                  className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border focus:bg-white focus:outline-hidden transition-all ${
                    errors.message
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-200 focus:border-sky-500'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-sky-700 hover:bg-sky-800 active:scale-98 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-sky-700/25 transition-all cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Đang gửi đến {TARGET_CONSULTATION_EMAIL}...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Gửi yêu cầu tư vấn đến {TARGET_CONSULTATION_EMAIL}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0 text-xs">
          {sendResult ? (
            <>
              <button
                onClick={handleReset}
                className="px-4 py-2 font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
              >
                Gửi thêm yêu cầu khác
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl cursor-pointer"
              >
                Hoàn tất & Đóng
              </button>
            </>
          ) : (
            <>
              <span className="text-slate-500 text-[11px] hidden sm:inline">
                🔒 Cam kết bảo mật thông tin thú cưng & chủ nuôi
              </span>
              <button
                onClick={onClose}
                className="ml-auto px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
              >
                Hủy bỏ
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
