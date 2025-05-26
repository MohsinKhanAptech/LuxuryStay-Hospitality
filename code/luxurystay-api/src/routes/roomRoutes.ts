import { Router } from 'express';
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} from '../controllers/roomController';

const router = Router();

// Create a new room
router.post('/', createRoom);

// Get all rooms
router.get('/', getAllRooms);

// Get a specific room by ID
router.get('/:id', getRoomById);

// Update a room by ID
router.put('/:id', updateRoom);

// Delete a room by ID
router.delete('/:id', deleteRoom);

export default router;
