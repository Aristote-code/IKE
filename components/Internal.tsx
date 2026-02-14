import React from 'react';
import { Book, FileText, Download, ExternalLink, Phone, Mail, HelpCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Internal: React.FC = () => {
    const { t } = useLanguage();

    const documents = [
        { title: 'Användarmanual IKE', type: 'PDF', size: '2.4 MB', category: 'Manualer' },
        { title: 'Riktlinjer för fakturahantering', type: 'PDF', size: '1.1 MB', category: 'Riktlinjer' },
        { title: 'Mall för elevunderlag', type: 'Excel', size: '450 KB', category: 'Mallar' },
        { title: 'Säkerhetspolicy', type: 'PDF', size: '890 KB', category: 'Riktlinjer' },
    ];

    const faqs = [
        { question: 'Hur lägger jag till en ny elev?', answer: 'Gå till Elevregistret och klicka på "Registrera ny elev". Följ sedan instruktionerna i formuläret.' },
        { question: 'Vem kontaktar jag vid tekniska problem?', answer: 'Kontakta IT-supporten på support@regionen.se eller ring 010-123 45 67.' },
        { question: 'Hur ofta uppdateras kostnadsstatistiken?', answer: 'Statistiken uppdateras automatiskt varje natt kl 03:00.' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('nav_internal')}</h1>
                    <p className="text-slate-500">Dokumentation, riktlinjer och support för IKE-systemet.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - Documents & Resources */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
                            <Book size={18} className="text-indigo-600" />
                            <h3 className="font-semibold text-slate-900">Dokumentarkiv</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {documents.map((doc, index) => (
                                <div key={index} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-slate-900">{doc.title}</h4>
                                            <p className="text-xs text-slate-500">{doc.category} • {doc.type} • {doc.size}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                        <Download size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
                            <HelpCircle size={18} className="text-emerald-600" />
                            <h3 className="font-semibold text-slate-900">Vanliga frågor (FAQ)</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {faqs.map((faq, index) => (
                                <div key={index} className="p-4">
                                    <h4 className="font-medium text-slate-900 mb-2">{faq.question}</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Support & Links */}
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">Support & Kontakt</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">Teknisk Support</p>
                                    <p className="text-sm text-slate-600">010-123 45 67</p>
                                    <p className="text-xs text-slate-500 mt-1">Öppet vardagar 08:00-17:00</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">E-post</p>
                                    <a href="mailto:support@regionen.se" className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline">
                                        support@regionen.se
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
                        <h3 className="font-semibold text-lg mb-2">Behöver du utbildning?</h3>
                        <p className="text-indigo-100 text-sm mb-4">
                            Boka in en genomgång av systemet för dig eller din personal.
                        </p>
                        <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors shadow-sm">
                            Boka utbildning
                        </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
                        <h3 className="font-semibold text-slate-900 mb-3 text-sm">Externa Länkar</h3>
                        <div className="space-y-2">
                            <a href="#" className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors text-sm group">
                                Skolverket
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="#" className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors text-sm group">
                                SKR - Sveriges Kommuner och Regioner
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="#" className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors text-sm group">
                                Regionens hemsida
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
