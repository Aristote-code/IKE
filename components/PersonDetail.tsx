import React, { useState } from 'react';
import { MapPin, School, Calendar, Mail, Phone, FileText, AlertCircle, Clock, Edit2 } from 'lucide-react';
import { Person } from '../types';
import { useLanguage } from '../LanguageContext';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Card } from './ui/Layout';

interface Props {
    person: Person;
    onEdit: () => void;
}

export const PersonDetail: React.FC<Props> = ({ person, onEdit }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'placements', label: 'Placements' },
        { id: 'economy', label: 'Economy' },
        { id: 'history', label: 'History' },
        { id: 'kaa', label: 'KAA Actions' },
    ];

    const currentPlacement = person.placements.find(p => p.status === 'Current');

    const getStatusVariant = (status: string): 'success' | 'warning' | 'neutral' => {
        switch (status) {
            case 'Active': return 'success';
            case 'Pending': return 'warning';
            case 'Inactive': return 'neutral';
            default: return 'neutral';
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-10">

            {/* Header Profile Card */}
            <div className="bg-slate-50/50 rounded-xl border border-slate-200 p-6 relative">
                <div className="absolute top-6 right-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onEdit}
                        leftIcon={<Edit2 size={14} />}
                    >
                        Redigera
                    </Button>
                </div>

                <div className="flex flex-col gap-6 items-start">
                    <div className="flex items-center gap-4 w-full">
                        <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 text-xl font-semibold shrink-0 shadow-sm">
                            {person.givenName[0]}{person.familyName[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-xl font-bold text-slate-900">{person.fullName}</h1>
                            <div className="flex flex-wrap gap-2 mt-1">
                                <Badge variant={getStatusVariant(person.status)}>
                                    {person.status}
                                </Badge>
                                {person.types.map(type => (
                                    <Badge key={type} variant="info">
                                        {type}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm w-full">
                        <div className="flex items-center gap-2 text-slate-600">
                            <FileText size={16} className="text-slate-400" />
                            <span className="font-mono">{person.ssn}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <MapPin size={16} className="text-slate-400" />
                            <span>{person.homeMunicipalityName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Mail size={16} className="text-slate-400" />
                            <span className="truncate">{person.email || 'No email registered'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Phone size={16} className="text-slate-400" />
                            <span>{person.phone || 'No phone registered'}</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-6 mt-6 border-b border-slate-200 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-2 text-sm font-medium transition-all relative whitespace-nowrap ${activeTab === tab.id
                                ? 'text-indigo-600'
                                : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">

                {activeTab === 'overview' && (
                    <>
                        {/* Current Placement Card */}
                        <Card noPadding className="overflow-hidden">
                            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-sm">
                                    <School size={16} className="text-slate-500" />
                                    Current Placement
                                </h3>
                                <Badge variant="success">Active</Badge>
                            </div>

                            {currentPlacement ? (
                                <div className="p-5 grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">School Unit</label>
                                        <div className="mt-1 text-sm font-medium text-slate-900">{currentPlacement.schoolUnitName}</div>
                                        <div className="text-xs text-slate-500">Unit ID: {currentPlacement.schoolUnitId}</div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Program</label>
                                        <div className="mt-1 text-sm font-medium text-slate-900">{currentPlacement.programName}</div>
                                        <div className="text-xs text-slate-500">Code: {currentPlacement.programCode}</div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Period</label>
                                        <div className="mt-1 flex items-center gap-2 text-slate-900 text-sm">
                                            <Calendar size={14} className="text-slate-400" />
                                            {currentPlacement.startDate} — Present
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 text-center text-slate-500">
                                    <AlertCircle size={32} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No active placement found.</p>
                                </div>
                            )}
                        </Card>

                        {/* Recent Activity */}
                        <Card>
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2 text-sm">
                                <Clock size={16} className="text-slate-500" />
                                Recent Activity
                            </h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex gap-3 relative pb-6 last:pb-0">
                                        <div className="absolute top-2 left-[7px] bottom-0 w-px bg-slate-100 last:hidden" />
                                        <div className="w-3.5 h-3.5 rounded-full bg-indigo-100 border-2 border-white ring-1 ring-indigo-200 shrink-0 mt-1.5 z-10" />
                                        <div>
                                            <p className="text-sm text-slate-900 font-medium">Placement Updated</p>
                                            <p className="text-xs text-slate-500 mt-0.5">Changed program from SA to NA.</p>
                                            <p className="text-xs text-slate-400 mt-1">2024-02-1{i} • Admin User</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </>
                )}

                {activeTab === 'placements' && (
                    <Card className="text-center text-slate-400 py-12">
                        <School size={48} className="mx-auto mb-3 opacity-20" />
                        <p className="text-sm">Historical placements view coming soon.</p>
                    </Card>
                )}

                {activeTab === 'kaa' && (
                    <Card className="text-center text-slate-400 py-12">
                        <AlertCircle size={48} className="mx-auto mb-3 opacity-20" />
                        <p className="text-sm">KAA Action Plan & Activity log under development.</p>
                    </Card>
                )}

                {activeTab === 'economy' && (
                    <Card className="text-center text-slate-400 py-12">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl">💰</span>
                        </div>
                        <p className="text-sm">Economy details for this person.</p>
                    </Card>
                )}

                {activeTab === 'history' && (
                    <Card className="text-center text-slate-400 py-12">
                        <Clock size={48} className="mx-auto mb-3 opacity-20" />
                        <p className="text-sm">Full history log.</p>
                    </Card>
                )}

            </div>
        </div>
    );
};
