import prisma from '../config/database.js';
import { calculateDueDate, calculateSLA, shouldEscalate } from './slaService.js';

export interface CreateGrievanceInput {
  userId: string;
  title: string;
  description: string;
  departmentId: string;
  category: string;
  state: string;
  district: string;
}

export const generateGrievanceNumber = (): string => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `GRV${year}${randomNum}`;
};

export const createGrievance = async (data: CreateGrievanceInput) => {
  const grievanceNumber = generateGrievanceNumber();
  const submittedAt = new Date();
  const dueAt = calculateDueDate(submittedAt);

  const grievance = await prisma.grievance.create({
    data: {
      grievanceNumber,
      userId: data.userId,
      title: data.title,
      description: data.description,
      departmentId: data.departmentId,
      category: data.category,
      state: data.state,
      district: data.district,
      status: 'SUBMITTED',
      submittedAt,
      dueAt,
      events: {
        create: {
          status: 'SUBMITTED',
          messageEn: 'Grievance submitted successfully',
          messageHi: 'शिकायत सफलतापूर्वक जमा की गई',
          messageMr: 'तक्रार यशस्वीरित्या सबमिट केली'
        }
      }
    },
    include: {
      department: true,
      events: true
    }
  });

  return transformGrievance(grievance);
};

export const getUserGrievances = async (userId: string) => {
  const grievances = await prisma.grievance.findMany({
    where: { userId },
    include: {
      department: true,
      events: {
        orderBy: { createdAt: 'asc' }
      },
      feedback: true,
      appeal: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return grievances.map(transformGrievance);
};

export const getGrievanceById = async (grievanceId: string, userId: string) => {
  const grievance = await prisma.grievance.findFirst({
    where: {
      id: grievanceId,
      userId
    },
    include: {
      department: true,
      events: {
        orderBy: { createdAt: 'asc' }
      },
      attachments: true,
      feedback: true,
      appeal: true
    }
  });

  if (!grievance) {
    throw new Error('Grievance not found');
  }

  return transformGrievance(grievance);
};

export const getTimeline = async (grievanceId: string, userId: string) => {
  const grievance = await prisma.grievance.findFirst({
    where: {
      id: grievanceId,
      userId
    },
    include: {
      events: {
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!grievance) {
    throw new Error('Grievance not found');
  }

  return grievance.events.map(event => ({
    id: event.id,
    status: event.status,
    message: {
      en: event.messageEn,
      hi: event.messageHi,
      mr: event.messageMr
    },
    createdAt: event.createdAt
  }));
};

export const submitFeedback = async (grievanceId: string, userId: string, rating: number, comment?: string) => {
  const grievance = await prisma.grievance.findFirst({
    where: {
      id: grievanceId,
      userId
    }
  });

  if (!grievance) {
    throw new Error('Grievance not found');
  }

  if (grievance.feedback) {
    throw new Error('Feedback already submitted for this grievance');
  }

  const feedback = await prisma.feedback.create({
    data: {
      grievanceId,
      rating,
      comment
    }
  });

  return feedback;
};

export const submitAppeal = async (grievanceId: string, userId: string, reason: string, description: string) => {
  const grievance = await prisma.grievance.findFirst({
    where: {
      id: grievanceId,
      userId
    }
  });

  if (!grievance) {
    throw new Error('Grievance not found');
  }

  if (grievance.appeal) {
    throw new Error('Appeal already submitted for this grievance');
  }

  // Update grievance status to ESCALATED
  const [appeal] = await prisma.$transaction([
    prisma.appeal.create({
      data: {
        grievanceId,
        reason,
        description,
        status: 'PENDING'
      }
    }),
    prisma.grievance.update({
      where: { id: grievanceId },
      data: { status: 'ESCALATED' }
    })
  ]);

  // Add event to timeline
  await prisma.grievanceEvent.create({
    data: {
      grievanceId,
      status: 'APPEALED',
      messageEn: 'Grievance escalated - appeal submitted for review',
      messageHi: 'शिकायत बढ़ाई गई - अपील समीक्षा के लिए जमा की गई',
      messageMr: 'तक्रार वाढवली - पुनरावलोकनासाठी अपील सादर केली'
    }
  });

  return appeal;
};

export const getAppeal = async (grievanceId: string, userId: string) => {
  const grievance = await prisma.grievance.findFirst({
    where: {
      id: grievanceId,
      userId
    },
    include: {
      appeal: true
    }
  });

  if (!grievance) {
    throw new Error('Grievance not found');
  }

  return grievance.appeal;
};

export const checkEscalationRecommendation = async (grievanceId: string, userId: string) => {
  const grievance = await prisma.grievance.findFirst({
    where: {
      id: grievanceId,
      userId
    }
  });

  if (!grievance) {
    throw new Error('Grievance not found');
  }

  const slaResult = calculateSLA(grievance.submittedAt, grievance.dueAt, grievance.status);
  const shouldEsc = shouldEscalate(slaResult);

  return {
    recommendEscalation: shouldEsc,
    reason: shouldEsc 
      ? (slaResult.isOverdue ? 'Grievance is overdue' : 'Grievance approaching deadline')
      : 'Grievance is within SLA timeline',
    daysRemaining: slaResult.daysRemaining,
    isOverdue: slaResult.isOverdue
  };
};

const transformGrievance = (grievance: any) => {
  const slaResult = calculateSLA(grievance.submittedAt, grievance.dueAt, grievance.status);

  return {
    id: grievance.id,
    grievanceNumber: grievance.grievanceNumber,
    title: grievance.title,
    description: grievance.description,
    department: {
      id: grievance.department.id,
      name: {
        en: grievance.department.nameEn,
        hi: grievance.department.nameHi,
        mr: grievance.department.nameMr
      }
    },
    category: grievance.category,
    location: {
      state: grievance.state,
      district: grievance.district
    },
    status: grievance.status,
    submittedAt: grievance.submittedAt,
    dueAt: grievance.dueAt,
    resolution: grievance.resolution,
    timeline: grievance.events?.map((e: any) => ({
      status: e.status,
      message: {
        en: e.messageEn,
        hi: e.messageHi,
        mr: e.messageMr
      },
      createdAt: e.createdAt
    })) || [],
    sla: slaResult,
    feedback: grievance.feedback ? {
      rating: grievance.feedback.rating,
      comment: grievance.feedback.comment,
      submittedAt: grievance.feedback.createdAt
    } : null,
    appeal: grievance.appeal ? {
      appealId: grievance.appeal.id,
      reason: grievance.appeal.reason,
      description: grievance.appeal.description,
      status: grievance.appeal.status,
      createdAt: grievance.appeal.createdAt
    } : null,
    attachments: grievance.attachments?.map((a: any) => ({
      id: a.id,
      fileName: a.fileName,
      fileType: a.fileType,
      fileUrl: a.fileUrl,
      createdAt: a.createdAt
    })) || []
  };
};
