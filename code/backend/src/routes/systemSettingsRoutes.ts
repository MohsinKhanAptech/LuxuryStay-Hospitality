import { Router } from 'express';
import {
  createSystemSettings,
  getAllSystemSettings,
  getSystemSettingById,
  updateSystemSettings,
  deleteSystemSettings,
} from '../controllers/systemSettingsController';

const router = Router();

// Route to create system settings
router.post('/', createSystemSettings);

// Route to retrieve all system settings
router.get('/', getAllSystemSettings);

// Route to retrieve a specific system setting by ID
router.get('/:id', getSystemSettingById);

// Route to update system settings
router.put('/:id', updateSystemSettings);

// Route to delete system settings
router.delete('/:id', deleteSystemSettings);

export default router;
