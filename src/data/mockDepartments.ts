import { Department } from '../types';

export const mockDepartments: Department[] = [
  {
    id: 'water_supply_dept',
    name: {
      en: 'Department of Water Supply & Sanitation',
      hi: 'जल आपूर्ति एवं स्वच्छता विभाग',
      mr: 'पाणी पुरवठा व स्वच्छता विभाग',
    },
    iconName: 'Droplet',
    commonIssues: [
      {
        en: 'Water pipeline leak on street or near residence',
        hi: 'सड़क या घर के पास पानी की पाइपलाइन में रिसाव',
        mr: 'रस्त्यावर किंवा घराजवळ पिण्याच्या पाण्याचा पाईप फुटला',
      },
      {
        en: 'Dirty or contaminated tap water supply',
        hi: 'गंदा या दूषित नल के पानी की आपूर्ति',
        mr: 'गढूळ किंवा दूषित पाण्याचा पुरवठा',
      },
      {
        en: 'No drinking water supply for last 3+ days',
        hi: 'पिछले 3 दिनों से पीने का पानी नहीं आ रहा है',
        mr: 'गेल्या ३ दिवसांपासून पाणी येत नाही',
      },
      {
        en: 'Inaccurate or excessive water meter bill charging',
        hi: 'पानी के मीटर का गलत या अत्यधिक बिल',
        mr: 'पाण्याच्या मीटरचे चुकीचे किंवा जास्त बिल',
      },
    ],
    requiredFields: [
      {
        key: 'consumerNo',
        label: {
          en: 'Water Connection Consumer Number (if available)',
          hi: 'जल कनेक्शन ग्राहक संख्या (यदि उपलब्ध हो)',
          mr: 'पाणी कनेक्शन ग्राहक क्रमांक (उपलब्ध असल्यास)',
        },
        placeholder: {
          en: 'e.g. WTR-994821',
          hi: 'जैसे WTR-994821',
          mr: 'उदा. WTR-994821',
        },
        required: false,
      },
      {
        key: 'duration',
        label: {
          en: 'Since how many days is this water problem occurring?',
          hi: 'यह पानी की समस्या कितने दिनों से हो रही है?',
          mr: 'पाण्याची ही अडचण किती दिवसांपासून आहे?',
        },
        placeholder: {
          en: 'e.g. 4 days',
          hi: 'जैसे 4 दिन',
          mr: 'उदा. ४ दिवस',
        },
        required: true,
      },
    ],
  },
  {
    id: 'food_supply_dept',
    name: {
      en: 'Food, Civil Supplies & Consumer Protection',
      hi: 'खाद्य, नागरिक आपूर्ति और उपभोक्ता संरक्षण',
      mr: 'अन्न, नागरी पुरवठा आणि ग्राहक संरक्षण',
    },
    iconName: 'ShoppingBag',
    commonIssues: [
      {
        en: 'Fair Price Shop owner charging higher price than government rate',
        hi: 'राशन डीलर सरकारी दर से अधिक कीमत वसूल रहा है',
        mr: 'रेशन दुकानदार शासकीय दरापेक्षा जास्त पैसे मागत आहे',
      },
      {
        en: 'Ration shop denied giving full quota of grain or rice',
        hi: 'राशन दुकान ने गेहूं/चावल का पूरा कोटा देने से मना किया',
        mr: 'रेशन दुकानाने पूर्ण अन्नधान्य देण्यास नकार दिला',
      },
      {
        en: 'Ration shop remains closed during official distribution hours',
        hi: 'सरकारी वितरण समय के दौरान राशन की दुकान बंद रहती है',
        mr: 'अधिकृत वेळेत रेशन दुकान बंद असते',
      },
      {
        en: 'Ration Card error or name addition delay',
        hi: 'राशन कार्ड में नाम जोड़ने में देरी या त्रुटि',
        mr: 'रेशन कार्डवर नाव जोडण्यात विलंब',
      },
    ],
    requiredFields: [
      {
        key: 'rationCardNo',
        label: {
          en: 'Ration Card Number / Smart Card ID',
          hi: 'राशन कार्ड नंबर / स्मार्ट कार्ड आईडी',
          mr: 'रेशन कार्ड क्रमांक / स्मार्ट कार्ड आयडी',
        },
        placeholder: {
          en: 'e.g. RC-2704-8831',
          hi: 'जैसे RC-2704-8831',
          mr: 'उदा. RC-2704-8831',
        },
        required: true,
      },
      {
        key: 'shopNo',
        label: {
          en: 'Fair Price Shop Number or Dealer Name',
          hi: 'राशन दुकान नंबर या डीलर का नाम',
          mr: 'रेशन दुकान क्रमांक किंवा दुकानदाराचे नाव',
        },
        placeholder: {
          en: 'e.g. FPS Shop No. 42 / Shri Vijay Stores',
          hi: 'जैसे दुकान नं. 42',
          mr: 'उदा. दुकान क्र. ४२',
        },
        required: true,
      },
    ],
  },
  {
    id: 'roads_dept',
    name: {
      en: 'Roads & Transport',
      hi: 'सड़क और परिवहन',
      mr: 'रस्ते आणि वाहतूक',
    },
    iconName: 'Construction',
    commonIssues: [
      {
        en: 'Dangerous deep potholes on main public road causing accidents',
        hi: 'मुख्य सड़क पर गहरे गड्ढे जिससे दुर्घटना की आशंका है',
        mr: 'मुख्य रस्त्यावर धोकादायक खड्डे पडले आहेत',
      },
      {
        en: 'Street light not functioning at night on main road',
        hi: 'मुख्य सड़क पर रात में स्ट्रीट लाइट बंद है',
        mr: 'मुख्य रस्त्यावरील पथदिवे बंद आहेत',
      },
      {
        en: 'Broken drainage slab or dangerous open manhole',
        hi: 'टूटा हुआ गटर स्लैब या खुला मैनहोल',
        mr: 'उघडे मॅनहोल किंवा गटाराचे तुटलेले झाकण',
      },
    ],
    requiredFields: [
      {
        key: 'exactRoadName',
        label: {
          en: 'Exact Road Name / Nearby Landmark',
          hi: 'सटीक सड़क का नाम / निकटतम लैंडमार्क',
          mr: 'रस्त्याचे नाव / जवळील प्रसिद्ध ठिकाण',
        },
        placeholder: {
          en: 'e.g. MG Road, Near Government Hospital Circle',
          hi: 'जैसे एमजी रोड, अस्पताल के पास',
          mr: 'उदा. एमजी रोड, शासकीय रुग्णालयाजवळ',
        },
        required: true,
      },
    ],
  },
  {
    id: 'electricity_dept',
    name: {
      en: 'Electricity / Power Department',
      hi: 'बिजली / विद्युत विभाग',
      mr: 'वीज / वीज विभाग',
    },
    iconName: 'Zap',
    commonIssues: [
      {
        en: 'Frequent unannounced power outages in area',
        hi: 'क्षेत्र में बिना पूर्व सूचना के बार-बार बिजली कटौती',
        mr: 'अचानक व सतत खंडित होणारा वीजपुरवठा',
      },
      {
        en: 'Sparking electricity transformer or hanging dangerous wires',
        hi: 'ट्रांसफॉर्मर में चिंगारी या नीचे लटकते बिजली के तार',
        mr: 'रोहित्रात (ट्रान्सफॉर्मर) ठिणग्या किंवा लोंबकळणाऱ्या धोकादायक तारा',
      },
      {
        en: 'Faulty electric meter showing abnormally high units',
        hi: 'खराब बिजली मीटर जो अत्यधिक रीडिंग दिखा रहा है',
        mr: 'फॉल्टी वीज मीटर आणि अवाजवी बिल',
      },
    ],
    requiredFields: [
      {
        key: 'electricityConsumerNo',
        label: {
          en: 'Electricity Bill Consumer No. (12 digits)',
          hi: 'बिजली बिल ग्राहक संख्या (12 अंक)',
          mr: 'वीज बिल ग्राहक क्रमांक (१२ अंक)',
        },
        placeholder: {
          en: 'e.g. 019283746512',
          hi: 'जैसे 019283746512',
          mr: 'उदा. ०१९२८३७४६५१२',
        },
        required: true,
      },
    ],
  },
  {
    id: 'education_dept',
    name: {
      en: 'Education / Scholarship',
      hi: 'शिक्षा / छात्रवृत्ति',
      mr: 'शिक्षण / शिष्यवृत्ती',
    },
    iconName: 'GraduationCap',
    commonIssues: [
      {
        en: 'Scholarship amount not credited for current academic year',
        hi: 'वर्तमान शैक्षणिक वर्ष के लिए छात्रवृत्ति राशि जमा नहीं हुई',
        mr: 'चालू शैक्षणिक वर्षाची शिष्यवृत्ती जमा झालेली नाही',
      },
      {
        en: 'Delay in admission verification or document approval',
        hi: 'प्रवेश सत्यापन या दस्तावेज अनुमोदन में देरी',
        mr: 'प्रवेश पडताळणी किंवा कागदपत्र मंजुरीत विलंब',
      },
      {
        en: 'Lack of drinking water or basic infrastructure in government school',
        hi: 'सरकारी स्कूल में पीने के पानी या बुनियादी ढांचे का अभाव',
        mr: 'शासकीय शाळेत पिण्याचे पाणी किंवा पायाभूत सुविधांचा अभाव',
      },
    ],
    requiredFields: [
      {
        key: 'applicationNumber',
        label: {
          en: 'Scholarship Application / Registration Number',
          hi: 'छात्रवृत्ति आवेदन / पंजीकरण संख्या',
          mr: 'शिष्यवृत्ती अर्ज / नोंदणी क्रमांक',
        },
        placeholder: {
          en: 'e.g. SCH-2025-99120',
          hi: 'जैसे SCH-2025-99120',
          mr: 'उदा. SCH-2025-99120',
        },
        required: true,
      },
      {
        key: 'institutionName',
        label: {
          en: 'School / College / Institute Name',
          hi: 'स्कूल / कॉलेज / संस्थान का नाम',
          mr: 'शाळा / महाविद्यालय / संस्थेचे नाव',
        },
        placeholder: {
          en: 'e.g. Government Polytechnic College',
          hi: 'जैसे गवर्नमेंट पॉलिटेक्निक कॉलेज',
          mr: 'उदा. शासकीय तंत्रनिकेतन महाविद्यालय',
        },
        required: true,
      },
    ],
  },
  {
    id: 'epfo_dept',
    name: {
      en: 'EPFO (Employees Provident Fund)',
      hi: 'ईपीएफओ (कर्मचारी भविष्य निधि)',
      mr: 'ईपीएफओ (कर्मचारी भविष्य निधी)',
    },
    iconName: 'HeartHandshake',
    commonIssues: [
      {
        en: 'EPF withdrawal claim pending for more than 20 days',
        hi: 'ईपीएफ निकासी दावा 20 दिनों से अधिक समय से लंबित है',
        mr: 'ईपीएफ रक्कम काढण्याचा दावा २० दिवसांपेक्षा जास्त काळ प्रलंबित',
      },
      {
        en: 'Employer not depositing monthly PF contribution',
        hi: 'नियोक्ता द्वारा मासिक पीएफ अंशदान जमा नहीं किया जा रहा है',
        mr: 'मालक/कंपनी दरमहा पीएफ रक्कम खात्यात भरत नाही',
      },
      {
        en: 'UAN passbook not updating or KYC rejection without valid reason',
        hi: 'यूएएन पासबुक अपडेट न होना या बिना कारण केवाईसी खारिज होना',
        mr: 'यूएएन पासबुक अपडेट न होणे किंवा केवायसी नाकारणे',
      },
    ],
    requiredFields: [
      {
        key: 'uanNumber',
        label: {
          en: 'Universal Account Number (UAN - 12 digits)',
          hi: 'सार्वभौमिक खाता संख्या (UAN - 12 अंक)',
          mr: 'युनिव्हर्सल खाते क्रमांक (UAN - १२ अंक)',
        },
        placeholder: {
          en: 'e.g. 100912345678',
          hi: 'जैसे 100912345678',
          mr: 'उदा. १००९१२३४५६७८',
        },
        required: true,
      },
      {
        key: 'establishmentId',
        label: {
          en: 'Employer / Establishment Code (if available)',
          hi: 'प्रतिष्ठान / कंपनी कोड (यदि उपलब्ध हो)',
          mr: 'कंपनी / आस्थापना कोड (उपलब्ध असल्यास)',
        },
        placeholder: {
          en: 'e.g. MH/PUN/0012345/000',
          hi: 'जैसे MH/PUN/0012345/000',
          mr: 'उदा. MH/PUN/0012345/000',
        },
        required: false,
      },
    ],
  },
  {
    id: 'railways_dept',
    name: {
      en: 'Railways',
      hi: 'रेलवे',
      mr: 'रेल्वे',
    },
    iconName: 'Train',
    commonIssues: [
      {
        en: 'Ticket cancellation refund not credited to bank account',
        hi: 'टिकट रद्दीकरण रिफंड बैंक खाते में जमा नहीं हुआ',
        mr: 'तिकीट रद्द केल्याचा परतावा बँक खात्यात मिळाला नाही',
      },
      {
        en: 'Poor hygiene or water scarcity in train coach',
        hi: 'ट्रेन कोच में अस्वच्छता या पानी की कमी',
        mr: 'रेल्वे डब्यात अस्वच्छता किंवा पाण्याची टंचाई',
      },
      {
        en: 'Harassment or overcharging by pantry car staff',
        hi: 'पैंट्री कार कर्मचारियों द्वारा अधिक शुल्क वसूली',
        mr: 'पँट्री कर्मचाऱ्यांकडून जादा दर आकारणी',
      },
    ],
    requiredFields: [
      {
        key: 'pnrNumber',
        label: {
          en: '10-Digit Railway PNR Number',
          hi: '10 अंकों का रेलवे PNR नंबर',
          mr: '१० अंकी रेल्वे PNR क्रमांक',
        },
        placeholder: {
          en: 'e.g. 8421098765',
          hi: 'जैसे 8421098765',
          mr: 'उदा. ८४२१०९८७६५',
        },
        required: true,
      },
      {
        key: 'trainNumber',
        label: {
          en: 'Train Name or Number',
          hi: 'ट्रेन का नाम या नंबर',
          mr: 'गाडीचे नाव किंवा क्रमांक',
        },
        placeholder: {
          en: 'e.g. 12128 Pune Mumbai Intercity',
          hi: 'जैसे 12128 पुणे मुंबई इंटरसिटी',
          mr: 'उदा. १२१२८ पुणे मुंबई इंटरसिटी',
        },
        required: false,
      },
    ],
  },
  {
    id: 'municipal_dept',
    name: {
      en: 'Municipal Services',
      hi: 'नगरपालिका सेवाएं',
      mr: 'नगरपालिका सेवा',
    },
    iconName: 'Building2',
    commonIssues: [
      {
        en: 'Garbage not collected from residential area for 3+ days',
        hi: 'आवासीय क्षेत्र से 3 दिनों से अधिक समय से कचरा नहीं उठाया गया',
        mr: 'निवासी भागातून गेल्या ३ दिवसांपासून कचरा उचलला नाही',
      },
      {
        en: 'Open sewage drain overflowing on street',
        hi: 'सड़क पर खुले गटर का पानी बह रहा है',
        mr: 'रस्त्यावर गटाराचे पाणी तुंबून वाहत आहे',
      },
      {
        en: 'Stray animal menace in neighborhood',
        hi: 'मोहल्ले में आवारा पशुओं का आतंक',
        mr: 'परिसरात भटक्या जनावरांचा त्रास',
      },
    ],
    requiredFields: [
      {
        key: 'wardNumber',
        label: {
          en: 'Ward / Zone Number',
          hi: 'वार्ड / जोन संख्या',
          mr: 'प्रभाग / वॉर्ड क्रमांक',
        },
        placeholder: {
          en: 'e.g. Ward No. 18, Zone B',
          hi: 'जैसे वार्ड नं. 18',
          mr: 'उदा. प्रभाग क्र. १८',
        },
        required: true,
      },
      {
        key: 'localityAddress',
        label: {
          en: 'Exact Locality / Street Address',
          hi: 'सटीक मोहल्ला / सड़क का पता',
          mr: 'तपशीलवार परिसर / रस्त्याचा पत्ता',
        },
        placeholder: {
          en: 'e.g. Sector 4, Near Community Hall',
          hi: 'जैसे सेक्टर 4, कम्युनिटी हॉल के पास',
          mr: 'उदा. सेक्टर ४, समाज मंदिराशेजारी',
        },
        required: true,
      },
    ],
  },
  {
    id: 'health_dept',
    name: {
      en: 'Health & Family Welfare',
      hi: 'स्वास्थ्य और परिवार कल्याण',
      mr: 'आरोग्य आणि कुटुंब कल्याण',
    },
    iconName: 'HeartPulse',
    commonIssues: [
      {
        en: 'Essential medicines not available at Primary Health Center (PHC)',
        hi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) में आवश्यक दवाएं उपलब्ध नहीं हैं',
        mr: 'प्राथमिक आरोग्य केंद्रात (PHC) आवश्यक औषधे उपलब्ध नाहीत',
      },
      {
        en: 'Doctor or medical staff absent during emergency duty hours',
        hi: 'आपातकालीन ड्यूटी समय के दौरान डॉक्टर या चिकित्सा कर्मचारी अनुपस्थित',
        mr: 'तातडीच्या सेवेच्या वेळी वैद्यकीय अधिकारी गैरहजर',
      },
      {
        en: 'Ayushman Bharat / PMJAY card denied by empanelled hospital',
        hi: 'सूचीबद्ध अस्पताल द्वारा आयुष्मान भारत कार्ड से इलाज से इनकार',
        mr: 'नोंदणीकृत रुग्णालयाने आयुष्मान भारत योजनेतून उपचार नाकारले',
      },
    ],
    requiredFields: [
      {
        key: 'hospitalName',
        label: {
          en: 'Hospital / Primary Health Center (PHC) Name',
          hi: 'अस्पताल / प्राथमिक स्वास्थ्य केंद्र (PHC) का नाम',
          mr: 'रुग्णालय / प्राथमिक आरोग्य केंद्राचे नाव',
        },
        placeholder: {
          en: 'e.g. District Civil Hospital',
          hi: 'जैसे जिला नागरिक अस्पताल',
          mr: 'उदा. जिल्हा शासकीय रुग्णालय',
        },
        required: true,
      },
      {
        key: 'treatmentDate',
        label: {
          en: 'Date of Visit / Admission',
          hi: 'भ्रमण / भर्ती की तिथि',
          mr: 'भेटीची / उपचाराची तारीख',
        },
        placeholder: {
          en: 'e.g. DD/MM/YYYY',
          hi: 'जैसे DD/MM/YYYY',
          mr: 'उदा. DD/MM/YYYY',
        },
        required: false,
      },
    ],
  },
  {
    id: 'housing_dept',
    name: {
      en: 'Housing & Urban Development',
      hi: 'आवास और शहरी विकास',
      mr: 'निवास और शहरी विकास',
    },
    iconName: 'Home',
    commonIssues: [
      {
        en: 'PMAY housing scheme subsidy installment delayed',
        hi: 'पीएम आवास योजना की सब्सिडी किस्त में देरी',
        mr: 'प्रधानमंत्री आवास योजनेचा (PMAY) अनुदान हप्ता प्रलंबित',
      },
      {
        en: 'Delay in physical possession of allotted government housing unit',
        hi: 'आवंटित सरकारी आवास का भौतिक कब्जा मिलने में देरी',
        mr: 'मंजूर शासकीय घराचा ताबा मिळण्यास विलंब',
      },
    ],
    requiredFields: [
      {
        key: 'pmayApplicationNo',
        label: {
          en: 'PMAY Application / Registration Number',
          hi: 'PMAY आवेदन / पंजीकरण संख्या',
          mr: 'PMAY अर्ज / नोंदणी क्रमांक',
        },
        placeholder: {
          en: 'e.g. PMAY-MH-2024-8831',
          hi: 'जैसे PMAY-MH-2024-8831',
          mr: 'उदा. PMAY-MH-2024-8831',
        },
        required: true,
      },
    ],
  },
  {
    id: 'agriculture_dept',
    name: {
      en: 'Agriculture & Farmers Welfare',
      hi: 'कृषि और किसान कल्याण',
      mr: 'कृषी आणि शेतकरी कल्याण',
    },
    iconName: 'Sprout',
    commonIssues: [
      {
        en: 'PM-KISAN installment not credited despite active KYC',
        hi: 'सक्रिय केवाईसी के बावजूद पीएम-किसान किस्त जमा नहीं हुई',
        mr: 'केवायसी पूर्ण असूनही पीएम-किसानचा हप्ता खात्यात जमा झाला नाही',
      },
      {
        en: 'Crop insurance claim (PMFBY) compensation delayed after survey',
        hi: 'सर्वेक्षण के बाद फसल बीमा दावा (PMFBY) मुआवजा लंबित है',
        mr: 'पंचनामा होऊनही पीक विमा (PMFBY) भरपाई प्रलंबित',
      },
      {
        en: 'Non-availability of subsidized certified seeds or fertilizer',
        hi: 'सब्सिडी वाले प्रमाणित बीज या उर्वरक की अनुपलब्धता',
        mr: 'अनुदानित खते किंवा बियाणे उपलब्ध नसणे',
      },
    ],
    requiredFields: [
      {
        key: 'farmerAadhaarOrId',
        label: {
          en: 'Farmer Registration ID / Aadhaar Last 4 Digits',
          hi: 'किसान पंजीकरण आईडी / आधार के अंतिम 4 अंक',
          mr: 'शेतकरी नोंदणी आयडी / आधार शेवटचे ४ अंक',
        },
        placeholder: {
          en: 'e.g. MH-AGRI-8821 or 4432',
          hi: 'जैसे MH-AGRI-8821 या 4432',
          mr: 'उदा. MH-AGRI-8821 किंवा ४४३२',
        },
        required: true,
      },
    ],
  },
];

