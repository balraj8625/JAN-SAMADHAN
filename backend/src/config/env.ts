import dotenv from 'dotenv';
dotenv.config();

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} must be set`);
  return value;
};
const positiveInteger = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
};

export const NODE_ENV = process.env.NODE_ENV ?? 'development';
export const JWT_SECRET = required('JWT_SECRET');
export const JWT_EXPIRY = process.env.JWT_EXPIRY ?? '7d';
export const PORT = positiveInteger(process.env.PORT, 3001);
export const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';
export const MAX_FILE_SIZE_MB = positiveInteger(process.env.MAX_FILE_SIZE_MB, 5);
export const UPLOAD_DIR = process.env.UPLOAD_DIR ?? './uploads';
export const DEMO_AUTH_ENABLED = NODE_ENV !== 'production' && process.env.DEMO_AUTH_ENABLED === 'true';
export const SLA_RESOLUTION_DAYS = 21;
