import express from 'express';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from '../controllers/userController';

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

export default router;
