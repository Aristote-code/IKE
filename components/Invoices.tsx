import React, { useState } from 'react';
import { Download, FileText, Filter, Search, MoreVertical, CheckCircle, Clock, AlertCircle, Send, Edit2, Trash2, Plus, Receipt } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Invoice } from '../types';
import { useToast } from './ui/Toast';
import { Button } from './ui/Button';
import { Card, PageHeader } from './ui/Layout';
import { Badge } from './ui/Badge';
import { Drawer } from './ui/Drawer';
import { DetailsDrawer, DetailsRow, DetailsSection } from './ui/DetailsDrawer';
import { Modal } from './ui/Modal';

export const Invoices: React.FC = () => {
    const { t } = useLanguage();
    const { showToast } = useToast();
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Realistic Swedish education invoicing data with more detail
    const invoices: Invoice[] = [
        {
            id: '1',
            invoiceNumber: 'IKE-2024-01-0156',
            recipientName: 'Malmö Stad - Utbildningsförvaltningen',
            amount: 14850000,
            status: 'Paid',
            date: '2024-01-10',
            dueDate: '2024-02-09',
            paidDate: '2024-02-05',
            items: [
                { description: 'Gymnasial utbildning - 135 elever VT24', quantity: 135, unitPrice: 110000, total: 14850000 }
            ]
        },
        {
            id: '2',
            invoiceNumber: 'IKE-2024-02-0234',
            recipientName: 'Lunds kommun - Bildningsförvaltningen',
            amount: 7810000,
            status: 'Sent',
            date: '2024-02-01',
            dueDate: '2024-03-03',
            items: [
                { description: 'Gymnasial utbildning - 71 elever VT24', quantity: 71, unitPrice: 110000, total: 7810000 }
            ]
        },
        {
            id: '3',
            invoiceNumber: 'IKE-2024-01-0089',
            recipientName: 'Helsingborgs Stad - Barn- & Ungdomsförvaltningen',
            amount: 9680000,
            status: 'Overdue',
            date: '2024-01-05',
            dueDate: '2024-02-04',
            items: [
                { description: 'Gymnasial utbildning - 88 elever VT24', quantity: 88, unitPrice: 110000, total: 9680000 }
            ]
        },
        {
            id: '4',
            invoiceNumber: 'IKE-2024-02-0312',
            recipientName: 'Kristianstads kommun - Utbildningsförvaltningen',
            amount: 5170000,
            status: 'Draft',
            date: '2024-02-15',
            dueDate: '2024-03-17',
            items: [
                { description: 'Gymnasial utbildning - 47 elever VT24', quantity: 47, unitPrice: 110000, total: 5170000 }
            ]
        },
        {
            id: '5',
            invoiceNumber: 'IKE-2024-02-0298',
            recipientName: 'Ystads kommun - Bildningsförvaltningen',
            amount: 3190000,
            status: 'Sent',
            date: '2024-02-08',
            dueDate: '2024-03-10',
            items: [
                { description: 'Gymnasial utbildning - 29 elever VT24', quantity: 29, unitPrice: 110000, total: 3190000 }
            ]
        },
        {
            id: '6',
            invoiceNumber: 'IKE-2024-02-0301',
            recipientName: 'Bjuvs kommun - Barn- & Utbildningsförvaltningen',
            amount: 1870000,
            status: 'Sent',
            date: '2024-02-09',
            dueDate: '2024-03-11',
            items: [
                { description: 'Gymnasial utbildning - 17 elever VT24', quantity: 17, unitPrice: 110000, total: 1870000 }
            ]
        },
        {
            id: '7',
            invoiceNumber: 'IKE-2024-02-0267',
            recipientName: 'Bromölla kommun - Bildningsförvaltningen',
            amount: 2530000,
            status: 'Paid',
            date: '2024-02-05',
            dueDate: '2024-03-07',
            paidDate: '2024-03-01',
            items: [
                { description: 'Gymnasial utbildning - 23 elever VT24', quantity: 23, unitPrice: 110000, total: 2530000 }
            ]
        },
    ];

    const handleDownload = (invoiceNum: string) => {
        showToast(`Laddar ner ${invoiceNum}...`, 'info');
        setTimeout(() => {
            showToast(`Faktura ${invoiceNum} nedladdad`, 'success');
        }, 1500);
    };

    const handleSend = (invoiceNum: string) => {
        showToast(`Skickar faktura ${invoiceNum}...`, 'info');
        setTimeout(() => {
            showToast(`Faktura ${invoiceNum} skickad`, 'success');
        }, 1500);
    };

    const getStatusVariant = (status: string): 'success' | 'info' | 'danger' | 'neutral' | 'default' | 'warning' => {
        switch (status) {
            case 'Paid': return 'success';
            case 'Sent': return 'info';
            case 'Overdue': return 'danger';
            case 'Draft': return 'neutral';
            default: return 'default';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Paid': return <CheckCircle size={14} className="mr-1" />;
            case 'Sent': return <Clock size={14} className="mr-1" />;
            case 'Overdue': return <AlertCircle size={14} className="mr-1" />;
            default: return null;
        }
    };

    const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalPaid = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
    const totalOverdue = invoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);
    const totalPending = invoices.filter(inv => inv.status === 'Sent').reduce((sum, inv) => sum + inv.amount, 0);
    const draftCount = invoices.filter(inv => inv.status === 'Draft').length;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <PageHeader
                title={t('nav_invoices')}
                description="Hantera utgående fakturor och underlag för interkommunal ersättning."
            >
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Sök faktura eller kommun..."
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 bg-white"
                        />
                    </div>
                    <Button variant="outline" leftIcon={<Filter size={16} />}>
                        Filtrera
                    </Button>
                    <Button variant="outline" leftIcon={<Download size={16} />}>
                        Exportera lista
                    </Button>
                    <Button leftIcon={<Plus size={16} />} onClick={() => setIsCreateModalOpen(true)}>
                        Skapa faktura
                    </Button>
                </div>
            </PageHeader>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Totalt fakturerat</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{(totalInvoiced / 1000000).toFixed(1)}M kr</h3>
                            <p className="text-xs text-slate-500 mt-1">VT24 period</p>
                        </div>
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <Receipt size={20} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Betalt</p>
                            <h3 className="text-2xl font-bold text-emerald-600 mt-1">{(totalPaid / 1000000).toFixed(1)}M kr</h3>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(totalPaid / totalInvoiced) * 100}%` }}></div>
                            </div>
                        </div>
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                            <CheckCircle size={20} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Väntande</p>
                            <h3 className="text-2xl font-bold text-blue-600 mt-1">{(totalPending / 1000000).toFixed(1)}M kr</h3>
                            <p className="text-xs text-slate-500 mt-1">
                                {invoices.filter(inv => inv.status === 'Sent').length} fakturor
                            </p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Clock size={20} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Förfallet</p>
                            <h3 className="text-2xl font-bold text-rose-600 mt-1">{(totalOverdue / 1000000).toFixed(1)}M kr</h3>
                            <span className="text-xs text-rose-600 font-medium mt-1 block">Kräver åtgärd</span>
                        </div>
                        <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                            <AlertCircle size={20} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Utkast</p>
                            <h3 className="text-2xl font-bold text-slate-700 mt-1">{draftCount}</h3>
                            <span className="text-xs text-slate-500 mt-1 block">Redo att skickas</span>
                        </div>
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                            <FileText size={20} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Invoices Table */}
            <Card noPadding>
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center">
                    <h3 className="font-semibold text-slate-900">Fakturor ({invoices.length})</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Fakturanummer</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Mottagare</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Antal elever</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Fakturadatum</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Förfallodatum</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Belopp</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Åtgärd</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {invoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => setSelectedInvoice(invoice)}>
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        <div className="flex items-center gap-2">
                                            <FileText size={16} className="text-slate-400" />
                                            {invoice.invoiceNumber}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">{invoice.recipientName}</td>
                                    <td className="px-6 py-4 text-slate-700 text-center">
                                        {invoice.items?.[0]?.quantity || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{invoice.date}</td>
                                    <td className="px-6 py-4 text-slate-500">{invoice.dueDate}</td>
                                    <td className="px-6 py-4 text-right font-mono text-slate-900 font-medium">
                                        {(invoice.amount / 1000000).toFixed(2)}M kr
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={getStatusVariant(invoice.status)}>
                                            {getStatusIcon(invoice.status)}
                                            {invoice.status === 'Paid' ? 'Betald' : invoice.status === 'Sent' ? 'Skickad' : invoice.status === 'Overdue' ? 'Förfallen' : 'Utkast'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {invoice.status === 'Draft' && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => { e.stopPropagation(); handleSend(invoice.invoiceNumber); }}
                                                    className="h-8 px-2"
                                                    title="Skicka faktura"
                                                >
                                                    <Send size={14} className="mr-1" /> Skicka
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => { e.stopPropagation(); handleDownload(invoice.invoiceNumber); }}
                                                className="h-8 w-8 p-0"
                                                title="Ladda ner PDF"
                                            >
                                                <Download size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <MoreVertical size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-sm text-slate-500">
                    <span>Visar {invoices.length} av {invoices.length} fakturor</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Föregående</Button>
                        <Button variant="outline" size="sm" disabled>Nästa</Button>
                    </div>
                </div>
            </Card>

            {/* Invoice Details Drawer */}
            <Drawer
                isOpen={!!selectedInvoice}
                onClose={() => setSelectedInvoice(null)}
                width="2xl"
                showCloseButton={false}
            >
                {selectedInvoice && (
                    <DetailsDrawer
                        title={selectedInvoice.invoiceNumber}
                        id={selectedInvoice.id}
                        status={{
                            label: selectedInvoice.status === 'Paid' ? 'Betald' : selectedInvoice.status === 'Sent' ? 'Skickad' : selectedInvoice.status === 'Overdue' ? 'Förfallen' : 'Utkast',
                            variant: selectedInvoice.status === 'Overdue' ? 'error' :
                                selectedInvoice.status === 'Paid' ? 'success' :
                                    selectedInvoice.status === 'Sent' ? 'info' : 'neutral'
                        }}
                        metadata={[
                            { label: 'Fakturadatum', value: selectedInvoice.date, icon: <Clock size={14} /> },
                            { label: 'Förfallodatum', value: selectedInvoice.dueDate, icon: <AlertCircle size={14} /> },
                            ...(selectedInvoice.paidDate ? [{ label: 'Betaldatum', value: selectedInvoice.paidDate, icon: <CheckCircle size={14} /> }] : [])
                        ]}
                        onClose={() => setSelectedInvoice(null)}
                        footer={
                            <div className="flex gap-3 w-full">
                                <Button variant="outline" className="flex-1" onClick={() => setSelectedInvoice(null)}>Stäng</Button>
                                {selectedInvoice.status === 'Draft' && (
                                    <Button variant="primary" className="flex-1" leftIcon={<Send size={16} />} onClick={() => handleSend(selectedInvoice.invoiceNumber)}>Skicka faktura</Button>
                                )}
                                <Button variant="primary" className="flex-1" leftIcon={<Download size={16} />} onClick={() => handleDownload(selectedInvoice.invoiceNumber)}>Ladda ner PDF</Button>
                            </div>
                        }
                    >
                        <DetailsSection title="Fakturadetaljer">
                            <DetailsRow label="Mottagare" value={selectedInvoice.recipientName} />
                            <DetailsRow label="Totalbelopp" value={`${(selectedInvoice.amount / 1000000).toFixed(2)}M kr`} />
                            <DetailsRow label="Moms (0%)" value="0 kr" />
                            <DetailsRow label="Att betala" value={`${(selectedInvoice.amount / 1000000).toFixed(2)}M kr`} />
                        </DetailsSection>

                        <DetailsSection title="Fakturaspecifikation">
                            <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 text-slate-500 font-medium">
                                        <tr>
                                            <th className="px-4 py-2">Beskrivning</th>
                                            <th className="px-4 py-2 text-right">Antal</th>
                                            <th className="px-4 py-2 text-right">À-pris</th>
                                            <th className="px-4 py-2 text-right">Totalt</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 bg-white">
                                        {selectedInvoice.items?.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 text-slate-700">{item.description}</td>
                                                <td className="px-4 py-3 text-right text-slate-700">{item.quantity}</td>
                                                <td className="px-4 py-3 text-right font-mono text-slate-700">{item.unitPrice.toLocaleString()} kr</td>
                                                <td className="px-4 py-3 text-right font-mono font-medium text-slate-900">{(item.total / 1000000).toFixed(2)}M kr</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-slate-50 border-t-2 border-slate-300">
                                        <tr>
                                            <td colSpan={3} className="px-4 py-3 text-right font-semibold text-slate-900">Totalt att betala:</td>
                                            <td className="px-4 py-3 text-right font-mono font-bold text-slate-900">{(selectedInvoice.amount / 1000000).toFixed(2)}M kr</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </DetailsSection>

                        <DetailsSection title="Betalningsinformation">
                            <DetailsRow label="Bankgiro" value="5402-3891" />
                            <DetailsRow label="OCR-nummer" value={selectedInvoice.invoiceNumber.replace(/-/g, '')} />
                            <DetailsRow label="Referens" value="IKE Region Skåne" />
                        </DetailsSection>
                    </DetailsDrawer>
                )}
            </Drawer>

            {/* Create Invoice Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Skapa ny faktura"
                footer={
                    <div className="flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Avbryt</Button>
                        <Button onClick={() => { showToast('Faktura skapad', 'success'); setIsCreateModalOpen(false); }}>Skapa utkast</Button>
                    </div>
                }
            >
                <div className="space-y-4 py-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Mottagare (kommun)</label>
                        <select className="w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                            <option>Malmö Stad</option>
                            <option>Lunds kommun</option>
                            <option>Helsingborgs Stad</option>
                            <option>Kristianstads kommun</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Period</label>
                        <select className="w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                            <option>VT24</option>
                            <option>HT24</option>
                            <option>VT25</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Antal elever</label>
                        <input
                            type="number"
                            className="w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            placeholder="Ange antal elever"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Ersättning per elev (kr)</label>
                        <input
                            type="number"
                            className="w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            defaultValue="110000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Förfallodatum</label>
                        <input
                            type="date"
                            className="w-full border-slate-300 rounded-md shadow-sm text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};
