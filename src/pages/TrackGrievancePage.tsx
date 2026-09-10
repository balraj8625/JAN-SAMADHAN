import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Phone,
  UserCheck,
  Star,
  ShieldAlert,
  ArrowRight,
  AlertCircle,
  Download,
  FileText,
  Loader2,
} from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { useLanguage } from '../context/useLanguage';
import { useGrievance } from '../context/useGrievance';
import { useAuth } from '../context/useAuth';
import type { Grievance } from '../types';

export const TrackGrievancePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const {
    grievances,
    getGrievanceById,
    fetchGrievanceByRefOrId,
    submitFeedback,
    downloadAttachment,
  } = useGrievance();

  const paramId = searchParams.get('id');
  const initialId = paramId || (grievances.length > 0 ? grievances[0].id : '');

  const [inputGrievanceId, setInputGrievanceId] = useState<string>(initialId);
  const [activeGrievanceId, setActiveGrievanceId] = useState<string>(initialId);
  const [fetchedGrievance, setFetchedGrievance] = useState<Grievance | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Feedback form state
  const [solvedOption, setSolvedOption] = useState<'YES' | 'PARTIAL' | 'NO'>('YES');
  const [rating, setRating] = useState<number>(5);
  const [feedbackComment, setFeedbackComment] = useState<string>('');
  const [feedbackSuccess, setFeedbackSuccess] = useState<boolean>(false);
  const [feedbackError, setFeedbackError] = useState<string>('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState<boolean>(false);
  const [downloadingAttId, setDownloadingAttId] = useState<string | null>(null);

  // Attempt to resolve grievance from local state or backend
  useEffect(() => {
    if (!activeGrievanceId.trim()) return;

    let isMounted = true;
    void fetchGrievanceByRefOrId(activeGrievanceId)
      .then((remote) => {
        if (isMounted) setFetchedGrievance(remote);
      })
      .catch(() => {
        if (isMounted) setFetchedGrievance(null);
      })
      .finally(() => {
        if (isMounted) setIsSearching(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeGrievanceId, fetchGrievanceByRefOrId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputGrievanceId.trim()) {
      setActiveGrievanceId(inputGrievanceId.trim());
      setFeedbackSuccess(false);
      setFeedbackError('');
    }
  };

  const currentGrievance = getGrievanceById(activeGrievanceId) || fetchedGrievance;

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentGrievance) return;

    setIsSubmittingFeedback(true);
    setFeedbackError('');
    try {
      await submitFeedback(currentGrievance.id, rating, feedbackComment);
      setFeedbackSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to submit feedback. Note: feedback is only available once a grievance is resolved or closed.';
      setFeedbackError(msg);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleDownloadAttachment = async (attachmentId: string, fileName: string) => {
    if (!currentGrievance) return;
    setDownloadingAttId(attachmentId);
    try {
      await downloadAttachment(currentGrievance.id, attachmentId, fileName);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to download attachment';
      alert(msg);
    } finally {
      setDownloadingAttId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <BackButton to="/" />

      <div className="space-y-1">
        <h1 className="text-2xl font-black text-[#0B2545] font-serif">
          {t('trackingTitle')}
        </h1>
        <p className="text-xs font-semibold text-slate-600">
          Enter your Grievance Reference ID (e.g. GRV2026123456) to see real-time status and nodal officer contact.
        </p>
      </div>

      {/* Search Bar Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={inputGrievanceId}
              onChange={(e) => setInputGrievanceId(e.target.value)}
              placeholder="e.g. GRV2026123456 or JS-2025-88392"
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md text-sm font-bold text-slate-900 font-mono uppercase focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-extrabold text-sm rounded-md shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>{t('btnTrackNow')}</span>
          </button>
        </form>

        {/* Quick chip buttons for existing user grievances */}
        {grievances.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-semibold">Your Grievances:</span>
            {grievances.slice(0, 4).map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setActiveGrievanceId(g.id);
                  setInputGrievanceId(g.id);
                  setFeedbackSuccess(false);
                  setFeedbackError('');
                }}
                className={`px-2 py-0.5 rounded font-mono font-bold cursor-pointer transition-colors ${
                  activeGrievanceId.toLowerCase() === g.id.toLowerCase()
                    ? 'bg-[#0B2545] text-amber-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {g.id}
              </button>
            ))}
          </div>
        )}
      </div>

      {isSearching ? (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-600">
            Fetching grievance details from central database...
          </p>
        </div>
      ) : !currentGrievance ? (
        <div className="bg-white border border-slate-200 rounded-lg p-8 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">
            {activeGrievanceId ? `No grievance found with ID "${activeGrievanceId}"` : 'Enter a Grievance Reference ID above'}
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Please verify the ID on your receipt or SMS confirmation. You can also view all your complaints under "My Grievances".
          </p>
          {user && (
            <button
              onClick={() => navigate('/my-grievances')}
              className="px-4 py-2 bg-[#0B2545] text-white text-xs font-bold rounded-md cursor-pointer"
            >
              Go to My Grievances
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Ticket Summary Card */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
            {/* Header bar */}
            <div className="bg-[#0B2545] text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block">
                  Official Reference ID
                </span>
                <h2 className="text-xl sm:text-2xl font-mono font-black tracking-wider text-white">
                  {currentGrievance.id}
                </h2>
              </div>

              <div>
                {currentGrievance.isOverdue || currentGrievance.status === 'OVERDUE' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white font-bold text-xs rounded shadow-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Overdue (&gt;21 Days)</span>
                  </span>
                ) : currentGrievance.status === 'RESOLVED' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-700 text-white font-bold text-xs rounded shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Resolved</span>
                  </span>
                ) : currentGrievance.status === 'APPEALED' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 text-white font-bold text-xs rounded shadow-xs">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Under First Appeal</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-700 text-white font-bold text-xs rounded shadow-xs">
                    <Clock className="w-4 h-4" />
                    <span>Action in Progress (Day {currentGrievance.currentDay} of 21)</span>
                  </span>
                )}
              </div>
            </div>

            {/* Ticket Information Body */}
            <div className="p-6 space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-500 uppercase block mb-1">
                  Grievance Title:
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  {currentGrievance.title}
                </h3>
                <p className="text-slate-700 mt-1 leading-relaxed bg-slate-50 p-3 border border-slate-200 rounded">
                  {currentGrievance.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-md">
                <div>
                  <span className="font-bold text-slate-500 block mb-0.5">
                    Department:
                  </span>
                  <p className="font-extrabold text-[#0B2545]">
                    {currentGrievance.departmentName[language] ||
                      currentGrievance.departmentName['en']}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-500 block mb-0.5">
                    Location:
                  </span>
                  <p className="font-bold text-slate-900">
                    {currentGrievance.location.district}, {currentGrievance.location.state}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-500 block mb-0.5">
                    21-Day Target Date:
                  </span>
                  <p className="font-black text-amber-900">
                    {currentGrievance.targetDate}
                  </p>
                </div>
              </div>

              {/* Attachments list if any */}
              {currentGrievance.attachments && currentGrievance.attachments.length > 0 && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2">
                  <span className="font-bold text-slate-700 block uppercase tracking-wider text-[11px]">
                    Attached Documents ({currentGrievance.attachments.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentGrievance.attachments.map((att) => (
                      <div
                        key={att.id}
                        className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded text-xs"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <FileText className="w-4 h-4 text-slate-500 flex-shrink-0" />
                          <span className="font-semibold text-slate-800 truncate">{att.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDownloadAttachment(att.id, att.name)}
                          disabled={downloadingAttId === att.id}
                          className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer flex-shrink-0"
                        >
                          {downloadingAttId === att.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Download className="w-3.5 h-3.5" />
                          )}
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nodal Officer Contact Box */}
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-600 text-white rounded-md">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-900 uppercase block">
                      {t('officerDetailsTitle')}
                    </span>
                    <p className="text-sm font-extrabold text-slate-900">
                      {currentGrievance.nodalOfficer.name}
                    </p>
                    <p className="text-slate-600 font-semibold text-[11px]">
                      {currentGrievance.nodalOfficer.designation} (
                      {currentGrievance.nodalOfficer.office})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-amber-300 rounded text-xs font-bold text-slate-900">
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>
                    {t('officerPhone')} {currentGrievance.nodalOfficer.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* OVERDUE DELAY EXPLANATION BANNER */}
          {(currentGrievance.isOverdue || currentGrievance.status === 'OVERDUE') && (
            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6 space-y-4 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-red-700 text-white rounded-md flex-shrink-0 mt-0.5">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-red-950">
                    {t('overdueBadge')}
                  </h3>
                  <p className="text-xs font-semibold text-red-900">
                    The standard 21-day timeline has elapsed. You can escalate directly to the District First Appellate Authority.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => navigate(`/appeal?id=${currentGrievance.id}`)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-extrabold text-xs rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  <span>{t('btnEscalateAppeal')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* VISUAL 21-DAY TIMELINE PROGRESS */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-[#0B2545] font-serif flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <span>21-Day Service Guarantee Timeline</span>
              </h3>
              <span className="text-xs font-bold text-slate-600">
                Target: {currentGrievance.targetDate}
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {currentGrievance.timeline.map((step, idx) => {
                const titleText = step.title[language] || step.title['en'];
                const descText = step.description[language] || step.description['en'];
                const isCompleted = step.status === 'completed';
                const isCurrent = step.status === 'current';
                const isOverdue = step.status === 'overdue';

                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                        isCompleted
                          ? 'bg-emerald-600 border-emerald-700 text-white'
                          : isCurrent
                          ? 'bg-amber-600 border-amber-700 text-white animate-pulse'
                          : isOverdue
                          ? 'bg-red-600 border-red-700 text-white'
                          : 'bg-white border-slate-300 text-slate-400'
                      }`}
                    >
                      {isCompleted ? '✓' : step.dayNumber}
                    </div>

                    <div
                      className={`p-4 rounded-md border text-xs w-full space-y-1 ${
                        isCompleted
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : isCurrent
                          ? 'bg-amber-50 border-amber-300 shadow-2xs'
                          : isOverdue
                          ? 'bg-red-50 border-red-200'
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          {titleText}
                        </h4>
                        {step.date && (
                          <span className="text-[11px] font-bold text-slate-600">
                            {step.date}
                          </span>
                        )}
                      </div>

                      <p className="text-slate-700 leading-relaxed">{descText}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FEEDBACK WIDGET */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-2xs">
            <h3 className="text-base font-extrabold text-[#0B2545] font-serif flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
              <span>{t('feedbackHeader')}</span>
            </h3>

            {feedbackSuccess || currentGrievance.feedback ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold rounded-md space-y-1">
                <p>✓ {t('feedbackSuccessMsg')}</p>
                {currentGrievance.feedback && (
                  <p className="text-slate-700 font-normal italic mt-1">
                    Recorded Rating: {currentGrievance.feedback.rating} Stars
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
                {feedbackError && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-md">
                    {feedbackError}
                  </div>
                )}

                {/* 3 Main Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSolvedOption('YES')}
                    className={`p-3 rounded-md border text-center font-bold cursor-pointer transition-colors ${
                      solvedOption === 'YES'
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                        : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {t('optionYes')}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSolvedOption('PARTIAL')}
                    className={`p-3 rounded-md border text-center font-bold cursor-pointer transition-colors ${
                      solvedOption === 'PARTIAL'
                        ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                        : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {t('optionPartial')}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSolvedOption('NO')}
                    className={`p-3 rounded-md border text-center font-bold cursor-pointer transition-colors ${
                      solvedOption === 'NO'
                        ? 'bg-red-700 text-white border-red-800 shadow-xs'
                        : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {t('optionNo')}
                  </button>
                </div>

                {/* Rating stars */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    {t('rateExperience')}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer focus:outline-hidden"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    {t('feedbackCommentLabel')}
                  </label>
                  <textarea
                    rows={2}
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="Share any additional details regarding ground resolution..."
                    className="w-full p-2.5 border border-slate-300 rounded-md text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  {solvedOption === 'NO' && (
                    <button
                      type="button"
                      onClick={() => navigate(`/appeal?id=${currentGrievance.id}`)}
                      className="text-xs text-red-700 font-bold hover:underline cursor-pointer"
                    >
                      File an Appeal Instead →
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingFeedback}
                    className="ml-auto px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-extrabold rounded-md shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    {isSubmittingFeedback ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>{t('btnSubmitFeedback')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
