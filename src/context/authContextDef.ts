import { createContext } from 'react';
import { User } from '../types';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (mobile: string, password?: string, otp?: string) => Promise<void>;
  register: (
    name: string,
    mobile: string,
    password: string,
    email?: string,
    preferredLanguage?: 'en' | 'hi' | 'mr'
  ) => Promise<void>;
  loginWithMobile: (mobile: string, name?: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
