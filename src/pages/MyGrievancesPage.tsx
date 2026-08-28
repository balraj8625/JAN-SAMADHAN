import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Building2,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { useLanguage } from '../context/LanguageContext';
import { useGrievance } from '../context/GrievanceContext';
import { GrievanceStatus } from '../types';

export const MyGrievancesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { grievances } = useGrievance();

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
      return g.status === 'SUBMITTED' || g.status === 'UNDER_REVIEW' || g.status === 'ACTION_IN_PROGRESS';
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

      <div className="space-y-1">
        <h1 className="text-2xl font-black text-[#0B2545] font-serif">
          {t('myGrievancesTitle')}
        </h1>
        <p className="text-xs font-semibold text-slate-600">
          {t('myGrievancesSub')}
        </p>
      </div>

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
        {filteredGrievances.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-8 text-center space-y-2">
            <p className="text-sm font-bold text-slate-700">
              No grievances found matching your search.
            </p>
            <p className="text-xs text-slate-500">
              Try clearing filters or enter a different grievance ID.
            </p>
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
    </div>
  );
};
