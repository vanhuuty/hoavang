import React, { useState } from 'react';
import { PawPrint, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/clinicData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
        <div className="flex items-center gap-2 text-sky-900">
          <PawPrint className="w-4 h-4 text-sky-600 fill-sky-600" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
            Khách hàng nói về chúng tôi
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className="p-1 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
            aria-label="Đánh giá trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] text-slate-400 font-mono">
            {currentIndex + 1}/{TESTIMONIALS_DATA.length}
          </span>
          <button
            onClick={next}
            className="p-1 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
            aria-label="Đánh giá tiếp"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quote content matching mockup */}
      <div className="space-y-3">
        <div className="relative">
          <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed pl-6">
            <span className="text-sky-600 text-xl font-serif leading-none absolute left-0 top-0">&ldquo;</span>
            {current.comment}
            <span className="text-sky-600 text-xl font-serif leading-none">&rdquo;</span>
          </p>
        </div>

        {/* Client profile matching mockup */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-sky-100 border border-slate-200 shrink-0">
              <img
                src={current.avatar}
                alt={current.ownerName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {current.ownerName}
              </div>
              <div className="text-[11px] text-slate-500">
                {current.petInfo}
              </div>
            </div>
          </div>

          {/* Rating stars */}
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
