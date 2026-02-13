import React from 'react';
import { Bell, Search, Globe, ChevronDown, Menu } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface HeaderProps {
  title: string;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onToggleSidebar }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-4 lg:px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-md"
        >
          <Menu size={20} />
        </button>
        
        <nav className="hidden md:flex items-center text-sm font-medium text-slate-500">
          <span className="hover:text-slate-900 cursor-pointer transition-colors">{t('header_path')}</span>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-900 font-semibold">{title}</span>
        </nav>
        <span className="md:hidden text-slate-900 font-semibold">{title}</span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder={t('header_search')}
            className="h-9 w-64 pl-10 pr-4 rounded-full bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Language Switch */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
            <Globe className="h-4 w-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">{language}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>
          
          <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-xl border border-slate-100 py-1 hidden group-hover:block animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setLanguage('EN')}
              className={`w-full text-left px-4 py-2 text-sm ${language === 'EN' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage('SV')}
              className={`w-full text-left px-4 py-2 text-sm ${language === 'SV' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Svenska
            </button>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
};