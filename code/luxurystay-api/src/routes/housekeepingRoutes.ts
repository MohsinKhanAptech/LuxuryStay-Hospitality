import express from 'express';
import {
  createHousekeepingTask,
  getAllHousekeepingTasks,
  getHousekeepingTaskById,
  updateHousekeepingTask,
  deleteHousekeepingTask,
} from '../controllers/housekeepingController';

const router = express.Router();

// Create a new housekeeping task
router.post('/', createHousekeepingTask);

// Get all housekeeping tasks
router.get('/', getAllHousekeepingTasks);

// Get a specific housekeeping task by ID
router.get('/:id', getHousekeepingTaskById);

// Update a housekeeping task by ID
router.put('/:id', updateHousekeepingTask);

// Delete a housekeeping task by ID
router.delete('/:id', deleteHousekeepingTask);

export default router;
