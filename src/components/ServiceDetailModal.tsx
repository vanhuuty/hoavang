import React from 'react';
import { X, Calendar, CheckCircle2, Clock, DollarSign, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
              Dịch vụ Thú Y Hòa Vang
            </span>
            <h3 className="text-2xl font-black text-white mt-0.5">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Quick info row */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-sky-50/70 border border-sky-100 rounded-2xl text-xs">
            <div className="flex items-center gap-2 text-sky-900">
              <DollarSign className="w-4 h-4 text-sky-600" />
              <div>
                <span className="text-slate-500 block text-[10px]">Chi phí tham khảo</span>
                <span className="font-bold">{service.priceRange}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sky-900">
              <Clock className="w-4 h-4 text-sky-600" />
              <div>
                <span className="text-slate-500 block text-[10px]">Thời gian thực hiện</span>
                <span className="font-bold">{service.duration}</span>
              </div>
            </div>
          </div>

          {/* Detailed description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Mô tả chi tiết dịch vụ
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Included Features */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Quy trình & Tiêu chuẩn cam kết
            </h4>
            <div className="space-y-2">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
          >
            Đóng
          </button>
          <button
            onClick={() => {
              onClose();
              onBookService(service);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-700/20 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>Đặt lịch cho dịch vụ này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
