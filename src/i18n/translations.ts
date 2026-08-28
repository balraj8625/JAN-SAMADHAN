import { Language } from '../types';

export const translations = {
  // Top utility header
  govIndia: {
    en: 'Government of India | Public Grievance Service',
    hi: 'भारत सरकार | जन शिकायत सेवा',
    mr: 'भारत सरकार | सार्वजनिक तक्रार सेवा',
  },
  helplineLabel: {
    en: 'National Helpline: 1800-11-4000 (Toll Free)',
    hi: 'राष्ट्रीय हेल्पलाइन: 1800-11-4000 (टोल फ्री)',
    mr: 'राष्ट्रीय हेल्पलाइन: 1800-11-4000 (टोल फ्री)',
  },
  textSizeLabel: {
    en: 'Font Size:',
    hi: 'अक्षर का आकार:',
    mr: 'अक्षराचा आकार:',
  },

  // Brand Header
  brandTitle: {
    en: 'JAN SAMADHAN',
    hi: 'जन समाधान',
    mr: 'जन समाधान',
  },
  brandTagline: {
    en: 'Public Grievance Service | Government of India',
    hi: 'सार्वजनिक शिकायत निवारण सेवा | भारत सरकार',
    mr: 'सार्वजनिक तक्रार निवारण सेवा | भारत सरकार',
  },

  // Nav
  navHome: {
    en: 'Home',
    hi: 'मुख्य पृष्ठ',
    mr: 'मुख्य पृष्ठ',
  },
  navLodge: {
    en: 'Lodge a Grievance',
    hi: 'शिकायत दर्ज करें',
    mr: 'तक्रार नोंदवा',
  },
  navTrack: {
    en: 'Track Grievance',
    hi: 'शिकायत ट्रैक करें',
    mr: 'तक्रार ट्रॅक करा',
  },
  navMyGrievances: {
    en: 'My Grievances',
    hi: 'मेरी शिकायतें',
    mr: 'माझ्या तक्रारी',
  },
  navHelp: {
    en: 'Help & FAQs',
    hi: 'सहायता और प्रश्न',
    mr: 'मदत आणि प्रश्न',
  },
  navLogin: {
    en: 'Login',
    hi: 'लॉगिन',
    mr: 'लॉगिन',
  },
  navProfile: {
    en: 'My Profile',
    hi: 'मेरी प्रोफाइल',
    mr: 'माझी प्रोफाइल',
  },
  navLogout: {
    en: 'Logout',
    hi: 'लॉगआउट',
    mr: 'लॉगआउट',
  },

  // Back button
  backButton: {
    en: '← Back',
    hi: '← पीछे जाएं',
    mr: '← मागे जा',
  },

  // Home Page
  homeHeading: {
    en: 'Tell us what went wrong.',
    hi: 'बताएं कि क्या समस्या है।',
    mr: 'आपली काय अडचण आहे ते सांगा.',
  },
  homeSubheading: {
    en: "You don't need to know which government department handles it.",
    hi: 'आपको यह जानने की आवश्यकता नहीं है कि कौन सा सरकारी विभाग इसे संभालता है।',
    mr: 'ती कोणती शासकीय यंत्रणा हाताळते हे तुम्हाला माहित असण्याची गरज नाही.',
  },
  homeDesc: {
    en: 'Describe your issue in plain words in English, Hindi, or Marathi. Our intelligent service automatically connects your grievance to the right department with a guaranteed 21-day timeline.',
    hi: 'अपनी समस्या को हिंदी, मराठी या अंग्रेजी में सरल शब्दों में बताएं। हमारी बुद्धिमानी प्रणाली आपकी शिकायत को सही विभाग से जोड़ती है और 21 दिनों की गारंटीकृत समयसीमा प्रदान करती है।',
    mr: 'तुमची समस्या मराठी, हिंदी किंवा इंग्रजीमध्ये सोप्या शब्दांत सांगा. आमची सुलभ यंत्रणा तुमची तक्रार आपोआप योग्य विभागाकडे पाठवते आणि २१ दिवसांची निश्चित मुदत देते.',
  },
  btnLodgeGrievance: {
    en: 'Lodge a Grievance',
    hi: 'शिकायत दर्ज करें',
    mr: 'तक्रार नोंदवा',
  },
  btnTrackGrievance: {
    en: 'Track a Grievance',
    hi: 'शिकायत स्थिति देखें',
    mr: 'तक्रारीची स्थिती पहा',
  },
  quickTrackHeading: {
    en: 'Already filed a complaint? Track it now',
    hi: 'क्या आप पहले से शिकायत दर्ज कर चुके हैं? स्थिति जांचें',
    mr: 'आधीच तक्रार नोंदवली आहे का? आता ट्रॅक करा',
  },
  placeholderGrievanceId: {
    en: 'Enter 12-digit Grievance ID (e.g. JS-2025-88392)',
    hi: '12-अंकों की शिकायत आईडी दर्ज करें (जैसे JS-2025-88392)',
    mr: '१२-अंकी तक्रार आयडी टाका (उदा. JS-2025-88392)',
  },
  btnTrackNow: {
    en: 'Track Progress',
    hi: 'स्थिति देखें',
    mr: 'स्थिती पहा',
  },

  // How it works
  howItWorksHeading: {
    en: 'How Jan Samadhan Works for Citizens',
    hi: 'जन समाधान नागरिकों के लिए कैसे काम करता है',
    mr: 'जन समाधान नागरिकांसाठी कसे कार्य करते',
  },
  step1Title: {
    en: '1. Tell us your issue',
    hi: '1. समस्या बताएं',
    mr: '१. अडचण सांगा',
  },
  step1Desc: {
    en: 'Type or speak your problem in everyday language. Voice typing supported.',
    hi: 'अपनी समस्या को आम भाषा में लिखें या बोलें। वाॉइस टाइपिंग उपलब्ध है।',
    mr: 'तुमची अडचण सोप्या भाषेत लिहा किंवा बोला. व्हॉइस टायपिंग उपलब्ध आहे.',
  },
  step2Title: {
    en: '2. We understand',
    hi: '2. हम समझते हैं',
    mr: '२. आम्ही समजून घेतो',
  },
  step2Desc: {
    en: 'Smart categorization identifies the responsible department instantly.',
    hi: 'स्मार्ट वर्गीकरण तुरंत जिम्मेदार विभाग की पहचान करता है।',
    mr: 'स्मार्ट वर्गीकरण तत्काळ योग्य विभागाची ओळख पटवते.',
  },
  step3Title: {
    en: '3. You review',
    hi: '3. आप समीक्षा करें',
    mr: '३. आपण तपासणी करा',
  },
  step3Desc: {
    en: 'Fill 1-2 missing quick details and confirm your location before sending.',
    hi: 'भेजने से पहले 1-2 आवश्यक विवरण भरें और स्थान की पुष्टि करें।',
    mr: 'पाठवण्यापूर्वी १-२ आवश्यक माहिती भरा आणि ठिकाणाची खात्री करा.',
  },
  step4Title: {
    en: '4. Track progress',
    hi: '4. प्रगति ट्रैक करें',
    mr: '४. प्रगती ट्रॅक करा',
  },
  step4Desc: {
    en: 'Follow live 21-day timeline, get SMS updates, and rate final resolution.',
    hi: '21 दिनों की समयरेखा देखें, एसएमएस अपडेट प्राप्त करें और रेटिंग दें।',
    mr: '२१ दिवसांची लाइव्ह टाइमलाइन पहा, SMS अपडेट्स मिळवा आणि अभिप्राय द्या.',
  },

  // Citizen Guarantee Charter
  guaranteeTitle: {
    en: '21-Day Time-Bound Guarantee',
    hi: '21-दिवसीय समयबद्ध गारंटी',
    mr: '२१-दिवसांची वेळेत समाधानाची हमी',
  },
  guaranteeDesc: {
    en: 'Under the Public Services Guarantee Act, every grievance receives a nodal officer assignment within 48 hours and mandatory resolution or formal explanation within 21 days.',
    hi: 'लोक सेवा गारंटी अधिनियम के तहत, प्रत्येक शिकायत को 48 घंटे के भीतर नोडल अधिकारी आवंटित किया जाता है और 21 दिनों में अनिवार्य समाधान या स्पष्टीकरण दिया जाता है।',
    mr: 'लोकसेवा हक्क कायद्यानुसार, प्रत्येक तक्रारीला ४८ तासांच्या आत नोडल अधिकारी दिला जातो आणि २१ दिवसांत अनिवार्य निवारण किंवा स्पष्टीकरण दिले जाते.',
  },

  // Sample Grievances section
  sampleHeading: {
    en: 'Examples of everyday issues you can report',
    hi: 'दैनिक समस्याओं के उदाहरण जिन्हें आप दर्ज कर सकते हैं',
    mr: 'आपण नोंदवू शकता अशा दैनंदिन अडचणींची उदाहरणे',
  },
  sampleSub: {
    en: 'Click on any example below to pre-fill your grievance form:',
    hi: 'अपनी शिकायत फ़ॉर्म भरने के लिए नीचे दिए गए किसी भी उदाहरण पर क्लिक करें:',
    mr: 'आपला तक्रार अर्ज भरण्यासाठी खालील कोणत्याही उदाहरणावर क्लिक करा:',
  },

  // Step 1 Lodge Page
  lodgeStep1Header: {
    en: 'Step 1 of 4 — Tell us your problem',
    hi: 'चरण 1 / 4 — अपनी समस्या बताएं',
    mr: 'टप्पा १ / ४ — आपली समस्या सांगा',
  },
  problemInputLabel: {
    en: 'Describe what went wrong in plain words',
    hi: 'सरल शब्दों में बताएं कि क्या गलत हुआ',
    mr: 'काय अडचण झाली आहे ते सोप्या शब्दांत सांगा',
  },
  problemPlaceholder: {
    en: 'e.g. Drinking water pipe is broken near Ward 14 school and clean water is leaking on the road for last 4 days...',
    hi: 'जैसे: वार्ड 14 स्कूल के पास पीने के पानी का पाइप टूट गया है और पिछले 4 दिनों से साफ पानी बह रहा है...',
    mr: 'उदा. प्रभाग १४ शाळेजवळ पिण्याच्या पाण्याचा पाईप फुटला आहे आणि गेल्या ४ दिवसांपासून पाणी रस्त्यावर वाहत आहे...',
  },
  micButtonLabel: {
    en: 'Speak Your Complaint (Mic)',
    hi: 'बोलकर शिकायत दर्ज करें (माइक)',
    mr: 'बोलून तक्रार सांगा (माईक)',
  },
  recordingText: {
    en: 'Listening... Speak clearly in Hindi, Marathi, or English',
    hi: 'सुन रहे हैं... कृपया स्पष्ट रूप से बोलें',
    mr: 'ऐकत आहे... कृपया स्पष्ट बोला',
  },
  samplePromptsLabel: {
    en: 'Or pick a common template:',
    hi: 'या एक आम उदाहरण चुनें:',
    mr: 'किंवा एक सामान्य उदाहरण निवडा:',
  },
  locationHeading: {
    en: 'Where did this issue happen?',
    hi: 'यह समस्या कहाँ हुई?',
    mr: 'ही समस्या कुठे निर्माण झाली?',
  },
  stateLabel: {
    en: 'State / Region',
    hi: 'राज्य / क्षेत्र',
    mr: 'राज्य / क्षेत्र',
  },
  districtLabel: {
    en: 'District',
    hi: 'जिला',
    mr: 'जिल्हा',
  },
  blockWardLabel: {
    en: 'Tehsil / Ward / Village Name',
    hi: 'तहसील / वार्ड / गांव का नाम',
    mr: 'तालुका / प्रभाग / गावाचे नाव',
  },
  pincodeLabel: {
    en: 'Pincode',
    hi: 'पिनकोड',
    mr: 'पिनकोड',
  },
  landmarkLabel: {
    en: 'Street / House No. / Landmark',
    hi: 'गली / मकान नं. / लैंडमार्क',
    mr: 'गल्ली / घर क्र. / खुणेची जागा',
  },
  attachmentsHeading: {
    en: 'Upload Photo or Document (Optional)',
    hi: 'फ़ोटो या दस्तावेज अपलोड करें (वैकल्पिक)',
    mr: 'फोटो किंवा कागदपत्र अपलोड करा (ऐच्छिक)',
  },
  attachmentHelpText: {
    en: 'Photo of broken road, electricity bill, receipt, or notice (Max 5MB each, JPG/PNG/PDF)',
    hi: 'टूटी सड़क की तस्वीर, बिजली का बिल, रसीद (अधिकतम 5MB, JPG/PNG/PDF)',
    mr: 'खराब रस्त्याचा फोटो, विजेचे बिल, पावती (जास्तीत जास्त 5MB, JPG/PNG/PDF)',
  },
  btnNextStep: {
    en: 'Understand My Problem →',
    hi: 'मेरी शिकायत समझें →',
    mr: 'माझी तक्रार समजून घ्या →',
  },

  // Step 2 AI Understanding Page
  lodgeStep2Header: {
    en: 'Step 2 of 4 — We’ve understood your problem',
    hi: 'चरण 2 / 4 — हमने आपकी समस्या को समझ लिया है',
    mr: 'टप्पा २ / ४ — आम्ही आपली समस्या समजून घेतली आहे',
  },
  aiConfidenceBadge: {
    en: 'AI Department Match: High Confidence (96%)',
    hi: 'एआई विभाग मिलान: उच्च सटीकता (96%)',
    mr: 'AI विभाग जुळणी: उच्च अचूकता (९६%)',
  },
  identifiedDeptLabel: {
    en: 'Responsible Department Identified:',
    hi: 'पहचाना गया जिम्मेदार विभाग:',
    mr: 'ओळखलेला जबाबदार विभाग:',
  },
  changeDeptBtn: {
    en: 'Wrong department? Change manually',
    hi: 'गलत विभाग? स्वयं बदलें',
    mr: 'चुकीचा विभाग? स्वतः बदला',
  },
  aiSummaryLabel: {
    en: 'System Summary of Your Complaint:',
    hi: 'आपकी शिकायत का संक्षिप्त सारांश:',
    mr: 'आपल्या तक्रारीचा संक्षिप्त सारांश:',
  },
  categoryLabel: {
    en: 'Identified Category:',
    hi: 'पहचानी गई श्रेणी:',
    mr: 'ओळखलेली श्रेणी:',
  },
  urgencyLabel: {
    en: 'Estimated Priority Level:',
    hi: 'अनुमानित प्राथमिकता स्तर:',
    mr: 'अंदाज लावलेली प्राधान्य पातळी:',
  },
  btnConfirmAi: {
    en: 'Details Look Correct, Proceed →',
    hi: 'विवरण सही हैं, आगे बढ़ें →',
    mr: 'माहिती योग्य आहे, पुढे जा →',
  },

  // Step 3 Missing Details Page
  lodgeStep3Header: {
    en: 'Step 3 of 4 — Missing Details',
    hi: 'चरण 3 / 4 — आवश्यक अतिरिक्त जानकारी',
    mr: 'टप्पा ३ / ४ — आवश्यक अतिरिक्त माहिती',
  },
  missingDetailsSub: {
    en: 'Please provide these specific details so the department officer can act without delay.',
    hi: 'कृपया ये विशिष्ट विवरण प्रदान करें ताकि विभाग अधिकारी बिना देरी के कार्रवाई कर सके।',
    mr: 'कृपया ही विशिष्ट माहिती द्या जेणेकरून अधिकारी न घाबरता आणि विनाविलंब कारवाई करू शकतील.',
  },
  btnToReview: {
    en: 'Review Complaint →',
    hi: 'शिकायत की समीक्षा करें →',
    mr: 'तक्रार तपासा →',
  },

  // Step 4 Review Page
  lodgeStep4Header: {
    en: 'Step 4 of 4 — Review & Submit',
    hi: 'चरण 4 / 4 — समीक्षा और जमा करें',
    mr: 'टप्पा ४ / ४ — पाहणी करा आणि सबमिट करा',
  },
  reviewSubHeading: {
    en: 'Please review all information before final submission to the Government portal.',
    hi: 'सरकारी पोर्टल पर अंतिम रूप से भेजने से पहले सभी जानकारी की समीक्षा करें।',
    mr: 'शासकीय पोर्टलवर अंतिम सबमिट करण्यापूर्वी सर्व माहितीची खात्री करा.',
  },
  expectedTimelineTitle: {
    en: 'Expected Guaranteed Resolution:',
    hi: 'अपेक्षित गारंटीकृत निवारण तिथि:',
    mr: 'अपेक्षित हमीसह निवारण दिनांक:',
  },
  daysTimelineText: {
    en: '21 Days Standard Resolution Window (Citizen Charter)',
    hi: '21 दिन मानक निवारण अवधि (नागरिक अधिकार पत्र)',
    mr: '२१ दिवसांची मानक निवारण वेळ (नागरिक सनद)',
  },
  declarationCheckbox: {
    en: 'I hereby declare that the information provided is correct to the best of my knowledge and relates to a genuine public grievance.',
    hi: 'मैं एतद्द्वारा घोषणा करता/करती हूं कि प्रदान की गई जानकारी मेरी सर्वोत्तम जानकारी के अनुसार सही है और एक वास्तविक सार्वजनिक शिकायत से संबंधित है।',
    mr: 'मी याद्वारे घोषित करतो/करते की दिलेली माहिती माझ्या ज्ञानानुसार खरी आहे आणि ही एक खरी सार्वजनिक तक्रार आहे.',
  },
  btnSubmitGrievance: {
    en: 'Submit Grievance Now',
    hi: 'शिकायत जमा करें',
    mr: 'तक्रार सबमिट करा',
  },

  // Success Screen
  successHeader: {
    en: 'Grievance Submitted Successfully',
    hi: 'शिकायत सफलतापूर्वक दर्ज की गई',
    mr: 'तक्रार यशस्वीरीत्या नोंदवली गेली',
  },
  yourGrievanceIdIs: {
    en: 'Your Official Grievance ID is:',
    hi: 'आपकी आधिकारिक शिकायत आईडी है:',
    mr: 'तुमचा अधिकृत तक्रार आयडी आहे:',
  },
  smsAlertNotice: {
    en: 'An SMS confirmation with reference number has been sent to your registered mobile number.',
    hi: 'आपके पंजीकृत मोबाइल नंबर पर संदर्भ संख्या के साथ एक एसएमएस पुष्टि भेज दी गई है।',
    mr: 'तुमच्या नोंदणीकृत मोबाईल नंबरवर संदर्भ क्रमांकासह SMS पाठवण्यात आला आहे.',
  },
  btnTrackThisNow: {
    en: 'Track Progress Timeline',
    hi: 'समयरेखा स्थिति देखें',
    mr: 'प्रगती टाइमलाइन ट्रॅक करा',
  },
  btnDownloadReceipt: {
    en: 'Download Official Receipt (PDF)',
    hi: 'आधिकारिक रसीद डाउनलोड करें (PDF)',
    mr: 'अधिकृत पावती डाउनलोड करा (PDF)',
  },
  btnLodgeAnother: {
    en: 'Lodge Another Grievance',
    hi: 'दूसरी शिकायत दर्ज करें',
    mr: 'दूसरी तक्रार नोंदवा',
  },

  // My Grievances Page
  myGrievancesTitle: {
    en: 'My Grievances History',
    hi: 'मेरी शिकायतों का इतिहास',
    mr: 'माझ्या तक्रारींचा इतिहास',
  },
  myGrievancesSub: {
    en: 'Track and manage all public complaints registered with your account.',
    hi: 'अपने खाते में पंजीकृत सभी सार्वजनिक शिकायतों को ट्रैक और प्रबंधित करें।',
    mr: 'तुमच्या खात्यात नोंदवलेल्या सर्व सार्वजनिक तक्रारी ट्रॅक आणि व्यवस्थापित करा.',
  },
  filterAll: {
    en: 'All Complaints',
    hi: 'सभी शिकायतें',
    mr: 'सर्व तक्रारी',
  },
  filterActive: {
    en: 'In Progress',
    hi: 'प्रगति पर',
    mr: 'प्रगतीपथावर',
  },
  filterOverdue: {
    en: 'Overdue / Delayed',
    hi: 'विलंबित / अतिदेय',
    mr: 'विलंबाने / मुदत संपलेली',
  },
  filterResolved: {
    en: 'Resolved',
    hi: 'हल की गई',
    mr: 'निवारण झालेली',
  },

  // Tracking & Timeline Page
  trackingTitle: {
    en: 'Grievance Status & Resolution Tracker',
    hi: 'शिकायत स्थिति और निवारण ट्रैकर',
    mr: 'तक्रार स्थिती आणि निवारण ट्रॅकर',
  },
  officerDetailsTitle: {
    en: 'Assigned Public Nodal Officer:',
    hi: 'आवंटित लोक नोडल अधिकारी:',
    mr: 'नियुक्त लोक नोडल अधिकारी:',
  },
  officerPhone: {
    en: 'Official Phone:',
    hi: 'आधिकारिक फोन:',
    mr: 'अधिकृत फोन:',
  },
  targetDateLabel: {
    en: '21-Day Service Target Date:',
    hi: '21-दिवसीय लक्ष्य तिथि:',
    mr: '२१-दिवसांचे लक्ष्यांकित दिनांक:',
  },

  // Overdue / Delay
  overdueBadge: {
    en: 'ATTENTION: Grievance Exceeded 21 Days',
    hi: 'ध्यान दें: शिकायत 21 दिनों से अधिक पुरानी हो चुकी है',
    mr: 'लक्ष द्या: तक्रारीची २१ दिवसांची मुदत ओलांडली आहे',
  },
  overdueReasonHeader: {
    en: 'Official Department Notice for Delay:',
    hi: 'देरी के लिए आधिकारिक विभागीय सूचना:',
    mr: 'विलंबासाठी अधिकृत विभागीय कारण:',
  },
  btnEscalateAppeal: {
    en: 'Escalate / File First Appeal to Appellate Officer',
    hi: 'प्रथम अपील दायर करें / उच्च अधिकारी को भेजें',
    mr: 'प्रथम अपील दाखल करा / वरिष्ठ अधिकाऱ्यांकडे पाठवा',
  },

  // Feedback section
  feedbackHeader: {
    en: 'Was your problem actually solved?',
    hi: 'क्या आपकी समस्या वास्तव में हल हुई?',
    mr: 'आपली समस्या खरोखर सुटली का?',
  },
  optionYes: {
    en: 'Yes, fully solved',
    hi: 'हाँ, पूरी तरह हल हो गई',
    mr: 'होय, पूर्णपणे सुटली',
  },
  optionPartial: {
    en: 'Partially solved',
    hi: 'आंशिक रूप से हल हुई',
    mr: 'भागशः सुटली',
  },
  optionNo: {
    en: 'No, still unresolved',
    hi: 'नहीं, अभी भी समस्या है',
    mr: 'नाही, अजूनही सुटलेली नाही',
  },
  rateExperience: {
    en: 'Rate your satisfaction with the department response:',
    hi: 'विभागीय प्रतिक्रिया से अपनी संतुष्टि को आंकें:',
    mr: 'विभागाच्या प्रतिसादाबद्दल आपले मत नोंदवा:',
  },
  feedbackCommentLabel: {
    en: 'Additional comments (optional):',
    hi: 'अतिरिक्त टिप्पणी (वैकल्पिक):',
    mr: 'अतिरिक्त अभिप्राय (ऐच्छिक):',
  },
  btnSubmitFeedback: {
    en: 'Submit Feedback',
    hi: 'प्रतिक्रिया जमा करें',
    mr: 'अभिप्राय सबमिट करा',
  },
  feedbackSuccessMsg: {
    en: 'Thank you for your feedback! Your rating helps improve government public services.',
    hi: 'आपकी प्रतिक्रिया के लिए धन्यवाद! आपकी रेटिंग सरकारी सेवाओं को बेहतर बनाने में मदद करती है।',
    mr: 'तुमच्या अभिप्रायाबद्दल धन्यवाद! तुमचे मत सरकारी सेवा सुधारण्यास मदत करते.',
  },

  // Appeal Page
  appealHeader: {
    en: 'File First Appeal under Public Service Guarantee',
    hi: 'लोक सेवा गारंटी के तहत प्रथम अपील दायर करें',
    mr: 'लोकसेवा हक्क कायद्यांतर्गत प्रथम अपील दाखल करा',
  },
  appealSub: {
    en: 'If your complaint is delayed beyond 21 days or resolved unsatisfactorily, file an appeal to the Senior Appellate Officer.',
    hi: 'यदि आपकी शिकायत 21 दिनों से अधिक विलंबित है या असंतोषजनक रूप से हल की गई है, तो वरिष्ठ अपीलीय अधिकारी से अपील करें।',
    mr: 'आपली तक्रार २१ दिवसांपेक्षा जास्त लांबली असल्यास किंवा अयोग्यरित्या बंद केली असल्यास, वरिष्ठ अपील अधिकाऱ्यांकडे अपील करा.',
  },
  appealReasonLabel: {
    en: 'Reason for Appeal',
    hi: 'अपील का कारण',
    mr: 'अपील करण्याचे कारण',
  },
  reasonDelay: {
    en: 'Grievance delayed beyond mandatory 21-day period',
    hi: 'शिकायत अनिवार्य 21 दिन की अवधि से अधिक विलंबित',
    mr: 'तक्रार अनिवार्य २१ दिवसांच्या मुदतीपेक्षा जास्त लांबली',
  },
  reasonUnsatisfied: {
    en: 'Problem marked as solved but ground reality is unchanged',
    hi: 'समस्या हल के रूप में चिह्नित लेकिन धरातल पर स्थिति नहीं बदली',
    mr: 'समस्या सुटल्याचे दाखवले पण प्रत्यक्षात काम झालेले नाही',
  },
  reasonWrongAction: {
    en: 'Inadequate action taken by field officer',
    hi: 'क्षेत्रीय अधिकारी द्वारा अपर्याप्त कार्रवाई की गई',
    mr: 'क्षेत्रीय अधिकाऱ्यांकडून अपुरी कारवाई झाली',
  },
  appealRemarksLabel: {
    en: 'State your appeal arguments in detail',
    hi: 'अपने अपील के तर्क विस्तार से बताएं',
    mr: 'तुमचा अपील अर्ज आणि मुद्दे सविस्तर लिहा',
  },
  btnSubmitAppeal: {
    en: 'Submit Appeal to Senior Officer',
    hi: 'वरिष्ठ अधिकारी को अपील भेजें',
    mr: 'वरिष्ठ अधिकाऱ्यांकडे अपील सबमिट करा',
  },
  appealSuccessTitle: {
    en: 'Appeal Registered Successfully',
    hi: 'अपील सफलतापूर्वक दर्ज की गई',
    mr: 'अपील यशस्वीरीत्या नोंदवले गेले',
  },

  // Login Modal / Page
  loginHeading: {
    en: 'Citizen Login with Mobile Number',
    hi: 'मोबाइल नंबर के साथ नागरिक लॉगिन',
    mr: 'मोबाईल नंबरने नागरिक लॉगिन',
  },
  loginSub: {
    en: 'Enter your 10-digit mobile number to receive a one-time passcode (OTP)',
    hi: 'वन-टाइम पासकोड (ओटीपी) प्राप्त करने के लिए अपना 10-अंकों का मोबाइल नंबर दर्ज करें',
    mr: 'ओटीपी प्राप्त करण्यासाठी आपला १०-अंकी मोबाईल नंबर टाका',
  },
  mobileLabel: {
    en: 'Mobile Number',
    hi: 'मोबाइल नंबर',
    mr: 'मोबाईल नंबर',
  },
  btnSendOtp: {
    en: 'Send OTP',
    hi: 'ओटीपी भेजें',
    mr: 'OTP पाठवा',
  },
  enterOtpLabel: {
    en: 'Enter 4-Digit OTP',
    hi: '4-अंकों का ओटीपी दर्ज करें',
    mr: '४-अंकी OTP टाका',
  },
  otpHelpText: {
    en: 'Simulated OTP for demo: 1234',
    hi: 'प्रदर्शन के लिए सांकेतिक ओटीपी: 1234',
    mr: 'डेमोसाठी ओटीपी: 1234',
  },
  btnVerifyLogin: {
    en: 'Verify & Login',
    hi: 'सत्यापित करें और लॉगिन करें',
    mr: 'पडताळणी करा आणि लॉगिन करा',
  },

  // Status badges
  statusSubmitted: {
    en: 'Submitted',
    hi: 'दर्ज हुई',
    mr: 'नोंदवली',
  },
  statusUnderReview: {
    en: 'Nodal Officer Review',
    hi: 'नोडल अधिकारी समीक्षा',
    mr: 'नोडल अधिकारी पाहणी',
  },
  statusActionInProgress: {
    en: 'Action in Progress',
    hi: 'कार्रवाई जारी',
    mr: 'कार्रवाई सुरू',
  },
  statusResolved: {
    en: 'Resolved',
    hi: 'निवारण हुआ',
    mr: 'निवारण झाले',
  },
  statusOverdue: {
    en: 'Overdue (>21 Days)',
    hi: 'अतिदेय (>21 दिन)',
    mr: 'मुदत संपली (>२१ दिवस)',
  },
  statusAppealed: {
    en: 'Under First Appeal',
    hi: 'प्रथम अपील के तहत',
    mr: 'प्रथम अपिलात',
  },

  // Common UI elements
  or: {
    en: 'OR',
    hi: 'अथवा',
    mr: 'किंवा',
  },
  close: {
    en: 'Close',
    hi: 'बंद करें',
    mr: 'बंद करा',
  },
  required: {
    en: 'Required',
    hi: 'अनिवार्य',
    mr: 'आवश्यक',
  },
  optional: {
    en: 'Optional',
    hi: 'वैकल्पिक',
    mr: 'ऐच्छिक',
  },
  today: {
    en: 'Today',
    hi: 'आज',
    mr: 'आज',
  },
  viewDetails: {
    en: 'View Timeline Details',
    hi: 'समयरेखा विवरण देखें',
    mr: 'वेळापत्रक तपशील पहा',
  },
};

export function getTranslation(key: keyof typeof translations, lang: Language): string {
  const item = translations[key];
  if (!item) return key;
  return item[lang] || item['en'] || key;
}
