import { Router } from 'express';
import { checkEscalationRecommendation, ConflictError, createGrievance, getAppeal, getGrievanceById, getGrievanceByNumber, getTimeline, getUserGrievances, NotFoundError, submitAppeal, submitFeedback, ValidationError } from '../services/grievanceService.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { appealSchema, createGrievanceSchema, feedbackSchema } from '../utils/validators.js';
const router = Router(); router.use(authenticate);
const fail = (res: any, error: unknown) => { const message = error instanceof Error ? error.message : 'Request failed'; const status = error instanceof NotFoundError ? 404 : error instanceof ConflictError ? 409 : error instanceof ValidationError ? 400 : 500; res.status(status).json({ success: false, message: status === 500 ? 'Internal server error' : message }); };
const userId = (req: AuthRequest) => req.user!.id;
router.post('/', validateRequest(createGrievanceSchema), async (req: AuthRequest, res) => { try { res.status(201).json({ success: true, data: await createGrievance({ ...req.body, userId: userId(req) }), message: 'Grievance submitted successfully' }); } catch (error) { fail(res, error); } });
router.get('/', async (req: AuthRequest, res) => { try { res.json({ success: true, data: await getUserGrievances(userId(req)), message: 'Grievances retrieved successfully' }); } catch (error) { fail(res, error); } });
// This must precede /:id so the public reference is not treated as an internal UUID.
router.get('/number/:grievanceNumber', async (req: AuthRequest, res) => { try { res.json({ success: true, data: await getGrievanceByNumber(String(req.params.grievanceNumber), userId(req)), message: 'Grievance retrieved successfully' }); } catch (error) { fail(res, error); } });
router.get('/:id', async (req: AuthRequest, res) => { try { res.json({ success: true, data: await getGrievanceById(String(req.params.id), userId(req)), message: 'Grievance retrieved successfully' }); } catch (error) { fail(res, error); } });
router.get('/:id/timeline', async (req: AuthRequest, res) => { try { res.json({ success: true, data: await getTimeline(String(req.params.id), userId(req)), message: 'Timeline retrieved successfully' }); } catch (error) { fail(res, error); } });
router.post('/:id/feedback', validateRequest(feedbackSchema), async (req: AuthRequest, res) => { try { res.status(201).json({ success: true, data: await submitFeedback(String(req.params.id), userId(req), req.body.rating, req.body.comment), message: 'Feedback submitted successfully' }); } catch (error) { fail(res, error); } });
router.post('/:id/appeal', validateRequest(appealSchema), async (req: AuthRequest, res) => { try { res.status(201).json({ success: true, data: await submitAppeal(String(req.params.id), userId(req), req.body.reason, req.body.description), message: 'Appeal submitted successfully' }); } catch (error) { fail(res, error); } });
router.get('/:id/appeal', async (req: AuthRequest, res) => { try { res.json({ success: true, data: await getAppeal(String(req.params.id), userId(req)), message: 'Appeal retrieved successfully' }); } catch (error) { fail(res, error); } });
router.get('/:id/escalation-check', async (req: AuthRequest, res) => { try { res.json({ success: true, data: await checkEscalationRecommendation(String(req.params.id), userId(req)), message: 'Escalation recommendation calculated' }); } catch (error) { fail(res, error); } });
export default router;
