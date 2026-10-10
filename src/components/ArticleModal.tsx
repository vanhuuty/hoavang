import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Share2, 
  Bookmark, 
  CheckCircle2, 
  Camera, 
  ZoomIn, 
  Image as ImageIcon 
} from 'lucide-react';
import { Article } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenBooking
}) => {
  const [zoomedImage, setZoomedImage] = useState<{ url: string; caption?: string } | null>(null);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Đã sao chép liên kết bài viết vào bộ nhớ tạm!');
    }
  };

  const inlineImages = article.inlineImages || [];

  // Group images by paragraph position (position 1: after paragraph 0, etc.)
  const imagesByPosition = inlineImages.reduce<Record<number, typeof inlineImages>>((acc, img) => {
    const pos = img.position !== undefined ? img.position : -1;
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(img);
    return acc;
  }, {});

  const endImages = imagesByPosition[-1] || [];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
        <div 
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with image */}
          <div className="relative h-56 sm:h-64 bg-slate-900 shrink-0">
            <img
              src={article.image || CLINIC_INFO.images.hero}
              alt={article.title}
              className="w-full h-full object-cover opacity-85 cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => setZoomedImage({ url: article.image || CLINIC_INFO.images.hero, caption: article.title })}
              onError={(e) => {
                (e.target as HTMLImageElement).src = CLINIC_INFO.images.hero;
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-colors cursor-pointer z-10"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 space-y-2 pointer-events-none">
              <span className="text-sky-300 text-xs font-bold uppercase tracking-wider bg-sky-950/60 backdrop-blur-xs px-2.5 py-1 rounded-md inline-block">
                {article.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {article.title}
              </h2>
            </div>
          </div>

          {/* Article Meta Bar */}
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="w-3.5 h-3.5 text-sky-600" />
                {article.authorName} ({article.authorTitle})
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishDate}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-sky-700 hover:text-sky-900 font-medium cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6 space-y-5 overflow-y-auto leading-relaxed text-sm text-slate-700">
            {/* Summary Lead */}
            <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-100 text-slate-800 font-medium italic">
              &ldquo;{article.summary}&rdquo;
            </div>

            {/* Paragraphs and Inline Images */}
            <div className="space-y-4 pt-1">
              {article.content.map((paragraph, idx) => {
                const attachedImages = imagesByPosition[idx + 1] || [];
                return (
                  <React.Fragment key={idx}>
                    <p className="leading-relaxed text-slate-700">
                      {paragraph}
                    </p>

                    {/* Inline images inserted after this paragraph */}
                    {attachedImages.map((img, imgIdx) => (
                      <figure 
                        key={imgIdx} 
                        className="my-4 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs group"
                      >
                        <div 
                          className="relative aspect-16/9 max-h-80 w-full overflow-hidden cursor-pointer"
                          onClick={() => setZoomedImage({ url: img.url, caption: img.caption })}
                        >
                          <img
                            src={img.url}
                            alt={img.caption || `Hình ảnh minh họa đoạn ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = CLINIC_INFO.images.hero;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-3 py-1.5 bg-black/70 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-xs">
                              <ZoomIn className="w-3.5 h-3.5" />
                              Phóng to ảnh
                            </span>
                          </div>
                        </div>

                        {img.caption && (
                          <figcaption className="p-3 bg-white text-xs text-slate-600 italic border-t border-slate-100 flex items-center gap-2">
                            <Camera className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span>{img.caption}</span>
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </React.Fragment>
                );
              })}

              {/* End of article images (if any unpositioned) */}
              {endImages.map((img, eIdx) => (
                <figure 
                  key={`end-${eIdx}`} 
                  className="my-4 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs group"
                >
                  <div 
                    className="relative aspect-16/9 max-h-80 w-full overflow-hidden cursor-pointer"
                    onClick={() => setZoomedImage({ url: img.url, caption: img.caption })}
                  >
                    <img
                      src={img.url}
                      alt={img.caption || 'Hình ảnh minh họa bài viết'}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = CLINIC_INFO.images.hero;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 bg-black/70 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-xs">
                        <ZoomIn className="w-3.5 h-3.5" />
                        Phóng to ảnh
                      </span>
                    </div>
                  </div>

                  {img.caption && (
                    <figcaption className="p-3 bg-white text-xs text-slate-600 italic border-t border-slate-100 flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{img.caption}</span>
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>

            {/* Doctor Advisory Box */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                Lời khuyên từ Bác sĩ Thú Y Hòa Vang:
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                Nếu nhận thấy thú cưng có biểu hiện bất thường hoặc cần tư vấn phác đồ tiêm phòng, tẩy giun và dinh dưỡng chuẩn xác, quý khách hãy liên hệ ngay hotline hoặc đặt lịch khám để được bác sĩ kiểm tra trực tiếp.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
            >
              Đóng bài viết
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              Đặt lịch khám trực tuyến
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoomed Image Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setZoomedImage(null)}
        >
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Đóng ảnh"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="max-w-4xl max-h-[85vh] flex flex-col items-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={zoomedImage.url} 
              alt={zoomedImage.caption || 'Hình ảnh minh họa'} 
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/20"
            />
            {zoomedImage.caption && (
              <p className="text-sm text-white/90 text-center font-medium bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-xs">
                {zoomedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
