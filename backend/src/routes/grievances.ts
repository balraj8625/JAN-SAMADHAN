import { Router } from 'express';
import {
  createGrievance,
  getUserGrievances,
  getGrievanceById,
  getTimeline,
  submitFeedback,
  submitAppeal,
  getAppeal,
  checkEscalationRecommendation
} from '../services/grievanceService.js';
import { validateRequest } from '../middleware/validation.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { createGrievanceSchema, feedbackSchema, appealSchema } from '../utils/validators.js';

const router = Router();

// All grievance routes require authentication
router.use(authenticate);

// POST /api/grievances - Create new grievance
router.post('/', validateRequest(createGrievanceSchema), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const grievance = await createGrievance({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Grievance submitted successfully',
      data: grievance
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create grievance'
    });
  }
});

// GET /api/grievances - Get all grievances for current user
router.get('/', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const grievances = await getUserGrievances(req.user.id);
    res.json({
      success: true,
      data: grievances
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch grievances'
    });
  }
});

// GET /api/grievances/:id - Get single grievance by ID
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const grievanceId = req.params.id as string;
    
    const grievance = await getGrievanceById(grievanceId, req.user!.id);
    res.json({
      success: true,
      data: grievance
    });
  } catch (error: any) {
    if (error.message === 'Grievance not found') {
      res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch grievance'
      });
    }
  }
});

// GET /api/grievances/:id/timeline - Get timeline for grievance
router.get('/:id/timeline', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const grievanceId = req.params.id as string;
    const timeline = await getTimeline(grievanceId, req.user!.id);
    res.json({
      success: true,
      data: timeline
    });
  } catch (error: any) {
    if (error.message === 'Grievance not found') {
      res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch timeline'
      });
    }
  }
});

// POST /api/grievances/:id/feedback - Submit feedback for grievance
router.post('/:id/feedback', validateRequest(feedbackSchema), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const grievanceId = req.params.id as string;
    const { rating, comment } = req.body;
    const feedback = await submitFeedback(grievanceId, req.user!.id, rating, comment);
    
    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback
    });
  } catch (error: any) {
    if (error.message === 'Grievance not found') {
      res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
    } else if (error.message === 'Feedback already submitted for this grievance') {
      res.status(409).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to submit feedback'
      });
    }
  }
});

// POST /api/grievances/:id/appeal - Submit appeal for grievance
router.post('/:id/appeal', validateRequest(appealSchema), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const grievanceId = req.params.id as string;
    const { reason, description } = req.body;
    const appeal = await submitAppeal(grievanceId, req.user!.id, reason, description);
    
    res.status(201).json({
      success: true,
      message: 'Appeal submitted successfully',
      data: appeal
    });
  } catch (error: any) {
    if (error.message === 'Grievance not found') {
      res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
    } else if (error.message === 'Appeal already submitted for this grievance') {
      res.status(409).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to submit appeal'
      });
    }
  }
});

// GET /api/grievances/:id/appeal - Get appeal status for grievance
router.get('/:id/appeal', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const grievanceId = req.params.id as string;
    const appeal = await getAppeal(grievanceId, req.user!.id);
    
    if (!appeal) {
      res.json({
        success: true,
        data: null,
        message: 'No appeal found for this grievance'
      });
    } else {
      res.json({
        success: true,
        data: appeal
      });
    }
  } catch (error: any) {
    if (error.message === 'Grievance not found') {
      res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch appeal'
      });
    }
  }
});

// GET /api/grievances/:id/escalation-check - Check if escalation is recommended
router.get('/:id/escalation-check', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const grievanceId = req.params.id as string;
    const result = await checkEscalationRecommendation(grievanceId, req.user!.id);
    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    if (error.message === 'Grievance not found') {
      res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to check escalation'
      });
    }
  }
});

export default router;
