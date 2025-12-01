import express from 'express';
import {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass
} from '../controllers/classController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getClasses);
router.get('/:id', getClass);
router.post('/', authMiddleware, adminMiddleware, createClass);
router.put('/:id', authMiddleware, adminMiddleware, updateClass);
router.delete('/:id', authMiddleware, adminMiddleware, deleteClass);

export default router;