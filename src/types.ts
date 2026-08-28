export type Language = 'en' | 'hi' | 'mr';

export type TextSize = 'normal' | 'large' | 'xlarge';

export type GrievanceStatus = 
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'ACTION_IN_PROGRESS'
  | 'RESOLVED'
  | 'OVERDUE'
  | 'REJECTED'
  | 'APPEALED';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface TimelineStep {
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  description: {
    en: string;
    hi: string;
    mr: string;
  };
  date?: string;
  status: 'completed' | 'current' | 'pending' | 'overdue';
  dayNumber: number;
  officerNote?: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface Grievance {
  id: string; // e.g., JS-2025-88392
  createdAt: string; // ISO date string or formatted
  targetDate: string; // 21 days from creation
  title: string;
  description: string;
  departmentId: string;
  departmentName: {
    en: string;
    hi: string;
    mr: string;
  };
  category: {
    en: string;
    hi: string;
    mr: string;
  };
  urgency: Priority;
  location: {
    state: string;
    district: string;
    blockOrWard: string;
    landmark: string;
    pincode: string;
  };
  specificDetails: Record<string, string>; // e.g. consumerNo, meterNo, rationCardNo
  attachments: Attachment[];
  status: GrievanceStatus;
  currentDay: number; // e.g., Day 6 of 21
  nodalOfficer: {
    name: string;
    designation: string;
    office: string;
    phone: string;
  };
  timeline: TimelineStep[];
  isOverdue: boolean;
  delayReason?: {
    en: string;
    hi: string;
    mr: string;
  };
  feedback?: {
    solved: 'YES' | 'PARTIAL' | 'NO';
    rating?: number;
    comment?: string;
    submittedAt?: string;
  };
  appeal?: {
    appealId: string;
    createdAt: string;
    reason: string;
    remarks: string;
    status: 'PENDING' | 'UNDER_APPEAL_REVIEW' | 'RESOLVED';
  };
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  district: string;
  isLoggedIn: boolean;
}

export interface Department {
  id: string;
  name: {
    en: string;
    hi: string;
    mr: string;
  };
  iconName: string;
  commonIssues: {
    en: string;
    hi: string;
    mr: string;
  }[];
  requiredFields: {
    key: string;
    label: {
      en: string;
      hi: string;
      mr: string;
    };
    placeholder: {
      en: string;
      hi: string;
      mr: string;
    };
    required: boolean;
  }[];
}
