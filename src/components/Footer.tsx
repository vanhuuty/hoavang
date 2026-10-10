import React from 'react';
import { ArrowUp, Phone, MapPin, Mail, Clock, Heart } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'about', label: 'Giới thiệu' },
    { id: 'services', label: 'Dịch vụ' },
    { id: 'doctors', label: 'Bác sĩ' },
    { id: 'news', label: 'Tin tức' },
    { id: 'pricing', label: 'Bảng giá' },
    { id: 'contact', label: 'Liên hệ' },
  ];

  return (
    <footer className="bg-sky-950 text-white border-t border-sky-900">
      {/* Top Footer with Clinic Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2a3 3 0 0 0-3 3c0 .87.38 1.66.97 2.21C9.39 7.6 9 8.25 9 9c0 1.66 1.34 3 3 3s3-1.34 3-3c0-.75-.39-1.4-.97-1.79.59-.55.97-1.34.97-2.21a3 3 0 0 0-3-3z"/>
                  <circle cx="5.5" cy="10.5" r="2.5"/>
                  <circle cx="18.5" cy="10.5" r="2.5"/>
                  <circle cx="8" cy="17" r="2.5"/>
                  <circle cx="16" cy="17" r="2.5"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-extrabold tracking-tight text-white uppercase">
                  {CLINIC_INFO.name}
                </h3>
                <p className="text-xs text-sky-300 italic">
                  {CLINIC_INFO.slogan}
                </p>
              </div>
            </div>

            <p className="text-xs text-sky-200/80 leading-relaxed max-w-sm">
              Cơ sở khám chữa bệnh thú y uy tín hàng đầu tại Hòa Vang, Đà Nẵng. Đội ngũ bác sĩ giàu kinh nghiệm, chẩn đoán chính xác, phục vụ tận tâm bằng tình yêu thương loài vật.
            </p>

            <div className="text-xs text-sky-300 space-y-1">
              <div>Số chứng chỉ hành nghề thú y: <strong>TY-43-0284/ĐN</strong></div>
              <div>Cấp phép hoạt động bởi Chi cục Chăn nuôi & Thú y TP. Đà Nẵng</div>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Dịch vụ chuyên khoa
            </h4>
            <ul className="space-y-1.5 text-xs text-sky-100/80">
              <li>• Khám & Siêu âm chẩn đoán bệnh lý</li>
              <li>• Tiêm phòng vaccine chó mèo chuẩn WSAVA</li>
              <li>• Phẫu thuật ngoại khoa & Triệt sản thẩm mỹ</li>
              <li>• Cấp cứu ngộ độc, khó đẻ, tai nạn 24/7</li>
              <li>• Spa tắm vệ sinh, cắt tỉa lông tạo kiểu</li>
              <li>• Khách sạn lưu trú thú cưng có điều hòa</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-3 text-xs text-sky-200/90">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Liên hệ phòng khám
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Hotline: <strong className="text-amber-300">{CLINIC_INFO.hotline}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{CLINIC_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Mở cửa: {CLINIC_INFO.workingHours}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar matching Mockup exactly */}
      <div className="border-t border-sky-900/80 bg-sky-950/90 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sky-300">
          
          {/* Left mini brand */}
          <div className="flex items-center gap-2 font-medium">
            <svg className="w-4 h-4 fill-sky-400 shrink-0" viewBox="0 0 24 24">
              <path d="M12 2a3 3 0 0 0-3 3c0 .87.38 1.66.97 2.21C9.39 7.6 9 8.25 9 9c0 1.66 1.34 3 3 3s3-1.34 3-3c0-.75-.39-1.4-.97-1.79.59-.55.97-1.34.97-2.21a3 3 0 0 0-3-3z"/>
              <circle cx="5.5" cy="10.5" r="2.5"/>
              <circle cx="18.5" cy="10.5" r="2.5"/>
              <circle cx="8" cy="17" r="2.5"/>
              <circle cx="16" cy="17" r="2.5"/>
            </svg>
            <span>Phòng khám thú y HÒA VANG · Vì sức khỏe thú cưng của bạn</span>
          </div>

          {/* Navigation links matching mockup */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold">
            {navLinks.map((item, idx) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => onNavClick(item.id)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
                {idx < navLinks.length - 1 && <span className="text-sky-700">|</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Copyright & scroll-up button matching mockup */}
          <div className="flex items-center gap-3">
            <span>© 2026 Phòng khám thú y Hòa Vang. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              className="w-7 h-7 rounded-full bg-sky-800 hover:bg-sky-700 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Lên đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
