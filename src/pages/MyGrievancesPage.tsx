import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Loader2,
  RefreshCw,
  PlusCircle,
  LogIn,
} from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { useLanguage } from '../context/useLanguage';
import { useGrievance } from '../context/useGrievance';
import { useAuth } from '../context/useAuth';
import type { GrievanceStatus } from '../types';

export const MyGrievancesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { user, openLoginModal } = useAuth();
  const {
    grievances,
    isLoadingGrievances,
    grievancesError,
    refreshGrievances,
  } = useGrievance();

  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'OVERDUE' | 'RESOLVED'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredGrievances = grievances.filter((g) => {
    // Search match
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      g.id.toLowerCase().includes(q) ||
      g.title.toLowerCase().includes(q) ||
      g.departmentName.en.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (activeTab === 'ACTIVE') {
      return (
        g.status === 'SUBMITTED' ||
        g.status === 'UNDER_REVIEW' ||
        g.status === 'ACTION_IN_PROGRESS'
      );
    }
    if (activeTab === 'OVERDUE') {
      return g.isOverdue || g.status === 'OVERDUE' || g.status === 'APPEALED';
    }
    if (activeTab === 'RESOLVED') {
      return g.status === 'RESOLVED';
    }
    return true;
  });

  const getStatusBadge = (status: GrievanceStatus, isOverdue: boolean) => {
    if (isOverdue || status === 'OVERDUE') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-100 border border-red-300 text-red-900 text-xs font-bold rounded">
          <AlertTriangle className="w-3.5 h-3.5 text-red-700" />
          <span>{t('statusOverdue')}</span>
        </span>
      );
    }
    if (status === 'RESOLVED') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold rounded">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>{t('statusResolved')}</span>
        </span>
      );
    }
    if (status === 'APPEALED') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold rounded">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
          <span>{t('statusAppealed')}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 border border-blue-300 text-blue-900 text-xs font-bold rounded">
        <Clock className="w-3.5 h-3.5 text-blue-700" />
        <span>{t('statusActionInProgress')}</span>
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <BackButton to="/" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-[#0B2545] font-serif">
            {t('myGrievancesTitle')}
          </h1>
          <p className="text-xs font-semibold text-slate-600">
            {t('myGrievancesSub')}
          </p>
        </div>

        {user && (
          <button
            onClick={() => refreshGrievances()}
            disabled={isLoadingGrievances}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingGrievances ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        )}
      </div>

      {!user ? (
        <div className="bg-white border border-slate-200 rounded-lg p-8 text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 bg-navy-50 text-navy-900 rounded-full flex items-center justify-center mx-auto">
            <LogIn className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Citizen Login Required
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Please sign in with your mobile number to view and track your submitted grievances.
            </p>
          </div>
          <button
            onClick={openLoginModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-md cursor-pointer transition-colors shadow-xs"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In Now</span>
          </button>
        </div>
      ) : (
        <>
          {/* Error Banner */}
          {grievancesError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-xs flex items-center justify-between">
              <span>{grievancesError}</span>
              <button
                onClick={() => refreshGrievances()}
                className="font-bold underline hover:text-red-950 ml-2 cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* Filter Tabs & Search */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Tab buttons */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('ALL')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-colors ${
                    activeTab === 'ALL'
                      ? 'bg-[#0B2545] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t('filterAll')} ({grievances.length})
                </button>
                <button
                  onClick={() => setActiveTab('ACTIVE')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-colors ${
                    activeTab === 'ACTIVE'
                      ? 'bg-[#0B2545] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t('filterActive')}
                </button>
                <button
                  onClick={() => setActiveTab('OVERDUE')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-colors ${
                    activeTab === 'OVERDUE'
                      ? 'bg-red-700 text-white'
                      : 'bg-red-50 text-red-800 hover:bg-red-100 border border-red-200'
                  }`}
                >
                  {t('filterOverdue')}
                </button>
                <button
                  onClick={() => setActiveTab('RESOLVED')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-colors ${
                    activeTab === 'RESOLVED'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t('filterResolved')}
                </button>
              </div>

              {/* Search box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search grievance ID or keyword..."
                  className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-md text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* List of Grievance Cards */}
          <div className="space-y-4">
            {isLoadingGrievances ? (
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-3">
                <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
                <p className="text-xs font-semibold text-slate-600">
                  Loading your grievances from central registry...
                </p>
              </div>
            ) : filteredGrievances.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-lg p-8 text-center space-y-4">
                <p className="text-sm font-bold text-slate-700">
                  {searchQuery
                    ? 'No grievances found matching your search.'
                    : 'You have not submitted any grievances yet.'}
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Jan Samadhan provides guaranteed 21-day timebound citizen grievance redressal.
                </p>
                <div>
                  <button
                    onClick={() => navigate('/lodge')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-md cursor-pointer transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Lodge New Grievance</span>
                  </button>
                </div>
              </div>
            ) : (
              filteredGrievances.map((g) => (
                <div
                  key={g.id}
                  onClick={() => navigate(`/track?id=${g.id}`)}
                  className="bg-white border border-slate-200 hover:border-amber-500 rounded-lg p-5 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-[#0B2545] bg-slate-100 px-2.5 py-1 rounded">
                        {g.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Submitted: {g.createdAt}
                      </span>
                    </div>
                    <div>{getStatusBadge(g.status, g.isOverdue)}</div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {g.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      Department:{' '}
                      <span className="font-bold text-[#0B2545]">
                        {g.departmentName[language] || g.departmentName['en']}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs font-semibold text-slate-600 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>
                        21-Day Target: <strong>{g.targetDate}</strong>
                      </span>
                    </div>

                    <div className="text-amber-800 font-bold hover:underline flex items-center gap-1">
                      <span>{t('viewDetails')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};
