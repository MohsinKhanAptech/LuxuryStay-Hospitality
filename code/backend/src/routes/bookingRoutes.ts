import { Router } from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController';

const router = Router();

// Create a new booking
router.post('/', createBooking);

// Get all bookings
router.get('/', getAllBookings);

// Get a specific booking by ID
router.get('/:id', getBookingById);

// Update a booking by ID
router.put('/:id', updateBooking);

// Delete a booking by ID
router.delete('/:id', deleteBooking);

export default router;
