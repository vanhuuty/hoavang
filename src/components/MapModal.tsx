import React from 'react';
import { X, MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
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
            <Navigation className="w-4 h-4" />
            <span>Chỉ Đường Đến Phòng Khám</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            {CLINIC_INFO.name}
          </h3>

          <p className="text-xs text-sky-100/90 mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-sky-300 shrink-0" />
            <span>{CLINIC_INFO.address}</span>
          </p>
        </div>

        {/* Map View & Directions */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Map Preview Container */}
          <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
            <iframe
              title="Bản đồ Phòng khám thú y Hòa Vang"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.4852906471847!2d108.08489957582539!3d15.987707441584988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421e42e1261d7b%3A0x6b4efd8c119c3b88!2zSMOyYSBQaMO6LCBIw7JhIFZhbmcsIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Guide directions */}
          <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-100 space-y-2 text-xs text-slate-700">
            <h4 className="font-bold text-sky-900 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-sky-600" />
              Hướng dẫn di chuyển thuận tiện:
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              <li>Từ trung tâm TP. Đà Nẵng: Đi theo tuyến Quốc lộ 14B về hướng Hòa Vang, rẽ vào đường liên xã Hòa Phú (Thôn Phú Sơn).</li>
              <li>Phòng khám nằm ngay mặt đường chính rộng rãi, có bãi đậu xe ô tô và xe máy rộng rãi, an toàn cho thú cưng.</li>
              <li>Nếu quý khách gặp khó khăn khi tìm đường, hãy gọi trực tiếp số <strong>{CLINIC_INFO.hotline}</strong> để nhân viên hướng dẫn chi tiết.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <a
            href={`tel:${CLINIC_INFO.hotline.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-800"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Gọi hỗ trợ: {CLINIC_INFO.hotline}</span>
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
            >
              Đóng
            </button>
            <a
              href="https://maps.google.com/?q=Hòa+Phú,+Hòa+Vang,+Đà+Nẵng"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Mở trên Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
