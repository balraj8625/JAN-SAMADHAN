import prisma from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRY } from '../config/env.js';
import { calculateDueDate } from './slaService.js';

export interface RegisterInput {
  name: string;
  mobile: string;
  email?: string;
  preferredLanguage?: string;
  password?: string;
}

export interface LoginInput {
  mobile: string;
  password?: string;
  otp?: string;
}

export const register = async (data: RegisterInput) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { mobile: data.mobile },
        { email: data.email || '' }
      ]
    }
  });

  if (existingUser) {
    throw new Error('User with this mobile or email already exists');
  }

  let passwordHash: string | null = null;
  if (data.password) {
    passwordHash = await bcrypt.hash(data.password, 10);
  }

  const user = await prisma.user.create({
    data: {
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      passwordHash,
      preferredLanguage: data.preferredLanguage || 'en'
    }
  });

  return {
    id: user.id,
    name: user.name,
    mobile: user.mobile,
    email: user.email,
    preferredLanguage: user.preferredLanguage
  };
};

export const login = async (data: LoginInput) => {
  // For prototype, we support both password and OTP-style login
  // In production, OTP would be sent via SMS
  
  const user = await prisma.user.findUnique({
    where: { mobile: data.mobile }
  });

  if (!user) {
    throw new Error('User not found. Please register first.');
  }

  // If password is provided, verify it
  if (data.password && user.passwordHash) {
    const validPassword = await bcrypt.compare(data.password, user.passwordHash);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }
  }
  // If OTP is provided (mocked), accept any 4-6 digit OTP for prototype
  else if (data.otp) {
    // Mock OTP verification - in production, verify with SMS provider
    if (!/^\d{4,6}$/.test(data.otp)) {
      throw new Error('Invalid OTP format');
    }
  }
  // For demo purposes, allow login without password/otp if user exists
  // This should be disabled in production

  const token = jwt.sign(
    {
      id: user.id,
      mobile: user.mobile,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      preferredLanguage: user.preferredLanguage
    }
  };
};

export const verifyOTP = async (mobile: string, otp: string) => {
  // Mock OTP verification
  // In production, this would verify against stored OTP with expiry
  
  const user = await prisma.user.findUnique({
    where: { mobile }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Mock: accept any valid OTP format
  if (!/^\d{4,6}$/.test(otp)) {
    throw new Error('Invalid OTP');
  }

  const token = jwt.sign(
    {
      id: user.id,
      mobile: user.mobile,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      preferredLanguage: user.preferredLanguage
    }
  };
};

export const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      mobile: true,
      email: true,
      preferredLanguage: true,
      createdAt: true
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
