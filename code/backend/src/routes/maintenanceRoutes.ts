import { Router } from 'express';
import {
  createMaintenanceRequest,
  getAllMaintenanceRequests,
  getMaintenanceRequestById,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
} from '../controllers/maintenanceController';

const router = Router();

// Create a new maintenance request
router.post('/', createMaintenanceRequest);

// Get all maintenance requests
router.get('/', getAllMaintenanceRequests);

// Get a specific maintenance request by ID
router.get('/:id', getMaintenanceRequestById);

// Update a maintenance request by ID
router.put('/:id', updateMaintenanceRequest);

// Delete a maintenance request by ID
router.delete('/:id', deleteMaintenanceRequest);

export default router;
