import React, { createContext, useContext, useState } from 'react';
import { Grievance, Priority, Attachment } from '../types';
import { initialMockGrievances } from '../data/mockGrievances';
import { mockDepartments } from '../data/mockDepartments';

export interface DraftGrievance {
  description: string;
  location: {
    state: string;
    district: string;
    blockOrWard: string;
    landmark: string;
    pincode: string;
  };
  attachments: Attachment[];
  departmentId: string;
  departmentName: {
    en: string;
    hi: string;
    mr: string;
  };
  category: {
    en: string;
    hi: string;
    mr: string;
  };
  urgency: Priority;
  aiSummary: string;
  specificDetails: Record<string, string>;
}

const initialDraft: DraftGrievance = {
  description: '',
  location: {
    state: 'Maharashtra',
    district: 'Pune',
    blockOrWard: 'Ward 14 / Shivaji Nagar',
    landmark: '',
    pincode: '411005',
  },
  attachments: [],
  departmentId: 'water-supply',
  departmentName: {
    en: 'Department of Water Supply & Sanitation',
    hi: 'जल आपूर्ति एवं स्वच्छता विभाग',
    mr: 'पानी पुरवठा व स्वच्छता विभाग',
  },
  category: {
    en: 'Water Supply Interruption / Pipeline Defect',
    hi: 'जल आपूर्ति में बाधा / पाइपलाइन दोष',
    mr: 'पाणी पुरवठ्यात अडथळा / पाईपलाईन दोष',
  },
  urgency: 'HIGH',
  aiSummary: '',
  specificDetails: {},
};

interface GrievanceContextType {
  grievances: Grievance[];
  draft: DraftGrievance;
  setDraft: React.Dispatch<React.SetStateAction<DraftGrievance>>;
  resetDraft: () => void;
  analyzeProblemAI: (text: string) => void;
  submitGrievance: () => Grievance;
  getGrievanceById: (id: string) => Grievance | undefined;
  submitFeedback: (id: string, feedback: NonNullable<Grievance['feedback']>) => void;
  submitAppeal: (id: string, reason: string, remarks: string) => void;
}

const GrievanceContext = createContext<GrievanceContextType | undefined>(undefined);

export const GrievanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [grievances, setGrievances] = useState<Grievance[]>(initialMockGrievances);
  const [draft, setDraft] = useState<DraftGrievance>(initialDraft);

  const resetDraft = () => {
    setDraft(initialDraft);
  };

  // Smart AI simulation to map text keywords to departments
  const analyzeProblemAI = (text: string) => {
    const lower = text.toLowerCase();
    let selectedDeptId = 'water-supply';
    let urgency: Priority = 'MEDIUM';
    let catEn = 'Public Infrastructure & Maintenance';
    let catHi = 'सार्वजनिक बुनियादी ढांचा और रखरखाव';
    let catMr = 'सार्वजनिक पायाभूत सुविधा व देखभाल';

    if (lower.includes('ration') || lower.includes('rice') || lower.includes('wheat') || lower.includes('dealer') || lower.includes('shop') || lower.includes('राशन') || lower.includes('रेशन')) {
      selectedDeptId = 'ration-pds';
      urgency = 'HIGH';
      catEn = 'Fair Price Shop Malpractice & Overcharging';
      catHi = 'राशन दुकान गड़बड़ी एवं अत्यधिक शुल्क';
      catMr = 'रेशन दुकानातील गैरप्रकार व जादा दर';
    } else if (lower.includes('road') || lower.includes('pothole') || lower.includes('street light') || lower.includes('drain') || lower.includes('सड़क') || lower.includes('गड्ढा') || lower.includes('रस्ता') || lower.includes('खड्डा')) {
      selectedDeptId = 'roads-pwd';
      urgency = lower.includes('accident') || lower.includes('danger') ? 'HIGH' : 'MEDIUM';
      catEn = 'Road Damage & Safety Concern';
      catHi = 'सड़क क्षति और सुरक्षा चिंता';
      catMr = 'रस्त्याची हानी आणि सुरक्षिततेचा प्रश्न';
    } else if (lower.includes('pension') || lower.includes('widow') || lower.includes('old age') || lower.includes('allowance') || lower.includes('पेंशन') || lower.includes('पेन्शन')) {
      selectedDeptId = 'pension-social-welfare';
      urgency = 'HIGH';
      catEn = 'Pension Disbursement & Scheme Benefits';
      catHi = 'पेंशन वितरण और योजना लाभ';
      catMr = 'निवृत्तीवेतन वितरण आणि योजना लाभ';
    } else if (lower.includes('power') || lower.includes('light') || lower.includes('electric') || lower.includes('meter') || lower.includes('voltage') || lower.includes('बिजली') || lower.includes('वीज')) {
      selectedDeptId = 'electricity-discom';
      urgency = lower.includes('spark') || lower.includes('wire') ? 'URGENT' : 'MEDIUM';
      catEn = 'Electricity Supply & Meter Discrepancy';
      catHi = 'बिजली आपूर्ति और मीटर विसंगति';
      catMr = 'वीज पुरवठा आणि मीटर विसंगती';
    } else {
      // Default to water if pipe/water/leak
      selectedDeptId = 'water-supply';
      urgency = 'HIGH';
      catEn = 'Water Supply Interruption / Pipeline Defect';
      catHi = 'जल आपूर्ति में बाधा / पाइपलाइन दोष';
      catMr = 'पाणी पुरवठ्यात अडथळा / पाईपलाईन दोष';
    }

    const dept = mockDepartments.find((d) => d.id === selectedDeptId) || mockDepartments[0];

    // Generate concise summary
    let summaryText = text.length > 120 ? text.substring(0, 120) + '...' : text;
    if (!text.trim()) {
      summaryText = 'Water supply pipe leakage near Ward 14 Primary School.';
    }

    setDraft((prev) => ({
      ...prev,
      departmentId: dept.id,
      departmentName: dept.name,
      category: { en: catEn, hi: catHi, mr: catMr },
      urgency,
      aiSummary: summaryText,
    }));
  };

  const submitGrievance = (): Grievance => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newId = `JS-2025-${randomNum}`;
    const now = new Date();
    const isoDate = now.toISOString().split('T')[0];
    const targetDateObj = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000);
    const targetDateIso = targetDateObj.toISOString().split('T')[0];

    const titleText = draft.description.length > 60
      ? draft.description.substring(0, 60) + '...'
      : draft.description || 'Public Grievance Submitted';

    const newGrievance: Grievance = {
      id: newId,
      createdAt: isoDate,
      targetDate: targetDateIso,
      title: titleText,
      description: draft.description || 'Grievance description recorded.',
      departmentId: draft.departmentId,
      departmentName: draft.departmentName,
      category: draft.category,
      urgency: draft.urgency,
      location: draft.location,
      specificDetails: draft.specificDetails,
      attachments: draft.attachments,
      status: 'SUBMITTED',
      currentDay: 1,
      isOverdue: false,
      nodalOfficer: {
        name: 'Shri A. K. Verma',
        designation: 'Designated Public Nodal Officer',
        office: `${draft.departmentName.en} - District Nodal Cell`,
        phone: '1800-11-4000',
      },
      timeline: [
        {
          dayNumber: 1,
          title: {
            en: 'Grievance Registered Successfully',
            hi: 'शिकायत सफलतापूर्वक दर्ज',
            mr: 'तक्रार यशस्वीरीत्या नोंदवली',
          },
          description: {
            en: 'Your grievance has been logged into the central government portal and routed to the department.',
            hi: 'आपकी शिकायत केंद्रीय पोर्टल में दर्ज की गई है और संबंधित विभाग को भेज दी गई है।',
            mr: 'तुमची तक्रार केंद्रीय पोर्टलवर नोंदवली गेली आहे आणि विभागाकडे पाठवली आहे.',
          },
          date: `${now.getDate()} ${now.toLocaleString('en-US', { month: 'short' })} ${now.getFullYear()}`,
          status: 'completed',
        },
        {
          dayNumber: 3,
          title: {
            en: 'Nodal Officer Verification',
            hi: 'नोडल अधिकारी द्वारा सत्यापन',
            mr: 'नोडल अधिकाऱ्यांची पडताळणी',
          },
          description: {
            en: 'Nodal Officer examines the complaint details and assigns field team.',
            hi: 'नोडल अधिकारी विवरण की जांच करते हैं और फील्ड टीम आवंटित करते हैं।',
            mr: 'नोडल अधिकारी माहितीची तपासणी करून टीम नियुक्त करतात.',
          },
          status: 'pending',
        },
        {
          dayNumber: 7,
          title: {
            en: 'On-site Field Inspection',
            hi: 'स्थल पर क्षेत्रीय निरीक्षण',
            mr: 'घटनास्थळाची प्रत्यक्ष पाहणी',
          },
          description: {
            en: 'Field inspector visits location to evaluate ground situation.',
            hi: 'क्षेत्रीय निरीक्षक स्थिति का मूल्यांकन करने के लिए स्थल का दौरा करते हैं।',
            mr: 'निरीक्षक प्रत्यक्ष जागेवर जाऊन पाहणी करतात.',
          },
          status: 'pending',
        },
        {
          dayNumber: 14,
          title: {
            en: 'Action & Resolution Work',
            hi: 'कार्रवाई और निवारण कार्य',
            mr: 'प्रत्यक्ष दुरुस्तीचे काम',
          },
          description: {
            en: 'Department team executes necessary repairs or official action.',
            hi: 'विभागीय टीम आवश्यक मरम्मत या कार्रवाई निष्पादित करती है।',
            mr: 'विभागीय पथक आवश्यक दुरुस्ती किंवा काम पूर्ण करते.',
          },
          status: 'pending',
        },
        {
          dayNumber: 21,
          title: {
            en: 'Target Resolution Date',
            hi: 'लक्ष्यित समाधान तिथि',
            mr: 'लक्ष्यांकित निवारण दिनांक',
          },
          description: {
            en: 'Mandatory resolution deadline guaranteed under Service Charter.',
            hi: 'सेवा चार्टर के तहत गारंटीकृत समाधान की अनिवार्य समयसीमा।',
            mr: 'सेवा हक्क कायद्यांतर्गत हमी दिलेली अंतिम मुदत.',
          },
          status: 'pending',
        },
      ],
    };

    setGrievances((prev) => [newGrievance, ...prev]);
    resetDraft();
    return newGrievance;
  };

  const getGrievanceById = (id: string): Grievance | undefined => {
    return grievances.find((g) => g.id.toLowerCase() === id.toLowerCase());
  };

  const submitFeedback = (id: string, feedback: NonNullable<Grievance['feedback']>) => {
    setGrievances((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          return {
            ...g,
            feedback,
          };
        }
        return g;
      })
    );
  };

  const submitAppeal = (id: string, reason: string, remarks: string) => {
    const appealId = `JS-APP-2025-${Math.floor(100 + Math.random() * 900)}`;
    setGrievances((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          return {
            ...g,
            status: 'APPEALED',
            appeal: {
              appealId,
              createdAt: new Date().toISOString().split('T')[0],
              reason,
              remarks,
              status: 'UNDER_APPEAL_REVIEW',
            },
          };
        }
        return g;
      })
    );
  };

  return (
    <GrievanceContext.Provider
      value={{
        grievances,
        draft,
        setDraft,
        resetDraft,
        analyzeProblemAI,
        submitGrievance,
        getGrievanceById,
        submitFeedback,
        submitAppeal,
      }}
    >
      {children}
    </GrievanceContext.Provider>
  );
};

export const useGrievance = () => {
  const context = useContext(GrievanceContext);
  if (!context) {
    throw new Error('useGrievance must be used within a GrievanceProvider');
  }
  return context;
};
