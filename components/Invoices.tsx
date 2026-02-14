import React, { useState } from 'react';
import { Download, FileText, Filter, Search, MoreVertical, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Invoice } from '../types';
import { useToast } from './ui/Toast';
import { Button } from './ui/Button';
import { Card, PageHeader } from './ui/Layout';
import { Badge } from './ui/Badge';
import { Drawer } from './ui/Drawer';
import { DetailsDrawer, DetailsRow, DetailsSection } from './ui/DetailsDrawer';

export const Invoices: React.FC = () => {
    const { t } = useLanguage();
    const { showToast } = useToast();
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    // Mock Data
    const invoices: Invoice[] = [
        {
            id: '1',
            invoiceNumber: 'INV-2024-001',
            recipientName: 'Bjuvs kommun',
            amount: 450000,
            status: 'Paid',
            date: '2024-01-15',
            dueDate: '2024-02-14',
            items: []
        },
        {
            id: '2',
            invoiceNumber: 'INV-2024-002',
            recipientName: 'Lunds kommun',
            amount: 1250000,
            status: 'Sent',
            date: '2024-02-01',
            dueDate: '2024-03-02',
            items: []
        },
        {
            id: '3',
            invoiceNumber: 'INV-2024-003',
            recipientName: 'Malmö stad',
            amount: 890000,
            status: 'Overdue',
            date: '2024-01-10',
            dueDate: '2024-02-10',
            items: []
        },
        {
            id: '4',
            invoiceNumber: 'INV-2024-004',
            recipientName: 'Helsingborgs stad',
            amount: 670000,
            status: 'Draft',
            date: '2024-02-10',
            dueDate: '2024-03-12',
            items: []
        },
        {
            id: '5',
            invoiceNumber: 'INV-2024-005',
            recipientName: 'Kristianstads kommun',
            amount: 340000,
            status: 'Sent',
            date: '2024-02-12',
            dueDate: '2024-03-14',
            items: []
        }
    ];

    const handleDownload = (invoiceNum: string) => {
        showToast(`Laddar ner ${invoiceNum}...`, 'info');
        // Simulate download
        setTimeout(() => {
            showToast(`Faktura ${invoiceNum} nedladdad`, 'success');
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

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title={t('nav_invoices')}
                description="Hantera utgående fakturor och underlag."
            >
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Sök faktura..."
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64"
                        />
                    </div>
                    <Button variant="outline" leftIcon={<Filter size={16} />}>
                        Filtrera
                    </Button>
                    <Button leftIcon={<Download size={16} />}>
                        Exportera lista
                    </Button>
                </div>
            </PageHeader>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <p className="text-sm text-slate-500 font-medium">Totalt Fakturerat</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">3.6M kr</h3>
                    <span className="text-xs text-emerald-600 font-medium flex items-center mt-1">
                        +12% jämfört med föregående månad
                    </span>
                </Card>
                <Card>
                    <p className="text-sm text-slate-500 font-medium">Betalat</p>
                    <h3 className="text-2xl font-bold text-emerald-600 mt-1">450k kr</h3>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '12.5%' }}></div>
                    </div>
                </Card>
                <Card>
                    <p className="text-sm text-slate-500 font-medium">Förfallet</p>
                    <h3 className="text-2xl font-bold text-rose-600 mt-1">890k kr</h3>
                    <span className="text-xs text-rose-600 font-medium mt-1 block">Kräver åtgärd</span>
                </Card>
                <Card>
                    <p className="text-sm text-slate-500 font-medium">Utkast</p>
                    <h3 className="text-2xl font-bold text-slate-700 mt-1">1</h3>
                    <span className="text-xs text-slate-500 mt-1 block">Redo att skickas</span>
                </Card>
            </div>

            {/* Invoices Table */}
            <Card noPadding>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Fakturanummer</th>
                                <th className="px-6 py-4">Mottagare</th>
                                <th className="px-6 py-4">Datum</th>
                                <th className="px-6 py-4">Förfallodatum</th>
                                <th className="px-6 py-4 text-right">Belopp</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Åtgärd</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {invoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-indigo-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedInvoice(invoice)}>
                                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                                        <FileText size={16} className="text-slate-400" />
                                        {invoice.invoiceNumber}
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">{invoice.recipientName}</td>
                                    <td className="px-6 py-4 text-slate-500">{invoice.date}</td>
                                    <td className="px-6 py-4 text-slate-500">{invoice.dueDate}</td>
                                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                                        {invoice.amount.toLocaleString()} kr
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={getStatusVariant(invoice.status)}>
                                            {getStatusIcon(invoice.status)}
                                            {invoice.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    <span>Visar 5 av 5 fakturor</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Föregående</Button>
                        <Button variant="outline" size="sm" disabled>Nästa</Button>
                    </div>
                </div>
            </Card>

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
                            label: selectedInvoice.status,
                            variant: selectedInvoice.status === 'Overdue' ? 'error' :
                                selectedInvoice.status === 'Paid' ? 'success' :
                                    selectedInvoice.status === 'Sent' ? 'info' : 'neutral'
                        }}
                        metadata={[
                            { label: 'Datum', value: selectedInvoice.date, icon: <Clock size={14} /> },
                            { label: 'Förfallodatum', value: selectedInvoice.dueDate, icon: <AlertCircle size={14} /> },
                        ]}
                        onClose={() => setSelectedInvoice(null)}
                        footer={
                            <div className="flex gap-3 w-full">
                                <Button variant="outline" className="flex-1" onClick={() => setSelectedInvoice(null)}>Stäng</Button>
                                <Button variant="primary" className="flex-1" leftIcon={<Download size={16} />} onClick={() => handleDownload(selectedInvoice.invoiceNumber)}>Ladda ner PDF</Button>
                            </div>
                        }
                    >
                        <DetailsSection title="Fakturadetaljer">
                            <DetailsRow label="Mottagare" value={selectedInvoice.recipientName} />
                            <DetailsRow label="Belopp" value={`${selectedInvoice.amount.toLocaleString()} kr`} />
                        </DetailsSection>
                        <DetailsSection title="Specifikation">
                            <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 text-slate-500 font-medium">
                                        <tr>
                                            <th className="px-4 py-2">Beskrivning</th>
                                            <th className="px-4 py-2 text-right">Antal</th>
                                            <th className="px-4 py-2 text-right">Pris</th>
                                            <th className="px-4 py-2 text-right">Totalt</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        <tr>
                                            <td className="px-4 py-3">Ersättning VT24</td>
                                            <td className="px-4 py-3 text-right">1</td>
                                            <td className="px-4 py-3 text-right">{selectedInvoice.amount.toLocaleString()} kr</td>
                                            <td className="px-4 py-3 text-right font-medium">{selectedInvoice.amount.toLocaleString()} kr</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </DetailsSection>
                    </DetailsDrawer>
                )}
            </Drawer>
        </div>
    );
};
