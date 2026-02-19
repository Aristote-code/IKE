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

import { StatsWidget, TaskWidget, ActivityWidget } from './DashboardWidgets';

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

      <StatsWidget />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Chart & Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Chart */}
          <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-base font-bold text-slate-900">{t('dash_monthly_disb')}</h3>
              <select className="text-sm border-slate-200 rounded-md py-1 px-2 text-slate-600 focus:ring-blue-500 focus:border-blue-500 bg-slate-50">
                <option>{t('dash_last_6_months')}</option>
                <option>{t('dash_year_2024')}</option>
              </select>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: t('month_aug').substring(0, 3), amount: 4200 },
                  { name: t('month_sep').substring(0, 3), amount: 5100 },
                  { name: t('month_oct').substring(0, 3), amount: 4800 },
                  { name: t('month_nov').substring(0, 3), amount: 5600 },
                  { name: t('month_dec').substring(0, 3), amount: 5300 },
                  { name: t('month_jan').substring(0, 3), amount: 5900 },
                ]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
                    tickFormatter={(value) => `${value / 1000}k`}
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

          {/* Activity Widget */}
          <ActivityWidget />
        </div>

        {/* Action List */}
        <TaskWidget />
      </div>
    </div>
  );
};