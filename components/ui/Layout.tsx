import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
    return (
        <div className={`bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden ${className}`}>
            <div className={noPadding ? '' : 'p-6'}>
                {children}
            </div>
        </div>
    );
};

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
                {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
            </div>
            {children && (
                <div className="flex gap-3">
                    {children}
                </div>
            )}
        </div>
    );
};
