import { SLA_RESOLUTION_DAYS } from '../config/env.js';

export interface SLAResult {
  submittedAt: Date;
  dueAt: Date;
  daysElapsed: number;
  daysRemaining: number;
  isOverdue: boolean;
  status: string;
}

export const calculateSLA = (submittedAt: Date, dueAt: Date, status: string): SLAResult => {
  const now = new Date();
  const submitted = new Date(submittedAt);
  const due = new Date(dueAt);

  const elapsedMs = now.getTime() - submitted.getTime();
  const daysElapsed = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));

  const remainingMs = due.getTime() - now.getTime();
  const daysRemaining = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));

  // A grievance is overdue if current date is past dueAt AND status is not RESOLVED
  const isOverdue = now > due && status !== 'RESOLVED';

  return {
    submittedAt: submitted,
    dueAt: due,
    daysElapsed,
    daysRemaining: Math.max(0, daysRemaining),
    isOverdue,
    status
  };
};

export const calculateDueDate = (submittedAt: Date): Date => {
  const due = new Date(submittedAt);
  due.setDate(due.getDate() + SLA_RESOLUTION_DAYS);
  return due;
};

export const shouldEscalate = (slaResult: SLAResult): boolean => {
  // Recommend escalation if overdue or very close to deadline
  return slaResult.isOverdue || slaResult.daysRemaining <= 3;
};
