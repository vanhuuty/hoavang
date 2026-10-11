import React, { useState } from 'react';
import { 
  UserCheck, 
  Star, 
  Calendar, 
  ArrowRight, 
  Award, 
  Clock, 
  Sparkles,
  Heart
} from 'lucide-react';
import { DOCTORS_DATA } from '../data/clinicData';
import { Doctor } from '../types';

interface DoctorsSectionProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDoctor: (doctor: Doctor) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onSelectDoctor,
  onBookDoctor
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const specialties = [
    { id: 'all', label: 'Cả 2 Bác sĩ' },
    { id: 'ngoai', label: 'BS. Hữu Tỵ (Ngoại khoa & Cấp cứu)' },
    { id: 'noi', label: 'BS. Sương Mai (Nội khoa & Mèo)' },
  ];

  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    if (selectedSpecialty === 'all') return true;
    if (selectedSpecialty === 'ngoai') return doc.id === 'dr-huu-ty';
    if (selectedSpecialty === 'noi') return doc.id === 'dr-suong-mai';
    return true;
  });

  return (
    <section id="doctors" className="py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sky-700">
              <UserCheck className="w-5 h-5" />
              <span className="text-xs uppercase font-extrabold tracking-wider">Đội ngũ chuyên gia phụ trách</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Bác sĩ Thú y Hòa Vang
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Đội ngũ gồm 2 bác sĩ chuyên môn tận tâm: <strong>BS. Hữu Tỵ</strong> (Trưởng phòng khám, Ngoại khoa & Phẫu thuật) và <strong>BS. Sương Mai</strong> (Phó Trưởng phòng khám, Nội khoa & Thú nhỏ). 100% tốt nghiệp chính quy, giàu kinh nghiệm và hết lòng vì sức khỏe thú cưng.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white rounded-xl border border-slate-200 self-start">
            {specialties.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedSpecialty === spec.id
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {spec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Grid - 2 Doctors layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition-all flex flex-col group"
            >
              {/* Doctor Avatar Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 text-[11px] font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{doctor.rating}</span>
                  <span className="text-slate-400 font-normal">({doctor.reviewCount} đánh giá)</span>
                </div>

                {/* Experience badge */}
                <div className="absolute bottom-3 left-3 bg-sky-900/90 backdrop-blur-xs text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-xs">
                  {doctor.experienceYears}+ năm kinh nghiệm
                </div>
              </div>

              {/* Doctor Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="text-[11px] text-sky-700 font-bold uppercase tracking-wider line-clamp-1">
                    {doctor.title}
                  </div>
                  <h3 
                    onClick={() => onSelectDoctor(doctor)}
                    className="text-xl font-black text-slate-900 group-hover:text-sky-700 transition-colors cursor-pointer"
                  >
                    {doctor.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {doctor.degree}
                  </p>

                  {/* Specialties tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {doctor.specialties.map((s, idx) => (
                      <span key={idx} className="text-[11px] text-sky-800 bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-lg font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onBookDoctor(doctor)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-sky-700 hover:bg-sky-800 active:scale-98 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    <span>Đặt lịch khám với BS</span>
                  </button>

                  <button
                    onClick={() => onSelectDoctor(doctor)}
                    className="w-full py-1.5 text-slate-600 hover:text-sky-700 text-xs font-semibold text-center cursor-pointer transition-colors"
                  >
                    Xem chi tiết hồ sơ & lịch trực →
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
