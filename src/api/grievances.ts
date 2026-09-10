import { apiRequest } from './client';

export interface CreateGrievancePayload {
  title: string;
  description: string;
  departmentId: string;
  category: string;
  state: string;
  district: string;
}

export interface BackendTimelineEvent {
  id?: string;
  status: string;
  message: {
    en: string;
    hi: string;
    mr: string;
  };
  createdAt: string;
}

export interface BackendFeedback {
  id: string;
  grievanceId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
}

export interface BackendAppeal {
  id: string;
  grievanceId: string;
  reason: string;
  description: string;
  status?: string;
  createdAt: string;
}

export interface BackendGrievanceAttachment {
  id: string;
  fileName: string;
  fileType: string;
  downloadUrl: string;
  createdAt: string;
}

export interface BackendGrievance {
  id: string;
  grievanceNumber: string;
  title: string;
  description: string;
  department: {
    id: string;
    name: {
      en: string;
      hi: string;
      mr: string;
    };
  };
  category: string;
  location: {
    state: string;
    district: string;
  };
  status: string;
  submittedAt: string;
  dueAt: string;
  resolution?: string | null;
  timeline: BackendTimelineEvent[];
  sla?: {
    submittedAt: string;
    dueAt: string;
    isOverdue: boolean;
    daysRemaining: number;
    daysElapsed: number;
    totalTargetDays: number;
    slaPercentageUsed: number;
    status: string;
  };
  feedback?: BackendFeedback | null;
  appeal?: BackendAppeal | null;
  attachments: BackendGrievanceAttachment[];
}

export interface FeedbackPayload {
  rating: number;
  comment?: string;
}

export interface AppealPayload {
  reason: string;
  description: string;
}

export interface EscalationCheckResponse {
  recommendEscalation: boolean;
  reason: string;
  isOverdue: boolean;
  daysRemaining: number;
  daysElapsed: number;
  totalTargetDays: number;
  slaPercentageUsed: number;
}

export const grievanceApi = {
  async createGrievance(payload: CreateGrievancePayload): Promise<BackendGrievance> {
    return apiRequest<BackendGrievance>('/grievances', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async getUserGrievances(): Promise<BackendGrievance[]> {
    return apiRequest<BackendGrievance[]>('/grievances', {
      method: 'GET',
    });
  },

  async getGrievanceById(id: string): Promise<BackendGrievance> {
    return apiRequest<BackendGrievance>(`/grievances/${encodeURIComponent(id)}`, {
      method: 'GET',
    });
  },

  async getGrievanceByNumber(grievanceNumber: string): Promise<BackendGrievance> {
    return apiRequest<BackendGrievance>(
      `/grievances/number/${encodeURIComponent(grievanceNumber)}`,
      {
        method: 'GET',
      }
    );
  },

  async getTimeline(id: string): Promise<BackendTimelineEvent[]> {
    return apiRequest<BackendTimelineEvent[]>(
      `/grievances/${encodeURIComponent(id)}/timeline`,
      {
        method: 'GET',
      }
    );
  },

  async submitFeedback(id: string, payload: FeedbackPayload): Promise<BackendFeedback> {
    return apiRequest<BackendFeedback>(
      `/grievances/${encodeURIComponent(id)}/feedback`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
  },

  async submitAppeal(id: string, payload: AppealPayload): Promise<BackendAppeal> {
    return apiRequest<BackendAppeal>(
      `/grievances/${encodeURIComponent(id)}/appeal`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
  },

  async getAppeal(id: string): Promise<BackendAppeal | null> {
    return apiRequest<BackendAppeal | null>(
      `/grievances/${encodeURIComponent(id)}/appeal`,
      {
        method: 'GET',
      }
    );
  },

  async checkEscalation(id: string): Promise<EscalationCheckResponse> {
    return apiRequest<EscalationCheckResponse>(
      `/grievances/${encodeURIComponent(id)}/escalation-check`,
      {
        method: 'GET',
      }
    );
  },
};
