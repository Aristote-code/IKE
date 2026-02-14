import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Download, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Analysis: React.FC = () => {
    const { t } = useLanguage();

    const data = [
        { name: 'Jan', students: 400, cost: 2400 },
        { name: 'Feb', students: 300, cost: 1398 },
        { name: 'Mar', students: 200, cost: 9800 },
        { name: 'Apr', students: 278, cost: 3908 },
        { name: 'May', students: 189, cost: 4800 },
        { name: 'Jun', students: 239, cost: 3800 },
        { name: 'Jul', students: 349, cost: 4300 },
    ];

    const pieData = [
        { name: 'Gymnasium', value: 400 },
        { name: 'Anpassad Gymnasieskola', value: 300 },
        { name: 'Komvux', value: 300 },
        { name: 'Yrkeshögskola', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('nav_analysis')}</h1>
                    <p className="text-slate-500">Uppföljning och statistik för regionens utbildningskostnader.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Calendar size={16} />
                        Senaste 6 månaderna
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors">
                        <Download size={16} />
                        Exportera rapport
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Kostnad (YTD)</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-2">42.5M kr</h3>
                        <span className="text-sm text-emerald-600 font-medium flex items-center mt-2">
                            <TrendingUp size={16} className="mr-1" /> +8.2% vs föregående år
                        </span>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                        <DollarSign size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Genomsnittlig Elevkostnad</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-2">98,500 kr</h3>
                        <span className="text-sm text-rose-600 font-medium flex items-center mt-2">
                            <TrendingUp size={16} className="mr-1" /> +2.1% ökning
                        </span>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                        <Users size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Aktiva Ärenden</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-2">156</h3>
                        <span className="text-sm text-slate-500 font-medium flex items-center mt-2">
                            <Activity size={16} className="mr-1" /> 12 nya denna vecka
                        </span>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                        <Activity size={24} />
                    </div>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">Kostnadsutveckling</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#1E293B' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="cost" name="Kostnad (tkr)" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">Elevfördelning per Skolform</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Aktiva Elever per Månad</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: '#F1F5F9' }}
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                            />
                            <Legend />
                            <Bar dataKey="students" name="Antal Elever" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
