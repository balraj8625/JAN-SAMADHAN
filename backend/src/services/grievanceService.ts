import { GrievanceStatus, Prisma } from '@prisma/client';
import crypto from 'crypto';
import prisma from '../config/database.js';
import { calculateDueDate, calculateSLA, isClosedForCitizen, shouldEscalate } from './slaService.js';

export interface CreateGrievanceInput { userId: string; title: string; description: string; departmentId: string; category: string; state: string; district: string; }
class NotFoundError extends Error { }
class ConflictError extends Error { }
class ValidationError extends Error { }
export { NotFoundError, ConflictError, ValidationError };
const include = { department: true, events: { orderBy: { createdAt: 'asc' as const } }, attachments: true, feedback: true, appeal: true };
type FullGrievance = Prisma.GrievanceGetPayload<{ include: typeof include }>;
const number = () => `GRV${new Date().getFullYear()}${crypto.randomInt(100000, 1000000)}`;

export const createGrievance = async (data: CreateGrievanceInput) => {
  const department = await prisma.department.findUnique({ where: { id: data.departmentId }, select: { id: true } });
  if (!department) throw new ValidationError('Unknown department ID');
  const submittedAt = new Date(); const dueAt = calculateDueDate(submittedAt);
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      const grievance = await prisma.grievance.create({ data: { ...data, grievanceNumber: number(), submittedAt, dueAt, status: GrievanceStatus.SUBMITTED, events: { create: { status: 'SUBMITTED', messageEn: 'Grievance submitted successfully', messageHi: 'शिकायत सफलतापूर्वक जमा की गई', messageMr: 'तक्रार यशस्वीरित्या सबमिट केली' } } }, include });
      return transformGrievance(grievance);
    } catch (error) { if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2002') throw error; }
  }
  throw new ConflictError('Could not allocate a unique grievance number; please retry');
};
export const getUserGrievances = async (userId: string) => (await prisma.grievance.findMany({ where: { userId }, include, orderBy: { createdAt: 'desc' } })).map(transformGrievance);
const owned = async (id: string, userId: string) => { const item = await prisma.grievance.findFirst({ where: { id, userId }, include }); if (!item) throw new NotFoundError('Grievance not found'); return item; };
export const getGrievanceById = async (id: string, userId: string) => transformGrievance(await owned(id, userId));
export const getGrievanceByNumber = async (grievanceNumber: string, userId: string) => { const item = await prisma.grievance.findFirst({ where: { grievanceNumber: grievanceNumber.toUpperCase(), userId }, include }); if (!item) throw new NotFoundError('Grievance not found'); return transformGrievance(item); };
export const getTimeline = async (id: string, userId: string) => (await owned(id, userId)).events.map(event => ({ id: event.id, status: event.status, message: { en: event.messageEn, hi: event.messageHi, mr: event.messageMr }, createdAt: event.createdAt }));
export const submitFeedback = async (id: string, userId: string, rating: number, comment?: string) => {
  const grievance = await owned(id, userId);
  if (!isClosedForCitizen(grievance.status)) throw new ValidationError('Feedback is available only after a grievance is resolved or closed');
  if (grievance.feedback) throw new ConflictError('Feedback already submitted for this grievance');
  try { return await prisma.feedback.create({ data: { grievanceId: id, rating, comment } }); } catch (error) { if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new ConflictError('Feedback already submitted for this grievance'); throw error; }
};
export const submitAppeal = async (id: string, userId: string, reason: string, description: string) => {
  const grievance = await owned(id, userId);
  if (!isClosedForCitizen(grievance.status)) throw new ValidationError('An appeal is available only after a grievance is resolved or closed');
  if (grievance.appeal) throw new ConflictError('Appeal already submitted for this grievance');
  try { return await prisma.$transaction(async tx => { const appeal = await tx.appeal.create({ data: { grievanceId: id, reason, description } }); await tx.grievance.update({ where: { id }, data: { status: GrievanceStatus.ESCALATED, events: { create: { status: 'APPEALED', messageEn: 'Appeal submitted for review', messageHi: 'अपील समीक्षा के लिए जमा की गई', messageMr: 'पुनरावलोकनासाठी अपील सादर केली' } } } }); return appeal; }); } catch (error) { if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new ConflictError('Appeal already submitted for this grievance'); throw error; }
};
export const getAppeal = async (id: string, userId: string) => (await owned(id, userId)).appeal;
export const checkEscalationRecommendation = async (id: string, userId: string) => { const grievance = await owned(id, userId); const sla = calculateSLA(grievance.submittedAt, grievance.dueAt, grievance.status); const recommendEscalation = shouldEscalate(sla); return { recommendEscalation, reason: recommendEscalation ? (sla.isOverdue ? 'Grievance is overdue' : 'Grievance is approaching its SLA deadline') : 'No escalation recommendation', ...sla }; };
const transformGrievance = (g: FullGrievance) => ({ id: g.id, grievanceNumber: g.grievanceNumber, title: g.title, description: g.description, department: { id: g.department.id, name: { en: g.department.nameEn, hi: g.department.nameHi, mr: g.department.nameMr } }, category: g.category, location: { state: g.state, district: g.district }, status: g.status, submittedAt: g.submittedAt, dueAt: g.dueAt, resolution: g.resolution, timeline: g.events.map(e => ({ status: e.status, message: { en: e.messageEn, hi: e.messageHi, mr: e.messageMr }, createdAt: e.createdAt })), sla: calculateSLA(g.submittedAt, g.dueAt, g.status), feedback: g.feedback, appeal: g.appeal, attachments: g.attachments.map(a => ({ id: a.id, fileName: a.fileName, fileType: a.fileType, downloadUrl: `/api/grievances/${g.id}/attachments/${a.id}/download`, createdAt: a.createdAt })) });
