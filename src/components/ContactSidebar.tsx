import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Share2, 
  ExternalLink, 
  Heart,
  Navigation,
  MessageCircle,
  Users
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface ContactSidebarProps {
  onOpenBooking: () => void;
  onOpenMap: () => void;
}

export const ContactSidebar: React.FC<ContactSidebarProps> = ({
  onOpenBooking,
  onOpenMap
}) => {
  return (
    <aside className="space-y-5">
      
      {/* 1. Contact Info Card matching Mockup */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        {/* Header with paw badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2a3 3 0 0 0-3 3c0 .87.38 1.66.97 2.21C9.39 7.6 9 8.25 9 9c0 1.66 1.34 3 3 3s3-1.34 3-3c0-.75-.39-1.4-.97-1.79.59-.55.97-1.34.97-2.21a3 3 0 0 0-3-3z"/>
              <circle cx="5.5" cy="10.5" r="2.5"/>
              <circle cx="18.5" cy="10.5" r="2.5"/>
              <circle cx="8" cy="17" r="2.5"/>
              <circle cx="16" cy="17" r="2.5"/>
            </svg>
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              Thông tin liên hệ
            </h3>
            <span className="text-[11px] text-sky-600 font-medium">
              Phòng khám thú y Hòa Vang
            </span>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-3 text-xs text-slate-600 pt-1 border-t border-slate-100">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 block">Địa chỉ</span>
              <span className="leading-relaxed">{CLINIC_INFO.address}</span>
            </div>
          </div>

          {/* Hotline / Zalo */}
          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 block">Hotline / Zalo</span>
              <a 
                href={`tel:${CLINIC_INFO.hotline.replace(/\s+/g, '')}`}
                className="text-sky-700 hover:text-sky-800 font-extrabold text-sm"
              >
                {CLINIC_INFO.hotline}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 block">Email</span>
              <a 
                href={`mailto:${CLINIC_INFO.email}`}
                className="text-slate-600 hover:text-sky-700 break-all"
              >
                {CLINIC_INFO.email}
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 block">Giờ làm việc</span>
              <span className="text-slate-700 font-semibold">{CLINIC_INFO.workingHours}</span>
            </div>
          </div>
        </div>

        {/* Action: Map button */}
        <button
          onClick={onOpenMap}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-98 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
        >
          <Navigation className="w-4 h-4" />
          <span>Bản đồ đường đi</span>
        </button>
      </div>

      {/* 2. Direct Booking Promotion Card matching Mockup */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/70 p-4 shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-2 z-10">
            <div className="font-serif italic text-sm font-bold text-amber-900 leading-snug">
              Đặt lịch khám cho thú cưng ngay! ❤️
            </div>
            <p className="text-[11px] text-amber-800/80">
              Nhận ưu đãi giảm 10% khi đặt lịch trước trên website
            </p>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Đặt lịch hẹn</span>
            </button>
          </div>

          {/* Mini pet visual */}
          <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 border-white shadow-xs">
            <img
              src={CLINIC_INFO.images.hero}
              alt="Đặt lịch hẹn thú cưng"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* 3. Social Media Box matching Mockup */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
          Theo dõi chúng tôi
        </h4>
        <div className="flex items-center gap-2.5">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all shadow-xs"
            title="Facebook"
          >
            <span className="font-bold text-sm">f</span>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-xs"
            title="YouTube"
          >
            <span className="font-bold text-xs">▶</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-black text-white flex items-center justify-center transition-all shadow-xs"
            title="TikTok"
          >
            <span className="font-bold text-xs">♫</span>
          </a>

          {/* Zalo */}
          <a
            href={`https://zalo.me/${CLINIC_INFO.zalo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-10 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 flex items-center justify-center gap-1.5 transition-all text-xs font-bold"
            title="Chat Zalo"
          >
            <MessageCircle className="w-4 h-4 text-sky-600" />
            <span>Zalo: {CLINIC_INFO.hotline}</span>
          </a>
        </div>
      </div>

      {/* 4. Community Box matching Mockup */}
      <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-sky-800 text-white p-4 shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-sky-100" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-100">
              Kết nối cộng đồng
            </h4>
            <p className="text-xs text-sky-50 leading-snug">
              Nhóm những người yêu thú cưng Hòa Vang - Chia sẻ kinh nghiệm nuôi dưỡng
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            window.open('https://facebook.com', '_blank');
          }}
          className="w-full py-2 bg-white text-sky-800 hover:bg-sky-50 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          Tham gia ngay →
        </button>
      </div>

    </aside>
  );
};
