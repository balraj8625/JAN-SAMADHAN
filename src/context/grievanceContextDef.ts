import { createContext } from 'react';
import { Department, Grievance, GrievanceStatus, Priority } from '../types';
import { BackendGrievance } from '../api';

export interface DraftGrievance {
  description: string;
  location: {
    state: string;
    district: string;
    blockOrWard: string;
    landmark: string;
    pincode: string;
  };
  attachments: {
    id: string;
    name: string;
    size: string;
    type: string;
    file?: File;
  }[];
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
  aiSummary: string;
  specificDetails: Record<string, string>;
}

export const initialDraft: DraftGrievance = {
  description: '',
  location: {
    state: 'Maharashtra',
    district: 'Pune',
    blockOrWard: 'Ward 14 / Shivaji Nagar',
    landmark: '',
    pincode: '411005',
  },
  attachments: [],
  departmentId: 'water_supply_dept',
  departmentName: {
    en: 'Department of Water Supply & Sanitation',
    hi: 'जल आपूर्ति एवं स्वच्छता विभाग',
    mr: 'पाणी पुरवठा व स्वच्छता विभाग',
  },
  category: {
    en: 'Water Supply Interruption / Pipeline Defect',
    hi: 'जल आपूर्ति में बाधा / पाइपलाइन दोष',
    mr: 'पाणी पुरवठ्यात अडथळा / पाईपलाईन दोष',
  },
  urgency: 'HIGH',
  aiSummary: '',
  specificDetails: {},
};

// Adapter function to convert backend grievance model to frontend UI model
export const adaptBackendGrievance = (bg: BackendGrievance): Grievance => {
  const createdDate = bg.submittedAt ? bg.submittedAt.split('T')[0] : new Date().toISOString().split('T')[0];
  const dueDate = bg.dueAt ? bg.dueAt.split('T')[0] : createdDate;

  return {
    id: bg.grievanceNumber || bg.id,
    createdAt: createdDate,
    targetDate: dueDate,
    title: bg.title,
    description: bg.description,
    departmentId: bg.department?.id || 'water_supply_dept',
    departmentName: bg.department?.name || {
      en: 'Public Department',
      hi: 'सार्वजनिक विभाग',
      mr: 'सार्वजनिक विभाग',
    },
    category: {
      en: bg.category || 'General Issue',
      hi: bg.category || 'सामान्य समस्या',
      mr: bg.category || 'सर्वसाधारण समस्या',
    },
    urgency: (bg.sla?.isOverdue ? 'URGENT' : 'HIGH') as Priority,
    location: {
      state: bg.location?.state || 'Maharashtra',
      district: bg.location?.district || 'Pune',
      blockOrWard: '',
      landmark: '',
      pincode: '',
    },
    specificDetails: {},
    attachments: (bg.attachments || []).map((att) => ({
      id: att.id,
      name: att.fileName,
      size: 'Attachment',
      type: att.fileType,
      url: att.downloadUrl,
    })),
    status: (bg.status as GrievanceStatus) || 'SUBMITTED',
    currentDay: bg.sla?.daysElapsed || 1,
    isOverdue: Boolean(bg.sla?.isOverdue),
    nodalOfficer: {
      name: 'Designated Public Nodal Officer',
      designation: 'Public Grievance Cell',
      office: bg.department?.name?.en || 'District Grievance Center',
      phone: '1800-11-4000',
    },
    timeline: (bg.timeline || []).map((item, idx) => ({
      dayNumber: idx + 1,
      title: item.message,
      description: item.message,
      date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : undefined,
      status: item.status === 'APPEALED' ? 'current' : 'completed',
    })),
    feedback: bg.feedback
      ? {
          solved: bg.feedback.rating >= 3 ? 'YES' : 'NO',
          rating: bg.feedback.rating,
          comment: bg.feedback.comment || undefined,
          submittedAt: bg.feedback.createdAt?.split('T')[0],
        }
      : undefined,
    appeal: bg.appeal
      ? {
          appealId: bg.appeal.id,
          createdAt: bg.appeal.createdAt?.split('T')[0] || createdDate,
          reason: bg.appeal.reason,
          remarks: bg.appeal.description,
          status: 'UNDER_APPEAL_REVIEW',
        }
      : undefined,
  };
};

export interface GrievanceContextType {
  grievances: Grievance[];
  departments: Department[];
  isLoadingGrievances: boolean;
  isLoadingDepartments: boolean;
  grievancesError: string | null;
  draft: DraftGrievance;
  setDraft: React.Dispatch<React.SetStateAction<DraftGrievance>>;
  resetDraft: () => void;
  refreshGrievances: () => Promise<void>;
  analyzeProblemAI: (text: string) => Promise<void>;
  submitGrievance: () => Promise<Grievance>;
  getGrievanceById: (id: string) => Grievance | undefined;
  fetchGrievanceByRefOrId: (idOrNumber: string) => Promise<Grievance | null>;
  submitFeedback: (id: string, rating: number, comment?: string) => Promise<void>;
  submitAppeal: (id: string, reason: string, remarks: string) => Promise<string>;
  downloadAttachment: (grievanceId: string, attachmentId: string, fileName?: string) => Promise<void>;
}

export const GrievanceContext = createContext<GrievanceContextType | undefined>(undefined);
