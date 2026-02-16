import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Calendar, Download, TrendingUp, TrendingDown, Users, GraduationCap, BookOpen, Target, Filter, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Button } from './ui/Button';
import { Card, PageHeader } from './ui/Layout';
import { Badge } from './ui/Badge';

export const Analysis: React.FC = () => {
    const { t } = useLanguage();
    const [filterPeriod, setFilterPeriod] = useState('VT24');

    // Realistic Swedish education data - student enrollment trends
    const enrollmentTrend = [
        { month: 'Aug 23', totalStudents: 4280, newEnrollments: 1120, withdrawals: 45 },
        { month: 'Sep 23', totalStudents: 4310, newEnrollments: 52, withdrawals: 22 },
        { month: 'Okt 23', totalStudents: 4298, newEnrollments: 18, withdrawals: 30 },
        { month: 'Nov 23', totalStudents: 4305, newEnrollments: 15, withdrawals: 8 },
        { month: 'Dec 23', totalStudents: 4289, newEnrollments: 3, withdrawals: 19 },
        { month: 'Jan 24', totalStudents: 4312, newEnrollments: 38, withdrawals: 15 },
        { month: 'Feb 24', totalStudents: 4345, newEnrollments: 42, withdrawals: 9 },
    ];

    // Program distribution across Region Skåne
    const programDistribution = [
        { program: 'Naturvetens...', students: 892, percentage: 20.5, trend: '+5%' },
        { program: 'Samhällsvet...', students: 785, percentage: 18.1, trend: '+2%' },
        { program: 'Teknikprog.', students: 654, percentage: 15.0, trend: '+8%' },
        { program: 'Ekonomipro...', students: 612, percentage: 14.1, trend: '+1%' },
        { program: 'Handels & A...', students: 456, percentage: 10.5, trend: '-2%' },
        { program: 'Vård & omsorg', students: 378, percentage: 8.7, trend: '+3%' },
        { program: 'Övriga prog.', students: 568, percentage: 13.1, trend: '+1%' },
    ];

    // Municipality performance comparison
    const municipalityPerformance = [
        { name: 'Malmö', completion: 85, satisfaction: 4.2, costEfficiency: 78, quality: 88 },
        { name: 'Lund', completion: 92, satisfaction: 4.6, costEfficiency: 85, quality: 91 },
        { name: 'Helsingborg', completion: 88, satisfaction: 4.3, costEfficiency: 80, quality: 86 },
        { name: 'Kristianstad', completion: 90, satisfaction: 4.4, costEfficiency: 86, quality: 89 },
        { name: 'Ystad', completion: 91, satisfaction: 4.5, costEfficiency: 88, quality: 90 },
    ];

    // Cost per student by program
    const costByProgram = [
        { program: 'Naturvetenskap', cost: 115000, benchmark: 110000 },
        { program: 'Teknik', cost: 128000, benchmark: 120000 },
        { program: 'Samhällsvetenskap', cost: 98000, benchmark: 95000 },
        { program: 'Ekonomi', cost: 102000, benchmark: 100000 },
        { program: 'Vård & omsorg', cost: 105000, benchmark: 103000 },
        { program: 'Handel & administration', cost: 95000, benchmark: 92000 },
    ];

    const totalStudents = 4345;
    const avgCompletionRate = 88.2;
    const avgCostPerStudent = 110500;
    const newStudentsThisMonth = 42;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <PageHeader
                title={t('nav_analysis')}
                description="Analys och uppföljning av elevantal, kostnader och kvalitet inom gymnasial utbildning i Region Skåne."
            >
                <div className="flex gap-2">
                    <div className="relative">
                        <select
                            value={filterPeriod}
                            onChange={(e) => setFilterPeriod(e.target.value)}
                            className="px-4 py-2 pr-10 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors appearance-none cursor-pointer focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        >
                            <option value="HT23">HT23 (Aug-Dec 2023)</option>
                            <option value="VT24">VT24 (Jan-Jun 2024)</option>
                            <option value="HT24">HT24 (Aug-Dec 2024)</option>
                        </select>
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                    </div>
                    <Button variant="outline" leftIcon={<Filter size={16} />}>
                        Filtrera
                    </Button>
                    <Button leftIcon={<Download size={16} />}>
                        Exportera rapport
                    </Button>
                </div>
            </PageHeader>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Totalt antal elever</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalStudents.toLocaleString()}</h3>
                            <span className="text-sm text-emerald-600 font-medium flex items-center mt-1">
                                <TrendingUp size={16} className="mr-1" /> +1.5% vs föregående termin
                            </span>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                            <Users size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Genomströmning</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-1">{avgCompletionRate}%</h3>
                            <span className="text-sm text-emerald-600 font-medium flex items-center mt-1">
                                <TrendingUp size={16} className="mr-1" /> +2.3% vs föregående år
                            </span>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                            <GraduationCap size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Genomsnittskostnad/elev</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-1">{avgCostPerStudent.toLocaleString()} kr</h3>
                            <span className="text-sm text-rose-600 font-medium flex items-center mt-1">
                                <TrendingUp size={16} className="mr-1" /> +3.2% ökning
                            </span>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                            <Target size={24} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Nya inskrivningar</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-1">{newStudentsThisMonth}</h3>
                            <span className="text-sm text-slate-500 font-medium flex items-center mt-1">
                                <BookOpen size={16} className="mr-1" /> Denna månad
                            </span>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <BookOpen size={24} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts Row 1 - Enrollment Trend & Program Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-base font-semibold text-slate-900 mb-4">Elevutveckling över tid</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={enrollmentTrend} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
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
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        fontSize: '12px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="totalStudents"
                                    name="Totalt antal elever"
                                    stroke="#4f46e5"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="newEnrollments"
                                    name="Nya inskrivningar"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: '#10b981' }}
                                    strokeDasharray="5 5"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-base font-semibold text-slate-900 mb-4">Programfördelning</h3>
                    <div className="space-y-3">
                        {programDistribution.map((prog, index) => (
                            <div key={index} className="group hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-slate-700">{prog.program}</span>
                                    <div className="flex items-center gap-3">
                                        <Badge variant={prog.trend.startsWith('+') ? 'success' : 'neutral'} className="text-xs">
                                            {prog.trend}
                                        </Badge>
                                        <span className="text-sm font-semibold text-slate-900">{prog.students}</span>
                                    </div>
                                </div>
                                <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all"
                                        style={{ width: `${prog.percentage}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-xs text-slate-500">{prog.percentage.toFixed(1)}% av totalt</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Charts Row 2 - Cost Analysis & Municipality Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-base font-semibold text-slate-900 mb-4">Kostnad per elev (program)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={costByProgram} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="program"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 11 }}
                                    angle={-15}
                                    textAnchor="end"
                                    height={80}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    tickFormatter={(value) => `${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        fontSize: '12px'
                                    }}
                                    formatter={(value: any) => `${value.toLocaleString()} kr`}
                                />
                                <Bar dataKey="benchmark" name="Benchmark" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="cost" name="Faktisk kostnad" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-base font-semibold text-slate-900 mb-4">Kommunprestanda (nyckeltal)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={municipalityPerformance}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                                <Radar name="Genomströmning %" dataKey="completion" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.3} />
                                <Radar name="Kostnadseffektivitet" dataKey="costEfficiency" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                                <Radar name="Kvalitetsindex" dataKey="quality" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Detailed Municipality Table */}
            <Card noPadding>
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-900">Kommunvis prestandajämförelse</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Kommun</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Genomströmning</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Nöjdhet (1-5)</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Kostnadseffektivitet</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Kvalitetsindex</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {municipalityPerformance.map((muni, index) => (
                                <tr key={index} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-slate-900">{muni.name}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Badge variant={muni.completion >= 90 ? 'success' : muni.completion >= 85 ? 'info' : 'neutral'}>
                                            {muni.completion}%
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-700">{muni.satisfaction.toFixed(1)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                                                    style={{ width: `${muni.costEfficiency}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-slate-600 w-8">{muni.costEfficiency}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-900 font-medium">{muni.quality}</td>
                                    <td className="px-6 py-4 text-right">
                                        <TrendingUp className="inline text-emerald-600" size={16} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
