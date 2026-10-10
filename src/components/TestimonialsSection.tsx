import React, { useState } from 'react';
import { PawPrint, Star, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Review } from '../types';

interface TestimonialsSectionProps {
  approvedReviews?: Review[];
  onOpenWriteReview?: () => void;
  onViewAllReviews?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  approvedReviews = [],
  onOpenWriteReview,
  onViewAllReviews
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayList = approvedReviews;

  const prev = () => {
    if (displayList.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? displayList.length - 1 : prev - 1));
  };

  const next = () => {
    if (displayList.length === 0) return;
    setCurrentIndex((prev) => (prev === displayList.length - 1 ? 0 : prev + 1));
  };

  const current = displayList[currentIndex] || displayList[0];

  if (!current) return null;

  return (
    <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 space-y-4 shadow-2xs">
      {/* Header matching mockup */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
        <div className="flex items-center gap-2 text-sky-900">
          <PawPrint className="w-4 h-4 text-sky-600 fill-sky-600" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
            Khách hàng nói về chúng tôi
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {onViewAllReviews && (
            <button
              onClick={onViewAllReviews}
              className="text-xs font-bold text-sky-700 hover:text-sky-800 cursor-pointer hidden sm:inline"
            >
              Xem tất cả ({displayList.length}) →
            </button>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              className="p-1 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
              aria-label="Đánh giá trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-slate-400 font-mono">
              {currentIndex + 1}/{displayList.length}
            </span>
            <button
              onClick={next}
              className="p-1 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
              aria-label="Đánh giá tiếp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quote content matching mockup */}
      <div className="space-y-3">
        <div className="relative">
          <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed pl-6">
            <span className="text-sky-600 text-xl font-serif leading-none absolute left-0 top-0">&ldquo;</span>
            {current.content}
            <span className="text-sky-600 text-xl font-serif leading-none">&rdquo;</span>
          </p>
        </div>

        {/* Client profile matching mockup */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-sky-100 border border-slate-200 shrink-0 flex items-center justify-center font-bold text-sky-800 text-sm">
              {current.customerName.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {current.customerName}
              </div>
              <div className="text-[11px] text-slate-500">
                Bé {current.petName} ({current.petType}) · {current.location || current.serviceUsed}
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

        {/* Write review CTA bar */}
        {onOpenWriteReview && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Bạn đã từng sử dụng dịch vụ tại Hòa Vang?</span>
            <button
              onClick={onOpenWriteReview}
              className="text-sky-700 hover:text-sky-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Viết đánh giá</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
