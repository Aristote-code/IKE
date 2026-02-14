export enum Page {
  DASHBOARD = 'DASHBOARD',
  // Registers
  PERSONS = 'PERSONS',
  PERSON_DETAIL = 'PERSON_DETAIL',
  ORGANIZATION = 'ORGANIZATION',
  // Economy
  ECONOMY = 'ECONOMY',
  INVOICES = 'INVOICES',
  // Admin & Tools
  ANALYSIS = 'ANALYSIS',
  COMMUNICATION = 'COMMUNICATION',
  ADMINISTRATION = 'ADMINISTRATION',
  SETTINGS = 'SETTINGS',
  INTERNAL = 'INTERNAL'
}

export interface NavItem {
  id: string;
  label: string;
  icon?: any;
  page?: Page;
  subItems?: { label: string; page: Page; id: string }[];
}

export type PersonStatus = 'Active' | 'Inactive' | 'Pending' | 'Archived';
export type PersonType = 'Student' | 'KAA';

export interface Placement {
  id: string;
  schoolUnitId: string;
  schoolUnitName: string;
  programCode: string; // e.g., "SA", "NA"
  programName: string;
  startDate: string;
  endDate?: string;
  status: 'Current' | 'Historical' | 'Future';
}

export interface Person {
  id: string;
  ssn: string; // YYYYMMDD-XXXX
  givenName: string;
  familyName: string;
  fullName: string;
  email?: string;
  phone?: string;
  address?: string;
  homeMunicipalityCode: string;
  homeMunicipalityName: string;
  status: PersonStatus;
  types: PersonType[]; // Can be both Student and KAA potentially
  placements: Placement[];
  // KAA specific fields could go here or in a separate extended interface
  kaaActionStatus?: string;
  lastKaaActionDate?: string;
}

// Re-export Student for backward compatibility if needed, 
// but we should aim to use Person primarily.
export interface Student extends Person {
  // extensive student specific fields
}

export interface Task {
  id: number;
  title: string;
  description: string;
  type: 'review' | 'action' | 'info' | 'warning';
  priority: 'high' | 'medium' | 'low';
  date: string;
  relatedEntityId?: string; // Link to a person or invoice
}

export interface OrganizationNode {
  id: string;
  name: string;
  type: 'Municipality' | 'CorporateGroup' | 'School' | 'Unit';
  code?: string;
  children?: OrganizationNode[];
  parent?: string;
  meta?: {
    orgNumber?: string;
    address?: string;
    contactPerson?: string;
  };
}

export interface BillingCycle {
  id: string;
  name: string; // e.g., "October 2025"
  period: string; // YYYY-MM
  status: 'Open' | 'Preliminary' | 'Final' | 'Closed';
  totalAmount: number;
  invoiceCount: number;
  dueDate: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  recipientName: string; // Organization or Municipality name
  amount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  date: string;
  dueDate: string;
  items: {
    description: string;
    amount: number;
    studentName?: string;
  }[];
}
