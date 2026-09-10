import React, { useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { AuthContext } from './authContextDef';
import { authApi, getStoredToken } from '../api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const openLoginModal = useCallback(() => {
    setError(null);
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setError(null);
    setIsLoginModalOpen(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Restore session on mount if token exists
  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      const token = getStoredToken();
      if (!token) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        const u = await authApi.getCurrentUser();
        if (isMounted && u) {
          setUser({
            id: u.id,
            name: u.name,
            mobile: u.mobile,
            email: u.email,
            preferredLanguage: u.preferredLanguage,
            district: 'Pune',
            isLoggedIn: true,
          });
        }
      } catch {
        if (isMounted) {
          authApi.logout();
          setUser(null);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (mobile: string, password?: string, otp?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      let res;
      if (otp) {
        res = await authApi.verifyOTP(mobile, otp);
      } else {
        res = await authApi.login({ mobile, password });
      }

      setUser({
        id: res.user.id,
        name: res.user.name,
        mobile: res.user.mobile,
        email: res.user.email,
        preferredLanguage: res.user.preferredLanguage,
        district: 'Pune',
        isLoggedIn: true,
      });
      setIsLoginModalOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    mobile: string,
    password: string,
    email?: string,
    preferredLanguage: 'en' | 'hi' | 'mr' = 'en'
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.register({
        name,
        mobile,
        password,
        email: email || undefined,
        preferredLanguage,
      });

      // Automatically login after successful registration
      const loginRes = await authApi.login({ mobile, password });
      setUser({
        id: loginRes.user.id,
        name: loginRes.user.name,
        mobile: loginRes.user.mobile,
        email: loginRes.user.email,
        preferredLanguage: loginRes.user.preferredLanguage,
        district: 'Pune',
        isLoggedIn: true,
      });
      setIsLoginModalOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithMobile = async (mobile: string, name?: string) => {
    // Attempt standard demo flow (OTP = 1234) or login
    try {
      await login(mobile, undefined, '1234');
    } catch {
      // If user doesn't exist, register with demo password
      try {
        await register(name || 'Citizen User', mobile, 'Password123!', undefined, 'en');
      } catch {
        // If already exists with password, attempt password login
        await login(mobile, 'Password123!');
      }
    }
  };

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        register,
        loginWithMobile,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
