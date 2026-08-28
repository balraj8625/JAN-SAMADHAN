import { GrievanceStatus } from '@prisma/client';
import { SLA_RESOLUTION_DAYS } from '../config/env.js';

export interface SLAResult { submittedAt: Date; dueAt: Date; daysElapsed: number; daysRemaining: number; isOverdue: boolean; status: GrievanceStatus; }
const DAY = 24 * 60 * 60 * 1000;
const terminal = new Set<GrievanceStatus>([GrievanceStatus.RESOLVED, GrievanceStatus.CLOSED]);

export const calculateDueDate = (submittedAt: Date): Date => {
  const due = new Date(submittedAt);
  due.setDate(due.getDate() + SLA_RESOLUTION_DAYS);
  return due;
};
export const calculateSLA = (submittedAt: Date, dueAt: Date, status: GrievanceStatus, now = new Date()): SLAResult => {
  const submitted = new Date(submittedAt); const due = new Date(dueAt);
  const daysElapsed = Math.max(0, Math.floor((now.getTime() - submitted.getTime()) / DAY));
  const daysRemaining = Math.max(0, Math.ceil((due.getTime() - now.getTime()) / DAY));
  return { submittedAt: submitted, dueAt: due, daysElapsed, daysRemaining, isOverdue: !terminal.has(status) && now > due, status };
};
export const shouldEscalate = (sla: SLAResult): boolean => !terminal.has(sla.status) && (sla.isOverdue || sla.daysRemaining <= 3);
export const isClosedForCitizen = (status: GrievanceStatus): boolean => terminal.has(status);
