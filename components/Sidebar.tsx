import React, { useState } from 'react';
import {
  Home,
  Users,
  Building2,
  Calculator,
  BarChart2,
  MessageSquare,
  FolderOpen,
  Shield,
  Settings,
  Wrench,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard, // Added
  FileText, // Added
  LogOut, // Added
  Menu, // Added
  X, // Added
  BarChart3, // Added
  BookOpen // Added
} from 'lucide-react';
import { Page, NavItem } from '../types';
import { useLanguage } from '../LanguageContext';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, isOpen, toggleSidebar }) => {
  const { t } = useLanguage();

  const navStructure: NavItem[] = [
    {
      id: 'home',
      label: t('nav_start'),
      icon: Home,
      page: Page.DASHBOARD
    },
    {
      id: 'registers',
      label: t('nav_reg'),
      icon: Users,
      subItems: [
        { id: 'reg_persons', label: t('nav_persons'), page: Page.PERSONS },
        { id: 'reg_org', label: t('nav_org'), page: Page.ORGANIZATION },
        { id: 'reg_study', label: t('nav_study'), page: Page.SETTINGS }, // Placeholder
      ]
    },
    {
      id: 'economy',
      label: t('nav_economy'),
      icon: Calculator,
      subItems: [
        { id: 'eco_calc', label: t('nav_calc'), page: Page.ECONOMY },
        { id: 'eco_invoices', label: t('nav_invoices'), page: Page.INVOICES }, // New
        { id: 'eco_models', label: t('nav_models'), page: Page.ECONOMY },
        { id: 'eco_prices', label: t('nav_prices'), page: Page.ECONOMY }
      ]
    },
    {
      id: 'fakturor',
      label: t('nav_invoices'), // Changed from literal string to t()
      icon: FileText,
      page: Page.INVOICES // Assuming a page for invoices
    },
    {
      id: 'analys',
      label: t('nav_analysis'), // Changed from literal string to t()
      icon: BarChart3,
      page: Page.ANALYSIS // Assuming a page for analysis
    },
    {
      id: 'kommunikation',
      label: t('nav_communication'), // Changed from literal string to t()
      icon: MessageSquare,
      page: Page.COMMUNICATION // Assuming a page for communication
    },
    {
      id: 'admin_new', // Renamed to avoid conflict with existing 'admin'
      label: t('nav_admin'), // Changed from literal string to t()
      icon: Shield,
      page: Page.ADMINISTRATION // Assuming a page for admin
    },
    {
      id: 'installningar',
      label: t('nav_settings'), // Changed from literal string to t()
      icon: Settings,
      page: Page.SETTINGS // Assuming a page for settings
    },
    {
      id: 'internt_new', // Renamed to avoid conflict with existing 'internal'
      label: t('nav_internal'), // Changed from literal string to t()
      icon: BookOpen,
      page: Page.INTERNAL // Assuming a page for internal
    },

  ];

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'org': true,
    'economy': false,
    'registers': false,
    'users': false,
    'internal': false
  });

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleItemClick = (item: NavItem) => {
    if (item.subItems) {
      toggleMenu(item.id);
    } else if (item.page) {
      onNavigate(item.page);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-slate-900/20 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      <aside className={`fixed lg:sticky top-0 left-0 z-30 h-screen bg-white text-slate-700 transition-all duration-300 ease-in-out flex flex-col ${isOpen ? 'w-[260px]' : 'w-0 lg:w-16'} border-r border-slate-200 shadow-[2px_0_8px_-3px_rgba(0,0,0,0.05)]`}>

        {/* Header */}
        <div className="h-14 flex items-center px-4 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="shrink-0 flex items-center justify-center">
              {/* IST Logo Vector */}
              <svg width="42" height="24" viewBox="0 0 60 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-slate-900">
                <defs>
                  <mask id="logo-mask">
                    <rect width="100%" height="100%" fill="white" />
                    <rect y="4" width="100%" height="1.5" fill="black" />
                    <rect y="9" width="100%" height="1.5" fill="black" />
                    <rect y="14" width="100%" height="1.5" fill="black" />
                    <rect y="19" width="100%" height="1.5" fill="black" />
                  </mask>
                </defs>
                <g mask="url(#logo-mask)">
                  {/* I */}
                  <rect x="0" y="0" width="10" height="24" />
                  {/* S */}
                  <path d="M15 0H35V6H21V9H35V24H15V18H29V15H15V0Z" />
                  {/* T */}
                  <path d="M40 0H60V6H53V24H47V6H40V0Z" />
                </g>
              </svg>
            </div>
            <span className={`font-semibold text-slate-900 text-sm whitespace-nowrap tracking-tight transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
              IST Regional
            </span>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={toggleSidebar}
          className="h-9 flex items-center px-4 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors border-b border-slate-50"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} className="mx-auto" />}
        </button>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto py-3 pl-1 space-y-0.5 custom-scrollbar">
          {navStructure.map((item) => {
            const isActive = activePage === item.page;
            const isExpanded = expandedMenus[item.id];
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isParentActive = hasSubItems && item.subItems?.some(sub => sub.page === activePage && activePage === Page.ORGANIZATION && item.id === 'org');

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-l-md transition-all duration-200 group relative
                    ${(isActive && !item.subItems)
                      ? 'bg-yellow-50 text-slate-900 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {item.icon && <item.icon size={18} strokeWidth={1.5} className={`shrink-0 ${isActive && !item.subItems ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`} />}
                    <span className={`whitespace-nowrap transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
                      {item.label}
                    </span>
                  </div>

                  {item.subItems && isOpen && (
                    <ChevronDown
                      size={14}
                      className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
                    />
                  )}
                </button>

                {/* Sub Menu */}
                {item.subItems && (
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen && isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="mt-0.5 mb-1 space-y-0.5">
                      {item.subItems.map((sub) => {
                        const isSubActive = (activePage === Page.ORGANIZATION && sub.id === 'org_payers');

                        return (
                          <button
                            key={sub.id}
                            onClick={() => onNavigate(sub.page)}
                            className={`w-full text-left pl-9 pr-3 py-1.5 text-sm rounded-l-md transition-colors block
                              ${isSubActive
                                ? 'bg-yellow-50 text-slate-900 font-medium'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                          >
                            {sub.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Support Link */}
        <div className="p-2 border-t border-slate-100 mt-auto bg-white">
          <button className="flex items-center gap-2.5 text-slate-600 hover:text-slate-900 transition-colors w-full px-3 py-2 rounded-md hover:bg-slate-50">
            <HelpCircle size={18} strokeWidth={1.5} />
            <span className={`text-sm font-medium ${isOpen ? 'block' : 'hidden lg:hidden'}`}>{t('nav_support')}</span>
          </button>
        </div>
      </aside>
    </>
  );
};