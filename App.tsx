import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { PersonList } from './components/PersonList';
import { PersonDetail } from './components/PersonDetail';
import { Organization } from './components/Organization';
import { Economy } from './components/Economy';
import { Invoices } from './components/Invoices';
import { Analysis } from './components/Analysis';
import { Communication } from './components/Communication';
import { Administration } from './components/Administration';
import { Settings } from './components/Settings';
import { Internal } from './components/Internal';
import { Page, Person } from './types';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { ToastProvider } from './components/ui/Toast';

const AppContent = () => {
  const [activePage, setActivePage] = useState<Page>(Page.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { t } = useLanguage();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activePage) {
      case Page.DASHBOARD:
        return <Dashboard />;
      case Page.PERSONS:
        return <PersonList />;
      case Page.ORGANIZATION:
        return <Organization />;
      case Page.ECONOMY:
        return <Economy />;
      case Page.INVOICES:
        return <Invoices />;
      case Page.ANALYSIS:
        return <Analysis />;
      case Page.COMMUNICATION:
        return <Communication />;
      case Page.ADMINISTRATION:
        return <Administration />;
      case Page.SETTINGS:
        return <Settings />;
      case Page.INTERNAL:
        return <Internal />;
      default:
        return <div className="text-center p-10">404 - Page Not Found</div>;
    }
  };

  const getPageTitle = () => {
    switch (activePage) {
      case Page.DASHBOARD: return t('dash_title');
      case Page.PERSONS: return t('sl_title');
      case Page.ORGANIZATION: return t('org_title');
      case Page.ECONOMY: return t('eco_title');
      case Page.INVOICES: return t('nav_invoices');
      case Page.ANALYSIS: return t('nav_analysis');
      case Page.COMMUNICATION: return t('nav_comm');
      case Page.ADMINISTRATION: return t('nav_admin');
      case Page.SETTINGS: return t('nav_settings');
      case Page.INTERNAL: return t('nav_internal');
      default: return t('dash_title');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
        }}
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
            <div key={activePage} className="animate-fade-in">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </LanguageProvider>
  );
}