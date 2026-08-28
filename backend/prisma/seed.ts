import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const departments = [
  {
    nameEn: 'Education / Scholarship',
    nameHi: 'शिक्षा / छात्रवृत्ति',
    nameMr: 'शिक्षण / शिष्यवृत्ती',
    category: 'EDUCATION'
  },
  {
    nameEn: 'EPFO (Employees Provident Fund)',
    nameHi: 'ईपीएफओ (कर्मचारी भविष्य निधि)',
    nameMr: 'ईपीएफओ (कर्मचारी भविष्य निधी)',
    category: 'LABOUR'
  },
  {
    nameEn: 'Railways',
    nameHi: 'रेलवे',
    nameMr: 'रेल्वे',
    category: 'TRANSPORT'
  },
  {
    nameEn: 'Municipal Services',
    nameHi: 'नगरपालिका सेवाएं',
    nameMr: 'नगरपालिका सेवा',
    category: 'MUNICIPAL'
  },
  {
    nameEn: 'Food, Civil Supplies & Consumer Protection',
    nameHi: 'खाद्य, नागरिक आपूर्ति और उपभोक्ता संरक्षण',
    nameMr: 'अन्न, नागरी पुरवठा आणि ग्राहक संरक्षण',
    category: 'FOOD_SUPPLIES'
  },
  {
    nameEn: 'Electricity / Power Department',
    nameHi: 'बिजली / विद्युत विभाग',
    nameMr: 'वीज / वीज विभाग',
    category: 'ENERGY'
  },
  {
    nameEn: 'Water Supply & Sanitation',
    nameHi: 'जल आपूर्ति और स्वच्छता',
    nameMr: 'पाणी पुरवठा आणि स्वच्छता',
    category: 'WATER'
  },
  {
    nameEn: 'Health & Family Welfare',
    nameHi: 'स्वास्थ्य और परिवार कल्याण',
    nameMr: 'आरोग्य आणि कुटुंब कल्याण',
    category: 'HEALTH'
  },
  {
    nameEn: 'Roads & Transport',
    nameHi: 'सड़क और परिवहन',
    nameMr: 'रस्ते आणि वाहतूक',
    category: 'TRANSPORT'
  },
  {
    nameEn: 'Housing & Urban Development',
    nameHi: 'आवास और शहरी विकास',
    nameMr: 'निवास आणि शहरी विकास',
    category: 'HOUSING'
  },
  {
    nameEn: 'Agriculture & Farmers Welfare',
    nameHi: 'कृषि और किसान कल्याण',
    nameMr: 'कृषी आणि शेतकरी कल्याण',
    category: 'AGRICULTURE'
  }
];

const demoUsers = [
  {
    name: 'Rajesh Kumar',
    mobile: '9876543210',
    email: 'rajesh@example.com',
    preferredLanguage: 'en'
  },
  {
    name: 'Priya Sharma',
    mobile: '9876543211',
    email: 'priya@example.com',
    preferredLanguage: 'hi'
  },
  {
    name: 'Amit Patil',
    mobile: '9876543212',
    email: 'amit@example.com',
    preferredLanguage: 'mr'
  }
];

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Departments
  console.log('📁 Creating departments...');
  for (const dept of departments) {
    await prisma.department.upsert({
      where: { id: dept.category.toLowerCase() + '_dept' },
      update: {},
      create: {
        id: dept.category.toLowerCase() + '_dept',
        ...dept
      }
    });
  }

  // Seed Demo Users with hashed password
  console.log('👤 Creating demo users...');
  const hashedPassword = await bcrypt.hash('demo123', 10);
  
  for (const user of demoUsers) {
    await prisma.user.upsert({
      where: { mobile: user.mobile },
      update: {},
      create: {
        ...user,
        passwordHash: hashedPassword
      }
    });
  }

  // Get first department and user for demo grievances
  const firstDept = await prisma.department.findFirst();
  const firstUser = await prisma.user.findFirst();

  if (firstDept && firstUser) {
    console.log('📝 Creating demo grievances...');

    const now = new Date();
    const pastDate = new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000); // 25 days ago
    const recentDate = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000); // 10 days ago

    // Overdue grievance
    const overdueGrievance = await prisma.grievance.create({
      data: {
        grievanceNumber: generateGrievanceNumber(),
        userId: firstUser.id,
        title: 'Scholarship not received for 3 months',
        description: 'I have applied for scholarship but have not received it for the last 3 months. Application was submitted in June.',
        departmentId: firstDept.id,
        category: 'Payment Delay',
        state: 'Maharashtra',
        district: 'Mumbai',
        status: 'OVERDUE',
        submittedAt: pastDate,
        dueAt: new Date(pastDate.getTime() + 21 * 24 * 60 * 60 * 1000),
        events: {
          create: [
            {
              status: 'SUBMITTED',
              messageEn: 'Grievance submitted successfully',
              messageHi: 'शिकायत सफलतापूर्वक जमा की गई',
              messageMr: 'तक्रार यशस्वीरित्या सबमिट केली',
              createdAt: pastDate
            },
            {
              status: 'RECEIVED',
              messageEn: 'Grievance received by department',
              messageHi: 'शिकायत विभाग द्वारा प्राप्त की गई',
              messageMr: 'तक्रार विभागाकडून प्राप्त झाली',
              createdAt: new Date(pastDate.getTime() + 2 * 24 * 60 * 60 * 1000)
            },
            {
              status: 'UNDER_REVIEW',
              messageEn: 'Grievance under review',
              messageHi: 'शिकायत समीक्षा के तहत',
              messageMr: 'तक्रार पुनरावलोकनांतर्गत',
              createdAt: new Date(pastDate.getTime() + 5 * 24 * 60 * 60 * 1000)
            },
            {
              status: 'OVERDUE',
              messageEn: 'Grievance overdue - escalated for priority handling',
              messageHi: 'शिकायत समय सीमा से अधिक - प्राथमिकता के साथ निपटाया जाएगा',
              messageMr: 'तक्रार मुदत संपली - प्राधान्याने हाताळली जाईल',
              createdAt: new Date(pastDate.getTime() + 22 * 24 * 60 * 60 * 1000)
            }
          ]
        }
      }
    });

    // Recent grievance
    const recentGrievance = await prisma.grievance.create({
      data: {
        grievanceNumber: generateGrievanceNumber(),
        userId: firstUser.id,
        title: 'Street light not working',
        description: 'Street light in front of my house is not working for the last 10 days. Request to fix it urgently.',
        departmentId: firstDept.id,
        category: 'Infrastructure',
        state: 'Maharashtra',
        district: 'Pune',
        status: 'UNDER_REVIEW',
        submittedAt: recentDate,
        dueAt: new Date(recentDate.getTime() + 21 * 24 * 60 * 60 * 1000),
        events: {
          create: [
            {
              status: 'SUBMITTED',
              messageEn: 'Grievance submitted successfully',
              messageHi: 'शिकायत सफलतापूर्वक जमा की गई',
              messageMr: 'तक्रार यशस्वीरित्या सबमिट केली',
              createdAt: recentDate
            },
            {
              status: 'RECEIVED',
              messageEn: 'Grievance received by municipal office',
              messageHi: 'शिकायत नगरपालिका कार्यालय द्वारा प्राप्त की गई',
              messageMr: 'तक्रार नगरपालिका कार्यालयाकडून प्राप्त झाली',
              createdAt: new Date(recentDate.getTime() + 1 * 24 * 60 * 60 * 1000)
            },
            {
              status: 'UNDER_REVIEW',
              messageEn: 'Grievance assigned to field officer',
              messageHi: 'शिकायत क्षेत्र अधिकारी को सौंपी गई',
              messageMr: 'तक्रार क्षेत्रीय अधिकाऱ्यांकडे सोपवली',
              createdAt: new Date(recentDate.getTime() + 3 * 24 * 60 * 60 * 1000)
            }
          ]
        }
      }
    });

    // Add feedback to resolved grievance example
    console.log('✅ Demo grievances created!');
  }

  console.log('✅ Database seeded successfully!');
}

function generateGrievanceNumber(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `GRV${year}${randomNum}`;
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
