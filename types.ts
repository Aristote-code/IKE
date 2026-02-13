export enum Page {
  DASHBOARD = 'DASHBOARD',
  ORGANIZATION = 'ORGANIZATION',
  STUDENTS = 'STUDENTS',
  STUDENT_DETAIL = 'STUDENT_DETAIL',
  ECONOMY = 'ECONOMY',
  ANALYSIS = 'ANALYSIS',
  COMMUNICATION = 'COMMUNICATION',
  REGISTERS = 'REGISTERS',
  USERS = 'USERS',
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

export interface Student {
  id: string;
  ssn: string;
  name: string;
  status: 'Active' | 'Inactive' | 'Pending';
  municipality: string;
  school: string;
  program: string;
  startDate: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  type: 'review' | 'action' | 'info';
  date: string;
}
