import React, { useState } from 'react';
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
  ExternalLink,
  AlertCircle,
  Eye,
  Check
} from 'lucide-react';
import { DOCTORS_DATA, CLINIC_INFO } from '../data/clinicData';
import { Article } from '../types';

interface InlineImageFormItem {
  id: string;
  url: string;
  caption: string;
  position: number; // 1: after paragraph 1, 2: after paragraph 2, -1: at the end
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
  const [coverImageUrl, setCoverImageUrl] = useState(CLINIC_INFO.images.hero);
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

  // Thêm ảnh minh họa chèn bằng link
  const handleAddInlineImage = (preset?: { url: string; caption: string }) => {
    const newItem: InlineImageFormItem = {
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      url: preset ? preset.url : '',
      caption: preset ? preset.caption : '',
      position: inlineImages.length === 0 ? 1 : (inlineImages.length === 1 ? 2 : -1),
    };
    setInlineImages([...inlineImages, newItem]);
  };

  const handleUpdateInlineImage = (id: string, updates: Partial<InlineImageFormItem>) => {
    setInlineImages(inlineImages.map(item => item.id === id ? { ...item, ...updates } : item));
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

    // Lọc các hình ảnh chèn hợp lệ có link URL
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-sky-900 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sky-200 text-xs font-semibold uppercase tracking-wider">
            <PenTool className="w-4 h-4 text-amber-300" />
            <span>Phòng Khám Thú Y Hòa Vang</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Module Viết & Xuất Bản Tin Tức
          </h3>

          <p className="text-xs text-sky-200/90 mt-1">
            Biên tập bài viết, cẩm nang chăm sóc và chèn liên kết hình ảnh minh họa sinh động
          </p>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="text-xl font-black text-slate-900">
                  Xuất Bản Bài Viết Thành Công!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Bài viết <strong>&ldquo;{title}&rdquo;</strong> đã được đăng tải và hiển thị công khai trên website cho toàn bộ khách hàng theo dõi.
                </p>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Hoàn tất & Xem bài viết
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
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
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                />
                {formErrors.title && (
                  <p className="text-[11px] text-rose-500">{formErrors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                />
                {formErrors.summary && (
                  <p className="text-[11px] text-rose-500">{formErrors.summary}</p>
                )}
              </div>

              {/* PHẦN 1: Ảnh bìa đại diện của bài viết (Chèn bằng link URL) */}
              <div className="space-y-3 p-4 bg-sky-50/50 rounded-2xl border border-sky-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-sky-950 flex items-center gap-1.5 uppercase tracking-wide">
                    <ImageIcon className="w-4 h-4 text-sky-600" />
                    <span>Ảnh bìa chính của bài viết (Chèn bằng Link URL)</span>
                  </label>
                  <span className="text-[11px] text-sky-700 font-medium">Bắt buộc</span>
                </div>

                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      placeholder="Dán link ảnh bìa (VD: https://images.unsplash.com/... hoặc link ảnh bất kỳ)"
                      value={coverImageUrl}
                      onChange={(e) => setCoverImageUrl(e.target.value)}
                      className="w-full pl-9 pr-8 py-2.5 text-xs bg-white border border-sky-200 rounded-xl focus:outline-hidden focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
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

                {/* Xem trước ảnh bìa */}
                {coverImageUrl && (
                  <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-sky-100">
                    <img 
                      src={coverImageUrl} 
                      alt="Xem trước ảnh bìa" 
                      className="w-20 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = CLINIC_INFO.images.hero;
                      }}
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <div className="flex items-center gap-1 text-emerald-600 font-bold">
                        <Check className="w-3.5 h-3.5" />
                        <span>Xem trước ảnh bìa đã chèn</span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {coverImageUrl}
                      </p>
                    </div>
                  </div>
                )}

                {/* Gợi ý ảnh bìa mẫu có sẵn của phòng khám */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] text-slate-600 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Hoặc chọn nhanh từ kho ảnh phòng khám:</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {sampleCoverImages.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCoverImageUrl(s.url)}
                        className={`text-left relative h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
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
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center shrink-0 mt-2">
                        {idx + 1}
                      </span>
                      <textarea
                        rows={3}
                        placeholder={`Nội dung đoạn văn ${idx + 1}...`}
                        value={para}
                        onChange={(e) => handleParagraphChange(idx, e.target.value)}
                        className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-sky-500"
                      />
                      {contentParagraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveParagraph(idx)}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer mt-1"
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

              {/* PHẦN 2: CHÈN HÌNH ẢNH MINH HỌA BẰNG LINK VÀO BÀI VIẾT */}
              <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                      <Camera className="w-4 h-4 text-sky-600" />
                      <span>Chèn thêm hình ảnh minh họa bằng Link (URL)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Chèn nhiều ảnh minh họa vào giữa hoặc cuối bài viết kèm chú thích rõ ràng
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddInlineImage()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Chèn thêm ảnh bằng link</span>
                  </button>
                </div>

                {/* Danh sách các ảnh đã chèn */}
                {inlineImages.length === 0 ? (
                  <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-center space-y-2 bg-white">
                    <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      Chưa chèn thêm hình ảnh minh họa nào vào nội dung
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-500">Hoặc chèn thử nhanh link mẫu:</span>
                      {presetInlineImageSuggestions.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddInlineImage({ url: item.url, caption: item.caption })}
                          className="px-2.5 py-1 text-[11px] font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors cursor-pointer"
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
                        className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-3 shadow-2xs relative"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[10px] flex items-center justify-center font-bold">
                              {index + 1}
                            </span>
                            Ảnh minh họa {index + 1}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleRemoveInlineImage(imgItem.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                            title="Xóa ảnh này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          {/* Trường dán link URL */}
                          <div className="sm:col-span-7 space-y-2">
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
                                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:border-sky-500"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-700">
                                Chú thích ảnh (Caption)
                              </label>
                              <input
                                type="text"
                                placeholder="VD: Bác sĩ đang kiểm tra nhịp tim cho bé Poodle"
                                value={imgItem.caption}
                                onChange={(e) => handleUpdateInlineImage(imgItem.id, { caption: e.target.value })}
                                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:border-sky-500"
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
                          <div className="sm:col-span-5 flex flex-col justify-center items-center p-2 rounded-xl bg-slate-50 border border-slate-200/80 min-h-[110px]">
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
                              <div className="text-center text-slate-400 space-y-1 py-4">
                                <ImageIcon className="w-6 h-6 mx-auto opacity-50" />
                                <span className="text-[11px] block">Dán link ảnh để xem trước</span>
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
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-sky-700 hover:bg-sky-800 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-700/20 cursor-pointer transition-all"
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
