import React from 'react';
import { Calendar, CheckCircle2, AlertTriangle, FileText, ArrowUpRight, Plus, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Modal } from './ui/Modal';
import { useToast } from './ui/Toast';
import { Button } from './ui/Button';
import { Card } from './ui/Layout';
import { Badge } from './ui/Badge';

export const Economy: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const handleApprove = (id: string) => {
    toast.success("Godkänd", "Beräkningen har godkänts och skickats för utbetalning.");
  };

  const handleReject = (id: string) => {
    toast.error("Avvisad", "Beräkningen har avvisats. En notis har skickats till handläggare.");
  };

  const handleSaveInvoice = () => {
    toast.success("Skapad", "Ny preliminär beräkning har skapats.");
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t('eco_title')}</h2>
          <p className="text-slate-500 text-sm mt-1">{t('eco_subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            leftIcon={<Plus size={16} />}
          >
            Ny beräkning
          </Button>
          <Button variant="outline">
            {t('eco_comparison')}
          </Button>
          <select className="border border-slate-200 rounded-lg text-sm px-3 py-2 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-700 font-medium">
            <option>Fiscal Year 2024</option>
            <option>Fiscal Year 2023</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="z-10">
            <p className="text-sm font-medium text-slate-500">{t('eco_current_period')}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">{t('month_dec')} 2024</h3>
          </div>
          <div className="z-10 flex items-center gap-2 text-sm text-emerald-600 font-medium">
            <CheckCircle2 size={16} /> {t('eco_open_reporting')}
          </div>
          <Calendar className="absolute right-4 bottom-4 text-slate-100 h-24 w-24 -rotate-12" strokeWidth={1} />
        </Card>

        <Card className="flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="z-10">
            <p className="text-sm font-medium text-slate-500">{t('eco_total_approved')}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">45 230 000 kr</h3>
          </div>
          <div className="z-10 flex items-center gap-2 text-sm text-slate-500">
            <span>4,523 {t('nav_youth')}</span>
          </div>
        </Card>

        <Card className="flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="z-10">
            <p className="text-sm font-medium text-slate-500">{t('eco_deviations')}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">3 {t('status_pending')}</h3>
          </div>
          <div className="z-10 flex items-center gap-2 text-sm text-amber-600 font-medium cursor-pointer hover:underline">
            <AlertTriangle size={16} /> {t('eco_review')}
          </div>
        </Card>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <h3 className="font-semibold text-slate-900">{t('eco_history')}</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">{t('eco_col_period')}</th>
              <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">{t('eco_col_status')}</th>
              <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">{t('eco_col_updated')}</th>
              <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">{t('eco_col_base')}</th>
              <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">{t('eco_col_amount')}</th>
              <th className="px-6 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { p: 'Dec 2024', status: 'Preliminary', date: 'Just now', students: '4 523', amount: '45 230 000 kr' },
              { p: 'Nov 2024', status: 'Finalized', date: 'Nov 15, 2024', students: '4 518', amount: '44 980 000 kr' },
              { p: 'Oct 2024', status: 'Finalized', date: 'Oct 15, 2024', students: '4 502', amount: '44 750 000 kr' },
              { p: 'Sep 2024', status: 'Finalized', date: 'Sep 15, 2024', students: '4 489', amount: '44 620 000 kr' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 font-medium text-slate-900">{row.p}</td>
                <td className="px-6 py-4">
                  {row.status === 'Preliminary' ? (
                    <Badge variant="info">
                      {t('status_preliminary')}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      {t('status_finalized')}
                    </Badge>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-500">{row.date}</td>
                <td className="px-6 py-4 text-slate-900">{row.students}</td>
                <td className="px-6 py-4 text-right font-mono font-medium text-slate-700">{row.amount}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  {row.status === 'Preliminary' ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleApprove(String(i))}
                        className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 h-8 w-8 p-0"
                        title="Godkänn"
                      >
                        <CheckCircle size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReject(String(i))}
                        className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-8 w-8 p-0"
                        title="Avvisa"
                      >
                        <XCircle size={18} />
                      </Button>
                    </>
                  ) : (
                    <Button variant="link" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('eco_view_details')} <ArrowUpRight size={14} className="ml-1" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Ny preliminär beräkning"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Avbryt</Button>
            <Button onClick={handleSaveInvoice}>Skapa beräkning</Button>
          </div>
        }
      >
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Period</label>
            <select className="w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white">
              <option>Januari 2025</option>
              <option>Februari 2025</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Beräknat belopp</label>
            <input type="text" className="w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white" defaultValue="45 000 000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Kommentar</label>
            <textarea className="w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white" rows={3} placeholder="Skriv en kommentar..."></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
};