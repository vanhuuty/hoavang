import React, { useState, useRef } from 'react';
import { 
  X, 
  PenTool, 
  Image as ImageIcon, 
  Send, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Tag, 
  BookOpen, 
  User, 
  Sparkles,
  Camera,
  Link,
  Upload,
  AlertCircle,
  Eye,
  Check,
  Smartphone,
  RefreshCw
} from 'lucide-react';
import { DOCTORS_DATA, CLINIC_INFO } from '../data/clinicData';
import { Article } from '../types';
import { processImageFile } from '../utils/imageHelper';

interface InlineImageFormItem {
  id: string;
  sourceType: 'upload' | 'link';
  url: string;
  caption: string;
  position: number; // 1: after paragraph 1, 2: after paragraph 2, -1: at the end
  isUploading?: boolean;
}

interface WriteArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitArticle: (newArticle: Article) => void;
}

export const WriteArticleModal: React.FC<WriteArticleModalProps> = ({
  isOpen,
  onClose,
  onSubmitArticle
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Chăm sóc thú cưng' | 'Tiêm phòng' | 'Dinh dưỡng' | 'Sức khỏe & Bệnh lý'>('Chăm sóc thú cưng');
  const [selectedDoctorId, setSelectedDoctorId] = useState(DOCTORS_DATA[0].id);
  const [readTime, setReadTime] = useState('4 phút đọc');
  const [summary, setSummary] = useState('');
  const [contentParagraphs, setContentParagraphs] = useState<string[]>([
    '',
    ''
  ]);

  // Cover image mode: 'upload' | 'link'
  const [coverSourceType, setCoverSourceType] = useState<'upload' | 'link'>('link');
  const [coverImageUrl, setCoverImageUrl] = useState(CLINIC_INFO.images.hero);
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const coverFileInputRef = useRef<HTMLInputElement>(null);

  // Inline images list
  const [inlineImages, setInlineImages] = useState<InlineImageFormItem[]>([]);
  const [tagsInput, setTagsInput] = useState('Chăm sóc thú cưng, Thú y Hòa Vang, Đà Nẵng');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const sampleCoverImages = [
    { label: 'Cún & Mèo tại phòng khám', url: CLINIC_INFO.images.hero },
    { label: 'Cơ sở phòng khám Hòa Vang', url: CLINIC_INFO.images.storefront },
    { label: 'Bác sĩ khám cún cưng', url: CLINIC_INFO.images.doctorMale },
    { label: 'Bác sĩ kiểm tra mèo con', url: CLINIC_INFO.images.doctorFemale },
  ];

  const presetInlineImageSuggestions = [
    {
      label: 'Khám thú y',
      url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1000&q=80',
      caption: 'Bác sĩ thú y kiểm tra lâm sàng cẩn thận cho thú cưng'
    },
    {
      label: 'Mèo con đáng yêu',
      url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80',
      caption: 'Theo dõi sự phát triển thể chất và tinh thần của mèo con'
    },
    {
      label: 'Cún cưng vui khỏe',
      url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80',
      caption: 'Thú cưng sau khi được điều trị hồi phục và khỏe mạnh'
    },
    {
      label: 'Tiêm phòng vaccine',
      url: 'https://images.unsplash.com/photo-1628009368231-7bb3cfc38291?auto=format&fit=crop&w=1000&q=80',
      caption: 'Thực hiện tiêm phòng vaccine đủ liều theo hướng dẫn y khoa'
    }
  ];

  // Upload cover image handler
  const handleCoverFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCoverUploading(true);
      const dataUrl = await processImageFile(file, 1200, 800, 0.85);
      setCoverImageUrl(dataUrl);
    } catch (err: any) {
      alert(err.message || 'Không thể tải ảnh này lên. Vui lòng thử ảnh khác.');
    } finally {
      setIsCoverUploading(false);
      if (coverFileInputRef.current) {
        coverFileInputRef.current.value = '';
      }
    }
  };

  const handleAddParagraph = () => {
    setContentParagraphs([...contentParagraphs, '']);
  };

  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...contentParagraphs];
    updated[index] = val;
    setContentParagraphs(updated);
  };

  const handleRemoveParagraph = (index: number) => {
    if (contentParagraphs.length <= 1) return;
    setContentParagraphs(contentParagraphs.filter((_, i) => i !== index));
  };

  // Thêm ảnh minh họa mới (mặc định chọn link hoặc upload)
  const handleAddInlineImage = (sourceType: 'upload' | 'link' = 'upload', preset?: { url: string; caption: string }) => {
    const newItem: InlineImageFormItem = {
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sourceType,
      url: preset ? preset.url : '',
      caption: preset ? preset.caption : '',
      position: inlineImages.length === 0 ? 1 : (inlineImages.length === 1 ? 2 : -1),
    };
    setInlineImages([...inlineImages, newItem]);
  };

  const handleUpdateInlineImage = (id: string, updates: Partial<InlineImageFormItem>) => {
    setInlineImages(inlineImages.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  // Xử lý upload ảnh minh họa nội dung bài viết
  const handleInlineFileUpload = async (id: string, file: File) => {
    try {
      handleUpdateInlineImage(id, { isUploading: true });
      const dataUrl = await processImageFile(file, 1000, 750, 0.82);
      handleUpdateInlineImage(id, { url: dataUrl, isUploading: false });
    } catch (err: any) {
      handleUpdateInlineImage(id, { isUploading: false });
      alert(err.message || 'Lỗi khi tải ảnh. Vui lòng thử lại.');
    }
  };

  const handleRemoveInlineImage = (id: string) => {
    setInlineImages(inlineImages.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    if (!title.trim()) errors.title = 'Vui lòng nhập tiêu đề bài viết';
    if (!summary.trim()) errors.summary = 'Vui lòng nhập tóm tắt nội dung bài viết';
    const validParagraphs = contentParagraphs.filter(p => p.trim().length > 0);
    if (validParagraphs.length === 0) {
      errors.content = 'Vui lòng nhập ít nhất một đoạn nội dung bài viết';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const doctor = DOCTORS_DATA.find(d => d.id === selectedDoctorId) || DOCTORS_DATA[0];
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    // Lọc các hình ảnh chèn hợp lệ có link URL hoặc upload
    const validInlineImages = inlineImages
      .filter(img => img.url.trim().length > 0)
      .map(img => ({
        url: img.url.trim(),
        caption: img.caption.trim() || undefined,
        position: img.position
      }));

    const newArticle: Article = {
      id: `bai-viet-${Date.now()}`,
      title: title.trim(),
      slug: slug || `bai-viet-${Date.now()}`,
      summary: summary.trim(),
      content: validParagraphs,
      category,
      publishDate: new Date().toLocaleDateString('vi-VN'),
      authorName: doctor.name,
      authorTitle: doctor.title,
      authorAvatar: doctor.avatar,
      readTime,
      views: 1,
      image: coverImageUrl.trim() || CLINIC_INFO.images.hero,
      tags: tags.length > 0 ? tags : ['Tin tức', 'Hòa Vang'],
      inlineImages: validInlineImages.length > 0 ? validInlineImages : undefined
    };

    onSubmitArticle(newArticle);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setTitle('');
    setSummary('');
    setContentParagraphs(['', '']);
    setInlineImages([]);
    setFormErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[95vh] sm:max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Optimized for mobile view */}
        <div className="bg-sky-900 text-white p-4 sm:p-6 shrink-0 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 text-sky-200 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            <PenTool className="w-3.5 h-3.5 text-amber-300" />
            <span>Phòng Khám Thú Y Hòa Vang</span>
          </div>

          <h3 className="text-lg sm:text-2xl font-black text-white mt-1 pr-8">
            Viết & Xuất Bản Tin Tức
          </h3>

          <p className="text-[11px] sm:text-xs text-sky-200/90 mt-0.5 sm:mt-1 hidden xs:block">
            Hỗ trợ cả tải ảnh từ máy điện thoại lẫn chèn link URL trực tiếp
          </p>
        </div>

        {/* Form Body with smooth scrolling */}
        <div className="p-3.5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto px-2">
                <h4 className="text-lg sm:text-xl font-black text-slate-900">
                  Xuất Bản Bài Viết Thành Công!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Bài viết <strong>&ldquo;{title}&rdquo;</strong> đã được đăng tải và hiển thị công khai trên website cho toàn bộ khách hàng theo dõi.
                </p>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Hoàn tất & Xem bài viết
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Tiêu đề */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Tiêu đề bài viết <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="VD: Cẩm nang dinh dưỡng và chăm sóc mèo con từ 1 đến 6 tháng tuổi"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                />
                {formErrors.title && (
                  <p className="text-[11px] text-rose-500">{formErrors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {/* Chuyên mục */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Chuyên mục
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                  >
                    <option value="Chăm sóc thú cưng">Chăm sóc thú cưng</option>
                    <option value="Tiêm phòng">Tiêm phòng Vaccine</option>
                    <option value="Dinh dưỡng">Dinh dưỡng hợp lý</option>
                    <option value="Sức khỏe & Bệnh lý">Sức khỏe & Bệnh lý</option>
                  </select>
                </div>

                {/* Bác sĩ tác giả */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Tác giả biên soạn
                  </label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                  >
                    {DOCTORS_DATA.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                {/* Thời gian đọc */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Thời lượng đọc ước tính
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Tóm tắt ngắn (Lead) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Tóm tắt mở đầu (Lead) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Tóm tắt 1-2 câu quan trọng nhất của bài viết để hiển thị trên thẻ bài và mạng xã hội..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                />
                {formErrors.summary && (
                  <p className="text-[11px] text-rose-500">{formErrors.summary}</p>
                )}
              </div>

              {/* PHẦN 1: ẢNH BÌA CHÍNH (UPLOAD HOẶC CHÈN LINK) */}
              <div className="space-y-3 p-3.5 sm:p-4 bg-sky-50/60 rounded-2xl border border-sky-200/80">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <label className="text-xs font-bold text-sky-950 flex items-center gap-1.5 uppercase tracking-wide">
                    <ImageIcon className="w-4 h-4 text-sky-600" />
                    <span>Ảnh bìa đại diện bài viết</span>
                  </label>

                  {/* Switch between Upload or Insert Link */}
                  <div className="inline-flex rounded-lg p-0.5 bg-sky-100 border border-sky-200 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setCoverSourceType('upload')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        coverSourceType === 'upload'
                          ? 'bg-white text-sky-900 shadow-2xs font-bold'
                          : 'text-sky-700 hover:text-sky-900'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Tải ảnh lên</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverSourceType('link')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        coverSourceType === 'link'
                          ? 'bg-white text-sky-900 shadow-2xs font-bold'
                          : 'text-sky-700 hover:text-sky-900'
                      }`}
                    >
                      <Link className="w-3.5 h-3.5" />
                      <span>Chèn Link URL</span>
                    </button>
                  </div>
                </div>

                {/* Cover image input based on selected mode */}
                {coverSourceType === 'upload' ? (
                  <div className="space-y-2">
                    <input
                      ref={coverFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCoverFileUpload}
                      className="hidden"
                      id="cover-file-upload-input"
                    />
                    <label
                      htmlFor="cover-file-upload-input"
                      className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-sky-300 hover:border-sky-500 rounded-xl bg-white hover:bg-sky-50/50 transition-all cursor-pointer text-center group"
                    >
                      {isCoverUploading ? (
                        <div className="flex items-center gap-2 text-sky-700 text-xs font-bold py-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Đang tối ưu & nén ảnh...</span>
                        </div>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                            <Upload className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-sky-900">
                            Chạm để chọn ảnh từ điện thoại / máy tính
                          </span>
                          <span className="text-[11px] text-slate-500 mt-0.5">
                            Hỗ trợ JPG, PNG, WEBP (Tự động nén tối ưu hiển thị)
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                ) : (
                  <div className="relative flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="url"
                        placeholder="Dán liên kết ảnh bìa (VD: https://...)"
                        value={coverImageUrl}
                        onChange={(e) => setCoverImageUrl(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-sky-200 rounded-xl focus:outline-hidden focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                      />
                      <Link className="w-4 h-4 text-sky-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      {coverImageUrl && (
                        <button
                          type="button"
                          onClick={() => setCoverImageUrl('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                          title="Xóa link ảnh"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Xem trước ảnh bìa */}
                {coverImageUrl && (
                  <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-sky-100 shadow-2xs">
                    <img 
                      src={coverImageUrl} 
                      alt="Xem trước ảnh bìa" 
                      className="w-20 h-14 sm:w-24 sm:h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = CLINIC_INFO.images.hero;
                      }}
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <div className="flex items-center gap-1 text-emerald-600 font-bold">
                        <Check className="w-3.5 h-3.5" />
                        <span>Ảnh bìa đã sẵn sàng</span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {coverImageUrl.startsWith('data:') ? 'Ảnh tải lên từ thiết bị' : coverImageUrl}
                      </p>
                    </div>
                  </div>
                )}

                {/* Gợi ý ảnh bìa mẫu có sẵn của phòng khám */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] text-slate-600 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Hoặc chọn nhanh từ ảnh phòng khám:</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {sampleCoverImages.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setCoverImageUrl(s.url);
                          setCoverSourceType('link');
                        }}
                        className={`text-left relative h-14 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          coverImageUrl === s.url
                            ? 'border-sky-600 ring-2 ring-sky-300'
                            : 'border-slate-200 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img src={s.url} alt={s.label} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-1.5">
                          <span className="text-[10px] text-white font-bold truncate leading-tight">{s.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nội dung chi tiết các đoạn văn */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Nội dung bài viết (Từng đoạn văn) <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddParagraph}
                    className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 cursor-pointer bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 hover:bg-sky-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm đoạn văn</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {contentParagraphs.map((para, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 sm:gap-2">
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-100 text-slate-600 text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0 mt-2">
                        {idx + 1}
                      </span>
                      <textarea
                        rows={3}
                        placeholder={`Nội dung đoạn văn ${idx + 1}...`}
                        value={para}
                        onChange={(e) => handleParagraphChange(idx, e.target.value)}
                        className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                      />
                      {contentParagraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveParagraph(idx)}
                          className="p-1.5 sm:p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer mt-1"
                          title="Xóa đoạn này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {formErrors.content && (
                  <p className="text-[11px] text-rose-500">{formErrors.content}</p>
                )}
              </div>

              {/* PHẦN 2: CHÈN HÌNH ẢNH MINH HỌA (UPLOAD TỪ MÁY HOẶC CHÈN LINK) */}
              <div className="space-y-3 p-3.5 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                      <Camera className="w-4 h-4 text-sky-600" />
                      <span>Hình ảnh minh họa nội dung (Upload hoặc Link)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Chèn ảnh vào giữa bài viết hoặc cuối bài kèm chú thích chi tiết
                    </p>
                  </div>

                  {/* Add action buttons: Upload or Link */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleAddInlineImage('upload')}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-sky-700 hover:bg-sky-800 active:scale-95 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>+ Tải ảnh lên</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddInlineImage('link')}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-sky-800 border border-sky-300 rounded-lg text-xs font-bold shadow-2xs cursor-pointer transition-all"
                    >
                      <Link className="w-3.5 h-3.5 text-sky-600" />
                      <span>+ Chèn link</span>
                    </button>
                  </div>
                </div>

                {/* Danh sách các ảnh đã chèn */}
                {inlineImages.length === 0 ? (
                  <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-center space-y-2 bg-white">
                    <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      Chưa chèn hình ảnh minh họa nào. Bạn có thể tải ảnh từ điện thoại hoặc dán link ảnh.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-500">Hoặc chọn nhanh mẫu:</span>
                      {presetInlineImageSuggestions.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddInlineImage('link', { url: item.url, caption: item.caption })}
                          className="px-2 py-1 text-[11px] font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors cursor-pointer"
                        >
                          + {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inlineImages.map((imgItem, index) => (
                      <div 
                        key={imgItem.id} 
                        className="p-3 sm:p-3.5 bg-white rounded-xl border border-slate-200 space-y-3 shadow-2xs relative"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[10px] flex items-center justify-center font-bold">
                              {index + 1}
                            </span>
                            Ảnh minh họa {index + 1}
                          </span>

                          <div className="flex items-center gap-2">
                            {/* Toggle source type for this specific item */}
                            <div className="inline-flex rounded-md p-0.5 bg-slate-100 border border-slate-200 text-[10px]">
                              <button
                                type="button"
                                onClick={() => handleUpdateInlineImage(imgItem.id, { sourceType: 'upload' })}
                                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                                  imgItem.sourceType === 'upload'
                                    ? 'bg-white text-sky-800 font-bold shadow-2xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                Tải file
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateInlineImage(imgItem.id, { sourceType: 'link' })}
                                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                                  imgItem.sourceType === 'link'
                                    ? 'bg-white text-sky-800 font-bold shadow-2xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                Dán link
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveInlineImage(imgItem.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                              title="Xóa ảnh này"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          {/* Input fields */}
                          <div className="sm:col-span-7 space-y-2">
                            {imgItem.sourceType === 'upload' ? (
                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                                  <Upload className="w-3 h-3 text-sky-600" />
                                  <span>Chọn ảnh từ điện thoại / máy tính *</span>
                                </label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (f) handleInlineFileUpload(imgItem.id, f);
                                  }}
                                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                                />
                                {imgItem.isUploading && (
                                  <p className="text-[10px] text-sky-600 flex items-center gap-1 animate-pulse font-semibold">
                                    <RefreshCw className="w-3 h-3 animate-spin" />
                                    <span>Đang nén ảnh và tải lên...</span>
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                                  <Link className="w-3 h-3 text-sky-600" />
                                  <span>Đường link hình ảnh (URL) *</span>
                                </label>
                                <input
                                  type="url"
                                  placeholder="Dán link ảnh (https://...)"
                                  value={imgItem.url}
                                  onChange={(e) => handleUpdateInlineImage(imgItem.id, { url: e.target.value })}
                                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:border-sky-500"
                                />
                              </div>
                            )}

                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-700">
                                Chú thích ảnh (Caption)
                              </label>
                              <input
                                type="text"
                                placeholder="VD: Bác sĩ đang kiểm tra nhịp tim cho bé Poodle"
                                value={imgItem.caption}
                                onChange={(e) => handleUpdateInlineImage(imgItem.id, { caption: e.target.value })}
                                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:border-sky-500"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-700">
                                Vị trí xuất hiện trong bài
                              </label>
                              <select
                                value={imgItem.position}
                                onChange={(e) => handleUpdateInlineImage(imgItem.id, { position: parseInt(e.target.value) })}
                                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:border-sky-500"
                              >
                                {contentParagraphs.map((_, pIdx) => (
                                  <option key={pIdx} value={pIdx + 1}>
                                    Chèn sau đoạn {pIdx + 1}
                                  </option>
                                ))}
                                <option value={-1}>Chèn ở cuối bài viết</option>
                              </select>
                            </div>
                          </div>

                          {/* Preview ảnh thumbnail */}
                          <div className="sm:col-span-5 flex flex-col justify-center items-center p-2 rounded-xl bg-slate-50 border border-slate-200/80 min-h-[100px]">
                            {imgItem.url ? (
                              <div className="w-full space-y-1">
                                <img
                                  src={imgItem.url}
                                  alt="Xem trước ảnh chèn"
                                  className="w-full h-24 object-cover rounded-lg border border-slate-200"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = CLINIC_INFO.images.hero;
                                  }}
                                />
                                {imgItem.caption && (
                                  <p className="text-[10px] text-slate-600 italic text-center truncate">
                                    {imgItem.caption}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="text-center text-slate-400 space-y-1 py-3">
                                <ImageIcon className="w-6 h-6 mx-auto opacity-50" />
                                <span className="text-[11px] block">
                                  {imgItem.sourceType === 'upload' ? 'Chưa chọn file ảnh' : 'Dán link để xem trước'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Thẻ tags */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-sky-600" />
                  <span>Thẻ từ khóa (phân cách bởi dấu phẩy)</span>
                </label>
                <input
                  type="text"
                  placeholder="VD: Chăm sóc mèo, Tiêm phòng, Dinh dưỡng, Hòa Khánh"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-sky-700 hover:bg-sky-800 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-700/20 cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Xuất bản bài viết</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
