import React from 'react';
import { X, Edit2, Calendar, Clock, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

interface DetailsDrawerProps {
    title: string;
    id: string;
    status?: {
        label: string;
        variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'default';
    };
    metadata?: {
        label: string;
        value: string;
        icon?: React.ReactNode;
    }[];
    onClose: () => void;
    onEdit?: () => void;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export const DetailsDrawer: React.FC<DetailsDrawerProps> = ({
    title,
    id,
    status,
    metadata,
    onClose,
    onEdit,
    children,
    footer,
}) => {
    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="flex-none px-8 py-6 border-b border-slate-100">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                            {/* Placeholder Icon or Logo could go here */}
                            <div className="w-5 h-5 flex items-center justify-center font-bold">#</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                                {status && (
                                    <Badge variant={status.variant} className="rounded-full px-2.5">
                                        {status.label}
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm font-medium text-slate-500">{id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {onEdit && (
                            <Button variant="outline" size="sm" onClick={onEdit} leftIcon={<Edit2 size={14} />}>
                                Edit
                            </Button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Metadata Grid */}
                {metadata && (
                    <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4">
                        {metadata.map((meta, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-slate-500">
                                {meta.icon}
                                <span className="font-medium text-slate-700">{meta.label}</span>
                                <span>{meta.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
                <div className="space-y-8">
                    {children}
                </div>
            </div>

            {/* Sticky Footer */}
            {footer && (
                <div className="flex-none px-8 py-4 bg-white border-t border-slate-200 mt-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                    {footer}
                </div>
            )}
        </div>
    );
};

// Sub-components for semantic structure
export const DetailsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2 mb-3">{title}</h3>
        {children}
    </div>
);

export const DetailsRow: React.FC<{ label: string; value: React.ReactNode; icon?: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 py-1 items-baseline">
        <div className="text-sm text-slate-500 flex items-center gap-2">
            {icon && <span className="text-slate-400">{icon}</span>}
            {label}
        </div>
        <div className="text-sm font-medium text-slate-900">{value}</div>
    </div>
);
