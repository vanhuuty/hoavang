import React from 'react';
import { 
  X, 
  Calendar, 
  Award, 
  GraduationCap, 
  Clock, 
  Star, 
  CheckCircle, 
  PhoneCall, 
  HeartHandshake,
  ShieldCheck
} from 'lucide-react';
import { Doctor } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookWithDoctor: (doctor: Doctor) => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  doctor,
  onClose,
  onBookWithDoctor
}) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-sky-800 to-sky-950 text-white p-6 pb-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white/20 shadow-md"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                Sẵn sàng khám
              </span>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="text-sky-300 text-xs font-semibold uppercase tracking-wider">
                {doctor.title}
              </div>
              <h3 className="text-2xl font-black text-white">
                {doctor.name}
              </h3>
              <p className="text-xs text-sky-100/90 max-w-md">
                {doctor.degree}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-xs">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <Star className="w-4 h-4 fill-amber-300" />
                  {doctor.rating} / 5.0 ({doctor.reviewCount} đánh giá)
                </span>
                <span className="text-white/60">·</span>
                <span className="text-sky-200 font-medium">
                  {doctor.experienceYears}+ năm kinh nghiệm
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Tiểu sử bác sĩ */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sky-600" />
              Giới thiệu & Triết lý y đức
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {doctor.bio}
            </p>
          </div>

          {/* Chuyên khoa sâu */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              Lĩnh vực chuyên môn sâu
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {doctor.specialties.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50/50 border border-sky-100/60 text-xs text-sky-900 font-medium">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lịch trực & Khám bệnh */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-600" />
              Lịch khám trong tuần
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {doctor.schedule.map((slot, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-semibold text-slate-800">{slot.split(':')[0]}</span>
                  <span className="text-slate-500">{slot.substring(slot.indexOf(':') + 1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Thành tựu / Cam kết */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-0.5">
              <p className="font-bold">Cam kết từ {doctor.name}:</p>
              <p className="text-amber-800/90">
                &ldquo;Luôn lắng nghe tình trạng bệnh của bé, giải thích phác đồ điều trị minh bạch và đồng hành cùng quý chủ nuôi đến khi bé hồi phục hoàn toàn.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Hotline đặt hẹn nhanh: <strong className="text-sky-700">{CLINIC_INFO.hotline}</strong>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
            >
              Đóng lại
            </button>
            <button
              onClick={() => {
                onClose();
                onBookWithDoctor(doctor);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-700/20 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Đặt lịch khám với Bác sĩ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
