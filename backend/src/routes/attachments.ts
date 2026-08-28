import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import prisma from '../config/database.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Configure multer for file uploads
const uploadDir = process.env.UPLOAD_DIR || './uploads';

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept common document and image formats
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images and documents are allowed'));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE_MB || '5') * 1024 * 1024 // Convert MB to bytes
  },
  fileFilter
});

// All attachment routes require authentication
router.use(authenticate);

// POST /api/grievances/:id/attachments - Upload attachment
router.post('/:id/attachments', upload.single('file'), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const grievanceId = req.params.id;
    
    // Verify grievance ownership
    const grievance = await prisma.grievance.findFirst({
      where: {
        id: grievanceId,
        userId: req.user.id
      }
    });

    if (!grievance) {
      res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
      return;
    }

    const attachment = await prisma.attachment.create({
      data: {
        grievanceId,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileUrl: `/uploads/${req.file.filename}`
      }
    });

    res.status(201).json({
      success: true,
      message: 'Attachment uploaded successfully',
      data: attachment
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload attachment'
    });
  }
});

// GET /api/grievances/:id/attachments - Get all attachments for grievance
router.get('/:id/attachments', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const grievanceId = req.params.id;

    // Verify grievance ownership
    const grievance = await prisma.grievance.findFirst({
      where: {
        id: grievanceId,
        userId: req.user.id
      }
    });

    if (!grievance) {
      res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
      return;
    }

    const attachments = await prisma.attachment.findMany({
      where: { grievanceId }
    });

    res.json({
      success: true,
      data: attachments
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch attachments'
    });
  }
});

export default router;
