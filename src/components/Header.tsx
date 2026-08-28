import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  PhoneCall,
  Menu,
  X,
  User as UserIcon,
  Globe,
  FilePlus,
  Search,
  ListFilter,
  HelpCircle,
  Home,
  LogOut,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Language, TextSize } from '../types';

export const Header: React.FC = () => {
  const { language, setLanguage, textSize, setTextSize, t } = useLanguage();
  const { user, openLoginModal, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const navItems = [
    { path: '/', labelKey: 'navHome' as const, icon: Home },
    { path: '/lodge', labelKey: 'navLodge' as const, icon: FilePlus },
    { path: '/track', labelKey: 'navTrack' as const, icon: Search },
    { path: '/my-grievances', labelKey: 'navMyGrievances' as const, icon: ListFilter },
    { path: '/help', labelKey: 'navHelp' as const, icon: HelpCircle },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-2xs">
      {/* Top Utility Bar */}
      <div className="bg-[#0B2545] text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Government identity */}
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
            <span>{t('govIndia')}</span>
          </div>

          {/* Right utilities: Helpline, Font size, Language dropdown */}
          <div className="flex items-center gap-3 sm:gap-6 ml-auto">
            {/* Helpline */}
            <a
              href="tel:1800114000"
              className="hidden md:flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold transition-colors"
              title="National Toll Free Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t('helplineLabel')}</span>
            </a>

            {/* Accessibility Font Sizing */}
            <div className="flex items-center gap-1 bg-[#13293D] px-2 py-0.5 rounded border border-slate-700">
              <span className="text-[10px] text-slate-300 mr-1 hidden sm:inline">
                {t('textSizeLabel')}
              </span>
              <button
                onClick={() => setTextSize('normal')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                  textSize === 'normal' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
                title="Normal Font Size"
              >
                A
              </button>
              <button
                onClick={() => setTextSize('large')}
                className={`px-1.5 py-0.5 rounded text-[12px] font-bold cursor-pointer transition-colors ${
                  textSize === 'large' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
                title="Large Font Size"
              >
                A+
              </button>
              <button
                onClick={() => setTextSize('xlarge')}
                className={`px-1.5 py-0.5 rounded text-[13px] font-bold cursor-pointer transition-colors ${
                  textSize === 'xlarge' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
                title="Extra Large Font Size"
              >
                A++
              </button>
            </div>

            {/* Language Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#13293D] border border-slate-700 rounded px-2 py-0.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={language}
                onChange={handleLangChange}
                className="bg-transparent text-white text-xs font-medium cursor-pointer focus:outline-hidden"
                aria-label="Select Language"
              >
                <option value="en" className="text-slate-900 bg-white">
                  English
                </option>
                <option value="hi" className="text-slate-900 bg-white">
                  हिंदी (Hindi)
                </option>
                <option value="mr" className="text-slate-900 bg-white">
                  मराठी (Marathi)
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* Emblem graphic representation */}
          <div className="w-11 h-11 bg-[#0B2545] border-2 border-amber-600 rounded-md flex items-center justify-center text-amber-400 shadow-2xs font-bold text-xl flex-shrink-0">
            {/* Ashoka Emblem representation icon */}
            <svg
              className="w-7 h-7 text-amber-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#0B2545] font-serif">
                {t('brandTitle')}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded">
                Official
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-600">
              {t('brandTagline')}
            </p>
          </div>
        </Link>

        {/* User Login/Profile desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md">
              <div className="w-7 h-7 bg-[#0B2545] text-white rounded-full flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 leading-none">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  +91 {user.mobile}
                </p>
              </div>
              <button
                onClick={logout}
                className="ml-2 text-slate-400 hover:text-red-600 p-1 rounded cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#0B2545] text-[#0B2545] hover:bg-[#0B2545] hover:text-white rounded-md text-xs font-bold transition-colors cursor-pointer"
            >
              <UserIcon className="w-4 h-4" />
              <span>{t('navLogin')}</span>
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-md cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-slate-100 border-t border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ul className="flex items-center space-x-1 py-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-[#0B2545] text-white shadow-2xs'
                        : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{t(item.labelKey)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-lg">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-bold ${
                    isActive
                      ? 'bg-[#0B2545] text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-200">
            {user ? (
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-bold text-slate-800">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 font-bold"
                >
                  {t('navLogout')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  openLoginModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 bg-amber-600 text-white rounded-md text-sm font-bold shadow-2xs"
              >
                <UserIcon className="w-4 h-4" />
                <span>{t('navLogin')}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
