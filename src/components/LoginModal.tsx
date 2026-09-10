import React, { useState } from 'react';
import { ShieldCheck, X, ArrowRight, UserPlus, LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { useLanguage } from '../context/useLanguage';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, register, isLoading, error: authError, clearError } = useAuth();
  const { t, language } = useLanguage();

  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [authMethod, setAuthMethod] = useState<'PASSWORD' | 'OTP'>('PASSWORD');

  // Login form state
  const [loginMobile, setLoginMobile] = useState<string>('9876543210');
  const [loginPassword, setLoginPassword] = useState<string>('Password123!');
  const [loginOtp, setLoginOtp] = useState<string>('1234');

  // Register form state
  const [regName, setRegName] = useState<string>('');
  const [regMobile, setRegMobile] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regLanguage, setRegLanguage] = useState<'en' | 'hi' | 'mr'>(language || 'en');

  const [localError, setLocalError] = useState<string>('');

  if (!isLoginModalOpen) return null;

  const displayError = localError || authError;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!/^[6-9]\d{9}$/.test(loginMobile)) {
      setLocalError('Please enter a valid 10-digit Indian mobile number starting with 6-9.');
      return;
    }

    if (authMethod === 'PASSWORD' && (!loginPassword || loginPassword.length < 6)) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    if (authMethod === 'OTP' && (!loginOtp || !/^\d{4,6}$/.test(loginOtp))) {
      setLocalError('Please enter a 4 to 6 digit OTP.');
      return;
    }

    try {
      if (authMethod === 'PASSWORD') {
        await login(loginMobile, loginPassword);
      } else {
        await login(loginMobile, undefined, loginOtp);
      }
    } catch {
      // Error handled in context / displayError
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!regName.trim() || regName.trim().length < 2) {
      setLocalError('Please enter your full name (minimum 2 characters).');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(regMobile)) {
      setLocalError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!regPassword || regPassword.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    try {
      await register(
        regName.trim(),
        regMobile,
        regPassword,
        regEmail.trim() || undefined,
        regLanguage
      );
    } catch {
      // Error handled in context / displayError
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-navy-100 text-navy-900 rounded-md">
              <ShieldCheck className="w-5 h-5 text-navy-900" />
            </div>
            <h3 className="text-lg font-bold text-navy-950">
              {mode === 'LOGIN' ? t('loginHeading') : 'Citizen Registration'}
            </h3>
          </div>
          <button
            onClick={closeLoginModal}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-2 mt-4 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => {
              setMode('LOGIN');
              setLocalError('');
              clearError();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
              mode === 'LOGIN'
                ? 'bg-[#0B2545] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('REGISTER');
              setLocalError('');
              clearError();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
              mode === 'REGISTER'
                ? 'bg-[#0B2545] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register New User</span>
          </button>
        </div>

        {displayError && (
          <div className="mt-4 p-2.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-md font-medium">
            {displayError}
          </div>
        )}

        {mode === 'LOGIN' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('mobileLabel')}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-slate-500 font-semibold">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={loginMobile}
                  onChange={(e) => setLoginMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full pl-12 pr-3 py-2 border border-slate-300 rounded-md text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  required
                />
              </div>
            </div>

            {/* Auth method selection */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="authMethod"
                  value="PASSWORD"
                  checked={authMethod === 'PASSWORD'}
                  onChange={() => setAuthMethod('PASSWORD')}
                  className="text-amber-600"
                />
                <span>Password</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="authMethod"
                  value="OTP"
                  checked={authMethod === 'OTP'}
                  onChange={() => setAuthMethod('OTP')}
                  className="text-amber-600"
                />
                <span>OTP (Demo)</span>
              </label>
            </div>

            {authMethod === 'PASSWORD' ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={loginOtp}
                  onChange={(e) => setLoginOtp(e.target.value)}
                  placeholder="e.g. 1234"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm font-mono font-bold tracking-widest focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Demo OTP is enabled on the development backend.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-bold rounded-md text-sm shadow-xs transition-colors cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>{t('btnVerifyLogin')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 mt-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Citizen Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Ramesh Sharma"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-slate-500 font-semibold">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={regMobile}
                  onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full pl-12 pr-3 py-2 border border-slate-300 rounded-md text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="ramesh@example.gov.in"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferred Language
              </label>
              <select
                value={regLanguage}
                onChange={(e) => setRegLanguage(e.target.value as 'en' | 'hi' | 'mr')}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-bold rounded-md text-sm shadow-xs transition-colors cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span>Create Citizen Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
