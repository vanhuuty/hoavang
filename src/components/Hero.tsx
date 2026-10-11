import React from 'react';
import { ArrowRight, Calendar, Heart, ShieldCheck, Clock, Award, Mail } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreMore: () => void;
  onOpenConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreMore, onOpenConsultation }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-sky-50/30 to-white py-8 lg:py-14 border-b border-sky-100/60">
      
      {/* Subtle decorative paw prints background */}
      <div className="absolute top-6 left-10 text-sky-200/50 pointer-events-none hidden md:block">
        <svg className="w-12 h-12 fill-current opacity-60" viewBox="0 0 24 24">
          <circle cx="5" cy="8" r="2" />
          <circle cx="10" cy="5" r="2" />
          <circle cx="15" cy="5" r="2" />
          <circle cx="20" cy="8" r="2" />
          <path d="M12 10c-3.5 0-6 2.5-6 5.5 0 2 1.5 3.5 3.5 3.5 1 0 1.8-.4 2.5-1 .7.6 1.5 1 2.5 1 2 0 3.5-1.5 3.5-3.5 0-3-2.5-5.5-6-5.5z" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-12 text-sky-200/40 pointer-events-none hidden md:block">
        <svg className="w-16 h-16 fill-current opacity-40" viewBox="0 0 24 24">
          <circle cx="5" cy="8" r="2" />
          <circle cx="10" cy="5" r="2" />
          <circle cx="15" cy="5" r="2" />
          <circle cx="20" cy="8" r="2" />
          <path d="M12 10c-3.5 0-6 2.5-6 5.5 0 2 1.5 3.5 3.5 3.5 1 0 1.8-.4 2.5-1 .7.6 1.5 1 2.5 1 2 0 3.5-1.5 3.5-3.5 0-3-2.5-5.5-6-5.5z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Statement & Information */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header intro with paw icon */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sky-700">
                <span className="font-serif italic text-2xl sm:text-3xl font-bold tracking-wide">
                  Phòng khám thú y
                </span>
                <span className="inline-block text-sky-400">🐾</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-sky-900 tracking-tight uppercase leading-[1.08]">
                HÒA VANG
              </h1>
            </div>

            {/* Slogan */}
            <div className="inline-block">
              <p className="text-base sm:text-lg font-bold text-sky-800 tracking-wide border-b-2 border-sky-400/80 pb-1">
                {CLINIC_INFO.subSlogan}
              </p>
            </div>

            {/* Description matching mockup */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl text-balance">
              Chúng tôi mang đến dịch vụ chăm sóc sức khỏe toàn diện cho chó, mèo và các thú cưng, với đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại cùng không gian sạch sẽ, thoáng mát và tình yêu thương dành cho mọi loài vật.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-sky-700 hover:bg-sky-800 active:scale-95 text-white font-bold text-sm sm:text-base rounded-full shadow-lg shadow-sky-700/25 transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-amber-300" />
                <span>Đặt lịch khám online</span>
              </button>

              {onOpenConsultation && (
                <button
                  onClick={onOpenConsultation}
                  className="flex items-center gap-2 px-5 py-3.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-sm sm:text-base rounded-full shadow-md shadow-amber-500/25 transition-all cursor-pointer"
                  title="Gửi câu hỏi tư vấn đến email vanhuutyk42@gmail.com"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span>Tư vấn qua email</span>
                </button>
              )}

              <button
                onClick={onExploreMore}
                className="flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-sky-50 text-sky-800 font-semibold text-sm sm:text-base rounded-full border border-sky-200 shadow-xs hover:border-sky-300 transition-all cursor-pointer"
              >
                <span>Tìm hiểu thêm</span>
                <ArrowRight className="w-4 h-4 text-sky-600" />
              </button>
            </div>

            {/* Quick Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-sky-100 max-w-lg">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs text-slate-600 font-medium">100% Chuẩn y khoa</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-600 shrink-0" />
                <span className="text-xs text-slate-600 font-medium">Cấp cứu 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs text-slate-600 font-medium">Bác sĩ giàu kinh nghiệm</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Canvas matching Mockup */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-sky-900/10 border-4 border-white bg-slate-100 group">
              
              {/* Generated Realistic Animal Photography */}
              <img
                src={CLINIC_INFO.images.hero}
                alt="Chó Golden Retriever và Mèo tại Phòng khám Thú Y Hòa Vang"
                className="w-full h-[320px] sm:h-[400px] lg:h-[440px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Floating speech bubble matching mockup top-right badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-xs py-2.5 px-4 rounded-2xl shadow-lg border border-sky-100 max-w-[210px] text-right transform hover:-translate-y-0.5 transition-transform">
                <div className="flex items-center justify-end gap-1.5 text-sky-700">
                  <span className="text-xs sm:text-sm font-bold font-serif italic">
                    Khỏe mạnh là hạnh phúc của chúng tôi!
                  </span>
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                </div>
                <div className="text-[10px] text-sky-500 font-medium mt-0.5">
                  Phòng khám Thú Y Hòa Vang 🐾
                </div>
              </div>

              {/* Bottom Quick Pill with Hotline */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-sky-900/90 backdrop-blur-md text-white py-2 px-3.5 rounded-xl text-xs flex items-center gap-2.5 shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <span className="font-semibold">Mở cửa hôm nay:</span> 7:00 - 19:00
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
