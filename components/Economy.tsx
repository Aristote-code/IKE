import React from 'react';
import { Calendar, CheckCircle2, AlertTriangle, FileText, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Economy: React.FC = () => {
  const { t } = useLanguage();

  return (
     <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t('eco_title')}</h2>
            <p className="text-slate-500 text-sm mt-1">{t('eco_subtitle')}</p>
          </div>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
               {t('eco_comparison')}
             </button>
            <select className="border border-slate-300 rounded-md text-sm px-3 py-2 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-700">
              <option>Fiscal Year 2024</option>
              <option>Fiscal Year 2023</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-5 rounded-md border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
              <div className="z-10">
                <p className="text-sm font-medium text-slate-500">{t('eco_current_period')}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{t('month_dec')} 2024</h3>
              </div>
              <div className="z-10 flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <CheckCircle2 size={16} /> {t('eco_open_reporting')}
              </div>
              <Calendar className="absolute right-4 bottom-4 text-slate-100 h-24 w-24 -rotate-12" strokeWidth={1} />
           </div>
           
           <div className="bg-white p-5 rounded-md border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
              <div className="z-10">
                <p className="text-sm font-medium text-slate-500">{t('eco_total_approved')}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">45 230 000 kr</h3>
              </div>
               <div className="z-10 flex items-center gap-2 text-sm text-slate-500">
                <span>4,523 {t('nav_youth')}</span>
              </div>
           </div>

            <div className="bg-white p-5 rounded-md border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
              <div className="z-10">
                <p className="text-sm font-medium text-slate-500">{t('eco_deviations')}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">3 {t('status_pending')}</h3>
              </div>
               <div className="z-10 flex items-center gap-2 text-sm text-amber-600 font-medium cursor-pointer hover:underline">
                <AlertTriangle size={16} /> {t('eco_review')}
              </div>
           </div>
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
                         <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                           {t('status_preliminary')}
                         </span>
                      ) : (
                         <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                           {t('status_finalized')}
                         </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{row.date}</td>
                    <td className="px-6 py-4 text-slate-900">{row.students}</td>
                    <td className="px-6 py-4 text-right font-mono font-medium text-slate-700">{row.amount}</td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                         {t('eco_view_details')} <ArrowUpRight size={14} />
                       </button>
                    </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
     </div>
  );
};