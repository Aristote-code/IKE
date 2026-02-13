import React, { useState } from 'react';
import { 
  Building2, 
  MessageSquare, 
  MoreVertical, 
  Upload, 
  Trash2, 
  Download, 
  ChevronRight, 
  ChevronDown, 
  Search,
  MapPin,
  School,
  Layers
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Organization: React.FC = () => {
  const { t } = useLanguage();
  const [selectedNode, setSelectedNode] = useState('lund');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'skane': true, 
    'lund': true,
    'malmo': false 
  });

  const toggleNode = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const TreeItem = ({ id, label, level = 0, hasChildren = false, icon: Icon }: any) => {
    const isExpanded = expandedNodes[id];
    const isSelected = selectedNode === id;
    
    // Indentation: 8px base + 12px per level. 
    // This padding is applied inside the item, so the hover/select bg spans full width (minus the container's pl-1).
    const paddingLeft = level * 12 + 8;

    return (
      <div 
        className={`group flex items-center py-1.5 pr-3 rounded-l-md cursor-pointer text-sm transition-all duration-150 select-none mb-0.5
          ${isSelected ? 'bg-yellow-50 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}
        `}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={() => setSelectedNode(id)}
      >
        {/* Chevron / Spacer */}
        <div 
          className={`mr-1 p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors cursor-pointer flex items-center justify-center h-4 w-4 ${!hasChildren ? 'invisible' : ''}`}
          onClick={(e) => toggleNode(id, e)}
        >
          {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </div>

        {/* Node Icon */}
        <div className={`mr-2.5 ${isSelected ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-500'}`}>
           {Icon ? <Icon size={14} /> : (
             hasChildren 
              ? <Layers size={14} /> 
              : <div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-yellow-400' : 'bg-slate-300'}`} />
           )}
        </div>

        {/* Label */}
        <span className={`truncate ${isSelected ? 'font-medium' : 'font-normal'}`}>{label}</span>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-100px)] animate-in fade-in duration-500 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      
      {/* LEFT PANEL: TREE VIEW */}
      <div className="w-72 border-r border-slate-200 bg-white flex flex-col flex-shrink-0">
        
        {/* Tree Search */}
        <div className="p-3 border-b border-slate-100">
          <div className="relative">
             <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 h-3.5 w-3.5" />
             <input 
               type="text" 
               placeholder="Search units..." 
               className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all placeholder:text-slate-400"
             />
          </div>
        </div>

        {/* Tree Content */}
        {/* pl-1 creates the 4px gap on the left side of the tree items */}
        <div className="flex-1 overflow-y-auto py-2 pl-1 custom-scrollbar">
           <TreeItem id="skane" label="Region Skåne" level={0} hasChildren={true} icon={MapPin} />
           
           {expandedNodes['skane'] && (
             <div className="animate-in fade-in slide-in-from-top-1 duration-200">
               <TreeItem id="bjuv" label="Bjuv" level={1} hasChildren={true} />
               <TreeItem id="bromolla" label="Bromölla" level={1} hasChildren={true} />
               <TreeItem id="eslov" label="Eslöv" level={1} hasChildren={true} />
               
               <TreeItem id="lund" label="Lunds kommun" level={1} hasChildren={true} />
               {expandedNodes['lund'] && (
                 <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                    <TreeItem id="katedral" label="Katedralskolan" level={2} icon={School} />
                    <TreeItem id="polhem" label="Polhemskolan" level={2} icon={School} />
                    <TreeItem id="solang" label="Solängskolan" level={2} icon={School} />
                    <TreeItem id="spyken" label="Spyken" level={2} icon={School} />
                    <TreeItem id="vipan" label="Vipan" level={2} icon={School} />
                    <TreeItem id="vastgota" label="Västgötaskolan" level={2} icon={School} />
                 </div>
               )}

               <TreeItem id="malmo" label="Malmö Stad" level={1} hasChildren={true} />
               {expandedNodes['malmo'] && (
                 <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                    <TreeItem id="latin" label="Malmö Latin" level={2} icon={School} />
                    <TreeItem id="petri" label="S:t Petri" level={2} icon={School} />
                    <TreeItem id="borgar" label="Borgarskolan" level={2} icon={School} />
                 </div>
               )}

               <TreeItem id="skurup" label="Skurup" level={1} hasChildren={true} />
               <TreeItem id="staffan" label="Staffanstorp" level={1} hasChildren={true} />
               <TreeItem id="ystad" label="Ystad" level={1} hasChildren={true} />
               <TreeItem id="innovita" label="Innovitaskolan" level={1} />
               <TreeItem id="kunskap" label="Kunskapsskolan" level={1} />
               <TreeItem id="praktiska" label="Praktiska Gymnasiet" level={1} />
             </div>
           )}
        </div>
        
        {/* Tree Footer */}
        <div className="p-2 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-400 text-center">
           Showing 128 organization units
        </div>
      </div>

      {/* RIGHT PANEL: DETAIL VIEW */}
      <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        
        {/* Detail Header */}
        <div className="p-8 pb-0">
           <div className="flex items-center gap-5 mb-8">
              <div className="h-14 w-14 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-red-600 shadow-sm shrink-0">
                <Building2 size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lunds kommun</h1>
                <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> Skåne County</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                  <span>Code: 1281</span>
                </div>
              </div>
           </div>

           {/* Tabs */}
           <div className="flex gap-8 border-b border-slate-200">
              <button className="pb-3 text-sm font-medium text-slate-900 border-b-2 border-yellow-300 transition-colors px-1">
                {t('org_tab_overview')}
              </button>
              <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors px-1 border-b-2 border-transparent hover:border-slate-200">
                {t('org_tab_units')}
              </button>
              <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors px-1 border-b-2 border-transparent hover:border-slate-200">
                Settings
              </button>
           </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-10 max-w-5xl">
           
           {/* Section 1: Info (Grid with dividers) */}
           <section>
              <div className="flex justify-between items-center mb-3">
                 <h3 className="text-sm font-semibold text-slate-700">{t('org_info_header')}</h3>
                 <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md hover:bg-slate-50 transition-colors"><MoreVertical size={16} /></button>
              </div>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <InfoRow label={t('org_address')} value="Bergshomen 64, 32684 Lund" />
                <InfoRow label={t('org_id')} value="556633-1111" />
                <InfoRow label={t('org_code')} value="1281" />
                <InfoRow label={t('org_group')} value="-" />
              </div>
           </section>

           {/* Section 2: Contacts (Table) */}
           <section>
              <div className="flex justify-between items-center mb-3">
                 <h3 className="text-sm font-semibold text-slate-700">{t('org_contacts')}</h3>
                 <button className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-md transition-colors">
                   + Add Contact
                 </button>
              </div>
              <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-medium">
                    <tr>
                      <th className="px-4 py-2.5 font-medium border-b border-slate-200 w-1/4 text-xs uppercase tracking-wider">Role</th>
                      <th className="px-4 py-2.5 font-medium border-b border-slate-200 w-1/3 text-xs uppercase tracking-wider">Name</th>
                      <th className="px-4 py-2.5 font-medium border-b border-slate-200 text-xs uppercase tracking-wider">Phone</th>
                      <th className="px-4 py-2.5 font-medium border-b border-slate-200 w-20"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {[
                      { role: 'Admin', name: 'Anna Hansson', phone: '075367294' },
                      { role: 'Finance', name: 'Per Andersson', phone: '075367294' },
                      { role: 'IT and security', name: 'Anna Hansson', phone: '075367294' },
                    ].map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-4 py-3 text-slate-500">{c.role}</td>
                        <td className="px-4 py-3 text-slate-900 font-medium">{c.name}</td>
                        <td className="px-4 py-3 text-slate-900 font-mono text-xs">{c.phone}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded"><MessageSquare size={14} /></button>
                             <button className="p-1 hover:text-slate-600 hover:bg-slate-100 rounded"><MoreVertical size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </section>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Section 3: Invoice (Grid) */}
             <section>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">{t('org_invoice_header')}</h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                   <InfoRow label={t('org_bankgiro')} value="5566-3311" />
                   <InfoRow label={t('org_plusgiro')} value="-" />
                   <InfoRow label={t('org_ref')} value="3034592" />
                </div>
             </section>

             {/* Section 4: Price Lists (Table) */}
             <section>
                <div className="flex justify-between items-center mb-3">
                   <h3 className="text-sm font-semibold text-slate-700">{t('org_prices_header')}</h3>
                   <button className="flex items-center gap-2 px-2.5 py-1.5 border border-slate-200 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                      <Upload size={12} /> {t('org_upload_price')}
                   </button>
                </div>

                <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y divide-slate-100 bg-white">
                       <tr className="hover:bg-slate-50 transition-colors group">
                          <td className="px-4 py-3">
                             <div className="flex items-center gap-3">
                               <div className="p-1.5 bg-slate-100 rounded text-slate-500"><FileTextIcon /></div>
                               <div>
                                 <p className="font-medium text-slate-900 text-xs">Prislista 2024/2025</p>
                                 <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><CalendarIcon /> 2024-08-15</p>
                               </div>
                             </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                             <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                               {t('status_active')}
                             </span>
                          </td>
                          <td className="px-4 py-3 text-right w-16">
                             <div className="flex justify-end gap-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="hover:text-slate-600"><Download size={14} /></button>
                             </div>
                          </td>
                       </tr>
                       <tr className="hover:bg-slate-50 transition-colors group">
                          <td className="px-4 py-3">
                             <div className="flex items-center gap-3">
                               <div className="p-1.5 bg-slate-100 rounded text-slate-500"><FileTextIcon /></div>
                               <div>
                                 <p className="font-medium text-slate-900 text-xs">Prislista 2023/2024</p>
                                 <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><CalendarIcon /> 2023-08-20</p>
                               </div>
                             </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                             <span className="bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                               Archived
                             </span>
                          </td>
                          <td className="px-4 py-3 text-right w-16">
                             <div className="flex justify-end gap-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="hover:text-slate-600"><Download size={14} /></button>
                             </div>
                          </td>
                       </tr>
                    </tbody>
                  </table>
                </div>
             </section>
           </div>
        </div>

      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50/30 transition-colors px-4 bg-white">
    <dt className="text-sm font-medium text-slate-500">{label}</dt>
    <dd className="text-sm text-slate-900 md:col-span-2 font-medium">{value}</dd>
  </div>
);

// Small helper icons to match screenshot style purely
const FileTextIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 0C0.9 0 0.01 0.9 0.01 2L0 14C0 15.1 0.89 16 1.99 16H12C13.1 16 14 15.1 14 14V4L10 0H2ZM9 5.5V1.5L12.5 5.5H9Z" fill="currentColor"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);