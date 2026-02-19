import React, { useState } from 'react';
import { Users, Shield, Activity, Search, Plus, MoreVertical, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Modal } from './ui/Modal';
import { useToast } from './ui/Toast';

export const Administration: React.FC = () => {
    const { t } = useLanguage();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'logs'>('users');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    // Mock Data
    const users = [
        { id: 1, name: 'Anna Andersson', email: 'anna.andersson@regionen.se', role: 'Administratör', status: 'active', lastLogin: '2024-03-15 08:30' },
        { id: 2, name: 'Erik Svensson', email: 'erik.svensson@skola.se', role: 'Handläggare', status: 'active', lastLogin: '2024-03-14 14:20' },
        { id: 3, name: 'Lars Olofsson', email: 'lars.olofsson@kommun.se', role: 'Läsbehörig', status: 'inactive', lastLogin: '2024-02-28 09:15' },
    ];

    const roles = [
        { id: 1, name: 'Administratör', users: 5, description: 'Fullständig tillgång till systemet inklusive konfiguration och användarhantering.' },
        { id: 2, name: 'Handläggare', users: 12, description: 'Kan hantera ärenden, registrera elever och skapa underlag.' },
        { id: 3, name: 'Rektor', users: 8, description: 'Kan se och hantera sin egen skolas elever och personal.' },
        { id: 4, name: 'Läsbehörig', users: 20, description: 'Endast läsrättigheter för uppföljning och statistik.' },
    ];

    const logs = [
        { id: 1, user: 'Anna Andersson', action: 'Skapade ny faktura', target: 'FAK-2024-001', time: '10:42', type: 'create' },
        { id: 2, user: 'Erik Svensson', action: 'Uppdaterade elevuppgifter', target: 'Elev #12345', time: '09:15', type: 'update' },
        { id: 3, user: 'System', action: 'Automatisk säkerhetskopiering', target: 'Databas', time: '03:00', type: 'system' },
        { id: 4, user: 'Lars Olofsson', action: 'Inloggningsförsök misslyckades', target: '-', time: 'Igår 23:14', type: 'warning' },
    ];

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        showToast(t('admin_toast_created'), 'success');
        setIsAddUserModalOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('nav_admin')}</h1>
                    <p className="text-slate-500">{t('admin_desc')}</p>
                </div>
                <button
                    onClick={() => setIsAddUserModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors"
                >
                    <Plus size={16} />
                    {t('admin_btn_add_user')}
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${activeTab === 'users'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        <Users size={16} />
                        {t('admin_tab_users')}
                    </button>
                    <button
                        onClick={() => setActiveTab('roles')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${activeTab === 'roles'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        <Shield size={16} />
                        {t('admin_tab_roles')}
                    </button>
                    <button
                        onClick={() => setActiveTab('logs')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${activeTab === 'logs'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        <Activity size={16} />
                        {t('admin_tab_logs')}
                    </button>
                </nav>
            </div>

            {/* Content */}
            <div className="animate-fade-in">
                {activeTab === 'users' && (
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                            <h3 className="font-semibold text-slate-900">{t('admin_users_title')}</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Sök användare..."
                                    className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                                />
                                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                            </div>
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3">{t('admin_col_name')}</th>
                                    <th className="px-6 py-3">{t('admin_col_role')}</th>
                                    <th className="px-6 py-3">{t('admin_col_status')}</th>
                                    <th className="px-6 py-3">{t('admin_col_last_login')}</th>
                                    <th className="px-6 py-3 text-right">{t('admin_col_action')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-slate-900">{user.name}</div>
                                                <div className="text-slate-500 text-xs">{user.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.status === 'active' ? (
                                                <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium">
                                                    <CheckCircle size={14} /> Aktiv
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-slate-500 text-xs font-medium">
                                                    <XCircle size={14} /> Inaktiv
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">{user.lastLogin}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'roles' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {roles.map((role) => (
                            <div key={role.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                                        <Shield size={24} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-500">
                                        {role.users} {t('admin_role_users')}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">{role.name}</h3>
                                <p className="text-slate-500 text-sm mb-4">{role.description}</p>
                                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">
                                    Redigera behörigheter &rarr;
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'logs' && (
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                            <h3 className="font-semibold text-slate-900">{t('admin_logs_title')}</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {logs.map((log) => (
                                <div key={log.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                                    <div className={`p-2 rounded-full mt-1 ${log.type === 'create' ? 'bg-emerald-50 text-emerald-600' :
                                        log.type === 'update' ? 'bg-amber-50 text-amber-600' :
                                            log.type === 'warning' ? 'bg-rose-50 text-rose-600' :
                                                'bg-slate-100 text-slate-600'
                                        }`}>
                                        <Activity size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-medium text-slate-900">{log.action}</p>
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Clock size={12} /> {log.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">
                                            av <span className="font-medium text-slate-700">{log.user}</span>
                                            {log.target !== '-' && (
                                                <> på <span className="font-medium text-slate-700">{log.target}</span></>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Add User Modal */}
            <Modal
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                title={t('admin_modal_title')}
            >
                <form onSubmit={handleAddUser} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin_label_first')}</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin_label_last')}</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin_label_email')}</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('admin_label_role')}</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="admin">Administratör</option>
                            <option value="manager">Handläggare</option>
                            <option value="principal">Rektor</option>
                            <option value="viewer">Läsbehörig</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => setIsAddUserModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                        >
                            {t('sl_cancel')}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                        >
                            {t('admin_btn_create')}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
