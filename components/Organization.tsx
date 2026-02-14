import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MessageSquare, 
  MoreVertical, 
  Upload, 
  Download, 
  ChevronRight, 
  ChevronDown, 
  Search,
  MapPin,
  School,
  Layers,
  Filter,
  Plus,
  ExternalLink,
  Edit2,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

// --- Types ---

interface Contact {
  role?: string; 
  label?: string; // "Kontaktperson 1"
  name: string;
  phone: string;
  email?: string;
}

interface Program {
  name: string;
  specialization: string;
  code: string;
}

interface InvoiceInfo {
  bankgiro: string;
  plusgiro: string;
  ref: string;
}

interface OrgUnitData {
  id: string;
  title: string;
  type: 'Region' | 'Municipality' | 'School Unit' | 'Private Provider' | 'Unit';
  code?: string; // Kommunkod or Skolenhetskod
  orgId?: string; // Org.nr
  address?: string;
  studentCount?: number;
  startDate?: string;
  endDate?: string;
  group?: string; // Parent organization name
  contacts: Contact[];
  invoice?: InvoiceInfo;
  programs?: Program[];
  // Region specific stats
  stats?: {
    municipalities: number;
    privateProviders: number;
    totalUnits: number;
  };
}

// --- DATA DEFINITIONS ---

const PROGRAMS_STANDARD = [
  { name: 'Naturvetenskapsprogrammet', specialization: 'Naturvetenskap', code: 'NANAV' },
  { name: 'Teknikprogrammet', specialization: 'Informations- och medieteknik', code: 'TEINF' },
  { name: 'Ekonomiprogrammet', specialization: 'Ekonomi', code: 'EKEKO' },
  { name: 'Samhällsvetenskapsprogrammet', specialization: 'Beteendevetenskap', code: 'SABET' },
];

const createSchool = (
  id: string, 
  name: string, 
  students: number, 
  address: string, 
  municipality: string, 
  code: string,
  contactPhone: string,
  programs: Program[] = PROGRAMS_STANDARD
): OrgUnitData => ({
  id,
  title: name,
  type: 'School Unit',
  studentCount: students,
  address,
  group: municipality,
  code: '1280', // Dummy kommunkod for display
  orgId: `20051000-${Math.floor(Math.random() * 9000) + 1000}`,
  startDate: '2020-08-15',
  endDate: '-',
  contacts: [
    { label: 'Kontaktperson 1:', name: 'Anna Hansson', phone: contactPhone },
    { label: 'Kontaktperson 2:', name: 'Per Andersson', phone: contactPhone }
  ],
  programs
});

// 1. Define Municipalities First
const MUNICIPALITIES: Record<string, OrgUnitData> = {
  'bjuv': {
    id: 'bjuv',
    title: 'Bjuvs kommun',
    type: 'Municipality',
    address: 'Storgatan 14, 267 25 Bjuv',
    orgId: '212000-0902',
    code: '1260',
    contacts: [{ role: 'Admin', name: 'Lars Lindgren', phone: '042-458 50 00' }, { role: 'Finance', name: 'Anna Berg', phone: '042-458 50 01' }],
    invoice: { bankgiro: '5401-1001', plusgiro: '-', ref: 'BJU-EDU-2024' }
  },
  'bromolla': {
    id: 'bromolla',
    title: 'Bromölla kommun',
    type: 'Municipality',
    address: 'Storgatan 48, 295 31 Bromölla',
    orgId: '212000-0910',
    code: '1272',
    contacts: [{ role: 'Admin', name: 'Karin Karlsson', phone: '0456-82 20 00' }],
    invoice: { bankgiro: '5401-1002', plusgiro: '-', ref: 'BRO-EDU-2024' }
  },
  'eslov': {
    id: 'eslov',
    title: 'Eslövs kommun',
    type: 'Municipality',
    address: 'Gröna torg 2, 241 31 Eslöv',
    orgId: '212000-1132',
    code: '1285',
    contacts: [{ role: 'Admin', name: 'Per Persson', phone: '0413-620 00' }, { role: 'Finance', name: 'Lisa Ek', phone: '0413-620 01' }],
    invoice: { bankgiro: '5401-1005', plusgiro: '-', ref: 'ESL-EDU-2024' }
  },
  'lund': {
    id: 'lund',
    title: 'Lunds kommun',
    type: 'Municipality',
    address: 'Stortorget 7, 222 23 Lund',
    orgId: '212000-1132',
    code: '1281',
    contacts: [{ role: 'Admin', name: 'Anna Hansson', phone: '075367294' }],
    invoice: { bankgiro: '5566-3311', plusgiro: '-', ref: '3034592' }
  },
  'malmo': {
    id: 'malmo',
    title: 'Malmö stad',
    type: 'Municipality',
    address: 'August Palms plats 1, 205 80 Malmö',
    orgId: '212000-1124',
    code: '1280',
    contacts: [{ role: 'Admin', name: 'David Davidsson', phone: '040-34 10 00' }],
    invoice: { bankgiro: '5401-1017', plusgiro: '-', ref: 'MAL-EDU-2024' }
  },
  'skurup': {
    id: 'skurup',
    title: 'Skurups kommun',
    type: 'Municipality',
    address: 'Stora Torggatan 4, 274 80 Skurup',
    orgId: '212000-1066',
    code: '1264',
    contacts: [{ role: 'Admin', name: 'Jenny Jönsson', phone: '0411-53 60 00' }],
    invoice: { bankgiro: '5401-1022', plusgiro: '-', ref: 'SKU-EDU-2024' }
  },
  'staffan': {
    id: 'staffan',
    title: 'Staffanstorps kommun',
    type: 'Municipality',
    address: 'Stationsgatan 5, 245 80 Staffanstorp',
    orgId: '556633-1123',
    code: '1230',
    contacts: [{ role: 'Admin', name: 'Karl Karlsson', phone: '046-25 11 00' }],
    invoice: { bankgiro: '5401-1023', plusgiro: '-', ref: 'STA-EDU-2024' }
  },
  'ystad': {
    id: 'ystad',
    title: 'Ystads kommun',
    type: 'Municipality',
    address: 'Österportstorg 2, 271 80 Ystad',
    orgId: '212000-1181',
    code: '1286',
    contacts: [{ role: 'Admin', name: 'Rikard Rydén', phone: '0411-57 70 00' }],
    invoice: { bankgiro: '5401-1029', plusgiro: '-', ref: 'YST-EDU-2024' }
  },
};

// 2. Define Private Providers
const PRIVATE_PROVIDERS: Record<string, OrgUnitData> = {
  'innovita': { 
    id: 'innovita', 
    title: 'Innovitaskolan', 
    type: 'Private Provider', 
    address: 'Scheelevägen 15',
    orgId: '556633-2001',
    contacts: [{ role: 'Admin', name: 'Erik Nilsson', phone: '046-123 45 00' }],
    invoice: { bankgiro: '5405-0001', plusgiro: '-', ref: 'INN-SKO-2024' }
  },
  'kunskap': { 
    id: 'kunskap', 
    title: 'Kunskapsskolan', 
    type: 'Private Provider', 
    address: 'Rålambsvägen 17',
    orgId: '556633-2002',
    contacts: [{ role: 'Admin', name: 'Fredrik Lindgren', phone: '08-657 77 00' }],
    invoice: { bankgiro: '5405-0002', plusgiro: '-', ref: 'KUN-SKO-2024' }
  },
  'praktiska': { 
    id: 'praktiska', 
    title: 'Praktiska Gymnasiet', 
    type: 'Private Provider', 
    address: 'Sveavägen 159',
    orgId: '556633-2003',
    contacts: [{ role: 'Admin', name: 'Anna Svensson', phone: '08-562 555 00' }],
    invoice: { bankgiro: '5405-0003', plusgiro: '-', ref: 'PRA-GYM-2024' }
  },
};

// 3. Generate Schools for Municipalities based on definitions
const generateMunicipalSchools = () => {
  const schools: Record<string, OrgUnitData> = {};

  // Helper to add a school
  const addSchool = (id: string, name: string, students: number, muniId: string, muniTitle: string, address: string) => {
    schools[id] = createSchool(id, name, students, address, muniTitle, '1280', '075367294');
  };

  // Bjuv
  addSchool('bjuv_katedral', 'Katedralskolan', 115, 'bjuv', MUNICIPALITIES['bjuv'].title, 'Bergsjövägen 23, 32680 Bjuv');
  addSchool('bjuv_solang', 'Solängskolan', 515, 'bjuv', MUNICIPALITIES['bjuv'].title, 'Bergsjövägen 24, 32681 Bjuv');
  addSchool('bjuv_vastgota', 'Västgötaskolan', 251, 'bjuv', MUNICIPALITIES['bjuv'].title, 'Bergsjövägen 25, 32682 Bjuv');
  addSchool('bjuv_norra', 'Norra Gymnasiet', 501, 'bjuv', MUNICIPALITIES['bjuv'].title, 'Bergsjövägen 26, 32683 Bjuv');

  // Bromölla
  addSchool('bromolla_katedral', 'Katedralskolan', 280, 'bromolla', MUNICIPALITIES['bromolla'].title, 'Bergsjövägen 23, 32680 Bromölla');
  addSchool('bromolla_solang', 'Solängskolan', 498, 'bromolla', MUNICIPALITIES['bromolla'].title, 'Bergsjövägen 24, 32681 Bromölla');
  addSchool('bromolla_vastgota', 'Västgötaskolan', 558, 'bromolla', MUNICIPALITIES['bromolla'].title, 'Bergsjövägen 25, 32682 Bromölla');
  addSchool('bromolla_norra', 'Norra Gymnasiet', 427, 'bromolla', MUNICIPALITIES['bromolla'].title, 'Bergsjövägen 26, 32683 Bromölla');
  addSchool('bromolla_soder', 'Södergymnasiet', 406, 'bromolla', MUNICIPALITIES['bromolla'].title, 'Bergsjövägen 27, 32684 Bromölla');

  // Eslöv
  addSchool('eslov_katedral', 'Katedralskolan', 238, 'eslov', MUNICIPALITIES['eslov'].title, 'Bergsjövägen 23, 32680 Eslöv');
  addSchool('eslov_solang', 'Solängskolan', 401, 'eslov', MUNICIPALITIES['eslov'].title, 'Bergsjövägen 24, 32681 Eslöv');
  addSchool('eslov_vastgota', 'Västgötaskolan', 562, 'eslov', MUNICIPALITIES['eslov'].title, 'Bergsjövägen 25, 32682 Eslöv');
  addSchool('eslov_norra', 'Norra Gymnasiet', 117, 'eslov', MUNICIPALITIES['eslov'].title, 'Bergsjövägen 26, 32683 Eslöv');
  addSchool('eslov_soder', 'Södergymnasiet', 349, 'eslov', MUNICIPALITIES['eslov'].title, 'Bergsjövägen 27, 32684 Eslöv');

  // Lund
  addSchool('lund_katedral', 'Katedralskolan', 299, 'lund', MUNICIPALITIES['lund'].title, 'Bergsjövägen 23, 32680 Lund');
  addSchool('lund_solang', 'Solängskolan', 460, 'lund', MUNICIPALITIES['lund'].title, 'Bergsjövägen 24, 32681 Lund');
  addSchool('lund_vastgota', 'Västgötaskolan', 460, 'lund', MUNICIPALITIES['lund'].title, 'Bergsjövägen 25, 32682 Lund');

  // Malmö
  addSchool('malmo_katedral', 'Katedralskolan', 127, 'malmo', MUNICIPALITIES['malmo'].title, 'Bergsjövägen 23, 32680 Malmö');
  addSchool('malmo_solang', 'Solängskolan', 572, 'malmo', MUNICIPALITIES['malmo'].title, 'Bergsjövägen 24, 32681 Malmö');

  // Skurup
  addSchool('skurup_katedral', 'Katedralskolan', 468, 'skurup', MUNICIPALITIES['skurup'].title, 'Bergsjövägen 23, 32680 Skurup');
  addSchool('skurup_solang', 'Solängskolan', 253, 'skurup', MUNICIPALITIES['skurup'].title, 'Bergsjövägen 24, 32681 Skurup');
  addSchool('skurup_vastgota', 'Västgötaskolan', 190, 'skurup', MUNICIPALITIES['skurup'].title, 'Bergsjövägen 25, 32682 Skurup');
  addSchool('skurup_norra', 'Norra Gymnasiet', 386, 'skurup', MUNICIPALITIES['skurup'].title, 'Bergsjövägen 26, 32683 Skurup');

  // Staffanstorp
  addSchool('staffan_katedral', 'Katedralskolan', 130, 'staffan', MUNICIPALITIES['staffan'].title, 'Bergsjövägen 23, 32680 Staffanstorp');
  addSchool('staffan_solang', 'Solängskolan', 508, 'staffan', MUNICIPALITIES['staffan'].title, 'Bergsjövägen 24, 32681 Staffanstorp');
  addSchool('staffan_vastgota', 'Västgötaskolan', 312, 'staffan', MUNICIPALITIES['staffan'].title, 'Bergsjövägen 25, 32682 Staffanstorp');

  // Ystad
  addSchool('ystad_katedral', 'Katedralskolan', 246, 'ystad', MUNICIPALITIES['ystad'].title, 'Bergsjövägen 23, 32680 Ystad');
  addSchool('ystad_solang', 'Solängskolan', 167, 'ystad', MUNICIPALITIES['ystad'].title, 'Bergsjövägen 24, 32681 Ystad');
  addSchool('ystad_vastgota', 'Västgötaskolan', 452, 'ystad', MUNICIPALITIES['ystad'].title, 'Bergsjövägen 25, 32682 Ystad');
  addSchool('ystad_norra', 'Norra Gymnasiet', 134, 'ystad', MUNICIPALITIES['ystad'].title, 'Bergsjövägen 26, 32683 Ystad');

  return schools;
};

const MUNICIPAL_SCHOOLS = generateMunicipalSchools();

// 4. Define Private Schools
const PRIVATE_SCHOOLS: Record<string, OrgUnitData> = {
  'inno_1': createSchool('inno_1', 'Innovitaskolan Gymnasium', 155, 'Bergsjövägen 23', 'Innovitaskolan', '2001', '075367294'),
  'inno_2': createSchool('inno_2', 'Innovitaskolan Gymnasium 2', 403, 'Bergsjövägen 24', 'Innovitaskolan', '2001', '075367294'),
  
  'kunskap_1': createSchool('kunskap_1', 'Kunskapsskolan Gymnasium', 545, 'Centrumvägen 1', 'Kunskapsskolan', '2002', '075367294'),
  'kunskap_2': createSchool('kunskap_2', 'Kunskapsskolan Gymnasium 2', 407, 'Centrumvägen 2', 'Kunskapsskolan', '2002', '075367294'),
  
  'prakt_1': createSchool('prakt_1', 'Praktiska Gymnasiet Gymnasium', 324, 'Verkstadsgatan 23', 'Praktiska Gymnasiet', '2003', '075367294'),
  'prakt_2': createSchool('prakt_2', 'Praktiska Gymnasiet Gymnasium 2', 255, 'Verkstadsgatan 24', 'Praktiska Gymnasiet', '2003', '075367294'),
  'prakt_3': createSchool('prakt_3', 'Praktiska Gymnasiet Gymnasium 3', 554, 'Verkstadsgatan 25', 'Praktiska Gymnasiet', '2003', '075367294'),
};

// 5. Combine All Data
const MOCK_DATA: Record<string, OrgUnitData> = {
  'skane': {
    id: 'skane',
    title: 'Region Skåne',
    type: 'Region',
    stats: { municipalities: 8, privateProviders: 3, totalUnits: 37 },
    contacts: [
      { role: 'Regionchef', name: 'Maria Svensson', phone: '040-123 45 67' },
      { role: 'Ekonomiansvarig', name: 'Johan Andersson', phone: '040-123 45 68' }
    ]
  },
  ...MUNICIPALITIES,
  ...PRIVATE_PROVIDERS,
  ...MUNICIPAL_SCHOOLS,
  ...PRIVATE_SCHOOLS
};

const getDefaultData = (id: string): OrgUnitData => ({
  id,
  title: id.charAt(0).toUpperCase() + id.slice(1),
  type: 'Unit',
  contacts: []
});

export const Organization: React.FC = () => {
  const { t } = useLanguage();
  const [selectedNodeId, setSelectedNodeId] = useState('skane');
  const [activeTab, setActiveTab] = useState<'overview' | 'payers' | 'units'>('overview');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'skane': true,
    'bjuv': true // Default expanded
  });

  const selectedData = MOCK_DATA[selectedNodeId] || getDefaultData(selectedNodeId);

  // Helper to find school units for the current municipality/provider
  const currentSchoolUnits = Object.values(MOCK_DATA).filter(
    item => item.type === 'School Unit' && 
    (item.group === selectedData.title || (item.id.startsWith(selectedData.id) && selectedData.type === 'Private Provider'))
  );

  // Reset tab when changing nodes, default to 'overview'
  useEffect(() => {
    setActiveTab('overview');
  }, [selectedNodeId]);

  const toggleNode = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const TreeItem = ({ id, label, level = 0, hasChildren = false, icon: Icon, childrenIds = [] }: any) => {
    const isExpanded = expandedNodes[id];
    const isSelected = selectedNodeId === id;
    const paddingLeft = level * 12 + 8;

    return (
      <>
        <div 
          className={`group flex items-center py-1.5 pr-3 cursor-pointer text-sm transition-all duration-150 select-none mb-0.5
            ${isSelected ? 'bg-[#FFF9C4] text-slate-900' : 'text-slate-600 hover:bg-slate-50'}
          `}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => setSelectedNodeId(id)}
        >
          <div 
            className={`mr-1 p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors cursor-pointer flex items-center justify-center h-4 w-4 ${!hasChildren ? 'invisible' : ''}`}
            onClick={(e) => toggleNode(id, e)}
          >
            {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </div>
          <div className={`mr-2.5 ${isSelected ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-500'}`}>
             {Icon ? <Icon size={14} /> : (
               hasChildren 
                ? <Layers size={14} /> 
                : <div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-yellow-400' : 'bg-slate-300'}`} />
             )}
          </div>
          <span className={`truncate ${isSelected ? 'font-medium' : 'font-normal'}`}>{label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-1 duration-200">
            {childrenIds.map((childId: string) => {
                const childData = MOCK_DATA[childId];
                if (!childData) return null;
                return (
                  <TreeItem 
                    key={childId}
                    id={childId}
                    label={childData.title}
                    level={level + 1}
                    icon={School}
                  />
                );
            })}
          </div>
        )}
      </>
    );
  };

  const renderContent = () => {
    // --- REGION VIEW ---
    if (selectedData.type === 'Region') {
      return (
        <div className="flex-1 overflow-y-auto bg-white animate-in fade-in duration-300">
           <div className="p-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-6">{selectedData.title}</h1>
              
              {/* Region Tabs */}
              <div className="flex gap-1 border-b border-slate-200 mb-8">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-[#FFF9C4] text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                >
                  {t('org_tab_overview')}
                </button>
                <button 
                  onClick={() => setActiveTab('payers')}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'payers' ? 'bg-[#FFF9C4] text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                >
                  {t('nav_payers')}
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">{selectedData.stats?.municipalities}</h3>
                    <p className="text-slate-500 text-sm">Kommuner</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">{selectedData.stats?.privateProviders}</h3>
                    <p className="text-slate-500 text-sm">Fristående huvudmän</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">{selectedData.stats?.totalUnits}</h3>
                    <p className="text-slate-500 text-sm">Skolenheter totalt</p>
                  </div>
              </div>
           </div>
        </div>
      );
    } 
    
    // --- MUNICIPALITY & PROVIDER VIEW ---
    else if (selectedData.type === 'Municipality' || selectedData.type === 'Private Provider') {
      return (
        <div className="flex-1 flex flex-col h-full bg-white animate-in fade-in duration-300">
          <div className="p-8 pb-0 shrink-0">
             {/* Breadcrumbs */}
             <div className="flex items-center text-xs text-slate-500 mb-4">
                <span>Organisation</span>
                <ChevronRight size={12} className="mx-1" />
                <span>Huvudmän</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-slate-900 font-medium">{selectedData.title}</span>
             </div>

             <div className="flex items-center gap-4 mb-6">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center shadow-sm shrink-0 ${selectedData.type === 'Municipality' ? 'bg-red-600 text-white' : 'bg-indigo-600 text-white'}`}>
                   <Building2 size={24} strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{selectedData.title}</h1>
             </div>

             <div className="flex border-b border-slate-200">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-[#FFF9C4] text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {t('org_tab_overview')}
                </button>
                <button 
                  onClick={() => setActiveTab('units')}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'units' ? 'bg-[#FFF9C4] text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {t('org_tab_units')}
                </button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
             {activeTab === 'overview' && (
               <div className="space-y-10 max-w-5xl">
                 {/* Org Info */}
                 <section>
                    <h3 className="text-sm font-semibold text-slate-500 mb-3">Organisations information</h3>
                    <div className="border-t border-slate-200">
                      <div className="grid grid-cols-1 md:grid-cols-4 py-3 gap-4">
                        <div className="text-sm text-slate-500">Adress:</div>
                        <div className="text-sm text-slate-900 md:col-span-3 font-medium">{selectedData.address}</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 py-3 gap-4 border-t border-slate-50">
                        <div className="text-sm text-slate-500">Organisation id:</div>
                        <div className="text-sm text-slate-900 md:col-span-3 font-medium">{selectedData.orgId}</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 py-3 gap-4 border-t border-slate-50">
                        <div className="text-sm text-slate-500">Kommunkod:</div>
                        <div className="text-sm text-slate-900 md:col-span-3 font-medium">{selectedData.code || '-'}</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 py-3 gap-4 border-t border-slate-50">
                        <div className="text-sm text-slate-500">Koncern:</div>
                        <div className="text-sm text-slate-900 md:col-span-3 font-medium">{selectedData.group || '-'}</div>
                      </div>
                    </div>
                 </section>

                 {/* Contacts */}
                 <section>
                    <h3 className="text-sm font-semibold text-slate-500 mb-3">Contacts</h3>
                    <div className="border border-slate-200 rounded-lg bg-white divide-y divide-slate-100">
                       {selectedData.contacts.map((c, i) => (
                         <div key={i} className="flex items-center justify-between p-4">
                           <div className="grid grid-cols-2 gap-8 w-1/3">
                             <span className="text-sm text-slate-500">{c.role}</span>
                             <span className="text-sm font-medium text-slate-900">{c.name}</span>
                           </div>
                           <div className="flex items-center gap-12 w-2/3 justify-end">
                              <span className="text-sm text-slate-500">Phone: <span className="text-slate-900 ml-2 font-medium">{c.phone}</span></span>
                              <div className="flex gap-2">
                                <button className="p-2 hover:bg-slate-50 rounded-md text-slate-400 hover:text-slate-600"><MessageSquare size={16} /></button>
                                <button className="p-2 hover:bg-slate-50 rounded-md text-slate-400 hover:text-slate-600"><MoreVertical size={16} /></button>
                              </div>
                           </div>
                         </div>
                       ))}
                    </div>
                 </section>

                 {/* Invoice & Price Lists */}
                 <section>
                    <h3 className="text-sm font-semibold text-slate-500 mb-3">Fakturauppgifter</h3>
                    <div className="bg-slate-50/50 rounded-lg p-6 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div>
                          <dt className="text-xs text-slate-500 uppercase tracking-wide mb-1">Bankgiro</dt>
                          <dd className="text-sm font-medium text-slate-900">{selectedData.invoice?.bankgiro}</dd>
                       </div>
                       <div>
                          <dt className="text-xs text-slate-500 uppercase tracking-wide mb-1">Plusgiro</dt>
                          <dd className="text-sm font-medium text-slate-900">{selectedData.invoice?.plusgiro}</dd>
                       </div>
                       <div>
                          <dt className="text-xs text-slate-500 uppercase tracking-wide mb-1">Your ref.</dt>
                          <dd className="text-sm font-medium text-slate-900">{selectedData.invoice?.ref}</dd>
                       </div>
                    </div>
                 </section>

                 <section>
                   <div className="flex justify-between items-center mb-3">
                     <h3 className="text-sm font-semibold text-slate-500">Prislistor</h3>
                     <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-300 bg-white rounded-md text-xs font-medium hover:bg-slate-50 shadow-sm text-slate-700">
                       <Upload size={12} /> Ladda upp prislista
                     </button>
                   </div>
                   <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3 font-medium text-xs">Namn</th>
                            <th className="px-4 py-3 font-medium text-xs">Läsår</th>
                            <th className="px-4 py-3 font-medium text-xs">Uppladdad</th>
                            <th className="px-4 py-3 font-medium text-xs">Status</th>
                            <th className="px-4 py-3 w-16"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          <tr className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium flex items-center gap-2 text-slate-900"><FileTextIcon /> Prislista 2024/2025</td>
                            <td className="px-4 py-3 text-slate-600">2024/2025</td>
                            <td className="px-4 py-3 text-slate-500 text-xs flex items-center gap-1"><CalendarIcon /> 2024-08-15</td>
                            <td className="px-4 py-3"><span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-bold">Aktiv</span></td>
                            <td className="px-4 py-3 text-right flex justify-end gap-2">
                               <button className="text-slate-400 hover:text-slate-600"><Download size={16} /></button>
                               <button className="text-slate-400 hover:text-red-600"><TrashIcon /></button>
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium flex items-center gap-2 text-slate-900"><FileTextIcon /> Prislista 2023/2024</td>
                            <td className="px-4 py-3 text-slate-600">2023/2024</td>
                            <td className="px-4 py-3 text-slate-500 text-xs flex items-center gap-1"><CalendarIcon /> 2023-08-20</td>
                            <td className="px-4 py-3"><span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-bold">Arkiverad</span></td>
                            <td className="px-4 py-3 text-right flex justify-end gap-2">
                               <button className="text-slate-400 hover:text-slate-600"><Download size={16} /></button>
                               <button className="text-slate-400 hover:text-red-600"><TrashIcon /></button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                   </div>
                 </section>
               </div>
             )}

             {activeTab === 'units' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input type="text" placeholder="Sök skola..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all shadow-sm" />
                      </div>
                      <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 bg-white rounded-md text-sm text-slate-700 hover:bg-slate-50 font-medium shadow-sm">
                        <Filter size={14} /> Filter
                      </button>
                   </div>
                   
                   <p className="text-sm text-slate-500 mb-4">{currentSchoolUnits.length} skolenheter</p>

                   <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-200">
                          <tr>
                            <th className="py-3 px-6 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
                            <th className="py-3 px-6 font-medium">Skola</th>
                            <th className="py-3 px-6 font-medium">Elever</th>
                            <th className="py-3 px-6 font-medium">Org.nr</th>
                            <th className="py-3 px-6 font-medium">Adress</th>
                            <th className="py-3 px-6 font-medium">Kontakt</th>
                            <th className="py-3 px-6 font-medium">Typ</th>
                            <th className="py-3 px-6 w-12"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {currentSchoolUnits.map((s, i) => (
                            <tr key={i} className="hover:bg-blue-50/30 group cursor-pointer transition-colors" onClick={() => setSelectedNodeId(s.id)}>
                              <td className="py-4 px-6"><input type="checkbox" className="rounded border-slate-300" onClick={e => e.stopPropagation()} /></td>
                              <td className="py-4 px-6 font-medium text-slate-900">{s.title}</td>
                              <td className="py-4 px-6 text-slate-600">{s.studentCount}</td>
                              <td className="py-4 px-6 text-slate-600 tabular-nums">{s.orgId}</td>
                              <td className="py-4 px-6 text-slate-600 truncate max-w-[200px]">{s.address}</td>
                              <td className="py-4 px-6 text-slate-600 tabular-nums">{s.contacts[0]?.phone}</td>
                              <td className="py-4 px-6">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                  Publik
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right"><MoreVertical size={16} className="text-slate-400 opacity-0 group-hover:opacity-100" /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                   </div>
                </div>
             )}
          </div>
        </div>
      );
    }

    // --- SCHOOL UNIT VIEW ---
    else {
       return (
         <div className="flex-1 flex flex-col h-full bg-white animate-in fade-in duration-300">
           <div className="p-8 pb-0">
             {/* Breadcrumbs */}
             <div className="flex items-center text-xs text-slate-500 mb-6">
                <span>Organisation</span>
                <ChevronRight size={12} className="mx-1" />
                <span>Huvudmän</span>
                <ChevronRight size={12} className="mx-1" />
                <span className="hover:underline cursor-pointer" onClick={() => setSelectedNodeId(selectedData.id.split('_')[0])}>
                  {selectedData.group}
                </span>
                <ChevronRight size={12} className="mx-1" />
                <span className="text-slate-900 font-medium">{selectedData.title}</span>
             </div>

             <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{selectedData.title}</h1>
             </div>
             
             {/* Key Stats / Header Info */}
             <div className="flex flex-col gap-1 mb-8">
                <div className="flex items-center gap-2">
                   <span className="text-sm text-slate-500 font-medium w-24">Antal elever:</span>
                   <span className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                     {selectedData.studentCount} 
                     <ExternalLink size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" />
                   </span>
                </div>
             </div>

             {/* Info Grid */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6 mb-10 max-w-5xl">
                <div className="space-y-4">
                  <div className="flex items-baseline">
                    <span className="text-sm text-slate-500 w-32 shrink-0">Adress:</span>
                    <span className="text-sm text-slate-900 font-medium">{selectedData.address}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-sm text-slate-500 w-32 shrink-0">Huvudman:</span>
                    <span className="text-sm text-slate-900 font-medium">{selectedData.group} (kommun)</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-sm text-slate-500 w-32 shrink-0">Kommunkod:</span>
                    <span className="text-sm text-slate-900 font-medium">{selectedData.code}</span>
                  </div>
                </div>
                <div className="space-y-4">
                   <div className="flex items-baseline justify-between">
                       <div className="flex items-baseline">
                         <span className="text-sm text-slate-500 w-32 shrink-0">Skolenhetskod:</span>
                         <span className="text-sm text-slate-900 font-medium">{selectedData.orgId ? selectedData.orgId.replace('-', '') : ''}</span>
                       </div>
                   </div>
                   <div className="flex items-baseline">
                    <span className="text-sm text-slate-500 w-32 shrink-0">Startdatum:</span>
                    <span className="text-sm text-slate-900 font-medium">{selectedData.startDate}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-sm text-slate-500 w-32 shrink-0">Slutdatum:</span>
                    <span className="text-sm text-slate-900 font-medium">{selectedData.endDate}</span>
                  </div>
                  
                  <div className="pt-2 flex justify-end">
                     <button className="text-sm font-medium text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors">
                        <Edit2 size={14} /> Uppdatera organisationsinfo
                     </button>
                  </div>
                </div>
             </div>

             {/* Contacts List */}
             <div className="border-t border-b border-slate-200 py-8 mb-10 space-y-6">
                {selectedData.contacts.map((c, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex gap-16 w-1/2">
                         <span className="text-sm text-slate-500 w-32">{c.label}</span>
                         <span className="text-sm font-medium text-slate-900">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-8 w-1/2 justify-end">
                         <span className="text-sm text-slate-500 flex items-center gap-2">
                            Telefon: <span className="text-slate-900 font-medium tabular-nums">{c.phone}</span>
                         </span>
                         <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-md text-xs font-medium hover:bg-slate-50 text-slate-700 bg-white shadow-sm transition-colors">
                             <MessageSquare size={14} /> Meddelande
                         </button>
                         <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={16} /></button>
                      </div>
                   </div>
                ))}
             </div>

             {/* Study Paths Table */}
             <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-500">Studievägar</h3>
                  <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium hover:bg-slate-50 text-slate-700 shadow-sm transition-colors">
                    <Plus size={16} /> Lägg till studieväg
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 font-medium text-slate-500 text-xs">Program</th>
                        <th className="px-6 py-3 font-medium text-slate-500 text-xs">Inriktning</th>
                        <th className="px-6 py-3 font-medium text-slate-500 text-xs">Studievägskod</th>
                        <th className="px-6 py-3 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {selectedData.programs?.map((p, i) => (
                         <tr key={i} className="hover:bg-slate-50 transition-colors group">
                           <td className="px-6 py-4 flex items-center gap-3 font-medium text-slate-900">
                             <School size={16} className="text-slate-400" />
                             {p.name}
                           </td>
                           <td className="px-6 py-4 text-slate-700">{p.specialization}</td>
                           <td className="px-6 py-4">
                             <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-xs font-bold text-slate-600 font-mono tracking-wide">{p.code}</span>
                           </td>
                           <td className="px-6 py-4 text-right">
                             <MoreVertical size={16} className="text-slate-400 hover:text-slate-600 cursor-pointer ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                           </td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
                </div>
             </div>
           </div>
         </div>
       );
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] animate-in fade-in duration-500 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      
      {/* LEFT PANEL: TREE VIEW */}
      <div className="w-72 border-r border-slate-200 bg-white flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-slate-100">
          <div className="relative">
             <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 h-3.5 w-3.5" />
             <input 
               type="text" 
               placeholder="Sök..." 
               className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all placeholder:text-slate-400"
             />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2 pl-1 custom-scrollbar">
           <TreeItem id="skane" label="Region Skåne" level={0} hasChildren={true} icon={MapPin} />
           
           {expandedNodes['skane'] && (
             <div className="animate-in fade-in slide-in-from-top-1 duration-200">
               <TreeItem id="bjuv" label="Bjuv" level={1} hasChildren={true} childrenIds={['bjuv_katedral', 'bjuv_solang', 'bjuv_vastgota', 'bjuv_norra']} />
               <TreeItem id="bromolla" label="Bromölla" level={1} hasChildren={true} childrenIds={['bromolla_katedral', 'bromolla_solang', 'bromolla_vastgota', 'bromolla_norra', 'bromolla_soder']} />
               <TreeItem id="eslov" label="Eslöv" level={1} hasChildren={true} childrenIds={['eslov_katedral', 'eslov_solang', 'eslov_vastgota', 'eslov_norra', 'eslov_soder']} />
               <TreeItem id="lund" label="Lund" level={1} hasChildren={true} childrenIds={['lund_katedral', 'lund_solang', 'lund_vastgota']} />
               <TreeItem id="malmo" label="Malmö" level={1} hasChildren={true} childrenIds={['malmo_katedral', 'malmo_solang']} />
               <TreeItem id="skurup" label="Skurup" level={1} hasChildren={true} childrenIds={['skurup_katedral', 'skurup_solang', 'skurup_vastgota', 'skurup_norra']} />
               <TreeItem id="staffan" label="Staffanstorp" level={1} hasChildren={true} childrenIds={['staffan_katedral', 'staffan_solang', 'staffan_vastgota']} />
               <TreeItem id="ystad" label="Ystad" level={1} hasChildren={true} childrenIds={['ystad_katedral', 'ystad_solang', 'ystad_vastgota', 'ystad_norra']} />
               
               <TreeItem id="innovita" label="Innovitaskolan" level={1} hasChildren={true} childrenIds={['inno_1', 'inno_2']} />
               <TreeItem id="kunskap" label="Kunskapsskolan" level={1} hasChildren={true} childrenIds={['kunskap_1', 'kunskap_2']} />
               <TreeItem id="praktiska" label="Praktiska Gymnasiet" level={1} hasChildren={true} childrenIds={['prakt_1', 'prakt_2', 'prakt_3']} />
             </div>
           )}
        </div>
      </div>

      {/* RIGHT PANEL: DYNAMIC CONTENT */}
      {renderContent()}
    </div>
  );
};

// Icons
const FileTextIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
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

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);
