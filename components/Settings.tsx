import React, { useState } from 'react';
import { User, Bell, Lock, Globe, Moon, Save } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useToast } from './ui/Toast';
import { Button } from './ui/Button';
import { Card, PageHeader } from './ui/Layout';

export const Settings: React.FC = () => {
    const { t, language, setLanguage } = useLanguage();
    const { showToast } = useToast();

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        weeklyReport: false,
        newMessages: true
    });

    const [theme, setTheme] = useState('light');

    const handleSave = () => {
        showToast('Inställningar sparade', 'success');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <PageHeader
                title={t('nav_settings')}
                description="Hantera dina personliga inställningar och preferenser."
            >
                <Button
                    onClick={handleSave}
                    leftIcon={<Save size={18} />}
                >
                    Spara ändringar
                </Button>
            </PageHeader>

            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <User size={20} />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">Min Profil</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Förnamn</label>
                        <input
                            type="text"
                            defaultValue="Anna"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Efternamn</label>
                        <input
                            type="text"
                            defaultValue="Andersson"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">E-postadress</label>
                        <input
                            type="email"
                            defaultValue="anna.andersson@regionen.se"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
            </Card>

            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                        <Bell size={20} />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">Notifieringar</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-900">E-postnotifieringar</p>
                            <p className="text-sm text-slate-500">Ta emot viktiga uppdateringar via e-post</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications.email}
                                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-900">Veckorapport</p>
                            <p className="text-sm text-slate-500">Sammanfattning av veckans aktiviteter</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications.weeklyReport}
                                onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                        <Globe size={20} />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">Språk & Region</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Språk</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as 'sv' | 'en')}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="sv">Svenska</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tidszon</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <option>Europe/Stockholm (CET)</option>
                            <option>UTC</option>
                        </select>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                        <Lock size={20} />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">Säkerhet</h2>
                </div>
                <div>
                    <Button variant="link" className="p-0 h-auto text-indigo-600 font-medium hover:text-indigo-700">
                        Byt lösenord
                    </Button>
                    <p className="text-sm text-slate-500 mt-1">Senast ändrat för 3 månader sedan</p>
                </div>
            </Card>
        </div>
    );
};
