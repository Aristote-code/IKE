import React, { useState } from 'react';
import { Filter, Download, Plus, Search, MoreHorizontal, ArrowUpDown, FileText, User, X } from 'lucide-react';
import { Person, PersonStatus } from '../types';
import { useLanguage } from '../LanguageContext';
import { Drawer } from './ui/Drawer';
import { Modal } from './ui/Modal';
import { PersonDetail } from './PersonDetail';
import { useToast } from './ui/Toast';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Card, PageHeader } from './ui/Layout';


const mockPersons: Person[] = [
    {
        id: '1',
        ssn: '20050101-1234',
        givenName: 'Anna',
        familyName: 'Andersson',
        fullName: 'Anna Andersson',
        email: 'anna.andersson@example.com',
        phone: '070-123 45 67',
        address: 'Storgatan 1, 267 21 Bjuv',
        homeMunicipalityCode: '1260',
        homeMunicipalityName: 'Bjuv',
        status: 'Active',
        types: ['Student'],
        placements: [
            {
                id: 'p1',
                schoolUnitId: 'su1',
                schoolUnitName: 'Katedralskolan',
                programCode: 'NA',
                programName: 'Naturvetenskapsprogrammet',
                startDate: '2023-08-15',
                status: 'Current'
            }
        ]
    },
    {
        id: '2',
        ssn: '20041212-5678',
        givenName: 'Erik',
        familyName: 'Svensson',
        fullName: 'Erik Svensson',
        email: 'erik.svensson@example.com',
        phone: '070-987 65 43',
        address: 'Långgatan 5, 267 21 Bjuv',
        homeMunicipalityCode: '1260',
        homeMunicipalityName: 'Bjuv',
        status: 'Active',
        types: ['Student'],
        placements: [
            {
                id: 'p2',
                schoolUnitId: 'su2',
                schoolUnitName: 'Solängskolan',
                programCode: 'EK',
                programName: 'Ekonomiprogrammet',
                startDate: '2022-08-15',
                status: 'Current'
            }
        ]
    },
    {
        id: '3',
        ssn: '20050505-9012',
        givenName: 'Maria',
        familyName: 'Johansson',
        fullName: 'Maria Johansson',
        email: 'maria.johansson@example.com',
        phone: '076-112 23 34',
        address: 'Parkvägen 10, 267 21 Bjuv',
        homeMunicipalityCode: '1260',
        homeMunicipalityName: 'Bjuv',
        status: 'Pending',
        types: ['KAA'],
        placements: [],
        kaaActionStatus: 'Ongoing',
        lastKaaActionDate: '2024-02-10'
    },
    {
        id: '4',
        ssn: '20031120-3344',
        givenName: 'Lars',
        familyName: 'Nilsson',
        fullName: 'Lars Nilsson',
        email: 'lars.nilsson@example.com',
        phone: '073-555 66 77',
        address: 'Skolgatan 3, 267 21 Bjuv',
        homeMunicipalityCode: '1260',
        homeMunicipalityName: 'Bjuv',
        status: 'Inactive',
        types: ['Student'],
        placements: [
            {
                id: 'p3',
                schoolUnitId: 'su1',
                schoolUnitName: 'Katedralskolan',
                programCode: 'SA',
                programName: 'Samhällsvetenskapsprogrammet',
                startDate: '2021-08-15',
                endDate: '2024-06-05',
                status: 'Historical'
            }
        ]
    },
    {
        id: '5',
        ssn: '20060228-7788',
        givenName: 'Klara',
        familyName: 'Berg',
        fullName: 'Klara Berg',
        email: 'klara.berg@example.com',
        phone: '072-444 88 99',
        address: 'Torget 2, 267 21 Bjuv',
        homeMunicipalityCode: '1260',
        homeMunicipalityName: 'Bjuv',
        status: 'Active',
        types: ['Student'],
        placements: [
            {
                id: 'p4',
                schoolUnitId: 'su3',
                schoolUnitName: 'Västgötaskolan',
                programCode: 'TE',
                programName: 'Teknikprogrammet',
                startDate: '2024-08-15',
                status: 'Current'
            }
        ]
    }
];

export const PersonList: React.FC = () => {
    const { t } = useLanguage();
    const { showToast } = useToast();
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

    // Form state for new person
    const [newPerson, setNewPerson] = useState({
        ssn: '',
        givenName: '',
        familyName: '',
        email: '',
        municipality: ''
    });

    const getStatusVariant = (status: PersonStatus): 'success' | 'warning' | 'neutral' => {
        switch (status) {
            case 'Active': return 'success';
            case 'Pending': return 'warning';
            case 'Inactive': return 'neutral';
            default: return 'neutral';
        }
    };

    const getStatusLabel = (status: PersonStatus) => {
        switch (status) {
            case 'Active': return t('status_active');
            case 'Pending': return t('status_pending');
            case 'Inactive': return t('status_inactive');
            default: return status;
        }
    };

    const handleSavePerson = () => {
        if (modalMode === 'add') {
            console.log('Adding person:', newPerson);
            showToast('success', `${newPerson.givenName} ${newPerson.familyName} ${t('sl_toast_registered')}`);
        } else {
            console.log('Updating person:', newPerson);
            showToast('success', `${newPerson.givenName} ${newPerson.familyName} ${t('sl_toast_updated')}`);
        }
        setIsAddModalOpen(false);
        setNewPerson({ ssn: '', givenName: '', familyName: '', email: '', municipality: '' });
    };

    const handleEditPerson = () => {
        if (selectedPerson) {
            setNewPerson({
                ssn: selectedPerson.ssn,
                givenName: selectedPerson.givenName,
                familyName: selectedPerson.familyName,
                email: '',
                municipality: selectedPerson.homeMunicipalityCode
            });
            setModalMode('edit');
            setIsAddModalOpen(true);
        }
    };

    const openAddModal = () => {
        setNewPerson({ ssn: '', givenName: '', familyName: '', email: '', municipality: '' });
        setModalMode('add');
        setIsAddModalOpen(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">

            <PageHeader
                title={t('sl_title')}
                description={t('sl_subtitle')}
            >
                <Button
                    variant="outline"
                    leftIcon={<FileText size={16} />}
                >
                    {t('sl_import')}
                </Button>
                <Button
                    onClick={openAddModal}
                    leftIcon={<Plus size={16} />}
                >
                    {t('sl_add')}
                </Button>
            </PageHeader>

            <Card noPadding>
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 flex flex-wrap gap-3 items-center justify-between bg-white">
                    <div className="relative flex-1 min-w-[240px] max-w-lg">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder={t('header_search')}
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" leftIcon={<Filter size={14} />}>
                            {t('sl_filter')}
                        </Button>
                        <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>
                            {t('sl_export')}
                        </Button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-3 w-10"><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></th>
                                <th className="px-6 py-3 cursor-pointer hover:text-indigo-600 group transition-colors">{t('sl_col_ssn')} <ArrowUpDown size={12} className="inline ml-1 opacity-0 group-hover:opacity-100" /></th>
                                <th className="px-6 py-3">{t('sl_col_name')}</th>
                                <th className="px-6 py-3">{t('sl_col_status')}</th>
                                <th className="px-6 py-3">{t('sl_col_muni')}</th>
                                <th className="px-6 py-3">{t('sl_col_school')}</th>
                                <th className="px-6 py-3">{t('sl_col_prog')}</th>
                                <th className="px-6 py-3 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockPersons.map((person) => {
                                const currentPlacement = person.placements.find(p => p.status === 'Current');

                                return (
                                    <tr
                                        key={person.id}
                                        onClick={() => setSelectedPerson(person)}
                                        className="hover:bg-slate-50 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></td>
                                        <td className="px-6 py-4 font-mono text-slate-500 text-xs">{person.ssn}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-medium text-xs">
                                                    {person.givenName[0]}{person.familyName[0]}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{person.fullName}</div>
                                                    <div className="text-xs text-slate-500 flex gap-1 mt-0.5">
                                                        {person.types.map(type => (
                                                            <Badge key={type} variant="neutral" className="bg-slate-100 border-none px-1.5 py-0 text-[10px]">
                                                                {type === 'Student' ? t('type_student') : type === 'KAA' ? t('type_kaa') : type}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={getStatusVariant(person.status)}>
                                                {getStatusLabel(person.status)}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{person.homeMunicipalityName}</td>
                                        <td className="px-6 py-4 text-slate-600">{currentPlacement?.schoolUnitName || '-'}</td>
                                        <td className="px-6 py-4 text-slate-600">{currentPlacement?.programName || '-'}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all">
                                                <MoreHorizontal size={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
                    <span className="text-xs text-slate-500">{t('sl_showing')} <span className="font-medium text-slate-900">1-6</span> {t('sl_of')} <span className="font-medium text-slate-900">432</span> {t('sl_records')}</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>{t('sl_prev')}</Button>
                        <Button variant="outline" size="sm">{t('sl_next')}</Button>
                    </div>
                </div>
            </Card>

            {/* Person Detail Drawer */}
            <Drawer
                isOpen={!!selectedPerson}
                onClose={() => setSelectedPerson(null)}
                title={selectedPerson?.fullName || 'Person Details'}
                width="lg"
            >
                {selectedPerson && <PersonDetail person={selectedPerson} onEdit={handleEditPerson} />}
            </Drawer>

            {/* Add/Edit Person Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title={modalMode === 'add' ? t('sl_register_new') : t('sl_edit_person')}
                size="lg"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
                            {t('sl_cancel')}
                        </Button>
                        <Button onClick={handleSavePerson}>
                            {modalMode === 'add' ? t('sl_register_btn') : t('sl_save_changes')}
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('sl_label_ssn')}</label>
                            <input
                                type="text"
                                placeholder={t('sl_placeholder_ssn')}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all hover:border-slate-400"
                                value={newPerson.ssn}
                                onChange={e => setNewPerson({ ...newPerson, ssn: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('sl_label_email')}</label>
                            <input
                                type="email"
                                placeholder={t('sl_placeholder_email')}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={newPerson.email}
                                onChange={e => setNewPerson({ ...newPerson, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('sl_label_given_name')}</label>
                            <input
                                type="text"
                                placeholder={t('sl_placeholder_first')}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={newPerson.givenName}
                                onChange={e => setNewPerson({ ...newPerson, givenName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('sl_label_family_name')}</label>
                            <input
                                type="text"
                                placeholder={t('sl_placeholder_last')}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={newPerson.familyName}
                                onChange={e => setNewPerson({ ...newPerson, familyName: e.target.value })}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('sl_label_muni')}</label>
                            <select
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                                value={newPerson.municipality}
                                onChange={e => setNewPerson({ ...newPerson, municipality: e.target.value })}
                            >
                                <option value="">{t('sl_select_muni')}</option>
                                <option value="1280">Malmö</option>
                                <option value="1281">Lund</option>
                                <option value="1290">Kristianstad</option>
                                <option value="1283">Helsingborg</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg flex gap-3 text-blue-700 text-sm">
                        <FileText size={18} className="shrink-0 mt-0.5" />
                        <p>
                            {t('sl_ssn_check_info')}
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
