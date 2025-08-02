import { Router } from 'express';
import { createEventHandler } from '../controllers/eventController';
import { validateAuth } from '../middlewares/authMiddleware';

const router = Router();

router.post('/events', validateAuth, createEventHandler);

export default router;
