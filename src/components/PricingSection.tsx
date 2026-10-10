import React from 'react';
import { Check, Calendar, ShieldCheck, Tag } from 'lucide-react';

interface PricingSectionProps {
  onOpenBooking: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking }) => {
  const priceCategories = [
    {
      category: 'Khám & Điều trị cơ bản',
      items: [
        { name: 'Khám lâm sàng tổng quát chó/mèo', price: '100.000đ', note: 'Kiểm tra tai mũi họng, tim phổi, đo thân nhiệt' },
        { name: 'Siêu âm ổ bụng tổng quát màu', price: '150.000đ', note: 'Kiểm tra gan, thận, bàng quang, thai sản' },
        { name: 'Xét nghiệm máu tổng quát (18 thông số)', price: '200.000đ', note: 'Đánh giá hồng cầu, bạch cầu, tiểu cầu' },
        { name: 'Xét nghiệm sinh hóa chức năng gan, thận', price: '250.000đ', note: 'Đánh giá men gan ALT, AST, BUN, Creatinine' },
        { name: 'Test nhanh bệnh truyền nhiễm (Care, Parvo, FPV)', price: '120.000đ', note: 'Cho kết quả chính xác trong 10 phút' },
      ]
    },
    {
      category: 'Tiêm phòng Vaccine chính hãng',
      items: [
        { name: 'Vaccine 5 bệnh cho chó (Pháp/Mỹ)', price: '180.000đ', note: 'Care, Parvo, Viêm gan, Ho cũi chó, Cúm' },
        { name: 'Vaccine 7 bệnh cho chó (Zoetis/Vanguard)', price: '220.000đ', note: 'Bổ sung thêm 2 chủng Leptospira' },
        { name: 'Vaccine 4 bệnh cho mèo (PureVax/Felocell)', price: '250.000đ', note: 'Giảm bạch cầu, Calici, Viêm mũi dị ứng, Chlamydia' },
        { name: 'Vaccine phòng Dại Rabisin có chứng nhận', price: '60.000đ', note: 'Cấp giấy chứng nhận tiêm phòng dại' },
        { name: 'Tẩy giun sán thú cưng theo thể trọng', price: '30.000đ - 70.000đ', note: 'Thuốc Endogard/Drontal nhập khẩu' },
      ]
    },
    {
      category: 'Phẫu thuật & Triệt sản thẩm mỹ',
      items: [
        { name: 'Triệt sản mèo đực (đường mổ vi phẫu)', price: '250.000đ - 350.000đ', note: 'Nhanh liền sẹo, không đau' },
        { name: 'Triệt sản mèo cái (khâu thẩm mỹ giấu chỉ)', price: '450.000đ - 650.000đ', note: 'Chỉ tự tiêu, không cần cắt chỉ' },
        { name: 'Triệt sản chó đực', price: '350.000đ - 600.000đ', note: 'Tùy theo thể trọng' },
        { name: 'Triệt sản chó cái', price: '600.000đ - 1.200.000đ', note: 'Kèm theo thuốc kháng sinh, giảm đau hậu phẫu' },
        { name: 'Lấy cao răng siêu âm & đánh bóng răng', price: '200.000đ - 400.000đ', note: 'Trị hôi miệng, bảo vệ nướu chắc khỏe' },
      ]
    },
    {
      category: 'Spa cắt tỉa lông & Khách sạn thú cưng',
      items: [
        { name: 'Tắm vệ sinh 7 bước cún mèo dưới 5kg', price: '100.000đ - 130.000đ', note: 'Tắm thơm, vắt tuyến hôi, vệ sinh tai móng' },
        { name: 'Tắm vệ sinh cún mèo từ 5kg - 10kg', price: '150.000đ - 180.000đ', note: 'Bao gồm sấy chải bông lông, xịt tinh dầu' },
        { name: 'Combo Tắm + Cắt tỉa tạo kiểu dáng', price: '250.000đ - 450.000đ', note: 'Theo mẫu Teddy Bear, tròn búp bê hoặc yêu cầu' },
        { name: 'Lưu trú phòng VIP điều hòa (dưới 5kg)', price: '90.000đ / ngày', note: 'Ăn 2-3 bữa, video cập nhật hàng ngày' },
        { name: 'Lưu trú phòng VIP điều hòa (5kg - 15kg)', price: '130.000đ / ngày', note: 'Phòng riêng rộng rãi, vệ sinh 2 lần/ngày' },
      ]
    }
  ];

  return (
    <section className="py-10 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-100/80 px-3 py-1 rounded-full">
            <Tag className="w-3.5 h-3.5" />
            <span>Bảng giá công khai & minh bạch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Chi Phí Dịch Vụ Thú Y Hòa Vang
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Cam kết niêm yết rõ ràng, không phát sinh chi phí ẩn. Bác sĩ luôn tư vấn kỹ tình trạng bệnh và phương án tiết kiệm nhất cho chủ nuôi trước khi thực hiện.
          </p>
        </div>

        {/* Pricing Category Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {priceCategories.map((group, gIdx) => (
            <div key={gIdx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-black text-sky-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-600" />
                {group.category}
              </h3>

              <div className="space-y-3">
                {group.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-start justify-between gap-4 py-2 border-b border-slate-50 last:border-0">
                    <div className="space-y-0.5">
                      <div className="text-xs sm:text-sm font-bold text-slate-800">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {item.note}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm font-black text-sky-700 whitespace-nowrap">
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Booking CTA Strip */}
        <div className="bg-sky-900 text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Cần kiểm tra sức khỏe hoặc tiêm phòng cho bé?
            </h4>
            <p className="text-xs text-sky-200">
              Đặt lịch trực tuyến trước để được giữ chỗ khám ưu tiên và không phải xếp hàng chờ đợi.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs sm:text-sm rounded-full shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Đặt lịch khám ngay</span>
          </button>
        </div>

      </div>
    </section>
  );
};
