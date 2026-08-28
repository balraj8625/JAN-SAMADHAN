import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BackButtonProps {
  to?: string;
  customText?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ to, customText }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-navy-900 bg-white border border-slate-300 rounded-md shadow-xs hover:bg-slate-50 transition-colors cursor-pointer focus:ring-2 focus:ring-amber-500 focus:outline-hidden mb-4"
      aria-label="Go back to previous page"
    >
      <ArrowLeft className="w-4 h-4 text-slate-600" />
      <span>{customText || t('backButton')}</span>
    </button>
  );
};
