import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowRight,
  Building2,
} from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { useLanguage } from '../context/LanguageContext';
import { useGrievance } from '../context/GrievanceContext';

export const AppealPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { getGrievanceById, submitAppeal } = useGrievance();

  const paramId = searchParams.get('id') || 'JS-2025-77210';
  const grievance = getGrievanceById(paramId);

  const [reason, setReason] = useState<string>('reasonDelay');
  const [remarks, setRemarks] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [generatedAppealId, setGeneratedAppealId] = useState<string>('');

  useEffect(() => {
    if (grievance && grievance.appeal) {
      setIsSubmitted(true);
      setGeneratedAppealId(grievance.appeal.appealId);
    }
  }, [grievance]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarks.trim()) return;

    submitAppeal(paramId, reason, remarks);
    setGeneratedAppealId(`JS-APP-2025-${Math.floor(100 + Math.random() * 900)}`);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <BackButton to={`/track?id=${paramId}`} />

      <div className="space-y-1">
        <h1 className="text-2xl font-black text-[#0B2545] font-serif flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-red-700" />
          <span>{t('appealHeader')}</span>
        </h1>
        <p className="text-xs font-semibold text-slate-600">
          {t('appealSub')}
        </p>
      </div>

      {isSubmitted ? (
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 text-center shadow-xs">
          <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#0B2545] font-serif">
              {t('appealSuccessTitle')}
            </h2>
            <p className="text-xs text-slate-600">
              Your First Appeal has been registered and directly routed to the District First Appellate Authority.
            </p>
            <div className="inline-block px-4 py-2 bg-amber-100 border border-amber-300 rounded-md">
              <span className="text-lg font-mono font-black text-amber-900">
                Appeal Ref ID: {generatedAppealId}
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-md text-left text-xs space-y-2">
            <div className="flex justify-between font-bold text-slate-700">
              <span>Original Complaint ID:</span>
              <span className="font-mono text-slate-900">{paramId}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-700">
              <span>Escalated To:</span>
              <span className="text-[#0B2545]">District Appellate Officer / Collectorate</span>
            </div>
            <div className="flex justify-between font-bold text-slate-700">
              <span>Appeal Hearing Target:</span>
              <span className="text-amber-900">7 Days Standard Window</span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate(`/track?id=${paramId}`)}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-md shadow-xs cursor-pointer"
            >
              Track Appeal Status
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5 shadow-2xs">
            {grievance && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500 uppercase">
                    Original Complaint ID:
                  </span>
                  <span className="font-mono font-extrabold text-[#0B2545]">
                    {grievance.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500 uppercase">
                    Department:
                  </span>
                  <span className="font-bold text-slate-900">
                    {grievance.departmentName[language] || grievance.departmentName['en']}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase block mb-1">
                    Title:
                  </span>
                  <p className="font-semibold text-slate-800">{grievance.title}</p>
                </div>
              </div>
            )}

            {/* Appeal Reason Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                {t('appealReasonLabel')} <span className="text-red-600">*</span>
              </label>

              <div className="space-y-2 text-xs">
                <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-100">
                  <input
                    type="radio"
                    name="appealReason"
                    value="reasonDelay"
                    checked={reason === 'reasonDelay'}
                    onChange={() => setReason('reasonDelay')}
                    className="mt-0.5 text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className="font-bold text-slate-800">
                    {t('reasonDelay')}
                  </span>
                </label>

                <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-100">
                  <input
                    type="radio"
                    name="appealReason"
                    value="reasonUnsatisfied"
                    checked={reason === 'reasonUnsatisfied'}
                    onChange={() => setReason('reasonUnsatisfied')}
                    className="mt-0.5 text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className="font-bold text-slate-800">
                    {t('reasonUnsatisfied')}
                  </span>
                </label>

                <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-100">
                  <input
                    type="radio"
                    name="appealReason"
                    value="reasonWrongAction"
                    checked={reason === 'reasonWrongAction'}
                    onChange={() => setReason('reasonWrongAction')}
                    className="mt-0.5 text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className="font-bold text-slate-800">
                    {t('reasonWrongAction')}
                  </span>
                </label>
              </div>
            </div>

            {/* Detailed Remarks */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                {t('appealRemarksLabel')} <span className="text-red-600">*</span>
              </label>
              <textarea
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Explain why the field resolution is incomplete or why the delay is unjustified..."
                className="w-full p-3 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                required
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-extrabold text-sm rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <span>{t('btnSubmitAppeal')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
