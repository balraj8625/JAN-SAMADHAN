import { Router } from 'express';
import { analyzeGrievanceText, generateGrievanceDraft, explainResponse } from '../services/aiService.js';
import { validateRequest } from '../middleware/validation.js';
import { aiAnalyzeSchema } from '../utils/validators.js';

const router = Router();

// POST /api/ai/analyze - Analyze grievance text
router.post('/analyze', validateRequest(aiAnalyzeSchema), async (req, res) => {
  try {
    const { text } = req.body;
    const result = analyzeGrievanceText(text);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze text'
    });
  }
});

// POST /api/ai/generate-grievance - Generate grievance draft
router.post('/generate-grievance', async (req, res) => {
  try {
    const { keywords } = req.body;
    
    if (!Array.isArray(keywords) || keywords.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Keywords array is required'
      });
      return;
    }

    const result = generateGrievanceDraft(keywords);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate grievance draft'
    });
  }
});

// POST /api/ai/explain-response - Explain government response
router.post('/explain-response', async (req, res) => {
  try {
    const { responseText } = req.body;
    
    if (!responseText || typeof responseText !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Response text is required'
      });
      return;
    }

    const result = explainResponse(responseText);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to explain response'
    });
  }
});

export default router;
