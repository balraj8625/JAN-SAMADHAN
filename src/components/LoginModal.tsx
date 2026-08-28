import React, { useState } from 'react';
import { Phone, ShieldCheck, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, loginWithMobile } = useAuth();
  const { t } = useLanguage();

  const [mobile, setMobile] = useState<string>('9876543210');
  const [name, setName] = useState<string>('Shri Ramesh Sharma');
  const [step, setStep] = useState<'MOBILE' | 'OTP'>('MOBILE');
  const [otp, setOtp] = useState<string>('');
  const [otpAlert, setOtpAlert] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isLoginModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setError('');
    setStep('OTP');
    setOtpAlert('Simulated OTP code: 1234');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter 4-digit OTP');
      return;
    }
    loginWithMobile(mobile, name);
    setStep('MOBILE');
    setOtp('');
    setOtpAlert('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-navy-100 text-navy-900 rounded-md">
              <ShieldCheck className="w-5 h-5 text-navy-900" />
            </div>
            <h3 className="text-lg font-bold text-navy-950">
              {t('loginHeading')}
            </h3>
          </div>
          <button
            onClick={closeLoginModal}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 mt-3 mb-4">
          {t('loginSub')}
        </p>

        {error && (
          <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-md">
            {error}
          </div>
        )}

        {step === 'MOBILE' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Citizen Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                required
              />
            </div>

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
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full pl-12 pr-3 py-2 border border-slate-300 rounded-md text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-md text-sm shadow-xs transition-colors cursor-pointer"
            >
              <span>{t('btnSendOtp')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {otpAlert && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md flex items-center gap-2 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{otpAlert}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('enterOtpLabel')}
              </label>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="1234"
                className="w-full text-center tracking-widest text-xl font-bold py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                autoFocus
              />
              <p className="text-[11px] text-slate-500 mt-1 text-center">
                {t('otpHelpText')}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep('MOBILE')}
                className="w-1/3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md cursor-pointer"
              >
                Change No.
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-md text-sm shadow-xs transition-colors cursor-pointer"
              >
                {t('btnVerifyLogin')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
