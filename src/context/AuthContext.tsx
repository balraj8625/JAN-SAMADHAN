import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  loginWithMobile: (mobile: string, name?: string) => void;
  logout: () => void;
}

const defaultUser: User = {
  id: 'usr-9820',
  name: 'Shri Ramesh K. Sharma',
  mobile: '9876543210',
  district: 'Pune',
  isLoggedIn: true, // Default logged in for smooth prototype experience
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const loginWithMobile = (mobile: string, name?: string) => {
    setUser({
      id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name || 'Shri Citizen User',
      mobile: mobile,
      district: 'Pune',
      isLoggedIn: true,
    });
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        loginWithMobile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
