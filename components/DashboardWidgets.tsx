import React from 'react';
import { Clock, CheckCircle2, AlertTriangle, ArrowRight, UserPlus, FileText, ChevronRight } from 'lucide-react';
import { Task } from '../types';
import { useLanguage } from '../LanguageContext';

export const StatsWidget: React.FC = () => {
    const { t } = useLanguage();

    const stats = [
        { label: t('dash_active_students'), value: '432', change: '+12', trend: 'up' },
        { label: t('dash_total_budget'), value: '42.5M', change: 'kr', trend: 'neutral' },
        { label: t('dash_pending_cases'), value: '8', change: '-2', trend: 'down' },
        { label: t('dash_avg_cost'), value: '108k', change: '+2%', trend: 'up' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-700' :
                                stat.trend === 'down' ? 'bg-amber-50 text-amber-700' :
                                    'bg-slate-100 text-slate-600'
                            }`}>
                            {stat.change}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const TaskWidget: React.FC = () => {
    const { t } = useLanguage();

    const tasks: Task[] = [
        { id: 1, title: 'Preliminary Budget 2025', description: 'Review and approve budget proposal.', type: 'action', priority: 'high', date: 'Today' },
        { id: 2, title: 'Missing Student Data', description: '3 students from Lund missing SSN.', type: 'warning', priority: 'medium', date: 'Yesterday' },
        { id: 3, title: 'New Price Model', description: 'Updated pricing for IB program.', type: 'info', priority: 'low', date: '2 days ago' },
    ];

    const getIcon = (type: Task['type']) => {
        switch (type) {
            case 'action': return <CheckCircle2 size={18} className="text-blue-600" />;
            case 'warning': return <AlertTriangle size={18} className="text-amber-600" />;
            case 'info': return <FileText size={18} className="text-slate-600" />;
            default: return <Clock size={18} className="text-slate-600" />;
        }
    };

    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{t('dash_my_tasks')}</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    {t('dash_view_all')} <ArrowRight size={14} />
                </button>
            </div>
            <div className="divide-y divide-slate-50 flex-1 overflow-auto">
                {tasks.map((task) => (
                    <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors flex gap-4 group cursor-pointer">
                        <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${task.type === 'action' ? 'bg-blue-50' :
                                task.type === 'warning' ? 'bg-amber-50' : 'bg-slate-100'
                            }`}>
                            {getIcon(task.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium text-slate-900 truncate pr-2">{task.title}</h4>
                                <span className="text-xs text-slate-400 whitespace-nowrap">{task.date}</span>
                            </div>
                            <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">{task.description}</p>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ActivityWidget: React.FC = () => {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="p-5 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900">Recent Activity</h3>
            </div>
            <div className="p-5 space-y-6">
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex gap-3">
                        <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                        <div>
                            <p className="text-sm text-slate-800">
                                <span className="font-medium">Maria Larsson</span> added a new placement for <span className="font-medium">Anders Olsson</span>.
                            </p>
                            <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
