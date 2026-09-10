import React, { useState } from 'react';
import { User } from '../types';
import { AuthContext } from './authContextDef';

const defaultUser: User = {
  id: 'usr-9820',
  name: 'Shri Ramesh K. Sharma',
  mobile: '9876543210',
  district: 'Pune',
  isLoggedIn: true, // Default logged in for smooth prototype experience
};

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
