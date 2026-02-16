import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Calculator, ArrowUpRight, Download, Filter, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Modal } from './ui/Modal';
import { useToast } from './ui/Toast';
import { Button } from './ui/Button';
import { Card, PageHeader } from './ui/Layout';
import { Badge } from './ui/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const Economy: React.FC = () => {
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

  const handleSaveCalculation = () => {
    toast.success('Beräkning sparad', 'Den nya budgetberäkningen har sparats');
  setIsCalculateModalOpen(false);
};

const totalBudget = municipalityBreakdown.reduce((sum, item) => sum + item.budget, 0);
const totalActual = municipalityBreakdown.reduce((sum, item) => sum + item.actual, 0);
const totalVariance = totalActual - totalBudget;
const totalStudents = municipalityBreakdown.reduce((sum, item) => sum + item.students, 0);

return (
<div className ="space-y-6 animate-in fade-in duration-500">
<PageHeader
title = { t('eco_title') }
description ="Budgetuppföljning och kostnadsanalys för gymnasial utbildning i Region Skåne"
>
<div className ="flex gap-2">
<Button
variant ="outline"
leftIcon = { <Filter size={ 16} /> }
>
Filtrera
< / Button>
<Button
variant ="outline"
leftIcon = { <Download size={ 16} /> }
>
            Exportera rapport
< / Button>
<Button
onClick = {() => setIsCalculateModalOpen(true)}
leftIcon = { <Calculator size={ 16} /> }
>
            Ny budgetberäkning
< / Button>
< / div>
< / PageHeader>

{/* KPI Cards */ }
<div className ="grid grid-cols-1 md:grid-cols-4 gap-6">
<Card className ="relative overflow-hidden">
<div className ="flex justify-between items-start">
<div>
<p className ="text-sm font-medium text-slate-500">Totalbudget {selectedPeriod}</p>
<h3 className ="text-2xl font-bold text-slate-900 mt-1">{(totalBudget / 1000000).toFixed(1)}M kr</h3>
<p className ="text-xs text-slate-500 mt-1">{totalStudents.toLocaleString()} elever</p>
< / div>
<div className ="p-2 bg-indigo-50 rounded-lg text-indigo-600">
<PieChartIcon size = { 20} />
< / div>
< / div>
< / Card>

<Card className ="relative overflow-hidden">
<div className ="flex justify-between items-start">
<div>
<p className ="text-sm font-medium text-slate-500">Utfall hittills</p>
<h3 className ="text-2xl font-bold text-slate-900 mt-1">{(totalActual / 1000000).toFixed(1)}M kr</h3>
<p className ="text-xs text-slate-500 mt-1">t.o.m. december 2024</p>
< / div>
<div className ="p-2 bg-emerald-50 rounded-lg text-emerald-600">
<BarChart3 size = { 20} />
< / div>
< / div>
< / Card>

<Card className ="relative overflow-hidden">
<div className ="flex justify-between items-start">
<div>
<p className ="text-sm font-medium text-slate-500">Avvikelse</p>
<h3 className = {`text-2xl font-bold mt-1 ${totalVariance > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {totalVariance > 0 ? '+' : ''}{(totalVariance / 1000000).toFixed(1)}M kr
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {((totalVariance / totalBudget) * 100).toFixed(1)}% från budget
              </p>
            </div>
            <div className={`p - 2 rounded - lg ${ totalVariance > 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600' } `}>
              {totalVariance > 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Snitt per elev</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {Math.round(totalActual / totalStudents / 1000)}k kr
              </h3>
              <p className="text-xs text-emerald-600 mt-1 font-medium">-2.1% vs föregående år</p>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <Calculator size={20} />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <h3 className="text-base font-semibold text-slate-900 mb-4">Månatlig utveckling</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `${ value / 1000 } k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => `${ (value / 1000).toFixed(0) }k kr`}
                />
                <Line
                  type="monotone"
                  dataKey="budgeted"
                  name="Budgeterat"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Utfall"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Budget vs Actual by Municipality */}
        <Card>
          <h3 className="text-base font-semibold text-slate-900 mb-4">Top 5 kommuner (utfall vs budget)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={municipalityBreakdown.slice(0, 5)} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `${ value / 1000000 } M`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => `${ (value / 1000000).toFixed(1) }M kr`}
                />
                <Bar dataKey="budget" name="Budget" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Utfall" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Detailed Municipality Breakdown Table */}
      <Card noPadding>
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <h3 className="font-semibold text-slate-900">Kommunvis budgetuppföljning</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Kommun/Huvudman</th>
                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Antal elever</th>
                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Budget</th>
                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Utfall</th>
                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Avvikelse</th>
                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {municipalityBreakdown.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 text-right text-slate-700">{item.students.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono text-slate-700">
                    {(item.budget / 1000000).toFixed(1)}M kr
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-slate-900 font-medium">
                    {(item.actual / 1000000).toFixed(1)}M kr
                  </td>
                  <td className={`px - 6 py - 4 text - right font - mono font - medium ${ item.variance > 0 ? 'text-rose-600' : 'text-emerald-600' } `}>
                    {item.variance > 0 ? '+' : ''}{(item.variance / 1000000).toFixed(1)}M kr
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Badge variant={item.variance > 1000000 ? 'danger' : item.variance < -500000 ? 'success' : 'neutral'}>
                      {item.variance > 0 ? '+' : ''}{((item.variance / item.budget) * 100).toFixed(1)}%
                    </Badge>
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-semibold">
                <td className="px-6 py-4 text-slate-900">Totalt</td>
                <td className="px-6 py-4 text-right text-slate-900">{totalStudents.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-mono text-slate-900">
                  {(totalBudget / 1000000).toFixed(1)}M kr
                </td>
                <td className="px-6 py-4 text-right font-mono text-slate-900">
                  {(totalActual / 1000000).toFixed(1)}M kr
                </td>
                <td className={`px - 6 py - 4 text - right font - mono ${ totalVariance > 0 ? 'text-rose-600' : 'text-emerald-600' } `}>
                  {totalVariance > 0 ? '+' : ''}{(totalVariance / 1000000).toFixed(1)}M kr
                </td>
                <td className="px-6 py-4 text-right text-slate-900">
                  {totalVariance > 0 ? '+' : ''}{((totalVariance / totalBudget) * 100).toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Calculate Modal */}
      <Modal
        isOpen={isCalculateModalOpen}
        onClose={() => setIsCalculateModalOpen(false)}
        title="Ny budgetberäkning"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsCalculateModalOpen(false)}>Avbryt</Button>
            <Button onClick={handleSaveCalculation}>Spara beräkning</Button>
          </div>
        }
      >
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Läsår</label>
            <select className="w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white">
              <option>2024-2025</option>
              <option>2025-2026</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Prognosticerat antal elever</label>
            <input
              type="number"
              className="w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              defaultValue="4650"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Snittbelopp per elev (kr)</label>
            <input
              type="number"
              className="w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              defaultValue="115000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Kommentar</label>
            <textarea
              className="w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              rows={3}
              placeholder="Skriv en kommentar om beräkningsgrunden..."></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
};