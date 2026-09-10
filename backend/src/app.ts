import './config/env.js';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { FRONTEND_URL, NODE_ENV } from './config/env.js';
import prisma from './config/database.js';
import authRoutes from './routes/auth.js';
import grievanceRoutes from './routes/grievances.js';
import departmentRoutes from './routes/departments.js';
import aiRoutes from './routes/ai.js';
import attachmentRoutes from './routes/attachments.js';

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health and readiness check endpoint
app.get('/health', async (_req, res) => {
  let dbStatus = 'unknown';
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'connected';
  } catch {
    dbStatus = 'disconnected';
  }

  res.json({
    success: dbStatus === 'connected',
    data: {
      status: 'ok',
      database: dbStatus,
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
    },
    message: 'JAN-SAMADHAN API is running',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/grievances', attachmentRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.code === 'LIMIT_FILE_SIZE' ? 'File exceeds the configured size limit' : 'Invalid upload',
    });
  }

  const status = err?.status ?? 500;
  const message =
    status === 500 && NODE_ENV === 'production'
      ? 'Internal server error'
      : err?.message || 'Internal server error';

  return res.status(status).json({
    success: false,
    message,
  });
});

export default app;
