import React, { useState } from 'react';
import { Mail, Send, Inbox as InboxIcon, Archive, Trash2, Plus, Search, Star } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Modal } from './ui/Modal';
import { useToast } from './ui/Toast';

interface Message {
    id: string;
    sender: string;
    subject: string;
    preview: string;
    date: string;
    read: boolean;
    starred: boolean;
    folder: 'inbox' | 'sent' | 'archived';
}

export const Communication: React.FC = () => {
    const { t } = useLanguage();
    const { showToast } = useToast();
    const [activeFolder, setActiveFolder] = useState<'inbox' | 'sent' | 'archived'>('inbox');
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    // Mock data
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'Anna Andersson',
            subject: 'Angående faktura #2024-001',
            preview: 'Hej, Jag har en fråga angående den senaste fakturan vi mottog...',
            date: '10:42',
            read: false,
            starred: true,
            folder: 'inbox'
        },
        {
            id: '2',
            sender: 'Erik Svensson',
            subject: 'Ny elevregistrering',
            preview: 'Vi behöver lägga till en ny elev i systemet för nästa termin...',
            date: 'Igår',
            read: true,
            starred: false,
            folder: 'inbox'
        },
        {
            id: '3',
            sender: 'Karin Larsson',
            subject: 'Möte om budgetuppföljning',
            preview: 'Kan vi boka in ett möte nästa vecka för att gå igenom budgeten?',
            date: '2 okt',
            read: true,
            starred: false,
            folder: 'inbox'
        },
    ]);

    const handleCompose = () => {
        setIsComposeOpen(true);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        showToast(t('comm_toast_sent'), 'success');
        setIsComposeOpen(false);
    };

    const toggleStar = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setMessages(messages.map(msg =>
            msg.id === id ? { ...msg, starred: !msg.starred } : msg
        ));
    };

    const filteredMessages = messages.filter(msg => msg.folder === activeFolder);

    return (
        <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
            {/* Sidebar */}
            <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col">
                <div className="p-4">
                    <button
                        onClick={handleCompose}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <Plus size={20} />
                        {t('comm_btn_new')}
                    </button>
                </div>

                <nav className="flex-1 px-2 space-y-1">
                    <button
                        onClick={() => setActiveFolder('inbox')}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeFolder === 'inbox' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        <InboxIcon size={18} />
                        {t('comm_folder_inbox')}
                        <span className="ml-auto bg-indigo-100 text-indigo-600 py-0.5 px-2 rounded-full text-xs">2</span>
                    </button>
                    <button
                        onClick={() => setActiveFolder('sent')}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeFolder === 'sent' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        <Send size={18} />
                        {t('comm_folder_sent')}
                    </button>
                    <button
                        onClick={() => setActiveFolder('archived')}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeFolder === 'archived' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        <Archive size={18} />
                        {t('comm_folder_archived')}
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <Trash2 size={18} />
                        {t('comm_folder_trash')}
                    </button>
                </nav>
            </div>

            {/* Message List */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
                    <h2 className="text-lg font-semibold text-slate-900 capitalize">{activeFolder}</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t('comm_search')}
                            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredMessages.map((message) => (
                        <div
                            key={message.id}
                            onClick={() => setSelectedMessage(message)}
                            className={`flex items-center gap-4 p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${!message.read ? 'bg-slate-50' : ''
                                }`}
                        >
                            <button
                                onClick={(e) => toggleStar(message.id, e)}
                                className={`p-1 rounded-full hover:bg-slate-200 ${message.starred ? 'text-amber-400' : 'text-slate-300'
                                    }`}
                            >
                                <Star size={18} fill={message.starred ? "currentColor" : "none"} />
                            </button>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-sm font-medium ${!message.read ? 'text-slate-900' : 'text-slate-600'}`}>
                                        {message.sender}
                                    </span>
                                    <span className="text-xs text-slate-500">{message.date}</span>
                                </div>
                                <h4 className={`text-sm mb-1 ${!message.read ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>
                                    {message.subject}
                                </h4>
                                <p className="text-sm text-slate-500 truncate">{message.preview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Compose Modal */}
            <Modal
                isOpen={isComposeOpen}
                onClose={() => setIsComposeOpen(false)}
                title={t('comm_modal_title')}
                size="lg"
            >
                <form onSubmit={handleSendMessage} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('comm_label_to')}</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Mottagare..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('comm_label_subject')}</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Ämne..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('comm_label_message')}</label>
                        <textarea
                            rows={8}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                            placeholder={t('comm_msg_placeholder')}
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => setIsComposeOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                        >
                            {t('comm_btn_cancel')}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                        >
                            <Send size={16} />
                            {t('comm_btn_send')}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
