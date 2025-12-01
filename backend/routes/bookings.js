import express from 'express';
import {
  bookClass,
  cancelBooking,
  getUserBookings
} from '../controllers/bookingController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, bookClass);
router.patch('/:id/cancel', authMiddleware, cancelBooking);
router.get('/me', authMiddleware, getUserBookings);

export default router;