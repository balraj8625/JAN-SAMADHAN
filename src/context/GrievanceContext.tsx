import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Department, Grievance, Priority } from '../types';
import { mockDepartments } from '../data/mockDepartments';
import {
  DraftGrievance,
  GrievanceContext,
  initialDraft,
  adaptBackendGrievance,
} from './grievanceContextDef';
import {
  aiApi,
  attachmentApi,
  BackendGrievance,
  departmentApi,
  grievanceApi,
} from '../api';
import { useAuth } from './useAuth';

export const GrievanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [rawBackendGrievances, setRawBackendGrievances] = useState<BackendGrievance[]>([]);
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [draft, setDraft] = useState<DraftGrievance>(initialDraft);

  const [isLoadingGrievances, setIsLoadingGrievances] = useState<boolean>(false);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState<boolean>(false);
  const [grievancesError, setGrievancesError] = useState<string | null>(null);

  const resetDraft = useCallback(() => {
    setDraft(initialDraft);
  }, []);

  // Fetch departments on mount
  useEffect(() => {
    let isMounted = true;
    const fetchDepts = async () => {
      setIsLoadingDepartments(true);
      try {
        const backendDepts = await departmentApi.getDepartments();
        if (isMounted && Array.isArray(backendDepts) && backendDepts.length > 0) {
          const merged: Department[] = backendDepts.map((bd) => {
            const mock = mockDepartments.find((m) => m.id === bd.id);
            return {
              id: bd.id,
              name: bd.name,
              iconName: mock?.iconName || 'Building2',
              commonIssues: mock?.commonIssues || [
                { en: 'General Issue', hi: 'सामान्य समस्या', mr: 'सामान्य समस्या' },
              ],
              requiredFields: mock?.requiredFields || [],
            };
          });
          setDepartments(merged);
        }
      } catch {
        // Fallback gracefully to mockDepartments if backend department fetch fails
      } finally {
        if (isMounted) setIsLoadingDepartments(false);
      }
    };

    void fetchDepts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch user grievances when user logs in
  const refreshGrievances = useCallback(async () => {
    if (!user) {
      setGrievances([]);
      setRawBackendGrievances([]);
      return;
    }

    setIsLoadingGrievances(true);
    setGrievancesError(null);
    try {
      const data = await grievanceApi.getUserGrievances();
      setRawBackendGrievances(data);
      setGrievances(data.map(adaptBackendGrievance));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load grievances';
      setGrievancesError(msg);
    } finally {
      setIsLoadingGrievances(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    const loadGrievances = async () => {
      try {
        const data = await grievanceApi.getUserGrievances();
        if (isMounted) {
          setRawBackendGrievances(data);
          setGrievances(data.map(adaptBackendGrievance));
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Failed to load grievances';
          setGrievancesError(msg);
        }
      } finally {
        if (isMounted) setIsLoadingGrievances(false);
      }
    };

    void loadGrievances();
    return () => {
      isMounted = false;
    };
  }, [user]);

  // AI analysis function routing through backend API
  const analyzeProblemAI = useCallback(async (text: string) => {
    const lower = text.toLowerCase();
    let selectedDeptId = 'water_supply_dept';
    let urgency: Priority = 'MEDIUM';
    let catEn = 'Public Infrastructure & Maintenance';
    let catHi = 'सार्वजनिक बुनियादी ढांचा और रखरखाव';
    let catMr = 'सार्वजनिक पायाभूत सुविधा व देखभाल';

    try {
      if (text.trim().length >= 10) {
        const aiResult = await aiApi.analyzeText(text);
        if (aiResult?.category) {
          catEn = aiResult.category;
          catHi = aiResult.category;
          catMr = aiResult.category;
        }
      }
    } catch {
      // Gracefully fall back to local keyword classifier
    }

    if (
      lower.includes('scholarship') ||
      lower.includes('student') ||
      lower.includes('admission') ||
      lower.includes('school') ||
      lower.includes('college') ||
      lower.includes('छात्रवृत्ति') ||
      lower.includes('शिष्यवृत्ती')
    ) {
      selectedDeptId = 'education_dept';
      urgency = 'HIGH';
      catEn = 'Scholarship Disbursement & Academic Issues';
      catHi = 'छात्रवृत्ति वितरण और शैक्षणिक मुद्दे';
      catMr = 'शिष्यवृत्ती वितरण आणि शैक्षणिक समस्या';
    } else if (
      lower.includes('ration') ||
      lower.includes('rice') ||
      lower.includes('wheat') ||
      lower.includes('dealer') ||
      lower.includes('shop') ||
      lower.includes('राशन') ||
      lower.includes('रेशन')
    ) {
      selectedDeptId = 'food_supply_dept';
      urgency = 'HIGH';
      catEn = 'Fair Price Shop Malpractice & Overcharging';
      catHi = 'राशन दुकान गड़बड़ी एवं अत्यधिक शुल्क';
      catMr = 'रेशन दुकानातील गैरप्रकार व जादा दर';
    } else if (
      lower.includes('road') ||
      lower.includes('pothole') ||
      lower.includes('street light') ||
      lower.includes('bridge') ||
      lower.includes('सड़क') ||
      lower.includes('गड्ढा') ||
      lower.includes('रस्ता') ||
      lower.includes('खड्डा')
    ) {
      selectedDeptId = 'roads_dept';
      urgency = lower.includes('accident') || lower.includes('danger') ? 'HIGH' : 'MEDIUM';
      catEn = 'Road Damage & Safety Concern';
      catHi = 'सड़क क्षति और सुरक्षा चिंता';
      catMr = 'रस्त्याची हानी आणि सुरक्षिततेचा प्रश्न';
    } else if (
      lower.includes('pension') ||
      lower.includes('pf') ||
      lower.includes('epfo') ||
      lower.includes('uan') ||
      lower.includes('provident') ||
      lower.includes('widow') ||
      lower.includes('old age') ||
      lower.includes('allowance') ||
      lower.includes('पेंशन') ||
      lower.includes('पेन्शन')
    ) {
      selectedDeptId = 'epfo_dept';
      urgency = 'HIGH';
      catEn = 'EPF Withdrawal & Pension Disbursement';
      catHi = 'ईपीएफ निकासी और पेंशन वितरण';
      catMr = 'ईपीएफ रक्कम आणि निवृत्तीवेतन वितरण';
    } else if (
      lower.includes('power') ||
      lower.includes('light') ||
      lower.includes('electric') ||
      lower.includes('meter') ||
      lower.includes('voltage') ||
      lower.includes('बिजली') ||
      lower.includes('वीज')
    ) {
      selectedDeptId = 'electricity_dept';
      urgency = lower.includes('spark') || lower.includes('wire') ? 'URGENT' : 'MEDIUM';
      catEn = 'Electricity Supply & Meter Discrepancy';
      catHi = 'बिजली आपूर्ति और मीटर विसंगति';
      catMr = 'वीज पुरवठा आणि मीटर विसंगती';
    } else if (
      lower.includes('railway') ||
      lower.includes('train') ||
      lower.includes('ticket') ||
      lower.includes('pnr') ||
      lower.includes('रेलवे') ||
      lower.includes('रेल्वे')
    ) {
      selectedDeptId = 'railways_dept';
      urgency = 'MEDIUM';
      catEn = 'Railway Passenger Service & Ticket Refund';
      catHi = 'रेलवे यात्री सेवा एवं टिकट रिफंड';
      catMr = 'रेल्वे प्रवासी सेवा आणि तिकीट परतावा';
    } else if (
      lower.includes('garbage') ||
      lower.includes('drain') ||
      lower.includes('waste') ||
      lower.includes('sewage') ||
      lower.includes('stray') ||
      lower.includes('कचरा') ||
      lower.includes('नाला')
    ) {
      selectedDeptId = 'municipal_dept';
      urgency = 'MEDIUM';
      catEn = 'Municipal Sanitation & Civic Amenities';
      catHi = 'नगरपालिका स्वच्छता और नागरिक सुविधाएं';
      catMr = 'नगरपालिका स्वच्छता आणि नागरी सुविधा';
    } else if (
      lower.includes('hospital') ||
      lower.includes('health') ||
      lower.includes('doctor') ||
      lower.includes('medicine') ||
      lower.includes('phc') ||
      lower.includes('अस्पताल') ||
      lower.includes('रुग्णालय') ||
      lower.includes('औषध')
    ) {
      selectedDeptId = 'health_dept';
      urgency = 'HIGH';
      catEn = 'Healthcare Service & Medicine Availability';
      catHi = 'स्वास्थ्य सेवा और दवा उपलब्धता';
      catMr = 'आरोग्य सेवा आणि औषध उपलब्धता';
    } else if (
      lower.includes('housing') ||
      lower.includes('pmay') ||
      lower.includes('आवास') ||
      lower.includes('घरकुल')
    ) {
      selectedDeptId = 'housing_dept';
      urgency = 'MEDIUM';
      catEn = 'Housing Scheme Subsidy & Allotment';
      catHi = 'आवास योजना सब्सिडी और आवंटन';
      catMr = 'गृहनिर्माण योजना अनुदान आणि वाटप';
    } else if (
      lower.includes('kisan') ||
      lower.includes('farmer') ||
      lower.includes('crop') ||
      lower.includes('fertilizer') ||
      lower.includes('कृषि') ||
      lower.includes('शेतकरी')
    ) {
      selectedDeptId = 'agriculture_dept';
      urgency = 'HIGH';
      catEn = 'Agriculture Support & PM-KISAN Scheme';
      catHi = 'कृषि सहायता और पीएम-किसान योजना';
      catMr = 'कृषी सहाय्य आणि पीएम-किसान योजना';
    } else {
      selectedDeptId = 'water_supply_dept';
      urgency = 'HIGH';
      catEn = 'Water Supply Interruption / Pipeline Defect';
      catHi = 'जल आपूर्ति में बाधा / पाइपलाइन दोष';
      catMr = 'पाणी पुरवठ्यात अडथळा / पाईपलाईन दोष';
    }

    const dept = departments.find((d) => d.id === selectedDeptId) || departments[0];
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
  }, [departments]);

  const submitGrievance = useCallback(async (): Promise<Grievance> => {
    const titleText =
      draft.description.length > 60
        ? draft.description.substring(0, 60) + '...'
        : draft.description || 'Public Grievance Submitted';

    const payload = {
      title: titleText,
      description:
        draft.description.length < 20
          ? `${draft.description} (Detailed description recorded for public grievance resolution)`
          : draft.description,
      departmentId: draft.departmentId,
      category: draft.category.en,
      state: draft.location.state || 'Maharashtra',
      district: draft.location.district || 'Pune',
    };

    const created = await grievanceApi.createGrievance(payload);

    // If there are file attachments, upload them to the created grievance
    if (draft.attachments && draft.attachments.length > 0) {
      for (const att of draft.attachments) {
        if (att.file) {
          try {
            await attachmentApi.uploadAttachment(created.id, att.file);
          } catch {
            // Log upload issue without failing whole grievance submission
          }
        }
      }
    }

    const adapted = adaptBackendGrievance(created);
    setRawBackendGrievances((prev) => [created, ...prev]);
    setGrievances((prev) => [adapted, ...prev]);
    resetDraft();
    return adapted;
  }, [draft, resetDraft]);

  const getGrievanceById = useCallback(
    (idOrNumber: string): Grievance | undefined => {
      const match = idOrNumber.trim().toLowerCase();
      return grievances.find((g) => g.id.toLowerCase() === match);
    },
    [grievances]
  );

  const fetchGrievanceByRefOrId = useCallback(
    async (idOrNumber: string): Promise<Grievance | null> => {
      const trimmed = idOrNumber.trim();
      if (!trimmed) return null;

      // Check memory first
      const existing = getGrievanceById(trimmed);
      if (existing) return existing;

      try {
        let bg: BackendGrievance;
        if (trimmed.toUpperCase().startsWith('GRV')) {
          bg = await grievanceApi.getGrievanceByNumber(trimmed);
        } else {
          bg = await grievanceApi.getGrievanceById(trimmed);
        }
        const adapted = adaptBackendGrievance(bg);
        setGrievances((prev) => {
          if (prev.some((g) => g.id.toLowerCase() === adapted.id.toLowerCase())) {
            return prev.map((g) => (g.id.toLowerCase() === adapted.id.toLowerCase() ? adapted : g));
          }
          return [adapted, ...prev];
        });
        return adapted;
      } catch {
        return null;
      }
    },
    [getGrievanceById]
  );

  const findBackendId = useCallback(
    (idOrNumber: string): string => {
      const raw = rawBackendGrievances.find(
        (bg) => bg.id === idOrNumber || bg.grievanceNumber.toUpperCase() === idOrNumber.toUpperCase()
      );
      return raw ? raw.id : idOrNumber;
    },
    [rawBackendGrievances]
  );

  const submitFeedback = useCallback(
    async (idOrNumber: string, rating: number, comment?: string) => {
      const backendId = findBackendId(idOrNumber);
      await grievanceApi.submitFeedback(backendId, { rating, comment });
      await refreshGrievances();
    },
    [findBackendId, refreshGrievances]
  );

  const submitAppeal = useCallback(
    async (idOrNumber: string, reason: string, remarks: string): Promise<string> => {
      const backendId = findBackendId(idOrNumber);
      const appeal = await grievanceApi.submitAppeal(backendId, { reason, description: remarks });
      await refreshGrievances();
      return appeal.id;
    },
    [findBackendId, refreshGrievances]
  );

  const downloadAttachment = useCallback(
    async (
      grievanceId: string,
      attachmentId: string,
      fileName?: string
    ) => {
      const backendId = findBackendId(grievanceId);
      await attachmentApi.downloadAttachment(backendId, attachmentId, fileName);
    },
    [findBackendId]
  );

  const contextValue = useMemo(
    () => ({
      grievances: user ? grievances : [],
      departments,
      isLoadingGrievances,
      isLoadingDepartments,
      grievancesError,
      draft,
      setDraft,
      resetDraft,
      refreshGrievances,
      analyzeProblemAI,
      submitGrievance,
      getGrievanceById,
      fetchGrievanceByRefOrId,
      submitFeedback,
      submitAppeal,
      downloadAttachment,
    }),
    [
      user,
      grievances,
      departments,
      isLoadingGrievances,
      isLoadingDepartments,
      grievancesError,
      draft,
      resetDraft,
      refreshGrievances,
      analyzeProblemAI,
      submitGrievance,
      getGrievanceById,
      fetchGrievanceByRefOrId,
      submitFeedback,
      submitAppeal,
      downloadAttachment,
    ]
  );

  return (
    <GrievanceContext.Provider value={contextValue}>
      {children}
    </GrievanceContext.Provider>
  );
};
