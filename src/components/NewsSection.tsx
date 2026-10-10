import React, { useState } from 'react';
import { Newspaper, Calendar, Clock, ArrowRight, Search, Eye, PenTool, Plus } from 'lucide-react';
import { ARTICLES_DATA, CLINIC_INFO } from '../data/clinicData';
import { Article } from '../types';

interface NewsSectionProps {
  onSelectArticle: (article: Article) => void;
  articles?: Article[];
  onOpenWriteArticle?: () => void;
  isFullPage?: boolean;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  onSelectArticle,
  articles = ARTICLES_DATA,
  onOpenWriteArticle,
  isFullPage = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newsSearch, setNewsSearch] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Tất cả bài viết' },
    { id: 'Chăm sóc thú cưng', label: 'Chăm sóc thú cưng' },
    { id: 'Tiêm phòng', label: 'Tiêm phòng' },
    { id: 'Dinh dưỡng', label: 'Dinh dưỡng' },
    { id: 'Sức khỏe & Bệnh lý', label: 'Bệnh lý & Sức khỏe' },
  ];

  const sourceArticles = articles && articles.length > 0 ? articles : ARTICLES_DATA;

  const filteredArticles = sourceArticles.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch = 
      item.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
      item.summary.toLowerCase().includes(newsSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const displayList = isFullPage ? filteredArticles : filteredArticles.slice(0, 4);

  return (
    <div className="space-y-4">
      {/* Header matching mockup */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 text-sky-900">
          <Newspaper className="w-5 h-5 text-sky-600" />
          <h2 className="text-xl font-black tracking-tight text-slate-900">
            Tin tức nổi bật
          </h2>
          <span className="text-xs text-slate-400 font-semibold">({sourceArticles.length} bài)</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Write Article Module Button */}
          {onOpenWriteArticle && (
            <button
              onClick={onOpenWriteArticle}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
              title="Mở module biên tập tin tức"
            >
              <PenTool className="w-3.5 h-3.5 text-amber-300" />
              <span>Viết bài mới</span>
            </button>
          )}

          {!isFullPage && sourceArticles.length > 0 && (
            <button
              onClick={() => onSelectArticle(sourceArticles[0])}
              className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and search bar when viewing full news page */}
      {isFullPage && (
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between py-2">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Tìm theo chủ đề bài viết..."
              value={newsSearch}
              onChange={(e) => setNewsSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-sky-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      )}

      {/* Articles List matching Mockup 4-row layout */}
      <div className="space-y-3">
        {displayList.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group flex items-center gap-3.5 p-2.5 rounded-xl bg-white hover:bg-sky-50/70 border border-slate-200/70 hover:border-sky-200 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
          >
            {/* Thumbnail */}
            <div className="w-20 h-20 sm:w-24 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-slate-100 relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = CLINIC_INFO.images.hero;
                }}
                referrerPolicy="no-referrer"
              />
              {article.inlineImages && article.inlineImages.length > 0 && (
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 py-0.5 rounded font-bold flex items-center gap-0.5 backdrop-blur-xs">
                  <span>+{article.inlineImages.length} ảnh</span>
                </div>
              )}
            </div>

            {/* Article Meta & Title */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2 leading-snug">
                {article.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {article.publishDate}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-sky-700 font-medium bg-sky-50/80 px-2 py-0.5 rounded-md border border-sky-100 text-[10px]">
                  {article.category}
                </span>
                {article.inlineImages && article.inlineImages.length > 0 && (
                  <span className="text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
                    Có ảnh minh họa
                  </span>
                )}
                <span className="hidden sm:inline text-slate-300">·</span>
                <span className="hidden sm:inline text-slate-400">
                  {article.readTime}
                </span>
                <span className="hidden sm:inline text-slate-300">·</span>
                <span className="hidden sm:inline text-slate-500 font-medium">
                  {article.authorName}
                </span>
              </div>
            </div>
          </div>
        ))}

        {displayList.length === 0 && (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500 space-y-2">
            <p>Không tìm thấy bài viết nào phù hợp.</p>
            {onOpenWriteArticle && (
              <button
                onClick={onOpenWriteArticle}
                className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold"
              >
                Viết bài viết mới ngay
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
