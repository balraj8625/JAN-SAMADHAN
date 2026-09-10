import { apiRequest, setStoredToken, removeStoredToken } from './client';

export interface RegisterPayload {
  name: string;
  mobile: string;
  email?: string;
  password: string;
  preferredLanguage?: 'en' | 'hi' | 'mr';
}

export interface LoginPayload {
  mobile: string;
  password?: string;
  otp?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  preferredLanguage: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const authApi = {
  async register(payload: RegisterPayload): Promise<AuthUser> {
    return apiRequest<AuthUser>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (data?.token) {
      setStoredToken(data.token);
    }
    return data;
  },

  async verifyOTP(mobile: string, otp: string): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ mobile, otp }),
    });
    if (data?.token) {
      setStoredToken(data.token);
    }
    return data;
  },

  async getCurrentUser(): Promise<AuthUser> {
    return apiRequest<AuthUser>('/auth/me', {
      method: 'GET',
    });
  },

  logout(): void {
    removeStoredToken();
  },
};
