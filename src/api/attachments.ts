import { apiUpload, apiRequest, apiDownload } from './client';

export interface BackendAttachment {
  id: string;
  fileName: string;
  fileType: string;
  downloadUrl: string;
  createdAt: string;
}

export const attachmentApi = {
  async uploadAttachment(grievanceId: string, file: File): Promise<BackendAttachment> {
    return apiUpload<BackendAttachment>(
      `/grievances/${encodeURIComponent(grievanceId)}/attachments`,
      file,
      'file'
    );
  },

  async getAttachments(grievanceId: string): Promise<BackendAttachment[]> {
    return apiRequest<BackendAttachment[]>(
      `/grievances/${encodeURIComponent(grievanceId)}/attachments`,
      {
        method: 'GET',
      }
    );
  },

  async downloadAttachment(grievanceId: string, attachmentId: string, fileName?: string): Promise<void> {
    return apiDownload(
      `/grievances/${encodeURIComponent(grievanceId)}/attachments/${encodeURIComponent(attachmentId)}/download`,
      fileName
    );
  },
};
