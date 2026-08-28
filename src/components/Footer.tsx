import React from 'react';
import { ShieldCheck, PhoneCall, HeartHandshake, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#0B2545] text-white border-t-4 border-amber-600 mt-12">
      {/* Helpline & Public Service Trust Banner */}
      <div className="bg-[#13293D] py-6 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2 bg-amber-600 text-white rounded-md">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                National Public Helpline
              </p>
              <p className="text-sm font-extrabold text-white">
                1800-11-4000 (Toll Free, 24x7)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2 bg-emerald-700 text-white rounded-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                Guaranteed Resolution
              </p>
              <p className="text-sm font-bold text-white">
                21-Day Time-Bound Service Charter
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2 bg-slate-700 text-white rounded-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                100% Free Government Service
              </p>
              <p className="text-sm font-bold text-white">
                No fee required for lodging complaints
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 text-xs text-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-amber-600 rounded text-white font-bold flex items-center justify-center text-sm">
                JS
              </div>
              <span className="font-extrabold text-sm text-white font-serif">
                JAN SAMADHAN
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Public Grievance Redressal Service. Designed to make government grievance filing simple, transparent, and time-bound for every citizen without department confusion.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider border-b border-slate-700 pb-1">
              Important Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#/lodge" className="hover:text-amber-300 transition-colors">
                  Lodge New Grievance
                </a>
              </li>
              <li>
                <a href="#/track" className="hover:text-amber-300 transition-colors">
                  Track Grievance Status
                </a>
              </li>
              <li>
                <a href="#/my-grievances" className="hover:text-amber-300 transition-colors">
                  My Grievances
                </a>
              </li>
              <li>
                <a href="#/help" className="hover:text-amber-300 transition-colors">
                  Frequently Asked Questions (FAQs)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider border-b border-slate-700 pb-1">
              Right to Public Service
            </h4>
            <ul className="space-y-2">
              <li>21-Day Mandatory Resolution Guarantee</li>
              <li>Nodal Officer Escalation System</li>
              <li>First Appeal to District Appellate Authority</li>
              <li>Feedback & Re-opening Rights</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider border-b border-slate-700 pb-1">
              Supported Languages
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2 py-1 bg-[#13293D] border border-slate-700 rounded text-xs font-semibold text-white">
                English
              </span>
              <span className="px-2 py-1 bg-[#13293D] border border-slate-700 rounded text-xs font-semibold text-white">
                हिंदी (Hindi)
              </span>
              <span className="px-2 py-1 bg-[#13293D] border border-slate-700 rounded text-xs font-semibold text-white">
                मराठी (Marathi)
              </span>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">
              Designed for ease of use by first-time and senior citizens.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-slate-400 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2025 Jan Samadhan Portal — Government of India. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
