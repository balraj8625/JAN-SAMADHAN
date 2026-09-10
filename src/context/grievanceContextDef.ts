import { createContext } from 'react';
import { Grievance, Priority, Attachment } from '../types';

export interface DraftGrievance {
  description: string;
  location: {
    state: string;
    district: string;
    blockOrWard: string;
    landmark: string;
    pincode: string;
  };
  attachments: Attachment[];
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

export interface GrievanceContextType {
  grievances: Grievance[];
  draft: DraftGrievance;
  setDraft: React.Dispatch<React.SetStateAction<DraftGrievance>>;
  resetDraft: () => void;
  analyzeProblemAI: (text: string) => void;
  submitGrievance: () => Grievance;
  getGrievanceById: (id: string) => Grievance | undefined;
  submitFeedback: (id: string, feedback: NonNullable<Grievance['feedback']>) => void;
  submitAppeal: (id: string, reason: string, remarks: string) => void;
}

export const GrievanceContext = createContext<GrievanceContextType | undefined>(undefined);

