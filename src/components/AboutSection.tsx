import React from 'react';
import { PawPrint, UserCheck, Heart, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface AboutSectionProps {
  onLearnMore?: () => void;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore, onOpenBooking }) => {
  return (
    <section className="py-8 bg-white border-b border-slate-200/80">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Clinic storefront photo matching mockup */}
        <div className="md:col-span-5 relative group">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
            <img
              src={CLINIC_INFO.images.storefront}
              alt="Mặt tiền Phòng khám Thú Y Hòa Vang"
              className="w-full h-[280px] sm:h-[340px] object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Overlay badge on photo */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-bold text-slate-800">Cơ sở vật chất hiện đại</span>
            </div>
          </div>
        </div>

        {/* Right Column: About details matching mockup */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-sky-700">
            <PawPrint className="w-5 h-5 text-sky-600 fill-sky-600" />
            <span className="text-xs uppercase font-extrabold tracking-wider">Về chúng tôi</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-sky-950 tracking-tight">
            Phòng khám thú y Hòa Vang
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            Với phương châm <em>&ldquo;Vì sức khỏe thú cưng của bạn&rdquo;</em>, Phòng khám thú y Hòa Vang luôn nỗ lực mang đến dịch vụ chăm sóc thú y tốt nhất cho các bé chó, mèo và thú cưng. Chúng tôi sở hữu đội ngũ bác sĩ thú y giàu kinh nghiệm, trang thiết bị hiện đại cùng không gian sạch sẽ, thoáng mát, đảm bảo an toàn và hiệu quả trong việc chăm sóc sức khỏe cho thú cưng.
          </p>

          <div className="flex flex-wrap gap-2 text-xs text-slate-600 py-1">
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Phòng xét nghiệm & Siêu âm tự động
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Phòng phẫu thuật vô trùng tuyệt đối
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Khách sạn lưu trú sạch sẽ, khử tia UV
            </span>
          </div>

          {/* Action button */}
          <div className="pt-1">
            <button
              onClick={onLearnMore}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer"
            >
              <span>Xem thêm</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Three Key Metrics matching Mockup */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <PawPrint className="w-4 h-4 fill-sky-700" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-sky-900 leading-tight">10+</div>
                <div className="text-[11px] text-slate-500 font-medium">Năm kinh nghiệm</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-sky-900 leading-tight">2</div>
                <div className="text-[11px] text-slate-500 font-medium">Bác sĩ chuyên môn</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 fill-sky-700" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-sky-900 leading-tight">5.000+</div>
                <div className="text-[11px] text-slate-500 font-medium">Thú cưng đã điều trị</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
