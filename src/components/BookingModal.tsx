import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  PawPrint, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Check,
  Stethoscope,
  Share2,
  Download
} from 'lucide-react';
import { SERVICES_DATA, DOCTORS_DATA, CLINIC_INFO } from '../data/clinicData';
import { Appointment, Doctor, ServiceItem } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialDoctorId?: string;
  onBookingSuccess?: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialDoctorId,
  onBookingSuccess
}) => {
  if (!isOpen) return null;

  // Form states
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || SERVICES_DATA[0].id);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(initialDoctorId || 'any');

  const [ownerName, setOwnerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<'Chó' | 'Mèo' | 'Khác'>('Chó');
  const [petWeight, setPetWeight] = useState('');
  const [notes, setNotes] = useState('');

  // Date and slot selection
  const today = new Date();
  const defaultDateStr = today.toISOString().split('T')[0];
  const [appointmentDate, setAppointmentDate] = useState<string>(defaultDateStr);
  const [timeSlot, setTimeSlot] = useState<string>('08:30 - 09:00');

  // Completed booking ticket
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialServiceId) setSelectedServiceId(initialServiceId);
    if (initialDoctorId) setSelectedDoctorId(initialDoctorId);
  }, [initialServiceId, initialDoctorId]);

  const availableTimeSlots = [
    '07:30 - 08:00',
    '08:00 - 08:30',
    '08:30 - 09:00',
    '09:00 - 09:30',
    '09:30 - 10:00',
    '10:30 - 11:00',
    '11:00 - 11:30',
    '13:30 - 14:00',
    '14:00 - 14:30',
    '14:30 - 15:00',
    '15:30 - 16:00',
    '16:30 - 17:00',
    '17:30 - 18:00',
    '18:00 - 18:30',
  ];

  const handleNextStep1 = () => {
    setStep(2);
  };

  const handleNextStep2 = () => {
    const errors: Record<string, string> = {};
    if (!ownerName.trim()) errors.ownerName = 'Vui lòng nhập họ và tên chủ nuôi';
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Vui lòng nhập số điện thoại để phòng khám liên hệ';
    } else if (!/^[0-9+ ]{9,12}$/.test(phoneNumber.replace(/\s+/g, ''))) {
      errors.phoneNumber = 'Số điện thoại không hợp lệ (9 - 11 chữ số)';
    }
    if (!petName.trim()) errors.petName = 'Vui lòng nhập tên bé thú cưng';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setStep(3);
  };

  const handleConfirmBooking = () => {
    const serviceObj = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];
    const doctorObj = DOCTORS_DATA.find(d => d.id === selectedDoctorId);
    const doctorName = doctorObj ? doctorObj.name : 'Bác sĩ phiên trực gần nhất';

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `HV-${new Date().getFullYear()}-${randomSuffix}`;

    const newAppt: Appointment = {
      id: `appt-${Date.now()}`,
      code,
      ownerName: ownerName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      petName: petName.trim(),
      petType,
      petWeight: petWeight.trim(),
      serviceId: serviceObj.id,
      serviceName: serviceObj.title,
      doctorId: selectedDoctorId,
      doctorName,
      date: appointmentDate,
      timeSlot,
      notes: notes.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save into localStorage
    try {
      const stored = localStorage.getItem('hoavang_vet_appointments');
      const list: Appointment[] = stored ? JSON.parse(stored) : [];
      list.unshift(newAppt);
      localStorage.setItem('hoavang_vet_appointments', JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }

    // Gửi thông báo đặt lịch đến email phòng khám vanhuutyk42@gmail.com
    try {
      fetch('https://formsubmit.co/ajax/vanhuutyk42@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[ĐẶT LỊCH MỚI] Mã ${code} - ${ownerName} (${phoneNumber})`,
          _template: 'table',
          _captcha: 'false',
          'Mã lịch hẹn': code,
          'Khách hàng': ownerName,
          'Số điện thoại': phoneNumber,
          'Email': email.trim() || 'Chưa cung cấp',
          'Thú cưng': `${petName} (${petType}${petWeight ? ` - ${petWeight}kg` : ''})`,
          'Dịch vụ đăng ký': serviceObj.title,
          'Bác sĩ phụ trách': doctorName,
          'Ngày & Giờ': `${appointmentDate} - ${timeSlot}`,
          'Ghi chú': notes.trim() || 'Không có',
          'Thời gian đặt': new Date().toLocaleString('vi-VN'),
        }),
      }).catch((err) => console.log('Booking email dispatch notice:', err));
    } catch (err) {
      console.log(err);
    }

    setCreatedAppointment(newAppt);
    setStep(4);
    if (onBookingSuccess) onBookingSuccess(newAppt);
  };

  const resetForm = () => {
    setStep(1);
    setOwnerName('');
    setPhoneNumber('');
    setPetName('');
    setNotes('');
    setCreatedAppointment(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-sky-800 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            onClick={onClose}
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
            Đặt Lịch Khám Trực Tuyến
          </h3>

          <p className="text-xs text-sky-100/90 mt-1">
            Tiết kiệm thời gian chờ đợi · Được ưu tiên vào phòng khám đúng giờ hẹn
          </p>

          {/* Step Progress indicators */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-sky-700/60 text-center text-[11px] font-semibold">
            <div className={`py-1 rounded-md transition-colors ${step >= 1 ? 'bg-sky-700 text-amber-300' : 'text-sky-300/60'}`}>
              1. Dịch vụ & BS
            </div>
            <div className={`py-1 rounded-md transition-colors ${step >= 2 ? 'bg-sky-700 text-amber-300' : 'text-sky-300/60'}`}>
              2. Thú cưng
            </div>
            <div className={`py-1 rounded-md transition-colors ${step >= 3 ? 'bg-sky-700 text-amber-300' : 'text-sky-300/60'}`}>
              3. Giờ hẹn
            </div>
            <div className={`py-1 rounded-md transition-colors ${step === 4 ? 'bg-emerald-600 text-white' : 'text-sky-300/60'}`}>
              4. Xác nhận
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: CHỌN DỊCH VỤ & BÁC SĨ */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Select Service */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  1. Chọn dịch vụ cần khám cho thú cưng
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICES_DATA.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        selectedServiceId === srv.id
                          ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-200'
                          : 'border-slate-200 hover:border-sky-300 bg-slate-50/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs ${
                        selectedServiceId === srv.id ? 'bg-sky-600' : 'bg-slate-400'
                      }`}>
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 leading-tight">
                          {srv.title}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {srv.shortDesc}
                        </div>
                        <div className="text-[11px] font-semibold text-sky-700 mt-1">
                          {srv.priceRange}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Select Doctor */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  2. Chọn Bác sĩ phụ trách thăm khám
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Any doctor option */}
                  <div
                    onClick={() => setSelectedDoctorId('any')}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      selectedDoctorId === 'any'
                        ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-200'
                        : 'border-slate-200 hover:border-sky-300 bg-slate-50/50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                      ★
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Bác sĩ trực bất kỳ (Khuyến nghị)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Sắp xếp bác sĩ chuyên khoa phù hợp nhất
                      </div>
                    </div>
                  </div>

                  {/* Specific doctors */}
                  {DOCTORS_DATA.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                        selectedDoctorId === doc.id
                          ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-200'
                          : 'border-slate-200 hover:border-sky-300 bg-slate-50/50'
                      }`}
                    >
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {doc.name}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {doc.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: THÔNG TIN THÚ CƯNG & CHỦ NUÔI */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Chủ nuôi */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Họ và tên chủ nuôi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Nguyễn Văn An"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                  />
                  {formErrors.ownerName && (
                    <p className="text-[11px] text-rose-500">{formErrors.ownerName}</p>
                  )}
                </div>

                {/* SĐT */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Số điện thoại nhận tin nhắn <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="VD: 0935 123 456"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                  />
                  {formErrors.phoneNumber && (
                    <p className="text-[11px] text-rose-500">{formErrors.phoneNumber}</p>
                  )}
                </div>
              </div>

              {/* Email optional */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Email (nhận xác nhận qua thư, nếu có)
                </label>
                <input
                  type="email"
                  placeholder="VD: example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              {/* Thông tin thú cưng */}
              <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-3">
                <h4 className="text-xs font-extrabold text-sky-900 uppercase tracking-wider">
                  Thông tin bé cưng
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Tên của bé <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Lu, Miu, Kiki"
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
                      <option value="Khác">Khác (Thỏ, Hamster...) 🐾</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Cân nặng (kg) / Tuổi
                    </label>
                    <input
                      type="text"
                      placeholder="VD: 4.5kg / 8 tháng"
                      value={petWeight}
                      onChange={(e) => setPetWeight(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Triệu chứng hoặc ghi chú cho Bác sĩ (nếu có)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="VD: Bé bỏ ăn 1 ngày, nôn dịch vàng, hoặc đặt lịch tiêm phòng mũi 2..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CHỌN NGÀY & KHUNG GIỜ KHÁM */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  1. Chọn ngày đến khám
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={defaultDateStr}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500 font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  2. Chọn khung giờ khám thuận tiện
                </label>
                <p className="text-[11px] text-slate-500">
                  Mỗi khung giờ giới hạn 2-3 bé để bác sĩ khám kỹ lưỡng và không để bé phải chờ lâu.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        timeSlot === slot
                          ? 'bg-sky-700 text-white border-sky-700 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review summary box */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold">Tóm tắt thông tin hẹn:</div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-700">
                  <span>Chủ nuôi: <strong>{ownerName}</strong> ({phoneNumber})</span>
                  <span>Bé: <strong>{petName}</strong> ({petType})</span>
                  <span>Dịch vụ: <strong>{SERVICES_DATA.find(s => s.id === selectedServiceId)?.title}</strong></span>
                  <span>Ngày giờ: <strong>{appointmentDate} ({timeSlot})</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PHIẾU HẸN ĐIỆN TỬ & XÁC NHẬN */}
          {step === 4 && createdAppointment && (
            <div className="space-y-5 animate-in zoom-in-95 duration-200 text-center">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-9 h-9 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Đặt Lịch Khám Thành Công!
                </h3>
                <p className="text-xs text-slate-600">
                  Phòng khám thú y Hòa Vang đã ghi nhận lịch hẹn của bé <strong>{createdAppointment.petName}</strong>.
                </p>
              </div>

              {/* Ticket Card */}
              <div className="max-w-md mx-auto bg-slate-50 border-2 border-dashed border-sky-300 rounded-3xl p-5 text-left space-y-4 shadow-sm relative">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Mã số lịch hẹn</span>
                    <div className="text-lg font-black text-sky-800 tracking-wider">
                      {createdAppointment.code}
                    </div>
                  </div>

                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                    Đã xác nhận
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Chủ nuôi</span>
                    <span className="font-bold text-slate-800">{createdAppointment.ownerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Số điện thoại</span>
                    <span className="font-bold text-slate-800">{createdAppointment.phoneNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Bé cưng</span>
                    <span className="font-bold text-slate-800">{createdAppointment.petName} ({createdAppointment.petType})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Bác sĩ phụ trách</span>
                    <span className="font-bold text-slate-800">{createdAppointment.doctorName}</span>
                  </div>
                  <div className="col-span-2 bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Thời gian hẹn</span>
                    <span className="font-black text-sky-800 text-sm">
                      {createdAppointment.date} · {createdAppointment.timeSlot}
                    </span>
                  </div>
                </div>

                {/* QR code simulation */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-700">Địa chỉ khám:</div>
                    <div className="line-clamp-1">{CLINIC_INFO.address}</div>
                    <div className="text-sky-700 font-bold">Hotline: {CLINIC_INFO.hotline}</div>
                  </div>
                  {/* Simulated Clean QR Code SVG */}
                  <div className="w-14 h-14 bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h2v2h-2v-2zm-3 2h2v2h-2v-2zm4 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2-2h2v2h-2v-2zm4-4h2v2h-2v-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Advice & Email sent confirmation */}
              <div className="space-y-1.5 max-w-md mx-auto">
                <p className="text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 font-medium">
                  📧 Thông tin lịch hẹn đã được chuyển tới email bác sĩ phòng khám: <strong>vanhuutyk42@gmail.com</strong>
                </p>
                <p className="text-[11px] text-slate-500">
                  💡 Lưu ý: Vui lòng đưa bé đến trước giờ hẹn 5-10 phút. Nếu bé cần xét nghiệm máu hoặc siêu âm, nên cho bé nhịn ăn trước 4-6 tiếng.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          {step === 1 && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleNextStep1}
                className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Tiếp tục: Nhập thông tin thú cưng →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
              >
                ← Quay lại
              </button>
              <button
                onClick={handleNextStep2}
                className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Tiếp tục: Chọn ngày giờ →
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
              >
                ← Quay lại
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                Xác nhận đặt lịch ngay ✓
              </button>
            </>
          )}

          {step === 4 && (
            <>
              <button
                onClick={resetForm}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
              >
                Đặt thêm lịch khác
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Hoàn tất & Đóng
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
