import { apiRequest } from './client';

export interface AIAnalysisResponse {
  summary: string;
  issue: string;
  department: string;
  category: string;
  missingInformation: string[];
}

export interface AIGenerateResponse {
  title: string;
  description: string;
  departmentSuggestion: string;
}

export interface AIExplainResponse {
  simplified: string;
  actionItems: string[];
}

export const aiApi = {
  async analyzeText(text: string): Promise<AIAnalysisResponse> {
    return apiRequest<AIAnalysisResponse>('/ai/analyze', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },

  async generateDraft(keywords: string[]): Promise<AIGenerateResponse> {
    return apiRequest<AIGenerateResponse>('/ai/generate-grievance', {
      method: 'POST',
      body: JSON.stringify({ keywords }),
    });
  },

  async explainResponse(responseText: string): Promise<AIExplainResponse> {
    return apiRequest<AIExplainResponse>('/ai/explain-response', {
      method: 'POST',
      body: JSON.stringify({ responseText }),
    });
  },
};
