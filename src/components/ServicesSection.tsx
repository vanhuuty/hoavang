import React from 'react';
import { PawPrint, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/clinicData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onBookService: (service: ServiceItem) => void;
  showAll?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onBookService,
  showAll = false
}) => {
  const displayServices = showAll ? SERVICES_DATA : SERVICES_DATA.slice(0, 5);

  return (
    <section id="services" className="py-8 bg-white border-b border-slate-200/80">
      <div className="space-y-6">
        
        {/* Section title matching mockup */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-800">
            <PawPrint className="w-5 h-5 text-sky-600 fill-sky-600" />
            <h2 className="text-xl sm:text-2xl font-black text-sky-950 tracking-tight">
              Dịch vụ nổi bật
            </h2>
          </div>

          <button
            onClick={() => onSelectService(SERVICES_DATA[0])}
            className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Xem tất cả dịch vụ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5-column service cards matching mockup thumbnail row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {displayServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="group bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-sky-300 overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Service thumbnail */}
              <div className="relative h-28 overflow-hidden bg-slate-200">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-2 right-2 text-[10px] font-bold text-white bg-sky-900/80 backdrop-blur-xs px-2 py-0.5 rounded-md">
                  {service.priceRange.split('-')[0]}
                </span>
              </div>

              {/* Service info */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-sky-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Chi tiết <ArrowRight className="w-3 h-3" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookService(service);
                    }}
                    className="p-1 hover:bg-sky-100 text-sky-700 rounded-md transition-colors"
                    title="Đặt lịch khám"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
