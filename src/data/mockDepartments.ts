import { Department } from '../types';

export const mockDepartments: Department[] = [
  {
    id: 'water-supply',
    name: {
      en: 'Department of Water Supply & Sanitation',
      hi: 'जल आपूर्ति एवं स्वच्छता विभाग',
      mr: 'पानी पुरवठा व स्वच्छता विभाग',
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
    id: 'ration-pds',
    name: {
      en: 'Department of Food, Civil Supplies & Consumer Affairs',
      hi: 'खाद्य, नागरिक आपूर्ति एवं उपभोक्ता मामले विभाग',
      mr: 'अन्न, नागरी पुरवठा व ग्राहक संरक्षण विभाग',
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
    id: 'roads-pwd',
    name: {
      en: 'Public Works Department (PWD) & Municipal Roads',
      hi: 'लोक निर्माण विभाग (PWD) एवं नगर मार्ग',
      mr: 'सार्वजनिक बांधकाम विभाग (PWD) व रस्ते',
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
    id: 'pension-social-welfare',
    name: {
      en: 'Department of Social Justice & Pension Services',
      hi: 'सामाजिक न्याय एवं पेंशन कल्याण विभाग',
      mr: 'सामाजिक न्याय व निवृत्तीवेतन विभाग',
    },
    iconName: 'HeartHandshake',
    commonIssues: [
      {
        en: 'Old age pension / Widow pension not credited for last 3 months',
        hi: 'वृद्धावस्था पेंशन / विधवा पेंशन पिछले 3 महीनों से जमा नहीं हुई',
        mr: 'श्रावणबाळ / श्रावण बाळ किंवा वृद्धपकाळ निवृत्तीवेतन ३ महिने मिळाले नाही',
      },
      {
        en: 'Disability support allowance application pending',
        hi: 'दिव्यांग सहायता भत्ता आवेदन लंबित है',
        mr: 'दिव्यांग भत्ता अर्ज प्रलंबित आहे',
      },
    ],
    requiredFields: [
      {
        key: 'pensionApplicationNo',
        label: {
          en: 'Pension Sanction ID / Application Ref No.',
          hi: 'पेंशन स्वीकृति आईडी / आवेदन संदर्भ संख्या',
          mr: 'निवृत्तीवेतन अर्ज / मंजुरी क्रमांक',
        },
        placeholder: {
          en: 'e.g. PEN-SOC-8820',
          hi: 'जैसे PEN-SOC-8820',
          mr: 'उदा. PEN-SOC-8820',
        },
        required: true,
      },
      {
        key: 'pensionType',
        label: {
          en: 'Type of Pension Scheme',
          hi: 'पेंशन योजना का प्रकार',
          mr: 'योजनेचा प्रकार',
        },
        placeholder: {
          en: 'e.g. Indira Gandhi National Old Age Pension Scheme',
          hi: 'जैसे इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन',
          mr: 'उदा. श्रावणबाळ योजना / वृद्धपकाळ वेतन',
        },
        required: true,
      },
    ],
  },
  {
    id: 'electricity-discom',
    name: {
      en: 'State Electricity Distribution Corporation (DISCOM)',
      hi: 'राज्य विद्युत वितरण निगम (डिस्कॉम)',
      mr: 'राज्य वीज वितरण कंपनी (MSEDCL / MSEB)',
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
];
