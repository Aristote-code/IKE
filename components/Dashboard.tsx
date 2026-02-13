import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const paymentData = [
  { name: 'Aug', amount: 4200 },
  { name: 'Sep', amount: 5100 },
  { name: 'Oct', amount: 4800 },
  { name: 'Nov', amount: 5600 },
  { name: 'Dec', amount: 5300 },
  { name: 'Jan', amount: 5900 },
];

const StatCard = ({ title, value, subtext, trend }: any) => (
  <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group">
    <div className="flex flex-col">
      <p className="text-sm font-medium text-slate-500 mb-1 group-hover:text-blue-600 transition-colors">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
      <div className="flex items-center mt-2 gap-2">
         {trend && (
             <span className="inline-flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
               {trend}
             </span>
         )}
         <p className="text-xs text-slate-400">{subtext}</p>
      </div>
    </div>
  </div>
);

const TaskItem = ({ title, desc, date, priority }: { title: string, desc: string, date: string, priority: 'high' | 'normal' }) => {
  return (
    <div className="flex items-start gap-4 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors cursor-pointer group">
       <div className={`mt-1.5 h-2 w-2 rounded-full ${priority === 'high' ? 'bg-rose-500' : 'bg-blue-500'}`}></div>
       <div className="flex-1">
         <div className="flex justify-between items-start">
            <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{title}</h4>
            <span className="text-xs text-slate-400 whitespace-nowrap">{date}</span>
         </div>
         <p className="text-sm text-slate-500 mt-1 line-clamp-1">{desc}</p>
       </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t('dash_title')}</h2>
          <p className="text-slate-500 text-sm mt-1">{t('dash_subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm">
            {t('dash_export')}
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-all">
            {t('dash_new_calc')}
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title={t('dash_active_students')} 
          value="4,342" 
          subtext="vs last month" 
          trend="+2.4%"
        />
        <StatCard 
          title={t('dash_total_budget')} 
          value="45.2M" 
          subtext="Allocated" 
          trend="On track"
        />
        <StatCard 
          title={t('dash_pending_cases')} 
          value="12" 
          subtext="Requires action" 
        />
        <StatCard 
          title={t('dash_avg_cost')} 
          value="10,420" 
          subtext="SEK per month" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-md border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-bold text-slate-900">{t('dash_monthly_disb')}</h3>
            <select className="text-sm border-slate-200 rounded-md py-1 px-2 text-slate-600 focus:ring-blue-500 focus:border-blue-500 bg-slate-50">
              <option>Last 6 Months</option>
              <option>2024</option>
            </select>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `${value/1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '6px', 
                    border: '1px solid #e2e8f0', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#2563eb" 
                  radius={[4, 4, 0, 0]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action List */}
        <div className="bg-white rounded-md border border-slate-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
             <h3 className="text-base font-bold text-slate-900">{t('dash_my_tasks')}</h3>
             <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full">5 {t('status_pending')}</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <TaskItem 
              title={t('dash_task_budget')} 
              desc={t('dash_task_budget_desc')} 
              date={t('today')}
              priority="high"
            />
            <TaskItem 
              title={t('dash_task_data')} 
              desc={t('dash_task_data_desc')} 
              date={t('yesterday')}
              priority="high"
            />
             <TaskItem 
              title={t('dash_task_sign')} 
              desc={t('dash_task_sign_desc')} 
              date="Oct 24"
              priority="normal"
            />
             <TaskItem 
              title={t('dash_task_update')} 
              desc={t('dash_task_update_desc')} 
              date="Oct 20"
              priority="normal"
            />
          </div>
          <div className="p-3 border-t border-slate-100">
             <button className="w-full py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-md transition-colors flex items-center justify-center gap-2">
               {t('dash_view_all')} <ArrowRight size={14} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};