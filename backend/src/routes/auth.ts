import { Router } from 'express';
import { register, login, verifyOTP, getCurrentUser } from '../services/authService.js';
import { validateRequest } from '../middleware/validation.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { registerSchema, loginSchema, verifyOTPSchema } from '../utils/validators.js';

const router = Router();

// POST /api/auth/register
router.post('/register', validateRequest(registerSchema), async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: user
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
});

// POST /api/auth/login
router.post('/login', validateRequest(loginSchema), async (req, res) => {
  try {
    const result = await login(req.body);
    res.json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || 'Login failed'
    });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', validateRequest(verifyOTPSchema), async (req, res) => {
  try {
    const result = await verifyOTP(req.body.mobile, req.body.otp);
    res.json({
      success: true,
      message: 'OTP verified successfully',
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'OTP verification failed'
    });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    const user = await getCurrentUser(req.user.id);
    res.json({
      success: true,
      data: user
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User not found'
    });
  }
});

export default router;
