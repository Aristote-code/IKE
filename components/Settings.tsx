import React, { useState } from 'react';
import {
    User, Bell, Lock, Globe, Moon, Save, Phone, Building2,
    Shield, Eye, Download, Trash2, Key, Smartphone, Mail,
    Settings as SettingsIcon, Palette, Type, Accessibility
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
        showToast('Inställningar sparade', 'success');
    };

    const handleExportData = () => {
        showToast('Data exporteras...', 'info');
    };

    const handleDeleteAccount = () => {
        showToast('Kontakta systemadministratör för att radera konto', 'info');
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
            <PageHeader
                title={t('nav_settings')}
                description="Hantera dina personliga inställningar, preferenser och säkerhet."
            >
                <Button
                    onClick={handleSave}
                    leftIcon={<Save size={18} />}
                >
                    Spara alla ändringar
                </Button>
            </PageHeader>

            {/* Profile Information */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600">
                        <User size={22} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Profilinformation</h2>
                        <p className="text-sm text-slate-500">Dina personliga uppgifter och kontaktinformation</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Förnamn</label>
                        <input
                            type="text"
                            value={profile.firstName}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Efternamn</label>
                        <input
                            type="text"
                            value={profile.lastName}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Befattning</label>
                        <input
                            type="text"
                            value={profile.title}
                            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Avdelning</label>
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
                        <label className="block text-sm font-medium text-slate-700 mb-2">E-postadress</label>
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
                        <label className="block text-sm font-medium text-slate-700 mb-2">Telefonnummer</label>
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
                        <label className="block text-sm font-medium text-slate-700 mb-2">Kontor</label>
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
                        <h2 className="text-lg font-semibold text-slate-900">Notifieringar</h2>
                        <p className="text-sm text-slate-500">Välj hur du vill bli meddelad om uppdateringar</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-4">E-postnotifieringar</h3>
                        <div className="space-y-4">
                            {[
                                { key: 'emailGeneral', label: 'Allmänna uppdateringar', desc: 'Meddelanden om systemändringar och viktiga händelser' },
                                { key: 'emailInvoices', label: 'Fakturor och betalningar', desc: 'Notifieringar om nya fakturor och betalningsstatus' },
                                { key: 'emailReports', label: 'Rapporter', desc: 'Automatiskt genererade rapporter och analyser' },
                                { key: 'emailUpdates', label: 'Nyhetsuppdateringar', desc: 'Information om nya funktioner och förbättringar' }
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
                        <h3 className="text-sm font-semibold text-slate-700 mb-4">Övriga notifieringar</h3>
                        <div className="space-y-4">
                            {[
                                { key: 'smsAlerts', label: 'SMS-varningar', desc: 'Kritiska varningar via SMS', icon: Smartphone },
                                { key: 'pushNotifications', label: 'Push-notifieringar', desc: 'Notifieringar i webbläsaren', icon: Bell },
                                { key: 'weeklyReport', label: 'Veckosammanfattning', desc: 'Sammanfattning varje måndag morgon', icon: Mail },
                                { key: 'monthlyReport', label: 'Månadsrapport', desc: 'Detaljerad rapport varje månad', icon: Mail }
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
                        <label className="block text-sm font-medium text-slate-700 mb-2">Notifieringsfrekvens</label>
                        <select
                            value={notifications.frequency}
                            onChange={(e) => setNotifications({ ...notifications, frequency: e.target.value })}
                            className="w-full md:w-auto px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        >
                            <option value="immediate">Omedelbart</option>
                            <option value="daily">Daglig sammanfattning</option>
                            <option value="weekly">Veckovis sammanfattning</option>
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
                        <h2 className="text-lg font-semibold text-slate-900">Utseende & visning</h2>
                        <p className="text-sm text-slate-500">Anpassa gränssnittet efter dina preferenser</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">Tema</label>
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
                                    <span className="text-xs font-medium capitalize">{theme === 'light' ? 'Ljust' : theme === 'dark' ? 'Mörkt' : 'Auto'}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">Textstorlek</label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: 'small', label: 'Liten', size: 'text-xs' },
                                { value: 'medium', label: 'Medium', size: 'text-sm' },
                                { value: 'large', label: 'Stor', size: 'text-base' }
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
                        <label className="block text-sm font-medium text-slate-700 mb-2">Färgschema</label>
                        <select
                            value={appearance.colorScheme}
                            onChange={(e) => setAppearance({ ...appearance, colorScheme: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                            <option value="default">Standard (Indigo & Purple)</option>
                            <option value="blue">Blå</option>
                            <option value="green">Grön</option>
                            <option value="red">Röd</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-medium text-slate-900">Kompakt läge</p>
                                <p className="text-sm text-slate-500">Minska avstånd mellan element för mer innehåll</p>
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
                        <h2 className="text-lg font-semibold text-slate-900">Språk & Region</h2>
                        <p className="text-sm text-slate-500">Anpassa språk, tidszon och regionala inställningar</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Språk</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as 'sv' | 'en')}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="sv">Svenska</option>
                            <option value="en">English</option>
                        </select>
                        <p className="text-xs text-slate-500 mt-2">Ändra språk för hela gränssnittet</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tidszon</label>
                        <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                            <option>Europe/Stockholm (CET, UTC+1)</option>
                            <option>Europe/London (GMT, UTC+0)</option>
                            <option>UTC (UTC+0)</option>
                        </select>
                        <p className="text-xs text-slate-500 mt-2">På all tid och datumvisning</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Datumformat</label>
                        <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                            <option>ÅÅÅÅ-MM-DD (2024-01-15)</option>
                            <option>DD/MM/ÅÅÅÅ (15/01/2024)</option>
                            <option>MM/DD/ÅÅÅÅ (01/15/2024)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Valutaformat</label>
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
                        <h2 className="text-lg font-semibold text-slate-900">Tillgänglighet</h2>
                        <p className="text-sm text-slate-500">Anpassa för bättre användarupplevelse</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {[
                        { key: 'highContrast', label: 'Hög kontrast', desc: 'Öka kontrasten för bättre läsbarhet' },
                        { key: 'reducedMotion', label: 'Reducerad rörelse', desc: 'Minimera animationer och övergångar' },
                        { key: 'screenReader', label: 'Skärmläsarstöd', desc: 'Optimera för skärmläsare' },
                        { key: 'keyboardNav', label: 'Tangentbordsnavigering', desc: 'Förbättrad tangentbordsnavigering' }
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
                        <h2 className="text-lg font-semibold text-slate-900">Integritet & Data</h2>
                        <p className="text-sm text-slate-500">Hantera din data och integritetsinställningar</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-4">
                        {[
                            { key: 'dataSharing', label: 'Datadelning med partners', desc: 'Dela anonymiserad data med betrodda partners' },
                            { key: 'analytics', label: 'Användningsanalys', desc: 'Hjälp oss förbättra tjänsten genom användningsdata' },
                            { key: 'thirdParty', label: 'Tredjepartstjänster', desc: 'Tillåt integration med externa tjänster' }
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
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Datahantering</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="outline"
                                leftIcon={<Download size={18} />}
                                onClick={handleExportData}
                            >
                                Exportera mina data
                            </Button>
                            <Button
                                variant="outline"
                                leftIcon={<Trash2 size={18} />}
                                onClick={handleDeleteAccount}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                                Radera mitt konto
                            </Button>
                        </div>
                        <p className="text-xs text-slate-500 mt-3">
                            Data exporteras i JSON-format. Kontoradering kräver godkännande från systemadministratör.
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
                        <h2 className="text-lg font-semibold text-slate-900">Säkerhet</h2>
                        <p className="text-sm text-slate-500">Skydda ditt konto och din information</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-4">Lösenord</h3>
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900">Byt lösenord</p>
                                    <p className="text-sm text-slate-500">Senast ändrat 15 december 2025</p>
                                </div>
                                <Button variant="outline" leftIcon={<Key size={18} />}>
                                    Ändra lösenord
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                        <h3 className="text-sm font-semibold text-slate-700 mb-4">Tvåfaktorsautentisering</h3>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-medium text-slate-900">2FA via SMS eller autentiseringsapp</p>
                                <p className="text-sm text-slate-500">Extra säkerhetslager för inloggning</p>
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
                        <h3 className="text-sm font-semibold text-slate-700 mb-4">Sessionsinställningar</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Automatisk utloggning efter inaktivitet</label>
                            <select
                                value={security.sessionTimeout}
                                onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                                className="w-full md:w-auto px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            >
                                <option value="15">15 minuter</option>
                                <option value="30">30 minuter</option>
                                <option value="60">1 timme</option>
                                <option value="120">2 timmar</option>
                                <option value="never">Aldrig</option>
                            </select>
                            <p className="text-xs text-slate-500 mt-2">Rekommenderat: 30 minuter för säker användning</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Aktiva sessioner</h3>
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
                                                {session.device} {session.current && <span className="text-green-600">(Den här enheten)</span>}
                                            </p>
                                            <p className="text-xs text-slate-500">{session.location} • {session.time}</p>
                                        </div>
                                    </div>
                                    {!session.current && (
                                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                            Logga ut
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
                    Alla ändringar sparas automatiskt lokalt. Klicka på "Spara alla ändringar" för att synkronisera.
                </p>
                <Button
                    onClick={handleSave}
                    leftIcon={<Save size={18} />}
                    size="lg"
                >
                    Spara alla ändringar
                </Button>
            </div>
        </div>
    );
};
