import React, { useState } from 'react';
import {
    Book, FileText, Download, ExternalLink, Phone, Mail, HelpCircle,
    BriefcaseIcon, Calendar, Users, PlayCircle, FileQuestion, Clock,
    Search, Filter, ChevronRight, AlertCircle, CheckCircle, Newspaper
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Button } from './ui/Button';
import { Card, PageHeader } from './ui/Layout';
import { Badge } from './ui/Badge';

export const Internal: React.FC = () => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState('all');

    const documents = [
        {
            title: 'Användarmanual IKE-systemet v3.2',
            description: 'Fullständig manual för systemadministration och daglig användning',
            type: 'PDF',
            size: '4.2 MB',
            category: 'Manualer',
            updated: '2024-01-15',
            downloads: 234
        },
        {
            title: 'Riktlinjer för fakturering och ersättningar 2024',
            description: 'Uppdaterade riktlinjer enligt gällande avtal mellan kommuner',
            type: 'PDF',
            size: '1.8 MB',
            category: 'Riktlinjer',
            updated: '2024-01-10',
            downloads: 512
        },
        {
            title: 'Mall för elevunderlag och certifiering',
            description: 'Standardiserad mall för rapportering av elevdata',
            type: 'Excel',
            size: '650 KB',
            category: 'Mallar',
            updated: '2024-02-01',
            downloads: 189
        },
        {
            title: 'Dataskyddspolicy och GDPR-riktlinjer',
            description: 'Rutiner för hantering av känslig information och personuppgifter',
            type: 'PDF',
            size: '1.2 MB',
            category: 'Riktlinjer',
            updated: '2023-12-20',
            downloads: 445
        },
        {
            title: 'Årsrapport gymnasial utbildning 2023',
            description: 'Komplett sammanställning av elevantal, kostnader och kvalitetsmått',
            type: 'PDF',
            size: '8.9 MB',
            category: 'Rapporter',
            updated: '2024-01-30',
            downloads: 178
        },
        {
            title: 'Implementeringsguide för nya program',
            description: 'Steg-för-steg instruktioner för att lägga till nya program',
            type: 'PDF',
            size: '2.1 MB',
            category: 'Manualer',
            updated: '2024-01-05',
            downloads: 92
        },
        {
            title: 'Budget- och prognosrapport VT24',
            description: 'Aktuell budgetuppföljning och framskrivning för vårterminen',
            type: 'Excel',
            size: '1.5 MB',
            category: 'Rapporter',
            updated: '2024-02-08',
            downloads: 267
        },
        {
            title: 'Kontaktlista kommunala skolchefer',
            description: 'Uppdaterad förteckning över alla kommunala skolchefer i Skåne',
            type: 'Excel',
            size: '250 KB',
            category: 'Kontakt',
            updated: '2024-01-22',
            downloads: 145
        }
    ];

    const faqs = [
        {
            question: 'Hur lägger jag till en ny elev i systemet?',
            answer: 'Gå till fliken "Elever" i huvudmenyn och klicka på "Registrera ny elev". Fyll i obligatoriska fält (personnummer, namn, hemkommun) och välj aktuellt program. Systemet validerar automatiskt mot Skatteverkets folkbokföringsregister.',
            views: 892
        },
        {
            question: 'Vem kontaktar jag vid tekniska problem?',
            answer: 'Kontakta IT-supporten via ike-support@skane.se eller ring 044-309 30 00 (vardagar 08:00-17:00). Vid akuta systemfel utanför kontorstid, ring jouren på 070-123 45 67.',
            views: 654
        },
        {
            question: 'Hur ofta uppdateras kostnadsstatistiken?',
            answer: 'Statistiken uppdateras automatiskt varje natt kl 03:00 baserat på senaste faktureringen och elevregistret. Manuell uppdatering kan begäras via support.',
            views: 523
        },
        {
            question: 'Hur hanteras elevbyten mellan kommuner?',
            answer: 'Vid elevbyte uppdateras hemkommunen i elevregistret. Systemet genererar automatiskt en avstämningsrapport som skickas  både gamla och nya hemkommunen. Fakturering justeras från nästkommande månad.',
            views: 412
        },
        {
            question: 'Vilka säkerhetskopior finns och hur återställer jag data?',
            answer: 'Full säkerhetskopiering sker dagligen kl 02:00 med 30 dagars retention. Kontakta IT-support med ärendenummer för återställning. Kritiska data kan återställas inom 4 timmar.',
            views: 389
        },
        {
            question: 'Hur exporterar jag data för extern analys?',
            answer: 'Använd "Exportera"-funktionen i respektive modul. Data kan exporteras till Excel (.xlsx) eller CSV-format. Observera att exporterad data inte får innehålla personuppgifter utan godkännande från dataskyddsombudet.',
            views: 298
        }
    ];

    const training = [
        {
            title: 'IKE Grundutbildning',
            description: 'Introduktion till systemet för nya användare',
            duration: '2 timmar',
            nextDate: '2024-03-15',
            seats: 12,
            booked: 8
        },
        {
            title: 'Avancerad fakturahantering',
            description: 'Fördjupning i fakturering och ersättningsmodeller',
            duration: '3 timmar',
            nextDate: '2024-03-22',
            seats: 15,
            booked: 11
        },
        {
            title: 'Rapportering och analys',
            description: 'Skapa och tolka rapporter för verksamhetsuppföljning',
            duration: '2.5 timmar',
            nextDate: '2024-04-05',
            seats: 10,
            booked: 5
        }
    ];

    const news = [
        {
            title: 'Systemuppdatering planerad 15 mars',
            date: '2024-02-10',
            type: 'maintenance',
            excerpt: 'Planerat systemunderhåll kl 20:00-22:00. Systemet kommer vara otillgängligt under denna tid.'
        },
        {
            title: 'Ny funktion: Automatisk elevrapportering',
            date: '2024-02-08',
            type: 'feature',
            excerpt: 'Elevrapporter genereras nu automatiskt månadsvis och skickas till registrerade skolchefer.'
        },
        {
            title: 'Uppdaterade ersättningsnivåer från 1 mars',
            date: '2024-02-05',
            type: 'important',
            excerpt: 'Nya ersättningsnivåer träder i kraft. Se bifogad dokumentation för detaljer.'
        }
    ];

    const filteredDocs = activeCategory === 'all'
        ? documents
        : documents.filter(doc => doc.category === activeCategory);

    const categories = ['all', 'Manualer', 'Riktlinjer', 'Mallar', 'Rapporter', 'Kontakt'];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <PageHeader
                title={t('nav_internal')}
                description="Dokumentation, utbildning, support och resurser för IKE-systemet."
            >
                <Button variant="outline" leftIcon={<PlayCircle size={16} />}>
                    Videoguider
                </Button>
            </PageHeader>

            {/* News/Announcements Banner */}
            <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 shrink-0">
                        <Newspaper size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-2">Senaste nytt</h3>
                        <div className="space-y-2">
                            {news.slice(0, 2).map((item, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <Badge variant={item.type === 'important' ? 'danger' : item.type === 'maintenance' ? 'warning' : 'success'} className="text-xs mt-0.5">
                                        {item.type === 'important' ? 'Viktigt' : item.type === 'maintenance' ? 'Underhåll' : 'Nyhet'}
                                    </Badge>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{item.title}</p>
                                        <p className="text-xs text-slate-600">{item.excerpt}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0">
                        Visa alla <ChevronRight size={14} className="ml-1" />
                    </Button>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - Documents & Resources */}
                <div className="lg:col-span-2 space-y-6">
                    <Card noPadding>
                        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Book size={18} className="text-indigo-600" />
                                    <h3 className="font-semibold text-slate-900">Dokumentarkiv</h3>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Sök dokument..."
                                        className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 bg-white"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        {cat === 'all' ? 'Alla' : cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {filteredDocs.map((doc, index) => (
                                <div key={index} className="p-4 hover:bg-slate-50 transition-colors group">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0">
                                                <FileText size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-slate-900 mb-1">{doc.title}</h4>
                                                <p className="text-sm text-slate-600 mb-2">{doc.description}</p>
                                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                                    <span className="flex items-center gap-1">
                                                        <Badge variant="neutral" className="text-xs">{doc.category}</Badge>
                                                    </span>
                                                    <span>{doc.type} • {doc.size}</span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} /> Uppdaterad {doc.updated}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Download size={12} /> {doc.downloads} nedladdningar
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="shrink-0">
                                            <Download size={16} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card noPadding>
                        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
                            <HelpCircle size={18} className="text-emerald-600" />
                            <h3 className="font-semibold text-slate-900">Vanliga frågor (FAQ)</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {faqs.map((faq, index) => (
                                <div key={index} className="p-4 hover:bg-slate-50 transition-colors group">
                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 bg-emerald-50 rounded-full text-emerald-600 shrink-0 mt-0.5">
                                            <FileQuestion size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-slate-900 mb-2">{faq.question}</h4>
                                            <p className="text-sm text-slate-600 leading-relaxed mb-2">{faq.answer}</p>
                                            <p className="text-xs text-slate-500">{faq.views} visningar</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar - Support, Training & Links */}
                <div className="space-y-6">
                    <Card>
                        <h3 className="font-semibold text-slate-900 mb-4">Support & Kontakt</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">Teknisk Support</p>
                                    <p className="text-sm text-slate-600">044-309 30 00</p>
                                    <p className="text-xs text-slate-500 mt-1">Vardagar 08:00-17:00</p>
                                    <p className="text-xs text-rose-600 mt-0.5">Jour: 070-123 45 67</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">E-post Support</p>
                                    <a href="mailto:ike-support@skane.se" className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline">
                                        ike-support@skane.se
                                    </a>
                                    <p className="text-xs text-slate-500 mt-1">Svarar inom 24h</p>
                                </div>
                            </div>
                            <div className="pt-3 border-t border-slate-200">
                                <p className="text-xs text-slate-500 mb-2">Systemstatus</p>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={14} className="text-emerald-600" />
                                    <span className="text-sm font-medium text-emerald-600">Alla system operativa</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-semibold text-slate-900 mb-4">Utbildningar</h3>
                        <div className="space-y-3">
                            {training.map((course, index) => (
                                <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <h4 className="font-medium text-slate-900 text-sm mb-1">{course.title}</h4>
                                    <p className="text-xs text-slate-600 mb-2">{course.description}</p>
                                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} /> {course.duration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users size={12} /> {course.booked}/{course.seats} platser
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-indigo-600">{course.nextDate}</span>
                                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                                            Boka plats
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-3" size="sm">
                            <Calendar size={14} className="mr-2" /> Visa alla utbildningar
                        </Button>
                    </Card>

                    <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-indigo-700">
                        <h3 className="font-semibold text-lg mb-2">Behöver du extra hjälp?</h3>
                        <p className="text-indigo-100 text-sm mb-4">
                            Boka en personlig genomgång med vårt supportteam.
                        </p>
                        <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50">
                            Boka personlig genomgång
                        </Button>
                    </Card>

                    <Card>
                        <h3 className="font-semibold text-slate-900 mb-3 text-sm">Externa Länkar</h3>
                        <div className="space-y-1">
                            <a href="https://www.skolverket.se" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors text-sm group">
                                Skolverket
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="https://skr.se" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors text-sm group">
                                SKR - Sveriges Kommuner och Regioner
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="https://www.skane.se/organisation-politik/om-region-skane/utbildning/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors text-sm group">
                                Region Skåne - Utbildning
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="https://www.csn.se" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors text-sm group">
                                CSN - Centrala studiestödsnämnden
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
