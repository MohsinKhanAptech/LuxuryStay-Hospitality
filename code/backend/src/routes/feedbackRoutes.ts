import { Router } from 'express';
import {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} from '../controllers/feedbackController';

const router = Router();

// Create a new feedback
router.post('/', createFeedback);

// Get all feedback
router.get('/', getAllFeedback);

// Get a specific feedback by ID
router.get('/:id', getFeedbackById);

// Update feedback by ID
router.put('/:id', updateFeedback);

// Delete feedback by ID
router.delete('/:id', deleteFeedback);

export default router;
