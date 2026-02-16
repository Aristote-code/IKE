import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Calculator, ArrowUpRight, Download, Filter, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Modal } from './ui/Modal';
import { useToast } from './ui/Toast';
import { Button } from './ui/Button';
import { Card, PageHeader } from './ui/Layout';
import { Badge } from './ui/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const Economy: React.FC = () =\u003e {
  const { t } = useLanguage();
const { toast } = useToast();
const [isCalculateModalOpen, setIsCalculateModalOpen] = useState(false);
const [selectedPeriod, setSelectedPeriod] = useState('2024-2025');

// Realistic Swedish education budget data for Region Skåne
const monthlyTrend = [
  { month: 'Aug 24', budgeted: 42500, actual: 41800 },
  { month: 'Sep 24', budgeted: 43200, actual: 43600 },
  { month: 'Okt 24', budgeted: 43800, actual: 43200 },
  { month: 'Nov 24', budgeted: 44100, actual: 44800 },
  { month: 'Dec 24', budgeted: 44500, actual: 45200 },
  { month: 'Jan 25', budgeted: 45000, actual: null }, // Future forecast
];

const municipalityBreakdown = [
  { name: 'Malmö stad', students: 1245, budget: 148500000, actual: 151200000, variance: 2700000 },
  { name: 'Lunds kommun', students: 634, budget: 78400000, actual: 76800000, variance: -1600000 },
  { name: 'Helsingborgs stad', students: 892, budget: 105600000, actual: 107900000, variance: 2300000 },
  { name: 'Kristianstads kommun', students: 456, budget: 52800000, actual: 51200000, variance: -1600000 },
  { name: 'Ystads kommun', students: 287, budget: 33200000, actual: 34100000, variance: 900000 },
  { name: 'Bromölla kommun', students: 178, budget: 20100000, actual: 19800000, variance: -300000 },
  { name: 'Bjuvs kommun', students: 145, budget: 16800000, actual: 17200000, variance: 400000 },
  { name: 'Fristående huvudmän', students: 686, budget: 89600000, actual: 91800000, variance: 2200000 },
];

const handleSaveCalculation = () =\u003e {
  toast.success('Beräkning sparad', 'Den nya budgetberäkningen har sparats');
setIsCalculateModalOpen(false);
  };

const totalBudget = municipalityBreakdown.reduce((sum, item) =\u003e sum + item.budget, 0);
const totalActual = municipalityBreakdown.reduce((sum, item) =\u003e sum + item.actual, 0);
const totalVariance = totalActual - totalBudget;
const totalStudents = municipalityBreakdown.reduce((sum, item) =\u003e sum + item.students, 0);

return (
\u003cdiv className =\"space-y-6 animate-in fade-in duration-500\"\u003e
\u003cPageHeader
title = { t('eco_title') }
description =\"Budgetuppföljning och kostnadsanalys för gymnasial utbildning i Region Skåne\"
\u003e
\u003cdiv className =\"flex gap-2\"\u003e
\u003cButton
variant =\"outline\"
leftIcon = { \u003cFilter size={ 16} /\u003e }
\u003e
Filtrera
\u003c / Button\u003e
\u003cButton
variant =\"outline\"
leftIcon = { \u003cDownload size={ 16} /\u003e }
\u003e
            Exportera rapport
\u003c / Button\u003e
\u003cButton
onClick = {() =\u003e setIsCalculateModalOpen(true)}
leftIcon = { \u003cCalculator size={ 16} /\u003e }
\u003e
            Ny budgetberäkning
\u003c / Button\u003e
\u003c / div\u003e
\u003c / PageHeader\u003e

{/* KPI Cards */ }
\u003cdiv className =\"grid grid-cols-1 md:grid-cols-4 gap-6\"\u003e
\u003cCard className =\"relative overflow-hidden\"\u003e
\u003cdiv className =\"flex justify-between items-start\"\u003e
\u003cdiv\u003e
\u003cp className =\"text-sm font-medium text-slate-500\"\u003eTotalbudget {selectedPeriod}\u003c/p\u003e
\u003ch3 className =\"text-2xl font-bold text-slate-900 mt-1\"\u003e{(totalBudget / 1000000).toFixed(1)}M kr\u003c/h3\u003e
\u003cp className =\"text-xs text-slate-500 mt-1\"\u003e{totalStudents.toLocaleString()} elever\u003c/p\u003e
\u003c / div\u003e
\u003cdiv className =\"p-2 bg-indigo-50 rounded-lg text-indigo-600\"\u003e
\u003cPieChartIcon size = { 20} /\u003e
\u003c / div\u003e
\u003c / div\u003e
\u003c / Card\u003e

\u003cCard className =\"relative overflow-hidden\"\u003e
\u003cdiv className =\"flex justify-between items-start\"\u003e
\u003cdiv\u003e
\u003cp className =\"text-sm font-medium text-slate-500\"\u003eUtfall hittills\u003c/p\u003e
\u003ch3 className =\"text-2xl font-bold text-slate-900 mt-1\"\u003e{(totalActual / 1000000).toFixed(1)}M kr\u003c/h3\u003e
\u003cp className =\"text-xs text-slate-500 mt-1\"\u003et.o.m. december 2024\u003c/p\u003e
\u003c / div\u003e
\u003cdiv className =\"p-2 bg-emerald-50 rounded-lg text-emerald-600\"\u003e
\u003cBarChart3 size = { 20} /\u003e
\u003c / div\u003e
\u003c / div\u003e
\u003c / Card\u003e

\u003cCard className =\"relative overflow-hidden\"\u003e
\u003cdiv className =\"flex justify-between items-start\"\u003e
\u003cdiv\u003e
\u003cp className =\"text-sm font-medium text-slate-500\"\u003eAvvikelse\u003c/p\u003e
\u003ch3 className = {`text-2xl font-bold mt-1 ${totalVariance \u003e 0 ? 'text-rose-600' : 'text-emerald-600'}`}\u003e
                {totalVariance \u003e 0 ? '+' : ''}{(totalVariance / 1000000).toFixed(1)}M kr
              \u003c/h3\u003e
              \u003cp className=\"text-xs text-slate-500 mt-1\"\u003e
                {((totalVariance / totalBudget) * 100).toFixed(1)}% från budget
              \u003c/p\u003e
            \u003c/div\u003e
            \u003cdiv className={`p - 2 rounded - lg ${ totalVariance \u003e 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600' } `}\u003e
              {totalVariance \u003e 0 ? \u003cTrendingUp size={20} /\u003e : \u003cTrendingDown size={20} /\u003e}
            \u003c/div\u003e
          \u003c/div\u003e
        \u003c/Card\u003e

        \u003cCard className=\"relative overflow-hidden\"\u003e
          \u003cdiv className=\"flex justify-between items-start\"\u003e
            \u003cdiv\u003e
              \u003cp className=\"text-sm font-medium text-slate-500\"\u003eSnitt per elev\u003c/p\u003e
              \u003ch3 className=\"text-2xl font-bold text-slate-900 mt-1\"\u003e
                {Math.round(totalActual / totalStudents / 1000)}k kr
              \u003c/h3\u003e
              \u003cp className=\"text-xs text-emerald-600 mt-1 font-medium\"\u003e-2.1% vs föregående år\u003c/p\u003e
            \u003c/div\u003e
            \u003cdiv className=\"p-2 bg-amber-50 rounded-lg text-amber-600\"\u003e
              \u003cCalculator size={20} /\u003e
            \u003c/div\u003e
          \u003c/div\u003e
        \u003c/Card\u003e
      \u003c/div\u003e

      {/* Charts */}
      \u003cdiv className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\"\u003e
        {/* Monthly Trend */}
        \u003cCard\u003e
          \u003ch3 className=\"text-base font-semibold text-slate-900 mb-4\"\u003eMånatlig utveckling\u003c/h3\u003e
          \u003cdiv className=\"h-64\"\u003e
            \u003cResponsiveContainer width=\"100%\" height=\"100%\"\u003e
              \u003cLineChart data={monthlyTrend} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}\u003e
                \u003cCartesianGrid strokeDasharray=\"3 3\" vertical={false} stroke=\"#f1f5f9\" /\u003e
                \u003cXAxis
                  dataKey=\"month\"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                /\u003e
                \u003cYAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) =\u003e `${ value / 1000 } k`}
                /\u003e
                \u003cTooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) =\u003e `${ (value / 1000).toFixed(0) }k kr`}
                /\u003e
                \u003cLine
                  type=\"monotone\"
                  dataKey=\"budgeted\"
                  name=\"Budgeterat\"
                  stroke=\"#94a3b8\"
                  strokeWidth={2}
                  strokeDasharray=\"5 5\"
                  dot={false}
                /\u003e
                \u003cLine
                  type=\"monotone\"
                  dataKey=\"actual\"
                  name=\"Utfall\"
                  stroke=\"#4f46e5\"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                /\u003e
              \u003c/LineChart\u003e
            \u003c/ResponsiveContainer\u003e
          \u003c/div\u003e
        \u003c/Card\u003e

        {/* Budget vs Actual by Municipality */}
        \u003cCard\u003e
          \u003ch3 className=\"text-base font-semibold text-slate-900 mb-4\"\u003eTop 5 kommuner (utfall vs budget)\u003c/h3\u003e
          \u003cdiv className=\"h-64\"\u003e
            \u003cResponsiveContainer width=\"100%\" height=\"100%\"\u003e
              \u003cBarChart data={municipalityBreakdown.slice(0, 5)} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}\u003e
                \u003cCartesianGrid strokeDasharray=\"3 3\" vertical={false} stroke=\"#f1f5f9\" /\u003e
                \u003cXAxis
                  dataKey=\"name\"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  angle={-15}
                  textAnchor=\"end\"
                  height={60}
                /\u003e
                \u003cYAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) =\u003e `${ value / 1000000 } M`}
                /\u003e
                \u003cTooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) =\u003e `${ (value / 1000000).toFixed(1) }M kr`}
                /\u003e
                \u003cBar dataKey=\"budget\" name=\"Budget\" fill=\"#94a3b8\" radius={[4, 4, 0, 0]} /\u003e
                \u003cBar dataKey=\"actual\" name=\"Utfall\" fill=\"#4f46e5\" radius={[4, 4, 0, 0]} /\u003e
              \u003c/BarChart\u003e
            \u003c/ResponsiveContainer\u003e
          \u003c/div\u003e
        \u003c/Card\u003e
      \u003c/div\u003e

      {/* Detailed Municipality Breakdown Table */}
      \u003cCard noPadding\u003e
        \u003cdiv className=\"px-6 py-4 border-b border-slate-200 bg-slate-50/50\"\u003e
          \u003ch3 className=\"font-semibold text-slate-900\"\u003eKommunvis budgetuppföljning\u003c/h3\u003e
        \u003c/div\u003e
        \u003cdiv className=\"overflow-x-auto\"\u003e
          \u003ctable className=\"w-full text-left text-sm\"\u003e
            \u003cthead className=\"bg-slate-50 text-slate-500 font-medium border-b border-slate-200\"\u003e
              \u003ctr\u003e
                \u003cth className=\"px-6 py-3 font-medium text-xs uppercase tracking-wider\"\u003eKommun/Huvudman\u003c/th\u003e
                \u003cth className=\"px-6 py-3 font-medium text-xs uppercase tracking-wider text-right\"\u003eAntal elever\u003c/th\u003e
                \u003cth className=\"px-6 py-3 font-medium text-xs uppercase tracking-wider text-right\"\u003eBudget\u003c/th\u003e
                \u003cth className=\"px-6 py-3 font-medium text-xs uppercase tracking-wider text-right\"\u003eUtfall\u003c/th\u003e
                \u003cth className=\"px-6 py-3 font-medium text-xs uppercase tracking-wider text-right\"\u003eAvvikelse\u003c/th\u003e
                \u003cth className=\"px-6 py-3 font-medium text-xs uppercase tracking-wider text-right\"\u003e%\u003c/th\u003e
              \u003c/tr\u003e
            \u003c/thead\u003e
            \u003ctbody className=\"divide-y divide-slate-100\"\u003e
              {municipalityBreakdown.map((item, index) =\u003e (
                \u003ctr key={index} className=\"hover:bg-slate-50 transition-colors group\"\u003e
                  \u003ctd className=\"px-6 py-4 font-medium text-slate-900\"\u003e{item.name}\u003c/td\u003e
                  \u003ctd className=\"px-6 py-4 text-right text-slate-700\"\u003e{item.students.toLocaleString()}\u003c/td\u003e
                  \u003ctd className=\"px-6 py-4 text-right font-mono text-slate-700\"\u003e
                    {(item.budget / 1000000).toFixed(1)}M kr
                  \u003c/td\u003e
                  \u003ctd className=\"px-6 py-4 text-right font-mono text-slate-900 font-medium\"\u003e
                    {(item.actual / 1000000).toFixed(1)}M kr
                  \u003c/td\u003e
                  \u003ctd className={`px - 6 py - 4 text - right font - mono font - medium ${ item.variance \u003e 0 ? 'text-rose-600' : 'text-emerald-600' } `}\u003e
                    {item.variance \u003e 0 ? '+' : ''}{(item.variance / 1000000).toFixed(1)}M kr
                  \u003c/td\u003e
                  \u003ctd className=\"px-6 py-4 text-right\"\u003e
                    \u003cBadge variant={item.variance \u003e 1000000 ? 'danger' : item.variance \u003c -500000 ? 'success' : 'neutral'}\u003e
                      {item.variance \u003e 0 ? '+' : ''}{((item.variance / item.budget) * 100).toFixed(1)}%
                    \u003c/Badge\u003e
                  \u003c/td\u003e
                \u003c/tr\u003e
              ))}
              \u003ctr className=\"bg-slate-50 font-semibold\"\u003e
                \u003ctd className=\"px-6 py-4 text-slate-900\"\u003eTotalt\u003c/td\u003e
                \u003ctd className=\"px-6 py-4 text-right text-slate-900\"\u003e{totalStudents.toLocaleString()}\u003c/td\u003e
                \u003ctd className=\"px-6 py-4 text-right font-mono text-slate-900\"\u003e
                  {(totalBudget / 1000000).toFixed(1)}M kr
                \u003c/td\u003e
                \u003ctd className=\"px-6 py-4 text-right font-mono text-slate-900\"\u003e
                  {(totalActual / 1000000).toFixed(1)}M kr
                \u003c/td\u003e
                \u003ctd className={`px - 6 py - 4 text - right font - mono ${ totalVariance \u003e 0 ? 'text-rose-600' : 'text-emerald-600' } `}\u003e
                  {totalVariance \u003e 0 ? '+' : ''}{(totalVariance / 1000000).toFixed(1)}M kr
                \u003c/td\u003e
                \u003ctd className=\"px-6 py-4 text-right text-slate-900\"\u003e
                  {totalVariance \u003e 0 ? '+' : ''}{((totalVariance / totalBudget) * 100).toFixed(1)}%
                \u003c/td\u003e
              \u003c/tr\u003e
            \u003c/tbody\u003e
          \u003c/table\u003e
        \u003c/div\u003e
      \u003c/Card\u003e

      {/* Calculate Modal */}
      \u003cModal
        isOpen={isCalculateModalOpen}
        onClose={() =\u003e setIsCalculateModalOpen(false)}
        title=\"Ny budgetberäkning\"
        footer={
          \u003cdiv className=\"flex justify-end gap-3\"\u003e
            \u003cButton variant=\"ghost\" onClick={() =\u003e setIsCalculateModalOpen(false)}\u003eAvbryt\u003c/Button\u003e
            \u003cButton onClick={handleSaveCalculation}\u003eSpara beräkning\u003c/Button\u003e
          \u003c/div\u003e
        }
      \u003e
        \u003cdiv className=\"space-y-4 py-4\"\u003e
          \u003cdiv\u003e
            \u003clabel className=\"block text-sm font-medium text-slate-700 mb-1\"\u003eLäsår\u003c/label\u003e
            \u003cselect className=\"w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white\"\u003e
              \u003coption\u003e2024-2025\u003c/option\u003e
              \u003coption\u003e2025-2026\u003c/option\u003e
            \u003c/select\u003e
          \u003c/div\u003e
          \u003cdiv\u003e
            \u003clabel className=\"block text-sm font-medium text-slate-700 mb-1\"\u003ePrognosticerat antal elever\u003c/label\u003e
            \u003cinput
              type=\"number\"
              className=\"w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white\"
              defaultValue=\"4650\"
            /\u003e
          \u003c/div\u003e
          \u003cdiv\u003e
            \u003clabel className=\"block text-sm font-medium text-slate-700 mb-1\"\u003eSnittbelopp per elev (kr)\u003c/label\u003e
            \u003cinput
              type=\"number\"
              className=\"w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white\"
              defaultValue=\"115000\"
            /\u003e
          \u003c/div\u003e
          \u003cdiv\u003e
            \u003clabel className=\"block text-sm font-medium text-slate-700 mb-1\"\u003eKommentar\u003c/label\u003e
            \u003ctextarea
              className=\"w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white\"
              rows={3}
              placeholder=\"Skriv en kommentar om beräkningsgrunden...\"\u003e\u003c/textarea\u003e
          \u003c/div\u003e
        \u003c/div\u003e
      \u003c/Modal\u003e
    \u003c/div\u003e
  );
};