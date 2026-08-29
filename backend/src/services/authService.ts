import prisma from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DEMO_AUTH_ENABLED, JWT_EXPIRY, JWT_SECRET } from '../config/env.js';

export interface RegisterInput { name: string; mobile: string; email?: string; preferredLanguage?: string; password: string; }
export interface LoginInput { mobile: string; password?: string; otp?: string; }
const publicUser = (user: { id: string; name: string; mobile: string; email: string | null; preferredLanguage: string }) => ({ id: user.id, name: user.name, mobile: user.mobile, email: user.email, preferredLanguage: user.preferredLanguage });
const issueToken = (user: { id: string; mobile: string; name: string }) => jwt.sign({ id: user.id, mobile: user.mobile, name: user.name }, JWT_SECRET, { expiresIn: JWT_EXPIRY as jwt.SignOptions['expiresIn'] });

export const register = async (data: RegisterInput) => {
  const email = data.email || undefined;
  const existing = await prisma.user.findFirst({ where: { OR: [{ mobile: data.mobile }, ...(email ? [{ email }] : [])] } });
  if (existing) throw new Error('User with this mobile or email already exists');
  const user = await prisma.user.create({ data: { name: data.name, mobile: data.mobile, email, passwordHash: await bcrypt.hash(data.password, 12), preferredLanguage: data.preferredLanguage ?? 'en' } });
  return publicUser(user);
};

export const login = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({ where: { mobile: data.mobile } });
  if (!user) throw new Error('Invalid credentials');
  if (data.password) {
    if (!user.passwordHash || !(await bcrypt.compare(data.password, user.passwordHash))) throw new Error('Invalid credentials');
  } else if (data.otp) {
    if (!DEMO_AUTH_ENABLED) throw new Error('Demo OTP authentication is disabled');
  } else throw new Error('Password or OTP is required');
  return { token: issueToken(user), user: publicUser(user) };
};

export const verifyOTP = async (mobile: string, otp: string) => {
  if (!DEMO_AUTH_ENABLED) throw new Error('Demo OTP authentication is disabled');
  if (!/^\d{4,6}$/.test(otp)) throw new Error('Invalid OTP');
  const user = await prisma.user.findUnique({ where: { mobile } });
  if (!user) throw new Error('User not found');
  return { token: issueToken(user), user: publicUser(user) };
};
export const getCurrentUser = async (userId: string) => { const user = await prisma.user.findUnique({ where: { id: userId } }); if (!user) throw new Error('User not found'); return publicUser(user); };
