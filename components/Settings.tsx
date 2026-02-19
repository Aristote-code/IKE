import React, { useState } from 'react';
import {
    User, Bell, Lock, Globe, Moon, Save, Phone, Building2,
    Shield, Eye, Download, Trash2, Key, Smartphone, Mail,
    Palette, Type, Accessibility
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useToast } from './ui/Toast';
import { Button } from './ui/Button';
import { Card, PageHeader } from './ui/Layout';

export const Settings: React.FC = () => {
    const { t, language, setLanguage } = useLanguage();
    const { showToast } = useToast();

    const [profile, setProfile] = useState({
        firstName: 'Anna',
        lastName: 'Andersson',
        email: 'anna.andersson@regionen.se',
        phone: '+46 70 123 45 67',
        title: 'Utbildningssamordnare',
        department: 'Utbildningsenheten',
        office: 'Malmö'
    });

    const [notifications, setNotifications] = useState({
        emailGeneral: true,
        emailInvoices: true,
        emailReports: false,
        emailUpdates: true,
        smsAlerts: false,
        pushNotifications: true,
        weeklyReport: false,
        monthlyReport: true,
        frequency: 'immediate'
    });

    const [appearance, setAppearance] = useState({
        theme: 'light',
        fontSize: 'medium',
        colorScheme: 'default',
        compactMode: false
    });

    const [accessibility, setAccessibility] = useState({
        highContrast: false,
        reducedMotion: false,
        screenReader: false,
        keyboardNav: true
    });

    const [privacy, setPrivacy] = useState({
        dataSharing: false,
        analytics: true,
        thirdParty: false
    });

    const [security, setSecurity] = useState({
        twoFactor: false,
        sessionTimeout: '30'
    });

    const handleSave = () => {
        showToast(t('set_toast_saved'), 'success');
    };

    const handleExportData = () => {
        showToast(t('set_toast_export'), 'info');
    };

    const handleDeleteAccount = () => {
        showToast(t('set_toast_delete'), 'info');
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
            <PageHeader
                title={t('nav_settings')}
                description={t('set_desc')}
            >
                <Button
                    onClick={handleSave}
                    leftIcon={<Save size={18} />}
                >
                    {t('set_btn_save_all')}
                </Button>
            </PageHeader>

            {/* Profile Information */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600">
                        <User size={22} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">{t('set_profile_title')}</h2>
                        <p className="text-sm text-slate-500">{t('set_profile_desc')}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_label_first')}</label>
                        <input
                            type="text"
                            value={profile.firstName}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_label_last')}</label>
                        <input
                            type="text"
                            value={profile.lastName}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_label_title')}</label>
                        <input
                            type="text"
                            value={profile.title}
                            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_label_dept')}</label>
                        <select
                            value={profile.department}
                            onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        >
                            <option>Utbildningsenheten</option>
                            <option>Administration</option>
                            <option>Ekonomi</option>
                            <option>IT-avdelningen</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_label_email')}</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_label_phone')}</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="tel"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_label_office')}</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select
                                value={profile.office}
                                onChange={(e) => setProfile({ ...profile, office: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            >
                                <option>Malmö</option>
                                <option>Lund</option>
                                <option>Helsingborg</option>
                                <option>Kristianstad</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Notifications */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600">
                        <Bell size={22} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">{t('set_notif_title')}</h2>
                        <p className="text-sm text-slate-500">{t('set_notif_desc')}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-4">{t('set_notif_email')}</h3>
                        <div className="space-y-4">
                            {[
                                { key: 'emailGeneral', label: t('set_notif_general'), desc: t('set_notif_general_desc') },
                                { key: 'emailInvoices', label: t('set_notif_invoices'), desc: t('set_notif_invoices_desc') },
                                { key: 'emailReports', label: t('set_notif_reports'), desc: t('set_notif_reports_desc') },
                                { key: 'emailUpdates', label: t('set_notif_updates'), desc: t('set_notif_updates_desc') }
                            ].map(({ key, label, desc }) => (
                                <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                                    <div>
                                        <p className="font-medium text-slate-900">{label}</p>
                                        <p className="text-sm text-slate-500">{desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications[key as keyof typeof notifications] as boolean}
                                            onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                        <h3 className="text-sm font-semibold text-slate-700 mb-4">{t('set_notif_other')}</h3>
                        <div className="space-y-4">
                            {[
                                { key: 'smsAlerts', label: t('set_notif_sms'), desc: t('set_notif_sms_desc'), icon: Smartphone },
                                { key: 'pushNotifications', label: t('set_notif_push'), desc: t('set_notif_push_desc'), icon: Bell },
                                { key: 'weeklyReport', label: t('set_notif_weekly'), desc: t('set_notif_weekly_desc'), icon: Mail },
                                { key: 'monthlyReport', label: t('set_notif_monthly'), desc: t('set_notif_monthly_desc'), icon: Mail }
                            ].map(({ key, label, desc, icon: Icon }) => (
                                <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <Icon size={18} className="text-slate-400" />
                                        <div>
                                            <p className="font-medium text-slate-900">{label}</p>
                                            <p className="text-sm text-slate-500">{desc}</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications[key as keyof typeof notifications] as boolean}
                                            onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_notif_freq')}</label>
                        <select
                            value={notifications.frequency}
                            onChange={(e) => setNotifications({ ...notifications, frequency: e.target.value })}
                            className="w-full md:w-auto px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        >
                            <option value="immediate">{t('set_freq_immediate')}</option>
                            <option value="daily">{t('set_freq_daily')}</option>
                            <option value="weekly">{t('set_freq_weekly')}</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Appearance & Display */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-purple-50 rounded-lg text-purple-600">
                        <Palette size={22} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">{t('set_appear_title')}</h2>
                        <p className="text-sm text-slate-500">{t('set_appear_desc')}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">{t('set_theme')}</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['light', 'dark', 'auto'].map((theme) => (
                                <button
                                    key={theme}
                                    onClick={() => setAppearance({ ...appearance, theme })}
                                    className={`px-4 py-3 rounded-lg border-2 transition-all ${appearance.theme === theme
                                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                                        : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <Moon size={18} className={`mx-auto mb-1 ${appearance.theme === theme ? 'text-purple-600' : 'text-slate-400'}`} />
                                    <span className="text-xs font-medium capitalize">
                                        {theme === 'light' ? t('set_theme_light') : theme === 'dark' ? t('set_theme_dark') : t('set_theme_auto')}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">{t('set_fontsize')}</label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: 'small', label: t('set_font_small'), size: 'text-xs' },
                                { value: 'medium', label: t('set_font_medium'), size: 'text-sm' },
                                { value: 'large', label: t('set_font_large'), size: 'text-base' }
                            ].map(({ value, label, size }) => (
                                <button
                                    key={value}
                                    onClick={() => setAppearance({ ...appearance, fontSize: value })}
                                    className={`px-4 py-3 rounded-lg border-2 transition-all ${appearance.fontSize === value
                                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                                        : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <Type size={18} className={`mx-auto mb-1 ${appearance.fontSize === value ? 'text-purple-600' : 'text-slate-400'}`} />
                                    <span className={`font-medium ${size}`}>{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_color_scheme')}</label>
                        <select
                            value={appearance.colorScheme}
                            onChange={(e) => setAppearance({ ...appearance, colorScheme: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                            <option value="default">{t('set_color_default')}</option>
                            <option value="blue">{t('set_color_blue')}</option>
                            <option value="green">{t('set_color_green')}</option>
                            <option value="red">{t('set_color_red')}</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-medium text-slate-900">{t('set_compact')}</p>
                                <p className="text-sm text-slate-500">{t('set_compact_desc')}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={appearance.compactMode}
                                    onChange={(e) => setAppearance({ ...appearance, compactMode: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Language & Region */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-600">
                        <Globe size={22} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">{t('set_lang_title')}</h2>
                        <p className="text-sm text-slate-500">{t('set_lang_desc')}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_lang_label')}</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as 'SV' | 'EN')}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="SV">Svenska</option>
                            <option value="EN">English</option>
                        </select>
                        <p className="text-xs text-slate-500 mt-2">{t('set_lang_help')}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_timezone')}</label>
                        <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                            <option>Europe/Stockholm (CET, UTC+1)</option>
                            <option>Europe/London (GMT, UTC+0)</option>
                            <option>UTC (UTC+0)</option>
                        </select>
                        <p className="text-xs text-slate-500 mt-2">{t('set_timezone_help')}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_date_format')}</label>
                        <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                            <option>ÅÅÅÅ-MM-DD (2024-01-15)</option>
                            <option>DD/MM/ÅÅÅÅ (15/01/2024)</option>
                            <option>MM/DD/ÅÅÅÅ (01/15/2024)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_currency')}</label>
                        <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                            <option>SEK (kr, Svenska kronor)</option>
                            <option>EUR (€, Euro)</option>
                            <option>USD ($, US Dollar)</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Accessibility */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600">
                        <Accessibility size={22} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">{t('set_access_title')}</h2>
                        <p className="text-sm text-slate-500">{t('set_access_desc')}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {[
                        { key: 'highContrast', label: t('set_access_contrast'), desc: t('set_access_contrast_desc') },
                        { key: 'reducedMotion', label: t('set_access_motion'), desc: t('set_access_motion_desc') },
                        { key: 'screenReader', label: t('set_access_reader'), desc: t('set_access_reader_desc') },
                        { key: 'keyboardNav', label: t('set_access_keyboard'), desc: t('set_access_keyboard_desc') }
                    ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                            <div>
                                <p className="font-medium text-slate-900">{label}</p>
                                <p className="text-sm text-slate-500">{desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={accessibility[key as keyof typeof accessibility]}
                                    onChange={(e) => setAccessibility({ ...accessibility, [key]: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Privacy & Data */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-cyan-50 rounded-lg text-cyan-600">
                        <Eye size={22} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">{t('set_privacy_title')}</h2>
                        <p className="text-sm text-slate-500">{t('set_privacy_desc')}</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-4">
                        {[
                            { key: 'dataSharing', label: t('set_privacy_sharing'), desc: t('set_privacy_sharing_desc') },
                            { key: 'analytics', label: t('set_privacy_analytics'), desc: t('set_privacy_analytics_desc') },
                            { key: 'thirdParty', label: t('set_privacy_thirdparty'), desc: t('set_privacy_thirdparty_desc') }
                        ].map(({ key, label, desc }) => (
                            <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                                <div>
                                    <p className="font-medium text-slate-900">{label}</p>
                                    <p className="text-sm text-slate-500">{desc}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={privacy[key as keyof typeof privacy]}
                                        onChange={(e) => setPrivacy({ ...privacy, [key]: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">{t('set_data_mgmt')}</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="outline"
                                leftIcon={<Download size={18} />}
                                onClick={handleExportData}
                            >
                                {t('set_btn_export')}
                            </Button>
                            <Button
                                variant="outline"
                                leftIcon={<Trash2 size={18} />}
                                onClick={handleDeleteAccount}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                                {t('set_btn_delete')}
                            </Button>
                        </div>
                        <p className="text-xs text-slate-500 mt-3">
                            {t('set_data_help')}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Security */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-red-50 rounded-lg text-red-600">
                        <Shield size={22} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">{t('set_security_title')}</h2>
                        <p className="text-sm text-slate-500">{t('set_security_desc')}</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-4">{t('set_password')}</h3>
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900">{t('set_change_pwd')}</p>
                                    <p className="text-sm text-slate-500">{t('set_pwd_last_changed')}</p>
                                </div>
                                <Button variant="outline" leftIcon={<Key size={18} />}>
                                    {t('set_btn_change_pwd')}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                        <h3 className="text-sm font-semibold text-slate-700 mb-4">{t('set_2fa')}</h3>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-medium text-slate-900">{t('set_2fa_label')}</p>
                                <p className="text-sm text-slate-500">{t('set_2fa_desc')}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={security.twoFactor}
                                    onChange={(e) => setSecurity({ ...security, twoFactor: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                        <h3 className="text-sm font-semibold text-slate-700 mb-4">{t('set_session')}</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">{t('set_session_timeout')}</label>
                            <select
                                value={security.sessionTimeout}
                                onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                                className="w-full md:w-auto px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            >
                                <option value="15">15 min</option>
                                <option value="30">30 min</option>
                                <option value="60">1 {t('set_time_hour')}</option>
                                <option value="120">2 {t('set_time_hours')}</option>
                                <option value="never">{t('set_time_never')}</option>
                            </select>
                            <p className="text-xs text-slate-500 mt-2">{t('set_session_timeout_desc')}</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">{t('set_active_sessions')}</h3>
                        <div className="space-y-3">
                            {[
                                { device: 'MacBook Pro', location: 'Malmö, Sverige', time: 'Aktiv nu', current: true },
                                { device: 'iPhone 14', location: 'Malmö, Sverige', time: '2 timmar sedan', current: false }
                            ].map((session, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded ${session.current ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-600'}`}>
                                            <Smartphone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">
                                                {session.device} {session.current && <span className="text-green-600">{t('set_current_device')}</span>}
                                            </p>
                                            <p className="text-xs text-slate-500">{session.location} • {session.time}</p>
                                        </div>
                                    </div>
                                    {!session.current && (
                                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                            {t('sl_logout')}
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Footer Actions */}
            <div className="flex justify-between items-center pt-6 pb-4 border-t border-slate-200">
                <p className="text-sm text-slate-500">
                    {t('set_footer_text')}
                </p>
                <Button
                    onClick={handleSave}
                    leftIcon={<Save size={18} />}
                    size="lg"
                >
                    {t('set_btn_save_all')}
                </Button>
            </div>
        </div>
    );
};
