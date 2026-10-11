import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  AlertCircle, 
  CheckCircle2, 
  Trash2,
  CalendarCheck
} from 'lucide-react';
import { Appointment } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

interface AppointmentLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const AppointmentLookupModal: React.FC<AppointmentLookupModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Load appointments from localStorage
  const loadAppointments = () => {
    try {
      const stored = localStorage.getItem('hoavang_vet_appointments');
      if (stored) {
        const parsed: Appointment[] = JSON.parse(stored);
        setAppointments(parsed);
      } else {
        // Initial sample appointment for quick demo
        const demoAppt: Appointment = {
          id: 'demo-1',
          code: 'HV-2026-7890',
          ownerName: 'Nguyễn Văn Hữu',
          phoneNumber: '0935778727',
          email: 'vanhuutyk42@gmail.com',
          petName: 'Miu Miu',
          petType: 'Mèo',
          petWeight: '3.8kg',
          serviceId: 'tiem-phong',
          serviceName: 'Tiêm phòng Vaccine 4 bệnh cho mèo',
          doctorId: 'dr-suong-mai',
          doctorName: 'BS. Sương Mai',
          date: '2026-10-12',
          timeSlot: '09:00 - 09:30',
          notes: 'Tiêm nhắc lại mũi 4 bệnh hàng năm',
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('hoavang_vet_appointments', JSON.stringify([demoAppt]));
        setAppointments([demoAppt]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAppointments();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = appointments.filter(a => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    return (
      a.phoneNumber.includes(term) ||
      a.code.toLowerCase().includes(term) ||
      a.ownerName.toLowerCase().includes(term) ||
      a.petName.toLowerCase().includes(term)
    );
  });

  const handleCancelAppointment = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn hủy lịch hẹn này?')) {
      const updated = appointments.map(a => a.id === id ? { ...a, status: 'cancelled' as const } : a);
      setAppointments(updated);
      localStorage.setItem('hoavang_vet_appointments', JSON.stringify(updated));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-sky-900 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sky-200 text-xs font-semibold uppercase tracking-wider">
            <CalendarCheck className="w-4 h-4" />
            <span>Phòng Khám Thú Y Hòa Vang</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Tra Cứu Lịch Hẹn Khám
          </h3>

          <p className="text-xs text-sky-200/90 mt-1">
            Nhập số điện thoại hoặc mã phiếu hẹn (VD: 0935778727 hoặc HV-2026-...)
          </p>

          {/* Search Input Box */}
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Nhập SĐT hoặc Mã hẹn để tra cứu..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setHasSearched(true);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-800 rounded-xl text-xs sm:text-sm font-medium focus:outline-hidden shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Không tìm thấy lịch hẹn nào tương ứng với thông tin tra cứu.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-4 py-2 bg-sky-700 text-white rounded-xl text-xs font-bold hover:bg-sky-800 cursor-pointer"
              >
                Đặt lịch khám mới ngay
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    item.status === 'cancelled'
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : 'bg-white border-sky-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-sky-800 font-mono">
                        {item.code}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-bold text-slate-800">
                        Bé: {item.petName} ({item.petType})
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'cancelled'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-sky-100 text-sky-800'
                    }`}>
                      {item.status === 'confirmed' ? 'Đã xác nhận' : item.status === 'cancelled' ? 'Đã hủy' : item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2.5">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Chủ nuôi</span>
                      <span className="font-semibold text-slate-800">{item.ownerName} ({item.phoneNumber})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Bác sĩ</span>
                      <span className="font-semibold text-slate-800">{item.doctorName}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[10px]">Dịch vụ đăng ký</span>
                      <span className="font-semibold text-slate-800">{item.serviceName}</span>
                    </div>
                    <div className="col-span-2 bg-sky-50/70 p-2 rounded-xl text-sky-900 font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-sky-600" />
                        {item.date} lúc {item.timeSlot}
                      </span>
                      {item.status !== 'cancelled' && (
                        <button
                          onClick={() => handleCancelAppointment(item.id)}
                          className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                        >
                          Hủy lịch
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Hỗ trợ gấp: <strong className="text-sky-700">{CLINIC_INFO.hotline}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
