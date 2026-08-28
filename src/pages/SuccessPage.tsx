import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  FileText,
  Search,
  MessageSquare,
  Printer,
  FilePlus,
  ArrowRight,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { useLanguage } from '../context/LanguageContext';
import { useGrievance } from '../context/GrievanceContext';

export const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { getGrievanceById } = useGrievance();

  const grievanceId = searchParams.get('id') || 'JS-2025-88392';
  const grievance = getGrievanceById(grievanceId);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <BackButton to="/" />

      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 text-center shadow-xs">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B2545] font-serif">
            {t('successHeader')}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            {t('yourGrievanceIdIs')}
          </p>
          <div className="inline-block px-4 py-2 bg-amber-100 border border-amber-300 rounded-md">
            <span className="text-xl sm:text-2xl font-black tracking-wider text-amber-900 font-mono">
              {grievanceId}
            </span>
          </div>
        </div>

        {/* SMS Notification Confirmation */}
        <div className="p-3.5 bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold rounded-md flex items-center justify-center gap-2 max-w-lg mx-auto">
          <MessageSquare className="w-4 h-4 text-blue-700 flex-shrink-0" />
          <span>{t('smsAlertNotice')}</span>
        </div>

        {/* Resolution Timeline Promise */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-md text-left text-xs space-y-2 max-w-lg mx-auto">
          <div className="flex items-center justify-between font-bold text-[#0B2545]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Target Resolution:</span>
            </span>
            <span className="text-amber-800">21 Days Standard Window</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Your grievance has been assigned to the District Nodal Officer. You will receive real-time SMS updates when the field officer inspects the site.
          </p>
        </div>

        {/* Quick Ticket Overview if available */}
        {grievance && (
          <div className="p-4 border border-slate-200 rounded-md text-left text-xs space-y-2 bg-slate-50">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-500 uppercase">
                Department:
              </span>
              <span className="font-bold text-slate-900">
                {grievance.departmentName[language] || grievance.departmentName['en']}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-500 uppercase">
                Location:
              </span>
              <span className="font-semibold text-slate-800">
                {grievance.location.district}, {grievance.location.blockOrWard}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(`/track?id=${grievanceId}`)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{t('btnTrackThisNow')}</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm rounded-md transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>{t('btnDownloadReceipt')}</span>
          </button>

          <button
            onClick={() => navigate('/lodge')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-md transition-colors cursor-pointer"
          >
            <FilePlus className="w-4 h-4 text-slate-600" />
            <span>{t('btnLodgeAnother')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
