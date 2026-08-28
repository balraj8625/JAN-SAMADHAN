import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid mobile number (must be 10 digits starting with 6-9)'),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  preferredLanguage: z.enum(['en', 'hi', 'mr']).optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional()
});

export const loginSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  password: z.string().optional(),
  otp: z.string().regex(/^\d{4,6}$/, 'OTP must be 4-6 digits').optional()
});

export const verifyOTPSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  otp: z.string().regex(/^\d{4,6}$/, 'OTP must be 4-6 digits')
});

export const createGrievanceSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  departmentId: z.string().uuid('Invalid department ID'),
  category: z.string().min(2, 'Category is required'),
  state: z.string().min(2, 'State is required'),
  district: z.string().min(2, 'District is required')
});

export const feedbackSchema = z.object({
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().max(500, 'Comment must not exceed 500 characters').optional()
});

export const appealSchema = z.object({
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters')
});

export const aiAnalyzeSchema = z.object({
  text: z.string().min(10, 'Text must be at least 10 characters for analysis')
});
