import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { StudentList } from './components/StudentList';
import { StudentDetail } from './components/StudentDetail';
import { Organization } from './components/Organization';
import { Economy } from './components/Economy';
import { Page } from './types';
import { LanguageProvider, useLanguage } from './LanguageContext';

const AppContent = () => {
  const [activePage, setActivePage] = useState<Page>(Page.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { t } = useLanguage();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activePage) {
      case Page.DASHBOARD:
        return <Dashboard />;
      case Page.STUDENTS:
        return <StudentList onSelectStudent={() => setActivePage(Page.STUDENT_DETAIL)} />;
      case Page.STUDENT_DETAIL:
        return <StudentDetail onBack={() => setActivePage(Page.STUDENTS)} />;
      case Page.ORGANIZATION:
        return <Organization />;
      case Page.ECONOMY:
        return <Economy />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
               <h3 className="text-lg font-medium">{t('coming_soon')}</h3>
               <p>{t('coming_soon_desc')}</p>
            </div>
          </div>
        );
    }
  };

  const getPageTitle = () => {
    switch (activePage) {
      case Page.DASHBOARD: return t('dash_title');
      case Page.STUDENTS: return t('sl_title');
      case Page.STUDENT_DETAIL: return t('sl_col_name'); // Or a generic 'Profile' key
      case Page.ORGANIZATION: return t('org_title');
      case Page.ECONOMY: return t('eco_title');
      case Page.SETTINGS: return t('nav_settings');
      default: return t('dash_title');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        activePage={activePage} 
        onNavigate={setActivePage} 
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Header 
          title={getPageTitle()} 
          onToggleSidebar={toggleSidebar} 
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}