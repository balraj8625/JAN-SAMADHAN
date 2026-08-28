import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  Paperclip,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  Building2,
  HelpCircle,
  X,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { VoiceModal } from '../components/VoiceModal';
import { useLanguage } from '../context/LanguageContext';
import { useGrievance } from '../context/GrievanceContext';
import { mockDepartments } from '../data/mockDepartments';
import { Attachment, Priority } from '../types';

export const LodgeGrievancePage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { draft, setDraft, analyzeProblemAI, submitGrievance } = useGrievance();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState<boolean>(false);
  const [declarationAccepted, setDeclarationAccepted] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Handle Step 1 Next
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.description.trim() || draft.description.trim().length < 10) {
      setErrorMsg('Please describe your grievance in at least 10 words so we can process it.');
      return;
    }
    setErrorMsg('');
    analyzeProblemAI(draft.description);
    setCurrentStep(2);
  };

  // Handle Step 2 Confirm
  const handleStep2Next = () => {
    setCurrentStep(3);
  };

  // Handle Step 3 Confirm
  const handleStep3Next = () => {
    setCurrentStep(4);
  };

  // Handle Step 4 Final Submit
  const handleFinalSubmit = () => {
    if (!declarationAccepted) {
      setErrorMsg('Please confirm the self-declaration checkbox before submitting.');
      return;
    }
    const newGrievance = submitGrievance();
    navigate(`/success?id=${newGrievance.id}`);
  };

  // Simulated File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newAtt: Attachment = {
        id: `att-${Date.now()}`,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.type || 'image/jpeg',
      };
      setDraft((prev) => ({
        ...prev,
        attachments: [...prev.attachments, newAtt],
      }));
    }
  };

  const removeAttachment = (id: string) => {
    setDraft((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((a) => a.id !== id),
    }));
  };

  const currentDepartment =
    mockDepartments.find((d) => d.id === draft.departmentId) || mockDepartments[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Back Button */}
      <BackButton
        customText={
          currentStep > 1
            ? `${t('backButton')} (Step ${currentStep - 1})`
            : t('backButton')
        }
      />

      {/* Step Progress Tracker Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-bold text-[#0B2545] mb-2">
          <span>
            {currentStep === 1 && t('lodgeStep1Header')}
            {currentStep === 2 && t('lodgeStep2Header')}
            {currentStep === 3 && t('lodgeStep3Header')}
            {currentStep === 4 && t('lodgeStep4Header')}
          </span>
          <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
            Step {currentStep} of 4
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
          <div
            className="bg-amber-600 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-md flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1 — Tell us your problem */}
      {currentStep === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5 shadow-2xs">
            <div>
              <label className="block text-sm font-bold text-[#0B2545] mb-1.5">
                {t('problemInputLabel')} <span className="text-red-600">*</span>
              </label>
              <p className="text-xs text-slate-600 mb-2">
                Write in simple words in English, Hindi, or Marathi. Voice recording available below.
              </p>
              <textarea
                rows={5}
                value={draft.description}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder={t('problemPlaceholder')}
                className="w-full p-3.5 border border-slate-300 rounded-md text-sm font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden leading-relaxed"
                required
              ></textarea>
            </div>

            {/* Voice Input Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsVoiceOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 rounded-md text-xs font-bold transition-colors cursor-pointer"
              >
                <Mic className="w-4 h-4 text-amber-700" />
                <span>{t('micButtonLabel')}</span>
              </button>

              <span className="text-xs text-slate-500 font-semibold">
                Supports speech input in EN / HI / MR
              </span>
            </div>

            {/* Location Section */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-[#0B2545] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>{t('locationHeading')}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('districtLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={draft.location.district}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        location: { ...prev.location, district: e.target.value },
                      }))
                    }
                    placeholder="e.g. Pune / Nashik / Thane"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('blockWardLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={draft.location.blockOrWard}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        location: { ...prev.location, blockOrWard: e.target.value },
                      }))
                    }
                    placeholder="e.g. Ward 14 / Haveli Tehsil"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('landmarkLabel')}
                  </label>
                  <input
                    type="text"
                    value={draft.location.landmark}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        location: { ...prev.location, landmark: e.target.value },
                      }))
                    }
                    placeholder="e.g. Near ZP Primary School, Main Road"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('pincodeLabel')}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={draft.location.pincode}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        location: { ...prev.location, pincode: e.target.value },
                      }))
                    }
                    placeholder="e.g. 411005"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Document / Image Upload */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-[#0B2545] flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-amber-600" />
                <span>{t('attachmentsHeading')}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {t('attachmentHelpText')}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md text-xs font-bold text-slate-700 cursor-pointer inline-flex items-center gap-2 transition-colors">
                  <Paperclip className="w-4 h-4 text-slate-600" />
                  <span>Choose Photo / File</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,.pdf"
                  />
                </label>

                {draft.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-300 rounded text-xs font-semibold text-amber-900"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-700" />
                    <span>
                      {att.name} ({att.size})
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(att.id)}
                      className="text-amber-800 hover:text-red-700 ml-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <span>{t('btnNextStep')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2 — AI Understanding */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-2xs">
            {/* Header banner */}
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-md flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-bold text-emerald-950">
                  {t('lodgeStep2Header')}
                </h2>
                <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded mt-1 border border-emerald-300">
                  {t('aiConfidenceBadge')}
                </span>
              </div>
            </div>

            {/* Department Match Card */}
            <div className="p-5 bg-slate-50 border border-slate-300 rounded-md space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {t('identifiedDeptLabel')}
                </span>
                <button
                  type="button"
                  onClick={() => setIsDeptModalOpen(true)}
                  className="text-xs font-bold text-amber-700 hover:text-amber-900 underline cursor-pointer text-left"
                >
                  {t('changeDeptBtn')}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0B2545] text-amber-400 rounded-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0B2545]">
                    {currentDepartment.name[language] || currentDepartment.name['en']}
                  </h3>
                  <p className="text-xs text-slate-600">
                    Public Nodal Cell Jurisdiction
                  </p>
                </div>
              </div>
            </div>

            {/* Summary & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-slate-200 rounded-md space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  {t('categoryLabel')}
                </span>
                <p className="text-xs font-bold text-slate-900">
                  {draft.category[language] || draft.category['en']}
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-md space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  {t('urgencyLabel')}
                </span>
                <div>
                  <span className="inline-block px-2.5 py-0.5 text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300 rounded">
                    {draft.urgency} PRIORITY
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-md space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                {t('aiSummaryLabel')}
              </span>
              <p className="text-xs font-medium text-slate-800 leading-relaxed italic">
                "{draft.aiSummary || draft.description}"
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 cursor-pointer"
            >
              ← Edit Description
            </button>

            <button
              type="button"
              onClick={handleStep2Next}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <span>{t('btnConfirmAi')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — Missing Details */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5 shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-[#0B2545]">
                {t('lodgeStep3Header')}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {t('missingDetailsSub')}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {currentDepartment.requiredFields.map((field) => {
                const labelText = field.label[language] || field.label['en'];
                const placeholderText =
                  field.placeholder[language] || field.placeholder['en'];
                return (
                  <div key={field.key} className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800">
                      {labelText}{' '}
                      {field.required ? (
                        <span className="text-red-600">* ({t('required')})</span>
                      ) : (
                        <span className="text-slate-500">({t('optional')})</span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={draft.specificDetails[field.key] || ''}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          specificDetails: {
                            ...prev.specificDetails,
                            [field.key]: e.target.value,
                          },
                        }))
                      }
                      placeholder={placeholderText}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                      required={field.required}
                    />
                  </div>
                );
              })}

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-900 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Why we ask:</strong> Department field officers use consumer IDs and specific location landmarks to inspect the site immediately without calling you repeatedly.
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 cursor-pointer"
            >
              ← Back to Department
            </button>

            <button
              type="button"
              onClick={handleStep3Next}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <span>{t('btnToReview')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 — Review & Final Submit */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-2xs">
            <div>
              <h2 className="text-lg font-extrabold text-[#0B2545] font-serif">
                {t('lodgeStep4Header')}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {t('reviewSubHeading')}
              </p>
            </div>

            {/* Ticket Card Summary */}
            <div className="border border-slate-300 rounded-lg overflow-hidden space-y-0">
              <div className="bg-[#0B2545] text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    Target Department
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {currentDepartment.name[language] || currentDepartment.name['en']}
                  </h3>
                </div>

                <div className="bg-amber-600 text-white px-3 py-1 rounded text-xs font-extrabold text-center">
                  21 Days Guarantee
                </div>
              </div>

              <div className="p-4 bg-slate-50 space-y-4 text-xs">
                <div>
                  <span className="font-bold text-slate-500 uppercase block mb-1">
                    Problem Summary:
                  </span>
                  <p className="font-semibold text-slate-900 leading-relaxed bg-white p-3 border border-slate-200 rounded">
                    {draft.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="font-bold text-slate-500 block mb-0.5">
                      Location / Ward:
                    </span>
                    <p className="font-semibold text-slate-800">
                      {draft.location.district}, {draft.location.blockOrWard}{' '}
                      {draft.location.landmark && `(${draft.location.landmark})`}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-500 block mb-0.5">
                      Category & Urgency:
                    </span>
                    <p className="font-semibold text-slate-800">
                      {draft.category[language] || draft.category['en']} ({draft.urgency})
                    </p>
                  </div>
                </div>

                {Object.keys(draft.specificDetails).length > 0 && (
                  <div>
                    <span className="font-bold text-slate-500 block mb-1">
                      Provided Specific Details:
                    </span>
                    <div className="bg-white p-2.5 border border-slate-200 rounded space-y-1">
                      {Object.entries(draft.specificDetails).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between">
                          <span className="text-slate-600 capitalize">{k}:</span>
                          <span className="font-bold text-slate-900">{v || 'N/A'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {draft.attachments.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-500 block mb-1">
                      Attachments ({draft.attachments.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {draft.attachments.map((att) => (
                        <span
                          key={att.id}
                          className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-800 font-semibold"
                        >
                          📄 {att.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 21 Day Target Banner */}
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-md flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-700 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-amber-900 block">
                  {t('expectedTimelineTitle')}
                </span>
                <span className="text-amber-800 font-medium">
                  {t('daysTimelineText')}
                </span>
              </div>
            </div>

            {/* Declaration Checkbox */}
            <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-md cursor-pointer">
              <input
                type="checkbox"
                checked={declarationAccepted}
                onChange={(e) => setDeclarationAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-700 leading-relaxed">
                {t('declarationCheckbox')}
              </span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 cursor-pointer"
            >
              ← Edit Details
            </button>

            <button
              type="button"
              onClick={handleFinalSubmit}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-base rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <span>{t('btnSubmitGrievance')}</span>
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Manual Department Selection Modal */}
      {isDeptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Select Department Manually
              </h3>
              <button
                onClick={() => setIsDeptModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {mockDepartments.map((dept) => (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => {
                    setDraft((prev) => ({
                      ...prev,
                      departmentId: dept.id,
                      departmentName: dept.name,
                    }));
                    setIsDeptModalOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-md border transition-colors cursor-pointer flex items-center justify-between ${
                    draft.departmentId === dept.id
                      ? 'bg-amber-50 border-amber-500 font-bold text-amber-950'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800 font-medium'
                  }`}
                >
                  <span className="text-xs">
                    {dept.name[language] || dept.name['en']}
                  </span>
                  {draft.departmentId === dept.id && (
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Voice Assistant Modal */}
      <VoiceModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onTranscriptComplete={(text) => {
          setDraft((prev) => ({ ...prev, description: text }));
        }}
      />
    </div>
  );
};
