export const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
export const PORT = parseInt(process.env.PORT || '3001', 10);
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
export const NODE_ENV = process.env.NODE_ENV || 'development';

// SLA Settings (in days)
export const SLA_RESOLUTION_DAYS = 21;
