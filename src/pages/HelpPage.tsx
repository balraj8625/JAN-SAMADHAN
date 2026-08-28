import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, PhoneCall, ShieldCheck, FileQuestion } from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { useLanguage } from '../context/LanguageContext';

export const HelpPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: {
        en: 'How does Jan Samadhan know which government department handles my issue?',
        hi: 'जन समाधान को कैसे पता चलता है कि कौन सा सरकारी विभाग मेरी समस्या संभालता है?',
        mr: 'जन समाधानला कसे समजते की कोणती शासकीय यंत्रणा माझी तक्रार हाताळते?',
      },
      a: {
        en: 'Our smart algorithm analyzes key keywords in your problem description (such as "water leak", "ration shop", "pothole", "pension delay") and automatically routes it to the designated district nodal department without you needing to select confusing ministry hierarchies.',
        hi: 'हमारा स्मार्ट एल्गोरिदम आपके विवरण में मुख्य शब्दों (जैसे "पानी रिसाव", "राशन दुकान", "गड्ढा", "पेंशन में देरी") का विश्लेषण करता है और आपको भ्रमित करने वाली विभागीय सूचियों को चुनने की आवश्यकता के बिना संबंधित जिले के नोडल विभाग को स्वचालित रूप से भेज देता है।',
        mr: 'आमची स्मार्ट सिस्टीम तुमच्या वर्णनातील महत्त्वाचे शब्द (उदा. "पाणी गळती", "रेशन दुकान", "खड्डा", "पेन्शन विलंब") ओळखून कोणतीही गुंतागुंत न होता थेट जिल्हा पातळीवरील संबंधित विभागाकडे तक्रार वर्ग करते.',
      },
    },
    {
      q: {
        en: 'What is the 21-day timeline guarantee under the Public Service Guarantee Act?',
        hi: 'लोक सेवा गारंटी अधिनियम के तहत 21-दिवसीय समयरेखा गारंटी क्या है?',
        mr: 'लोकसेवा हक्क कायद्यांतर्गत २१ दिवसांच्या हमीचा अर्थ काय?',
      },
      a: {
        en: 'Every registered grievance is legally bound to receive a designated nodal officer assignment within 48 hours and a ground field inspection or formal resolution within 21 days. If delayed, the officer must provide a written reason notice.',
        hi: 'प्रत्येक पंजीकृत शिकायत को 48 घंटे के भीतर एक नोडल अधिकारी आवंटित किया जाता है और 21 दिनों के भीतर प्रत्यक्ष स्थल निरीक्षण या समाधान प्रदान किया जाता है। यदि देरी होती है, तो अधिकारी को कारण सूचना देनी होती है।',
        mr: 'प्रत्येक तक्रारीसाठी ४८ तासांत नोडल अधिकारी नियुक्त केला जातो आणि २१ दिवसांच्या आत प्रत्यक्ष काम पूर्ण केले जाते किंवा स्पष्टीकरण दिले जाते.',
      },
    },
    {
      q: {
        en: 'Do citizens need to pay any charge or fee to lodge a grievance?',
        hi: 'क्या शिकायत दर्ज करने के लिए नागरिकों को कोई शुल्क देना पड़ता है?',
        mr: 'तक्रार नोंदवण्यासाठी नागरिकांना कोणतेही शुल्क द्यावे लागते का?',
      },
      a: {
        en: 'No, Jan Samadhan is 100% free public service provided by the Government of India. Beware of fraudulent sites asking for payment.',
        hi: 'नहीं, जन समाधान भारत सरकार द्वारा प्रदान की जाने वाली 100% नि:शुल्क सार्वजनिक सेवा है। किसी भी भुगतान मांगने वाली फर्जी साइटों से सावधान रहें।',
        mr: 'नाही, जन समाधान ही भारत सरकारची १००% मोफत सार्वजनिक सेवा आहे. पैसे मागणार्‍या कोणत्याही बनावट साईट्सपासून सावध राहा.',
      },
    },
    {
      q: {
        en: 'What if I am unsatisfied with the department resolution or my grievance is delayed?',
        hi: 'यदि मैं विभागीय समाधान से असंतुष्ट हूं या मेरी शिकायत विलंबित है तो क्या होगा?',
        mr: 'माझ्या तक्रारीचे योग्य निवारण झाले नाही किंवा विलंब झाला तर मी काय करावे?',
      },
      a: {
        en: 'You can file a First Appeal directly on the portal. Your grievance will be immediately escalated to the Senior District Appellate Authority (Collectorate Cell) for investigation.',
        hi: 'आप सीधे पोर्टल पर प्रथम अपील दायर कर सकते हैं। आपकी शिकायत को तुरंत जांच के लिए वरिष्ठ जिला अपीलीय प्राधिकारी (कलेक्टर सेल) को भेज दिया जाएगा।',
        mr: 'तुम्ही पोर्टलवरूनच प्रथम अपील दाखल करू शकता. तुमची तक्रार लगेच वरिष्ठ जिल्हा अपिलीय अधिकाऱ्यांकडे (कलेक्टर ऑफिस) तपासासाठी पाठवली जाईल.',
      },
    },
    {
      q: {
        en: 'Can I speak my grievance using microphone instead of typing?',
        hi: 'क्या मैं टाइप करने के बजाय माइक का उपयोग करके अपनी शिकायत बोल सकता हूँ?',
        mr: 'मी टायपिंग ऐवजी माईकचा वापर करून बोलून तक्रार सांगू शकतो का?',
      },
      a: {
        en: 'Yes! Click the "Speak Your Complaint (Mic)" button on the grievance form. You can speak naturally in Hindi, Marathi, or English, and the speech will be converted into text.',
        hi: 'हाँ! शिकायत फ़ॉर्म पर "बोलकर शिकायत दर्ज करें" बटन पर क्लिक करें। आप हिंदी, मराठी या अंग्रेजी में स्वाभाविक रूप से बोल सकते हैं।',
        mr: 'होय! तक्रार अर्जावरील "बोलून तक्रार सांगा" या माईक बटणावर क्लिक करा. तुम्ही मराठी, हिंदी किंवा इंग्रजीत बोलू शकता.',
      },
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <BackButton to="/" />

      <div className="space-y-1">
        <h1 className="text-2xl font-black text-[#0B2545] font-serif flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-amber-600" />
          <span>{t('navHelp')}</span>
        </h1>
        <p className="text-xs font-semibold text-slate-600">
          Find simple answers to common questions about lodging and tracking public complaints.
        </p>
      </div>

      {/* Toll Free Helpline Card */}
      <div className="bg-white border-2 border-[#0B2545] rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#0B2545] text-amber-400 rounded-md">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#0B2545]">
              National Toll Free Public Helpline
            </h3>
            <p className="text-lg font-black text-amber-900 font-mono">
              1800-11-4000
            </p>
            <p className="text-[11px] text-slate-600">
              Available 24 hours x 7 days for senior citizens & assistance
            </p>
          </div>
        </div>

        <a
          href="tel:1800114000"
          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-md shadow-xs transition-colors"
        >
          Call Helpline Now
        </a>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-2xs">
        <h2 className="text-base font-extrabold text-[#0B2545] border-b border-slate-200 pb-3 flex items-center gap-2">
          <FileQuestion className="w-5 h-5 text-amber-600" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const questionText = faq.q[language] || faq.q['en'];
            const answerText = faq.a[language] || faq.a['en'];
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-md overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 font-bold text-xs sm:text-sm text-[#0B2545] flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span>{questionText}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 bg-white text-xs font-medium text-slate-700 leading-relaxed border-t border-slate-200">
                    {answerText}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
