import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FilePlus,
  Search,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowRight,
  Mic,
  Droplet,
  ShoppingBag,
  Construction,
  HeartHandshake,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useGrievance } from '../context/GrievanceContext';

export const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { analyzeProblemAI, setDraft } = useGrievance();

  const [trackIdInput, setTrackIdInput] = useState<string>('');

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackIdInput.trim()) {
      navigate(`/track?id=${encodeURIComponent(trackIdInput.trim())}`);
    } else {
      navigate('/track');
    }
  };

  const handlePickSample = (problemText: string) => {
    analyzeProblemAI(problemText);
    setDraft((prev) => ({
      ...prev,
      description: problemText,
    }));
    navigate('/lodge');
  };

  const sampleCards = [
    {
      icon: Droplet,
      deptName: {
        en: 'Water Supply',
        hi: 'जल आपूर्ति',
        mr: 'पाणी पुरवठा',
      },
      text: {
        en: 'Drinking water pipeline broken near Ward 14 school and water leaking on street for 4 days.',
        hi: 'वार्ड 14 में स्कूल के पास पीने के पानी का पाइप टूट गया है और 4 दिनों से पानी बह रहा है।',
        mr: 'प्रभाग १४ मधील शाळेजवळ पिण्याच्या पाण्याचा पाईप फुटला आहे आणि ४ दिवसांपासून पाणी वाहत आहे.',
      },
    },
    {
      icon: ShoppingBag,
      deptName: {
        en: 'Ration & PDS',
        hi: 'राशन और खाद्यान्न',
        mr: 'रेशन दुकान',
      },
      text: {
        en: 'Fair price ration shop dealer charging ₹60 extra per kit and refusing to give official bill receipt.',
        hi: 'राशन दुकान डीलर प्रति किट 60 रुपये अतिरिक्त वसूल कर रहा है और रसीद देने से मना कर रहा है।',
        mr: 'रेशन दुकानदार प्रती किट ६० रुपये जास्त मागत आहे आणि बिल देण्यास नकार देत आहे.',
      },
    },
    {
      icon: Construction,
      deptName: {
        en: 'Roads & PWD',
        hi: 'सड़क एवं मार्ग',
        mr: 'रस्ते व बांधकाम',
      },
      text: {
        en: 'Dangerous deep pothole on MG Road near civil hospital causing accidents for two-wheelers.',
        hi: 'सिविल अस्पताल के पास एमजी रोड पर खतरनाक गहरा गड्ढा जिससे दोपहिया वाहन गिर रहे हैं।',
        mr: 'शासकीय रुग्णालयाजवळ मुख्य रस्त्यावर मोठा धोकादायक खड्डा पडला आहे.',
      },
    },
    {
      icon: HeartHandshake,
      deptName: {
        en: 'Old Age Pension',
        hi: 'वृद्धावस्था पेंशन',
        mr: 'निवृत्तीवेतन',
      },
      text: {
        en: 'Old age pension of ₹1,500 for mother not credited into bank account for last 3 months.',
        hi: 'माताजी की ₹1,500 की वृद्धावस्था पेंशन पिछले 3 महीनों से बैंक खाते में जमा नहीं हुई है।',
        mr: 'आईचे १५०० रुपयांचे निवृत्तीवेतन गेल्या ३ महिन्यांपासून बँकेत जमा झाले नाही.',
      },
    },
    {
      icon: Zap,
      deptName: {
        en: 'Electricity Discom',
        hi: 'बिजली निगम',
        mr: 'महावितरण / वीज',
      },
      text: {
        en: 'Sparking electricity transformer and hanging low tension wires in market alley.',
        hi: 'बाजार की गली में ट्रांसफॉर्मर से चिंगारी निकल रही है और बिजली के तार नीचे लटक रहे हैं।',
        mr: 'बाजारपेठेतील ट्रान्सफॉर्मरमधून ठिणग्या उडत आहेत आणि वीज तारा खाली लोंबकळत आहेत.',
      },
    },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-amber-900 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
            <span>Citizen-First Grievance Portal | No Department Knowledge Needed</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] font-serif tracking-tight leading-tight">
            {t('homeHeading')}
          </h1>

          <p className="text-lg sm:text-xl font-bold text-amber-800">
            "{t('homeSubheading')}"
          </p>

          <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
            {t('homeDesc')}
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/lodge')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-base rounded-md shadow-sm transition-colors cursor-pointer"
            >
              <FilePlus className="w-5 h-5" />
              <span>{t('btnLodgeGrievance')}</span>
            </button>

            <button
              onClick={() => navigate('/track')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white hover:bg-slate-50 text-[#0B2545] border-2 border-[#0B2545] font-extrabold text-base rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
              <span>{t('btnTrackGrievance')}</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Quick Track Card */}
        <section className="bg-white border border-slate-300 rounded-lg p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#0B2545] flex items-center gap-2">
                <Search className="w-5 h-5 text-amber-600" />
                <span>{t('quickTrackHeading')}</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Enter your 12-character ID to see live officer assignment & 21-day timeline.
              </p>
            </div>

            <form onSubmit={handleQuickTrack} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input
                type="text"
                value={trackIdInput}
                onChange={(e) => setTrackIdInput(e.target.value)}
                placeholder={t('placeholderGrievanceId')}
                className="px-3.5 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-900 w-full sm:w-72 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#0B2545] hover:bg-navy-900 text-white font-bold text-sm rounded-md shadow-xs transition-colors cursor-pointer flex-shrink-0"
              >
                {t('btnTrackNow')}
              </button>
            </form>
          </div>
        </section>

        {/* How It Works - 4 Steps */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-[#0B2545] font-serif">
              {t('howItWorksHeading')}
            </h2>
            <p className="text-xs font-semibold text-slate-600">
              Simple 4-step process designed for first-time users and elderly citizens
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 relative shadow-2xs">
              <div className="w-10 h-10 bg-amber-100 text-amber-900 font-extrabold rounded-md flex items-center justify-center text-lg">
                1
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">
                {t('step1Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('step1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 relative shadow-2xs">
              <div className="w-10 h-10 bg-amber-100 text-amber-900 font-extrabold rounded-md flex items-center justify-center text-lg">
                2
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">
                {t('step2Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('step2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 relative shadow-2xs">
              <div className="w-10 h-10 bg-amber-100 text-amber-900 font-extrabold rounded-md flex items-center justify-center text-lg">
                3
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">
                {t('step3Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('step3Desc')}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 relative shadow-2xs">
              <div className="w-10 h-10 bg-amber-100 text-amber-900 font-extrabold rounded-md flex items-center justify-center text-lg">
                4
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">
                {t('step4Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('step4Desc')}
              </p>
            </div>
          </div>
        </section>

        {/* Service Charter & Guarantee Notice */}
        <section className="bg-emerald-50 border border-emerald-300 rounded-lg p-6 flex flex-col md:flex-row items-center gap-5">
          <div className="p-3 bg-emerald-700 text-white rounded-full flex-shrink-0">
            <Clock className="w-8 h-8" />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-emerald-950">
              {t('guaranteeTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
              {t('guaranteeDesc')}
            </p>
          </div>
          <div className="md:ml-auto flex-shrink-0">
            <span className="px-3 py-1.5 bg-emerald-700 text-white font-bold text-xs rounded-md shadow-2xs">
              Public Service Act
            </span>
          </div>
        </section>

        {/* Sample Everyday Grievances Section */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#0B2545] font-serif">
              {t('sampleHeading')}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              {t('sampleSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleCards.map((item, idx) => {
              const Icon = item.icon;
              const sampleText = item.text[language] || item.text['en'];
              const deptName = item.deptName[language] || item.deptName['en'];
              return (
                <div
                  key={idx}
                  onClick={() => handlePickSample(sampleText)}
                  className="bg-white border border-slate-200 hover:border-amber-500 rounded-lg p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded">
                        <Icon className="w-3.5 h-3.5 text-amber-600" />
                        <span>{deptName}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-amber-700 group-hover:underline flex items-center gap-0.5">
                        Lodge <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      "{sampleText}"
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Click to auto-fill form</span>
                    <Mic className="w-3 h-3 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
