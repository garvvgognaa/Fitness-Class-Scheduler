import express from 'express';
import { createWorkoutPlan, getUserWorkoutPlans, getWorkoutPlan } from '../controllers/workoutController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createWorkoutPlan);
router.get('/me', authMiddleware, getUserWorkoutPlans);
router.get('/:id', authMiddleware, getWorkoutPlan);

export default router;