import React, { useState } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  Search, 
  Menu, 
  X, 
  Stethoscope, 
  UserCheck, 
  Newspaper, 
  Info,
  SearchCode
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenLookup: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenLookup,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'about', label: 'Giới thiệu' },
    { id: 'services', label: 'Dịch vụ' },
    { id: 'doctors', label: 'Bác sĩ thú y' },
    { id: 'news', label: 'Tin tức & Cẩm nang' },
    { id: 'contact', label: 'Liên hệ & Chỉ đường' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro bar for quick contacts */}
      <div className="bg-sky-900 text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-sky-100">
              <MapPin className="w-3.5 h-3.5 text-sky-300" />
              <span>{CLINIC_INFO.address}</span>
            </span>
            <span className="flex items-center gap-1.5 text-sky-100">
              <Clock className="w-3.5 h-3.5 text-sky-300" />
              <span>{CLINIC_INFO.workingHours}</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button 
              onClick={onOpenLookup}
              className="text-sky-200 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <SearchCode className="w-3.5 h-3.5" />
              <span>Tra cứu lịch hẹn</span>
            </button>
            <span className="text-sky-400">|</span>
            <a 
              href={`tel:${CLINIC_INFO.hotline.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 font-bold text-amber-300 hover:text-amber-200"
            >
              <Phone className="w-3.5 h-3.5 animate-bounce" />
              <span>Hotline/Zalo: {CLINIC_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo brand lockup matching mockup */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none shrink-0 group"
          >
            {/* Paw Icon SVG Logo */}
            <div className="w-12 h-12 rounded-2xl bg-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-600/20 group-hover:bg-sky-700 transition-all">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M12 2a3 3 0 0 0-3 3c0 .87.38 1.66.97 2.21C9.39 7.6 9 8.25 9 9c0 1.66 1.34 3 3 3s3-1.34 3-3c0-.75-.39-1.4-.97-1.79.59-.55.97-1.34.97-2.21a3 3 0 0 0-3-3z"/>
                <circle cx="5.5" cy="10.5" r="2.5"/>
                <circle cx="18.5" cy="10.5" r="2.5"/>
                <circle cx="8" cy="17" r="2.5"/>
                <circle cx="16" cy="17" r="2.5"/>
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Phòng khám thú y</span>
              <span className="text-xl sm:text-2xl font-extrabold text-sky-900 tracking-tight leading-none group-hover:text-sky-700 transition-colors">
                HÒA VANG
              </span>
              <span className="text-[11px] text-sky-600 font-medium italic mt-0.5 hidden sm:block">
                Vì sức khỏe thú cưng của bạn
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-sky-700 hover:bg-sky-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search bar & CTA button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Input Box */}
            <div className="relative hidden md:block w-48 xl:w-56">
              <input
                type="text"
                placeholder="Tìm tin tức, bác sĩ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 hover:bg-slate-200/80 focus:bg-white text-xs rounded-full border border-slate-200 focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile search toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="p-2 md:hidden text-slate-600 hover:text-sky-600 rounded-lg hover:bg-slate-100"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Tra cứu lịch hẹn icon button on small screens */}
            <button
              onClick={onOpenLookup}
              className="hidden sm:flex md:hidden items-center gap-1 px-2.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              title="Tra cứu lịch hẹn"
            >
              <SearchCode className="w-4 h-4 text-sky-600" />
              <span>Tra cứu</span>
            </button>

            {/* Primary Action Button: Đặt lịch hẹn */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2.5 bg-sky-700 hover:bg-sky-800 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-full shadow-md shadow-sky-700/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Đặt lịch hẹn</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-700 hover:text-sky-700 rounded-lg hover:bg-slate-100 focus:outline-hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Drawer (When toggled) */}
        {showSearchInput && (
          <div className="pb-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm tin tức, dịch vụ, bác sĩ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-8 py-2 bg-slate-100 text-sm rounded-lg border border-slate-200 focus:bg-white focus:outline-hidden focus:border-sky-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => { onOpenBooking(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-sky-700 text-white rounded-lg text-xs font-bold"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              Đặt lịch khám
            </button>
            <button
              onClick={() => { onOpenLookup(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-lg text-xs font-semibold"
            >
              <SearchCode className="w-4 h-4 text-sky-700" />
              Tra cứu lịch hẹn
            </button>
          </div>

          <nav className="flex flex-col space-y-1 pt-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-sky-50 text-sky-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-sky-700 font-semibold">
              <Phone className="w-4 h-4" />
              <a href={`tel:${CLINIC_INFO.hotline.replace(/\s+/g, '')}`}>{CLINIC_INFO.hotline} (Hotline / Zalo)</a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{CLINIC_INFO.address}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
