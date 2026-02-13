import React from 'react';
import { Filter, Download, Plus, Search, MoreHorizontal, ArrowUpDown, FileText } from 'lucide-react';
import { Student } from '../types';
import { useLanguage } from '../LanguageContext';

const mockStudents: Student[] = [
  { id: '1', ssn: '20070207-4265', name: 'Anders Olsson', status: 'Active', municipality: 'Kristianstad', school: 'Katedralskolan', program: 'Natural Science', startDate: '2023-02-05' },
  { id: '2', ssn: '20080609-4189', name: 'Viktor Pettersson', status: 'Pending', municipality: 'Lund', school: 'Polhemskolan', program: 'Technology', startDate: '2024-11-06' },
  { id: '3', ssn: '20080401-7476', name: 'Anna Ohlsson', status: 'Pending', municipality: 'Landskrona', school: 'Dammfriskolan', program: 'Arts', startDate: '2023-09-04' },
  { id: '4', ssn: '20081124-2242', name: 'Maja Eriksson', status: 'Active', municipality: 'Trelleborg', school: 'Olympiaskolan', program: 'Music', startDate: '2023-08-15' },
  { id: '5', ssn: '20060606-3208', name: 'Maria Johansson', status: 'Inactive', municipality: 'Malmö', school: 'Borgarskolan', program: 'Social Science', startDate: '2024-05-16' },
  { id: '6', ssn: '20070112-8821', name: 'Erik Svensson', status: 'Active', municipality: 'Helsingborg', school: 'Filbornaskolan', program: 'Sports', startDate: '2023-08-15' },
];

interface Props {
  onSelectStudent: () => void;
}

export const StudentList: React.FC<Props> = ({ onSelectStudent }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t('sl_title')}</h2>
          <p className="text-slate-500 text-sm mt-1">{t('sl_subtitle')}</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-md font-medium shadow-sm flex items-center gap-2 transition-colors text-sm">
            <FileText size={16} /> {t('sl_import')}
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium shadow-sm flex items-center gap-2 transition-colors text-sm shadow-blue-600/20">
            <Plus size={16} /> {t('sl_add')}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-md shadow-sm border border-slate-200">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-3 items-center justify-between bg-white rounded-t-md">
          <div className="relative flex-1 min-w-[240px] max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder={t('header_search')}
              className="w-full pl-9 pr-4 py-2 rounded-md border border-slate-300 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
              <Filter size={14} /> {t('sl_filter')}
            </button>
            <button className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
              <Download size={14} /> {t('sl_export')}
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 w-10"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></th>
                <th className="px-6 py-3 cursor-pointer hover:text-blue-600 group">{t('sl_col_ssn')} <ArrowUpDown size={12} className="inline ml-1 opacity-0 group-hover:opacity-100" /></th>
                <th className="px-6 py-3">{t('sl_col_name')}</th>
                <th className="px-6 py-3">{t('sl_col_status')}</th>
                <th className="px-6 py-3">{t('sl_col_muni')}</th>
                <th className="px-6 py-3">{t('sl_col_school')}</th>
                <th className="px-6 py-3">{t('sl_col_prog')}</th>
                <th className="px-6 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockStudents.map((student) => (
                <tr 
                  key={student.id} 
                  onClick={onSelectStudent}
                  className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></td>
                  <td className="px-6 py-4 font-mono text-slate-500 text-xs">{student.ssn}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{student.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                      ${student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                        student.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                        'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {student.status === 'Active' ? t('status_active') : 
                       student.status === 'Pending' ? t('status_pending') : 
                       t('status_inactive')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{student.municipality}</td>
                  <td className="px-6 py-4 text-slate-600">{student.school}</td>
                  <td className="px-6 py-4 text-slate-600">{student.program}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-blue-600 p-1.5 rounded-md hover:bg-slate-100 transition-all opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer / Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/30">
          <span className="text-xs text-slate-500">{t('sl_showing')} <span className="font-medium text-slate-900">1-6</span> {t('sl_of')} <span className="font-medium text-slate-900">432</span> {t('sl_records')}</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-md hover:bg-white bg-white disabled:opacity-50 text-slate-700" disabled>{t('sl_prev')}</button>
            <button className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-md hover:bg-white bg-white text-slate-700">{t('sl_next')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};