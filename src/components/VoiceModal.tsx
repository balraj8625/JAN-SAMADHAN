import React, { useState, useEffect } from 'react';
import { Mic, Square, Check, X, Volume2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptComplete: (text: string) => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  onTranscriptComplete,
}) => {
  const { language, t } = useLanguage();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');

  const sampleTranscripts = {
    en: [
      'Drinking water pipeline has broken in Ward 14 near the school and clean water is leaking on the road for last 4 days.',
      'Ration shop dealer is charging 50 rupees extra for wheat and rice and refusing to give official printed receipt.',
      'Old age pension for my mother has not been credited in bank account for last 3 months.',
      'Dangerous deep pothole on MG Road near civil hospital main gate causing accidents.',
    ],
    hi: [
      'वार्ड 14 में स्कूल के पास पीने के पानी का पाइप टूट गया है और पिछले 4 दिनों से सड़क पर साफ पानी बह रहा है।',
      'राशन डीलर गेहूं और चावल के लिए 50 रुपये अतिरिक्त वसूल रहा है और आधिकारिक रसीद देने से मना कर रहा है।',
      'मेरी माताजी की वृद्धावस्था पेंशन पिछले 3 महीनों से बैंक खाते में जमा नहीं हुई है।',
      'सिविल अस्पताल के मुख्य गेट के पास सड़क पर बहुत गहरा गड्ढा है जिससे दुर्घटना की आशंका है।',
    ],
    mr: [
      'प्रभाग १४ मधील शाळेजवळ पिण्याच्या पाण्याचा पाईप फुटला आहे आणि गेल्या ४ दिवसांपासून रस्त्यावर पाणी वाहत आहे.',
      'रेशन दुकानदार धान्यासाठी ५० रुपये जास्त मागत आहे आणि अधिकृत पावती देण्यास नकार देत आहे.',
      'माझ्या आईचे श्रावणबाळ निवृत्तीवेतन गेल्या ३ महिन्यांपासून बँकेत जमा झालेले नाही.',
      'शासकीय रुग्णालयाजवळ रस्त्यावर मोठा धोकादायक खड्डा पडला आहे.',
    ],
  };

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
      setTranscript('');
      // Simulate live typing effect
      const phrases = sampleTranscripts[language] || sampleTranscripts['en'];
      const chosen = phrases[0];

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= chosen.length) {
          setTranscript(chosen.substring(0, currentIndex));
          currentIndex += 4;
        } else {
          clearInterval(interval);
          setIsListening(false);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isOpen, language]);

  if (!isOpen) return null;

  const handleApply = () => {
    onTranscriptComplete(transcript);
    onClose();
  };

  const handlePickPrompt = (text: string) => {
    setTranscript(text);
    setIsListening(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-full text-amber-800">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {t('micButtonLabel')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 text-center">
          {isListening ? (
            <div className="flex flex-col items-center gap-3">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-amber-400 opacity-75"></span>
                <div className="relative p-4 bg-amber-600 text-white rounded-full">
                  <Mic className="w-8 h-8" />
                </div>
              </div>
              <p className="text-sm font-semibold text-amber-800 animate-pulse">
                {t('recordingText')}
              </p>
            </div>
          ) : (
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-full">
                <Volume2 className="w-6 h-6" />
              </div>
            </div>
          )}

          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-md min-h-[100px] text-left">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Captured Speech Text:
            </p>
            <p className="text-base font-medium text-slate-900 leading-relaxed">
              {transcript || 'Listening...'}
            </p>
          </div>
        </div>

        {/* Quick sample pickers */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-600 mb-2">
            {t('samplePromptsLabel')}
          </p>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {(sampleTranscripts[language] || sampleTranscripts['en']).map((phrase, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePickPrompt(phrase)}
                className="w-full text-left text-xs p-2 bg-slate-100 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 rounded text-slate-700 font-medium transition-colors cursor-pointer"
              >
                "{phrase.substring(0, 70)}..."
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md cursor-pointer"
          >
            {t('close')}
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={!transcript}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-md shadow-xs cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Use This Text
          </button>
        </div>
      </div>
    </div>
  );
};
