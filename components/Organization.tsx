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
  ArrowRight,
  FileText,
  Calendar,
  Trash2
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Modal } from './ui/Modal';
import { useToast } from './ui/Toast';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Card, PageHeader } from './ui/Layout';
import { Drawer } from './ui/Drawer';
import { DetailsDrawer, DetailsRow, DetailsSection } from './ui/DetailsDrawer';

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
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSchoolUnit, setSelectedSchoolUnit] = useState<any>(null);
  const [nodeForm, setNodeForm] = useState<Partial<OrgUnitData>>({});

  const handleEditClick = () => {
    setNodeForm({ ...selectedData });
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setNodeForm({
      type: 'School Unit',
      group: selectedData.title,
      contacts: [],
      stats: undefined
    });
    setIsAddModalOpen(true);
  };

  const handleSave = () => {
    // In a real app, we would update the backend here.
    // For now, we'll just show a success message.
    toast.success(isEditModalOpen ? "Ändringar sparade" : "Enhet skapad",
      isEditModalOpen ? `${nodeForm.title} har uppdaterats.` : `${nodeForm.title || 'Ny enhet'} har lagts till.`);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

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

  // --- Tree View Component ---
  const TreeItem = ({ id, label, level = 0, hasChildren = false, icon: Icon, childrenIds = [], isLast = false, parentExpanded = true }: any) => {
    const isExpanded = expandedNodes[id];
    const isSelected = selectedNodeId === id;
    // Indent based on level - schools get more indentation
    const paddingLeft = level === 0 ? 16 : level === 1 ? 40 : 60;

    if (!parentExpanded) return null;

    return (
      <div className="relative">
        <div
          className={`group relative flex items-center py-2.5 pr-3 cursor-pointer text-sm transition-all duration-150 select-none
            ${isSelected ? 'bg-indigo-50/50 text-indigo-900 font-medium' : 'text-slate-700 hover:bg-slate-50'}
          `}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => setSelectedNodeId(id)}
        >
          <div
            className={`mr-3 flex items-center justify-center transition-colors
              ${hasChildren ? 'text-slate-400 hover:text-slate-600' : ''}
            `}
            onClick={(e) => hasChildren && toggleNode(id, e)}
          >
            {Icon ? (
              <Icon size={18} className={isSelected ? 'text-indigo-600' : 'text-slate-500'} />
            ) : (
              hasChildren ? (
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''} text-slate-400`}
                />
              ) : (
                <div className={`h-2 w-2 rounded-full ${isSelected ? 'bg-indigo-400' : 'bg-slate-300'}`} />
              )
            )}
          </div>

          <span className={`truncate ${level === 0 ? 'font-medium' : ''}`}>{label}</span>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {childrenIds.map((childId: string, index: number) => {
              const childData = MOCK_DATA[childId];
              if (!childData) return null;
              return (
                <TreeItem
                  key={childId}
                  id={childId}
                  label={childData.title}
                  level={level + 1}
                  isLast={index === childrenIds.length - 1}
                  parentExpanded={isExpanded}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    // --- REGION VIEW ---
    if (selectedData.type === 'Region') {
      return (
        <div className="flex-1 overflow-y-auto bg-white animate-in fade-in duration-300">
          <div className="p-8">
            <PageHeader title={selectedData.title} />

            {/* Region Tabs */}
            <div className="flex gap-1 border-b border-slate-200 mb-8">
              <Button
                variant={activeTab === 'overview' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('overview')}
                className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
              >
                {t('org_tab_overview')}
              </Button>
              <Button
                variant={activeTab === 'payers' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('payers')}
                className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
              >
                {t('nav_payers')}
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{selectedData.stats?.municipalities}</h3>
                <p className="text-slate-500 text-sm">Kommuner</p>
              </Card>
              <Card>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{selectedData.stats?.privateProviders}</h3>
                <p className="text-slate-500 text-sm">Fristående huvudmän</p>
              </Card>
              <Card>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{selectedData.stats?.totalUnits}</h3>
                <p className="text-slate-500 text-sm">Skolenheter totalt</p>
              </Card>
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
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{selectedData.title}</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEditClick}
                  className="rounded-full w-8 h-8 p-0"
                  title="Redigera organisation"
                >
                  <Edit2 size={16} />
                </Button>
              </div>
            </div>

            <div className="flex gap-1 border-b border-slate-200">
              <Button
                variant={activeTab === 'overview' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('overview')}
                className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
              >
                {t('org_tab_overview')}
              </Button>
              <Button
                variant={activeTab === 'units' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('units')}
                className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
              >
                {t('org_tab_units')}
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {activeTab === 'overview' && (
              <div className="space-y-10 max-w-5xl">
                {/* Org Info */}
                <Card title="Organisations information">
                  <div className="">
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
                </Card>

                {/* Contacts */}
                <Card title="Contacts" noPadding>
                  <div className="divide-y divide-slate-100">
                    {selectedData.contacts.map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-4">
                        <div className="grid grid-cols-2 gap-8 w-1/3">
                          <span className="text-sm text-slate-500">{c.role}</span>
                          <span className="text-sm font-medium text-slate-900">{c.name}</span>
                        </div>
                        <div className="flex items-center gap-12 w-2/3 justify-end">
                          <span className="text-sm text-slate-500">Phone: <span className="text-slate-900 ml-2 font-medium">{c.phone}</span></span>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="p-2 h-auto"><MessageSquare size={16} /></Button>
                            <Button variant="ghost" size="sm" className="p-2 h-auto"><MoreVertical size={16} /></Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Invoice & Price Lists */}
                <Card title="Fakturauppgifter">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                </Card>

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
                          <td className="px-4 py-3 font-medium flex items-center gap-2 text-slate-900"><FileText size={14} className="text-slate-400" /> Prislista 2024/2025</td>
                          <td className="px-4 py-3 text-slate-600">2024/2025</td>
                          <td className="px-4 py-3 text-slate-500 text-xs flex items-center gap-1"><Calendar size={10} /> 2024-08-15</td>
                          <td className="px-4 py-3"><Badge variant="success">Aktiv</Badge></td>
                          <td className="px-4 py-3 text-right flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="p-0 h-auto text-slate-400 hover:text-slate-600"><Download size={16} /></Button>
                            <Button variant="ghost" size="sm" className="p-0 h-auto text-slate-400 hover:text-red-600"><Trash2 size={14} /></Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium flex items-center gap-2 text-slate-900"><FileText size={14} className="text-slate-400" /> Prislista 2023/2024</td>
                          <td className="px-4 py-3 text-slate-600">2023/2024</td>
                          <td className="px-4 py-3 text-slate-500 text-xs flex items-center gap-1"><Calendar size={10} /> 2023-08-20</td>
                          <td className="px-4 py-3"><Badge variant="neutral">Arkiverad</Badge></td>
                          <td className="px-4 py-3 text-right flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="p-0 h-auto text-slate-400 hover:text-slate-600"><Download size={16} /></Button>
                            <Button variant="ghost" size="sm" className="p-0 h-auto text-slate-400 hover:text-red-600"><Trash2 size={14} /></Button>
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

                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-slate-500">{currentSchoolUnits.length} skolenheter</p>
                  <Button
                    onClick={handleAddClick}
                    leftIcon={<Plus size={16} />}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
                  >
                    Lägg till enhet
                  </Button>
                </div>

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
                        <tr key={i} className="hover:bg-blue-50/30 group cursor-pointer transition-colors" onClick={() => setSelectedSchoolUnit(s)}>
                          <td className="py-4 px-6"><input type="checkbox" className="rounded border-slate-300" onClick={e => e.stopPropagation()} /></td>
                          <td className="py-4 px-6 font-medium text-slate-900">{s.title}</td>
                          <td className="py-4 px-6 text-slate-600">{s.studentCount}</td>
                          <td className="py-4 px-6 text-slate-600 tabular-nums">{s.orgId}</td>
                          <td className="py-4 px-6 text-slate-600 truncate max-w-[200px]">{s.address}</td>
                          <td className="py-4 px-6 text-slate-600 tabular-nums">{s.contacts[0]?.phone}</td>
                          <td className="py-4 px-6">
                            <Badge variant="neutral">Publik</Badge>
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
            <Card className="mb-10 max-w-5xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6">
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
                    <Button
                      variant="ghost"
                      onClick={handleEditClick}
                      leftIcon={<Edit2 size={14} />}
                      className="text-slate-700 hover:text-slate-900"
                    >
                      Uppdatera organisationsinfo
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contacts List */}
            <Card title="Contacts" className="mb-10" noPadding>
              <div className="divide-y divide-slate-100">
                {selectedData.contacts.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-6">
                    <div className="flex gap-16 w-1/2">
                      <span className="text-sm text-slate-500 w-32">{c.label}</span>
                      <span className="text-sm font-medium text-slate-900">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-8 w-1/2 justify-end">
                      <span className="text-sm text-slate-500 flex items-center gap-2">
                        Telefon: <span className="text-slate-900 font-medium tabular-nums">{c.phone}</span>
                      </span>
                      <Button variant="outline" size="sm" leftIcon={<MessageSquare size={14} />}>Meddelande</Button>
                      <Button variant="ghost" size="sm" className="p-2 h-auto text-slate-400 hover:text-slate-600"><MoreVertical size={16} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Study Paths Table */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-500">Studievägar</h3>
                <Button variant="outline" size="sm" leftIcon={<Plus size={16} />}>Lägg till studieväg</Button>
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
                          <Badge variant="neutral" className="font-mono tracking-wide">{p.code}</Badge>
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
          </div >
        </div >
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
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          <TreeItem id="skane" label="Region Skåne" level={0} hasChildren={true} icon={MapPin} />

          {expandedNodes['skane'] && (
            <div className="relative">
              <div className="absolute top-0 bottom-0 w-px bg-slate-200" style={{ left: '12px' }} />
              <TreeItem id="bjuv" label="Bjuvs kommun" level={1} hasChildren={true} childrenIds={['bjuv_katedral', 'bjuv_solang', 'bjuv_vastgota', 'bjuv_norra']} />
              <TreeItem id="bromolla" label="Bromölla kommun" level={1} hasChildren={true} childrenIds={['bromolla_katedral', 'bromolla_solang', 'bromolla_vastgota', 'bromolla_norra', 'bromolla_soder']} />
              <TreeItem id="eslov" label="Eslövs kommun" level={1} hasChildren={true} childrenIds={['eslov_katedral', 'eslov_solang', 'eslov_vastgota', 'eslov_norra', 'eslov_soder']} />
              <TreeItem id="lund" label="Lunds kommun" level={1} hasChildren={true} childrenIds={['lund_katedral', 'lund_solang', 'lund_vastgota']} />
              <TreeItem id="malmo" label="Malmö stad" level={1} hasChildren={true} childrenIds={['malmo_katedral', 'malmo_solang']} />
              <TreeItem id="skurup" label="Skurups kommun" level={1} hasChildren={true} childrenIds={['skurup_katedral', 'skurup_solang', 'skurup_vastgota', 'skurup_norra']} />
              <TreeItem id="staffan" label="Staffanstorps kommun" level={1} hasChildren={true} childrenIds={['staffan_katedral', 'staffan_solang', 'staffan_vastgota']} />
              <TreeItem id="ystad" label="Ystads kommun" level={1} hasChildren={true} childrenIds={['ystad_katedral', 'ystad_solang', 'ystad_vastgota', 'ystad_norra']} />

              <TreeItem id="innovita" label="Innovitaskolan" level={1} hasChildren={true} childrenIds={['inno_1', 'inno_2']} />
              <TreeItem id="kunskap" label="Kunskapsskolan" level={1} hasChildren={true} childrenIds={['kunskap_1', 'kunskap_2']} />
              <TreeItem id="praktiska" label="Praktiska Gymnasiet" level={1} hasChildren={true} childrenIds={['prakt_1', 'prakt_2', 'prakt_3']} isLast={true} />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isEditModalOpen || isAddModalOpen}
        onClose={() => { setIsEditModalOpen(false); setIsAddModalOpen(false); }}
        title={isEditModalOpen ? `Redigera ${selectedData.title}` : 'Lägg till ny enhet'}
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => { setIsEditModalOpen(false); setIsAddModalOpen(false); }}
            >
              Avbryt
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
            >
              Spara
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Namn</label>
              <input
                type="text"
                value={nodeForm.title || ''}
                onChange={(e) => setNodeForm({ ...nodeForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Typ</label>
              <select
                value={nodeForm.type || 'School Unit'}
                onChange={(e) => setNodeForm({ ...nodeForm, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                disabled={isEditModalOpen}
              >
                <option value="Municipality">Kommun</option>
                <option value="Private Provider">Fristående huvudman</option>
                <option value="School Unit">Skolenhet</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Adress</label>
            <input
              type="text"
              value={nodeForm.address || ''}
              onChange={(e) => setNodeForm({ ...nodeForm, address: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Org.nr / ID</label>
              <input
                type="text"
                value={nodeForm.orgId || ''}
                onChange={(e) => setNodeForm({ ...nodeForm, orgId: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Kod</label>
              <input
                type="text"
                value={nodeForm.code || ''}
                onChange={(e) => setNodeForm({ ...nodeForm, code: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* RIGHT PANEL: DYNAMIC CONTENT */}
      {renderContent()}

      {/* School Unit Details Drawer */}
      <Drawer
        isOpen={!!selectedSchoolUnit}
        onClose={() => setSelectedSchoolUnit(null)}
        width="2xl"
        showCloseButton={false}
      >
        {selectedSchoolUnit && (
          <DetailsDrawer
            title={selectedSchoolUnit.title}
            id={selectedSchoolUnit.orgId}
            status={{ label: 'Aktiv', variant: 'success' }}
            metadata={[
              { label: 'Kommun', value: selectedSchoolUnit.group, icon: <MapPin size={14} /> },
              { label: 'Typ', value: 'Skola', icon: <School size={14} /> },
            ]}
            onClose={() => setSelectedSchoolUnit(null)}
            onEdit={() => {
              toast({ title: "Redigera enhet", description: "Funktionalitet kommer snart" });
            }}
            footer={
              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedSchoolUnit(null)}>Stäng</Button>
                <Button variant="primary" className="flex-1" onClick={() => toast({ title: "Sparat", description: "Ändringar har sparats" })}>Spara ändringar</Button>
              </div>
            }
          >
            <DetailsSection title="Kontaktinformation">
              <DetailsRow label="Address" value={selectedSchoolUnit.address} />
              {selectedSchoolUnit.contacts?.map((contact: any, idx: number) => (
                <React.Fragment key={idx}>
                  <DetailsRow label="Kontaktperson" value={contact.name} />
                  <DetailsRow label="Telefon" value={contact.phone} />
                  <DetailsRow label="E-post" value={contact.email} />
                </React.Fragment>
              ))}
            </DetailsSection>

            <DetailsSection title="Verksamhetsinformation">
              <DetailsRow label="Antal elever" value={selectedSchoolUnit.studentCount} />
              <DetailsRow label="Startdatum" value="2024-08-15" />
              <DetailsRow label="Slutdatum" value="Tillsvidare" />
            </DetailsSection>

            <DetailsSection title="Övrigt">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600">
                  Här kan ytterligare information om skolenheten visas, såsom anteckningar, historik eller specifika inställningar.
                </p>
              </div>
            </DetailsSection>
          </DetailsDrawer>
        )}
      </Drawer>
    </div>
  );
};

// Icons

