export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '');

const TOKEN_KEY = 'jan_samadhan_token';

export const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setStoredToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // localStorage might be unavailable
  }
};

export const removeStoredToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // localStorage might be unavailable
  }
};

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const headers = new Headers(options.headers || {});

  const token = getStoredToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    removeStoredToken();
  }

  let body: ApiResponse<T> | null = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      body = (await response.json()) as ApiResponse<T>;
    } catch {
      body = null;
    }
  }

  if (!response.ok) {
    const errorMsg = body?.message || response.statusText || 'API request failed';
    throw new ApiError(errorMsg, response.status, body?.data);
  }

  return (body?.data !== undefined ? body.data : body) as T;
}

export async function apiUpload<T = unknown>(
  endpoint: string,
  file: File,
  fieldName = 'file'
): Promise<T> {
  const formData = new FormData();
  formData.append(fieldName, file);

  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: formData,
  });
}

export async function apiDownload(endpoint: string, filename?: string): Promise<void> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const headers = new Headers();
  const token = getStoredToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    let errorMsg = 'Failed to download file';
    try {
      const err = (await response.json()) as { message?: string };
      if (err.message) errorMsg = err.message;
    } catch {
      // not json
    }
    throw new ApiError(errorMsg, response.status);
  }

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename || 'attachment';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(downloadUrl);
}
