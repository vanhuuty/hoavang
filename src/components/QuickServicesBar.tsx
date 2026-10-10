import React from 'react';
import { 
  Stethoscope, 
  Syringe, 
  Pill, 
  Scissors, 
  Home, 
  ArrowRight 
} from 'lucide-react';
import { ServiceItem } from '../types';

interface QuickServicesBarProps {
  onSelectService: (serviceId: string) => void;
  onBookService: (serviceId: string) => void;
}

export const QuickServicesBar: React.FC<QuickServicesBarProps> = ({ 
  onSelectService,
  onBookService 
}) => {
  const quickItems = [
    {
      id: 'kham-dieu-tri',
      title: 'Khám & Điều trị',
      desc: 'Chẩn đoán chính xác - Điều trị hiệu quả',
      icon: Stethoscope,
      bgClass: 'bg-sky-600',
    },
    {
      id: 'tiem-phong',
      title: 'Tiêm phòng',
      desc: 'Phòng bệnh tốt nhất cho thú cưng',
      icon: Syringe,
      bgClass: 'bg-sky-600',
    },
    {
      id: 'nha-thuoc-thu-y',
      title: 'Nhà thuốc thú y',
      desc: 'Thuốc chính hãng - Đầy đủ chủng loại',
      icon: Pill,
      bgClass: 'bg-sky-600',
    },
    {
      id: 'spa-lam-dep',
      title: 'Spa & Làm đẹp',
      desc: 'Giữ thú cưng luôn sạch sẽ, khỏe mạnh',
      icon: Scissors,
      bgClass: 'bg-sky-600',
    },
    {
      id: 'luu-tru-noi-tru',
      title: 'Lưu trú',
      desc: 'Nội trú an toàn - Chăm sóc tận tâm',
      icon: Home,
      bgClass: 'bg-sky-600',
    },
  ];

  return (
    <section className="bg-white py-6 border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {quickItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectService(item.id)}
                className="group flex flex-col items-center sm:items-start text-center sm:text-left p-3.5 rounded-2xl hover:bg-sky-50/70 border border-transparent hover:border-sky-100 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 w-full">
                  {/* Round Icon Button matching mockup */}
                  <div className={`w-12 h-12 rounded-full ${item.bgClass} text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-600/20 group-hover:scale-105 group-hover:bg-sky-700 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Text labels */}
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-sky-700 transition-colors leading-tight truncate">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
