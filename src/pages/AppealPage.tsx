import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { useLanguage } from '../context/useLanguage';
import { useGrievance } from '../context/useGrievance';
import type { Grievance } from '../types';

export const AppealPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { getGrievanceById, fetchGrievanceByRefOrId, submitAppeal } = useGrievance();

  const paramId = searchParams.get('id') || '';
  const [fetchedGrievance, setFetchedGrievance] = useState<Grievance | null>(null);
  const [isLoadingGrievance, setIsLoadingGrievance] = useState<boolean>(false);

  const [reasonKey, setReasonKey] = useState<string>('reasonDelay');
  const [remarks, setRemarks] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [generatedAppealId, setGeneratedAppealId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const grievance = getGrievanceById(paramId) || fetchedGrievance;

  useEffect(() => {
    if (!paramId) return;
    let isMounted = true;
    void fetchGrievanceByRefOrId(paramId)
      .then((g) => {
        if (isMounted && g) setFetchedGrievance(g);
      })
      .catch(() => undefined)
      .finally(() => {
        if (isMounted) setIsLoadingGrievance(false);
      });

    return () => {
      isMounted = false;
    };
  }, [paramId, fetchGrievanceByRefOrId]);

  const isAlreadyAppealed = Boolean(grievance?.appeal);
  const isAppealSuccess = isSubmitted || isAlreadyAppealed;
  const activeAppealId = generatedAppealId || grievance?.appeal?.appealId || '';

  const getFullReasonText = (key: string): string => {
    switch (key) {
      case 'reasonDelay':
        return 'Standard 21-day timeline has elapsed without resolution';
      case 'reasonUnsatisfied':
        return 'Unsatisfied with the ground resolution reported by nodal officer';
      case 'reasonWrongAction':
        return 'Incorrect department action or incomplete repair work';
      default:
        return 'Citizen requested administrative review';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paramId) {
      setErrorMsg('Invalid grievance ID for appeal.');
      return;
    }

    const trimmedRemarks = remarks.trim();
    if (trimmedRemarks.length < 20) {
      setErrorMsg('Please explain your appeal reason with at least 20 characters of detail.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const appealId = await submitAppeal(
        paramId,
        getFullReasonText(reasonKey),
        trimmedRemarks
      );
      setGeneratedAppealId(appealId);
      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to submit appeal. Note: Appeals are permitted after grievance resolution or SLA breach.';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <BackButton to={paramId ? `/track?id=${paramId}` : '/'} />

      <div className="space-y-1">
        <h1 className="text-2xl font-black text-[#0B2545] font-serif flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-red-700" />
          <span>{t('appealHeader')}</span>
        </h1>
        <p className="text-xs font-semibold text-slate-600">
          {t('appealSub')}
        </p>
      </div>

      {isLoadingGrievance ? (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-600">
            Loading grievance details...
          </p>
        </div>
      ) : !paramId ? (
        <div className="bg-white border border-slate-200 rounded-lg p-8 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">
            No Grievance ID Specified
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Please select a grievance from My Grievances to file an appeal.
          </p>
          <button
            onClick={() => navigate('/my-grievances')}
            className="px-4 py-2 bg-[#0B2545] text-white text-xs font-bold rounded-md cursor-pointer"
          >
            Go to My Grievances
          </button>
        </div>
      ) : isAppealSuccess ? (
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 text-center shadow-xs">
          <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#0B2545] font-serif">
              {t('appealSuccessTitle')}
            </h2>
            <p className="text-xs text-slate-600">
              Your First Appeal has been registered in the system and routed to the First Appellate Authority.
            </p>
            {activeAppealId && (
              <div className="inline-block px-4 py-2 bg-amber-100 border border-amber-300 rounded-md">
                <span className="text-lg font-mono font-black text-amber-900">
                  Appeal Ref ID: {activeAppealId}
                </span>
              </div>
            )}
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
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-xs font-medium">
              {errorMsg}
            </div>
          )}

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
                    checked={reasonKey === 'reasonDelay'}
                    onChange={() => setReasonKey('reasonDelay')}
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
                    checked={reasonKey === 'reasonUnsatisfied'}
                    onChange={() => setReasonKey('reasonUnsatisfied')}
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
                    checked={reasonKey === 'reasonWrongAction'}
                    onChange={() => setReasonKey('reasonWrongAction')}
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
                placeholder="Explain why the field resolution is incomplete or why the delay is unjustified (minimum 20 characters)..."
                className="w-full p-3 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                required
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white font-extrabold text-sm rounded-md shadow-xs transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Appeal...</span>
                </>
              ) : (
                <>
                  <span>{t('btnSubmitAppeal')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
