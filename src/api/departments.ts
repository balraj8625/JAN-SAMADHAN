import { apiRequest } from './client';

export interface BackendDepartment {
  id: string;
  name: {
    en: string;
    hi: string;
    mr: string;
  };
  category: string;
}

export const departmentApi = {
  async getDepartments(): Promise<BackendDepartment[]> {
    return apiRequest<BackendDepartment[]>('/departments', {
      method: 'GET',
    });
  },

  async getDepartmentById(id: string): Promise<BackendDepartment> {
    return apiRequest<BackendDepartment>(`/departments/${encodeURIComponent(id)}`, {
      method: 'GET',
    });
  },
};
